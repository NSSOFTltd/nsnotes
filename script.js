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
        client_id: "YOUR_NEW_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
    );
}

// Load Notes
function loadNotes() {
    let notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note) => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerText = note.title;
        notesContainer.appendChild(noteDiv);
    });
}

// Add Note
function addNote() {
    let title = prompt("Enter note title:");
    if (!title) return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title });
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// 3-Dot Menu Toggle
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.querySelector(".dropdown-menu").style.display = "block";
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-container")) {
        document.querySelector(".dropdown-menu").style.display = "none";
    }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    location.reload();
});

window.onload = function () {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
        loadNotes();
    } else {
        renderGoogleLoginButton();
    }

    document.getElementById("add-note-btn").addEventListener("click", addNote);
};
