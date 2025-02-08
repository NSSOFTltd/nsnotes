function handleCredentialResponse(response) {
    try {
        const user = JSON.parse(atob(response.credential.split('.')[1]));
        localStorage.setItem("user", JSON.stringify(user));

        // Show home page
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";

        loadNotes();
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed! Please try again.");
    }
}

function renderGoogleLoginButton() {
    google.accounts.id.initialize({
        client_id: "1096498113269-95bg5dk0od0orqtjnhu2bvm02o7ude8q.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
    );
}

function toggleMenu() {
    let menu = document.getElementById("menu-content");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (event) {
    let menu = document.getElementById("menu-content");
    if (!event.target.closest(".menu-container")) {
        menu.style.display = "none";
    }
});

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("user");
    location.reload();
});

document.getElementById("switch-account-btn").addEventListener("click", function () {
    google.accounts.id.prompt();
});

function addNote() {
    let title = prompt("Enter note title:");
    if (!title) return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title });
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

function loadNotes() {
    let notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note) => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `<div class="note-title">${note.title}</div>`;
        notesContainer.appendChild(noteDiv);
    });
}

function searchNotes() {
    let query = document.getElementById("search").value.toLowerCase();
    let notes = document.querySelectorAll(".note");

    notes.forEach(note => {
        let title = note.querySelector(".note-title").textContent.toLowerCase();
        note.style.display = title.includes(query) ? "block" : "none";
    });
}

window.onload = function () {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
        loadNotes();
    } else {
        renderGoogleLoginButton();
    }
};


