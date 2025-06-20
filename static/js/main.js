document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const noteForm = document.getElementById("noteForm");
  const logoutBtn = document.getElementById("logoutBtn");

  const userId = sessionStorage.getItem("user_id");

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        username: registerForm.username.value,
        email: registerForm.email.value,
        phone: registerForm.phone.value,
        password: registerForm.password.value,
        confirm_password: registerForm.confirm_password.value,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.msg);
      if (res.status === 201) {
        sessionStorage.setItem("user_id", result.user_id);
        window.location.href = "/dashboard";
      }
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: loginForm.email.value,
        password: loginForm.password.value,
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.msg);
      if (res.status === 200) {
        sessionStorage.setItem("user_id", result.user_id);
        window.location.href = "/dashboard";
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      sessionStorage.clear();
      window.location.href = "/";
    });
  }

  // Create Note
  if (noteForm) {
    noteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        title: noteForm.title.value,
        content: noteForm.content.value,
        user_id: sessionStorage.getItem("user_id"),
      };

      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      alert(result.msg);
      if (res.status === 201) {
        loadNotes();
        noteForm.reset();
      }
    });

    loadNotes(); // Load existing notes on page load
  }

  async function loadNotes() {
    const res = await fetch(`/api/notes/${sessionStorage.getItem("user_id")}`);
    const notes = await res.json();
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    for (const [id, note] of Object.entries(notes)) {
      const div = document.createElement("div");
      div.className = "note-item";
      div.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <small>Created: ${new Date(note.createdAt).toLocaleString()}</small><br/>
        <small>Updated: ${new Date(note.updatedAt).toLocaleString()}</small>
      `;
      notesList.appendChild(div);
    }
  }
});
