// Google Login functionality
function handleCredentialResponse(response) {
    try {
        const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
        localStorage.setItem("user", JSON.stringify(responsePayload));

        // Hide login page and show home page
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed! Please try again.");
    }
}

function renderGoogleLoginButton() {
    google.accounts.id.initialize({
        client_id: "1096498113269-aa66pncvqn6jf7jkb8r0mh7di47dv3m4.apps.googleusercontent.com", // Use your client ID here
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("google-login"),
        { theme: "outline", size: "large" }
    );
}

// Load Google Login button or home page based on user status
window.onload = function () {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("home-page").style.display = "block";
    } else {
        renderGoogleLoginButton();
    }
};

// Menu options
const menuButton = document.getElementById("menu-button");
const menuOptions = document.getElementById("menu-options");

menuButton.addEventListener("click", () => {
    menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
});

// Logout button
document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.reload();
});

// Switch Account functionality
document.getElementById("switch-account-button").addEventListener("click", () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.prompt();
});
