  const addBtn = document.querySelector("#addBtn");
  const main = document.querySelector("#main");

  // Function to save notes to local storage
  const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];

    notes.forEach((note) => {
      const noteContent = note.value;
      const isImportant = note.parentElement.querySelector(".important").classList.contains("done");

      data.push({ content: noteContent, important: isImportant });
    });

    localStorage.setItem("notes", JSON.stringify(data));
  };

  // Function to add a new note
  const addNote = (text = "", isImportant = false) => {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
      <div class="tool">
        <i class="important fa-solid fa-star fa-lg ${isImportant ? "done" : ""}"></i>
        <i class="save fa-regular fa-floppy-disk fa-lg"></i>
        <i class="trash fa-solid fa-trash-can fa-lg"></i>
      </div>
      <textarea>${text}</textarea>
    `;

    main.appendChild(note);
    saveNotes();

    // Add event listeners for the important, trash, and save buttons
    const importantButton = note.querySelector(".important");
    importantButton.addEventListener("click", function () {
      this.classList.toggle("done");
      saveNotes();
    });

    note.querySelector(".trash").addEventListener("click", function () {
      note.remove();
      saveNotes();
    });

    note.querySelector(".save").addEventListener("click", function () {
      saveNotes();
    });

    note.querySelector("textarea").addEventListener("focusout", function () {
      saveNotes();
    });
  };

  // Function to display saved notes from local storage
  function displayNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));

    if (savedNotes === null) {
      addNote();
    } else {
      savedNotes.forEach((note) => {
        addNote(note.content, note.important);
      });
    }
  }

  // Add event listener for the "Add Note" button
  addBtn.addEventListener("click", function () {
    addNote();
  });

  // Display saved notes on page load
  displayNotes();
