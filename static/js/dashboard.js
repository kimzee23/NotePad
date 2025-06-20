document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    alert("Unauthorized. Redirecting to login.");
    window.location.href = "/login";
    return;
  }

  const form = document.getElementById("noteForm");
  const notesContainer = document.getElementById("notesContainer");
  const logoutBtn = document.getElementById("logoutBtn");


  async function loadNotes() {
    const res = await fetch(`/api/v1/notes/${userId}`);
    const notes = await res.json();

    notesContainer.innerHTML = "";
    for (let id in notes) {
      const note = notes[id];
      const noteEl = document.createElement("div");
      noteEl.classList.add("note-item");
      noteEl.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.content}</p>
        <small>Updated: ${note.updatedAt}</small>
        <hr/>
      `;
      notesContainer.appendChild(noteEl);
    }
  }

  loadNotes();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;

    const res = await fetch("/api/v1/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, user_id: userId })
    });

    const result = await res.json();
    if (res.ok) {
      alert("Note saved!");
      form.reset();
      loadNotes();
    } else {
      alert(result.msg || "Error saving note");
    }
  });

  logoutBtn.addEventListener("click", async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    localStorage.clear();
    window.location.href = "/login";
  });
});
