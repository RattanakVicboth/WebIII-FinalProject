// static/js/signup.js

// UI transitions (login ↔ signup)
const loginText   = document.querySelector(".title-text .login");
const loginForm   = document.querySelector("form.login");
const signupBtn   = document.querySelector("label.signup");
const loginBtn    = document.querySelector("label.login");
const signupLink  = document.querySelector("form .signup-link a");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
  document.querySelector("#loginEmail").value    = "";
  document.querySelector("#loginPassword").value = "";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = e => {
  e.preventDefault();
  signupBtn.click();
};

// Helpers to show/hide the pop‑ups
function showSuccess() {
  document.querySelector("#success").classList.add("open-success");
}
function showError() {
  document.querySelector("#error").classList.add("open-error");
}
function closeSuccess() {
  document.querySelector("#success").classList.remove("open-success");
}
function closeError() {
  document.querySelector("#error").classList.remove("open-error");
}

// SIGNUP handler
const signupForm = document.querySelector("form.signup");
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const name     = document.querySelector("#signupName").value;
  const email    = document.querySelector("#signupEmail").value;
  const mobile   = document.querySelector("#signupMobile").value;
  const password = document.querySelector("#signupPassword").value;
  fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, mobile })
  })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      showSuccess();
      setTimeout(() => window.location.href = "/", 1500);
    } else {
      showError();
    }
  })
  .catch(err => {
    console.error("Signup error:", err);
    showError();
  });
});

// LOGIN handler
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email    = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      // instead of immediate redirect, show your green pop‑up
      showSuccess();
      // then after a short pause, go home
      setTimeout(() => window.location.href = "/", 1500);
    } else {
      showError();
    }
  })
  .catch(err => {
    console.error("Login error:", err);
    showError();
  });
});
