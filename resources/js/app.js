const noteTitleInput = document.querySelector('.note-title');
const noteTextInput = document.querySelector('.note-text');
const addButton = document.querySelector('.add-button');
const noteList = document.getElementById('noteList');
const searchInput = document.querySelector('.search-bar');

function createNoteItem(title, content) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = `
        <strong>${title}</strong>
        <p>${content}</p>
    `;

    noteItem.addEventListener('click', () => {
        noteItem.remove();
    });

    return noteItem;
}

function addNote() {
    const title = noteTitleInput.value.trim();
    const content = noteTextInput.value.trim();

    if (title && content) {
        const noteItem = createNoteItem(title, content);
        noteList.appendChild(noteItem);

        noteTitleInput.value = '';
        noteTextInput.value = '';
    } else {
        alert('Please fill in both title and content');
    }
}

function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const notes = noteList.children;

    Array.from(notes).forEach(note => {
        const noteText = note.textContent.toLowerCase();
        note.style.display = noteText.includes(searchTerm) ? 'block' : 'none';
    });
}

addButton.addEventListener('click', addNote);
searchInput.addEventListener('input', filterNotes);
