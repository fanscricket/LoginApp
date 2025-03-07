document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page refresh

            // Get username and password values
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Send data to the server
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message); // Show response message
                })
                .catch((error) => console.error("Error:", error));
        });
    } else {
        console.error("Login form not found!");
    }
});
