// Selectors
const noteTitleInput = document.querySelector('.note-title');
const noteTextInput = document.querySelector('.note-text');
const addButton = document.querySelector('.add-button');
const noteList = document.getElementById('noteList');
const searchInput = document.querySelector('.search-bar');

// Function to create a note item
function createNoteItem(title, content) {
    const noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = `
        <strong>${title}</strong>
        <p>${content}</p>
    `;

    // Add click event to delete the note
    noteItem.addEventListener('click', () => {
        noteItem.remove();
    });

    return noteItem;
}

// Function to add a note
function addNote() {
    const title = noteTitleInput.value.trim();
    const content = noteTextInput.value.trim();

    if (title && content) {
        const noteItem = createNoteItem(title, content);
        noteList.appendChild(noteItem);

        // Clear the inputs after adding a note
        noteTitleInput.value = '';
        noteTextInput.value = '';
    } else {
        alert('Please fill in both title and content');
    }
}

// Function to filter notes
function filterNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const notes = noteList.children;

    Array.from(notes).forEach(note => {
        const noteText = note.textContent.toLowerCase();
        note.style.display = noteText.includes(searchTerm) ? 'block' : 'none';
    });
}

// Event Listeners
addButton.addEventListener('click', addNote);
searchInput.addEventListener('input', filterNotes);
