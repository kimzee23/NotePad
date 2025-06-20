document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        confirm_password: document.getElementById("confirmPassword").value
      };

      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      const msg = document.getElementById("message");

      if (response.ok) {
        msg.style.color = "green";
        msg.textContent = "Registration successful!";
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        msg.textContent = result.msg || "Something went wrong!";
      }
    });
  }
});
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const msg = document.getElementById("message");

    if (response.ok) {
      msg.style.color = "green";
      msg.textContent = "Login successful!";
      localStorage.setItem("user_id", result.user_id);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } else {
      msg.textContent = result.msg || "Login failed!";
    }
  });
}
