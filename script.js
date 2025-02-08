function handleCredentialResponse(response) {
    try {
        const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
        localStorage.setItem("user", JSON.stringify(responsePayload));

        // Hide login page and show home page
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("home-page").classList.remove("hidden");
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed! Please try again.");
    }
}

function renderGoogleLoginButton() {
    google.accounts.id.initialize({
        client_id: "1096498113269-aa66pncvqn6jf7jkb8r0mh7di47dv3m4.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
    );
}

window.onload = function () {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("home-page").classList.remove("hidden");
    } else {
        renderGoogleLoginButton();
    }
};

// Logout & Switch Account
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("user");
    location.reload();
});

// Add Notes Functionality
document.getElementById("add-note-btn").addEventListener("click", function () {
    const noteTitle = prompt("Enter note title:");
    if (noteTitle) {
        const note = document.createElement("div");
        note.innerText = noteTitle;
        note.classList.add("note");
        document.getElementById("notes-container").appendChild(note);
    }
});

// Search Notes
document.getElementById("search").addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".note").forEach(note => {
        note.style.display = note.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
});
