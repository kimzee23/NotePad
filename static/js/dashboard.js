document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    alert("Unauthorized. Redirecting to login.");
    window.location.href = "/login";
    return;
  }

  const noteContent = document.getElementById("noteContent");
  const form = document.getElementById("noteForm");
  const notesContainer = document.getElementById("notesContainer");
  const logoutBtn = document.getElementById("logoutBtn");
  const saveAsBtn = document.getElementById("saveAsBtn");
  const printBtn = document.getElementById("printBtn");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");

  document.getElementById("boldBtn").addEventListener("click", () => {
    document.execCommand("bold");
    noteContent.focus();
  });

  document.getElementById("italicBtn").addEventListener("click", () => {
    document.execCommand("italic");
    noteContent.focus();
  });

  document.getElementById("fontSizeSelect").addEventListener("change", (e) => {
    document.execCommand("fontSize", false, e.target.value);
    noteContent.focus();
    e.target.value = "";
  });

  document.getElementById("fontFamilySelect").addEventListener("change", (e) => {
    document.execCommand("fontName", false, e.target.value);
    noteContent.focus();
    e.target.value = "";
  });

  document.getElementById("colorPicker").addEventListener("input", (e) => {
    document.execCommand("foreColor", false, e.target.value);
    noteContent.focus();
  });

  async function loadNotes() {
    try {
      const res = await fetch(`/api/v1/notes/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const notes = await res.json();

      notesContainer.innerHTML = "";
      for (let id in notes) {
        const note = notes[id];
        const noteEl = document.createElement("div");
        noteEl.classList.add("note-item");
        noteEl.innerHTML = `
          <h4>${note.title}</h4>
          <div>${note.content}</div>
          <small>Updated: ${note.updatedAt}</small>
          <hr/>
        `;
        notesContainer.appendChild(noteEl);
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  }

  loadNotes();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("noteTitle").value.trim();
    const content = noteContent.innerHTML.trim();

    if (!title) {
      alert("Please enter a title.");
      return;
    }
    if (!content) {
      alert("Please enter some content.");
      return;
    }

    try {
      const res = await fetch("/api/v1/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, user_id: userId }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Note saved!");
        form.reset();
        noteContent.innerHTML = "";
        loadNotes();
      } else {
        alert(result.msg || "Error saving note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note, check console.");
    }
  });
  saveAsBtn.addEventListener("click", () => {
    const title = prompt("Enter new title for Save As:");
    const content = noteContent.innerHTML.trim();

    if (title && content) {
      fetch("/api/v1/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, user_id: userId }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Note saved as new!");
          loadNotes();
        })
        .catch((error) => {
          console.error("Error in Save As:", error);
          alert("Failed to Save As. Check console.");
        });
    } else {
      alert("Title and content required for Save As.");
    }
  });

  downloadPdfBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const title = document.getElementById("noteTitle").value || "Untitled Note";
    const content = noteContent.innerText || ""; // use plain text for PDF
    const lines = doc.splitTextToSize(content, 180);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Title: ${title}`, 10, 10);
    doc.text(lines, 10, 20);

    const filename = prompt("Enter filename for PDF:", `${title}.pdf`);
    if (filename) {
      doc.save(filename);
    }
  });

  printBtn.addEventListener("click", () => {
    const content = noteContent.innerHTML || "";
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Note</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
        </style>
      </head>
      <body>${content}</body>
      </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  });

  logoutBtn.addEventListener("click", async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    localStorage.clear();
    window.location.href = "/login";
  });
});
