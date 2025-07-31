document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const msg = document.getElementById("message");

      const phoneRegex = /^\d{11}$/;

      // Validate phone
      if (!phoneRegex.test(phone)) {
        msg.style.color = "red";
        msg.textContent = "Phone number must be exactly 11 digits.";
        return;
      }

      // Validate password match
      if (password !== confirmPassword) {
        msg.style.color = "red";
        msg.textContent = "Passwords do not match.";
        return;
      }

      const data = {
        username,
        email,
        phone,
        password,
        confirm_password: confirmPassword
      };

      try {
        const response = await fetch("/api/v1/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          msg.style.color = "green";
          msg.textContent = "Registration successful!";
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          msg.style.color = "red";
          msg.textContent = result.error || result.msg || "Something went wrong!";
        }
      } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Network error. Please try again.";
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
      };

      const msg = document.getElementById("message");

      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          msg.style.color = "green";
          msg.textContent = "Login successful!";
          localStorage.setItem("user_id", result.user_id);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          msg.style.color = "red";
          msg.textContent = result.error || result.msg || "Login failed!";
        }
      } catch (err) {
        msg.style.color = "red";
        msg.textContent = "Network error. Please try again.";
      }
    });
  }
});
