document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesContainer = document.getElementById('notesContainer');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            if (note.archived) {
                noteElement.classList.add('archived');
            }

            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <small>${note.date}</small>
                <div class="buttons">
                    <button onclick="editNote(${index})">Редагувати</button>
                    <button onclick="archiveNote(${index})">${note.archived ? 'Розархівувати' : 'Архівувати'}</button>
                    <button onclick="deleteNote(${index})">${note.archived ? 'Видалити' : 'Видалити'}</button>
                </div>
            `;

            notesContainer.appendChild(noteElement);
        });
    }

    function addNote() {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title && content) {
            const note = {
                title,
                content,
                date: new Date().toLocaleString(),
                archived: false
            };

            notes.push(note);
            saveNotes();
            renderNotes();

            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        } else {
            alert('Будь ласка, заповніть всі поля');
        }
    }

    function deleteNote(index) {
        if (notes[index].archived) {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        } else {
            if (confirm('Ви дійсно хочете видалити цю нотатку?')) {
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            }
        }
    }

    function archiveNote(index) {
        notes[index].archived = !notes[index].archived;
        saveNotes();
        renderNotes();
    }

    window.editNote = function(index) {
        const title = prompt('Редагувати заголовок', notes[index].title);
        const content = prompt('Редагувати текст', notes[index].content);
        if (title && content) {
            notes[index].title = title;
            notes[index].content = content;
            saveNotes();
            renderNotes();
        }
    }

    window.deleteNote = deleteNote;
    window.archiveNote = archiveNote;
    
    addNoteBtn.addEventListener('click', addNote);

    renderNotes();
});

