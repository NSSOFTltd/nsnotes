function handleCredentialResponse(response) {
    try {
        const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
        localStorage.setItem("user", JSON.stringify(responsePayload));

        // Hide login page and show home page
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("home-page").classList.remove("hidden");

        // Display user profile
        document.getElementById("profile-btn").innerText = responsePayload.name;
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed! Please try again.");
    }
}

function renderGoogleLoginButton() {
    google.accounts.id.initialize({
        client_id: "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",  // Updated Client ID
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

// Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    location.reload();
});

// Switch Account
document.getElementById("switch-account-btn").addEventListener("click", () => {
    google.accounts.id.prompt();
});

// Add Note
document.getElementById("add-note-btn").addEventListener("click", () => {
    const noteTitle = prompt("Enter note title:");
    if (noteTitle) {
        const note = document.createElement("div");
        note.textContent = noteTitle;
        note.classList.add("note");
        document.getElementById("notes-container").appendChild(note);
    }
});

// Search Notes
document.getElementById("search").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll(".note").forEach(note => {
        note.style.display = note.textContent.toLowerCase().includes(searchTerm) ? "block" : "none";
    });
});
