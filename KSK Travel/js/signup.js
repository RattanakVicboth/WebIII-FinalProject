// Static variables for UI transitions (login/signup)
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");  // This is fine, no need to redeclare it later.
const signupBtn = document.querySelector("label.signup");
const loginBtn = document.querySelector("label.login");
const signupLink = document.querySelector("form .signup-link a");

// Handle the transition between login and signup
signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
    document.querySelector("#loginEmail").value = "";
    document.querySelector("#loginPassword").value = "";
};

loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
    signupBtn.click();
    return false;
};

// Handle signup form submission
const signupForm = document.querySelector("form.signup");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data for signup
    const name = document.querySelector("#signupName").value;
    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;
    const mobile = document.querySelector("#signupMobile").value;

    // Prepare data to send to the backend API
    const userData = {
        name: name,
        email: email,
        password: password,
        mobile: mobile
    };

    // Send data to the Flask API using fetch
    fetch("http://127.0.0.1:5001/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(responseData => {
        // Show success or error message based on API response
        if (responseData.success) {
            document.querySelector("#success").classList.add("open-success");
        } else {
            document.querySelector("#error").classList.add("open-error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.querySelector("#error").classList.add("open-error");
    });
});

// Handle login form submission
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect login data
    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    // Prepare login data to send to the backend API
    const loginData = {
        email: email,
        password: password
    };

    // Send login data to Flask API
    fetch("http://127.0.0.1:5001/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(responseData => {
        // Show success or error message based on API response
        if (responseData.success) {
            // Redirect on successful login
            window.location.href = "index.html"; // Change to your homepage URL if needed
        } else {
            // Show error on invalid credentials
            document.querySelector("#error").classList.add("open-error");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.querySelector("#error").classList.add("open-error");
    });
});

// Functions to close success/error messages
function closeSuccess() {
    document.querySelector("#success").classList.remove("open-success");
}

function closeError() {
    document.querySelector("#error").classList.remove("open-error");
}