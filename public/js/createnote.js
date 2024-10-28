const searchBar = document.getElementById('search-bar');
const notesContainer = document.getElementById('notes-container');

async function loadSavedNotes() {
    try {
        const response = await fetch('/api/notes');
        if (!response.ok) throw new Error('Failed to fetch notes');

        const savedNotes = await response.json();
        notesContainer.innerHTML = '';

        savedNotes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');

            let truncatedContent = note.content.trim().split(' ');
            if (truncatedContent.length > 4) {
                truncatedContent = truncatedContent.slice(0, 4).join(' ') + '...';
            } else {
                truncatedContent = truncatedContent.join(' ');
            }

            noteItem.innerHTML = `
                <div class="note-details">
                    <strong>${note.title}</strong>
                    <p>${truncatedContent}</p>
                </div>
                <div class="note-actions">
                    <button class="edit-btn" onclick="editNoteForm('${note.id}')">✏️</button>
                    <button class="delete-btn" onclick="deleteNote('${note.id}')">🗑️</button>
                </div>
            `;
            notesContainer.appendChild(noteItem);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

async function addNote() {
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;

    if (!noteTitle || !noteContent) {
        showToast("Please provide both a title and content for the note.");
        return;
    }

    try {
        const response = await fetch('/notes/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                title: noteTitle,
                content: noteContent
            })
        });

        if (!response.ok) {
            console.error('Error adding note:', response.statusText);
            return;
        }

        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        loadSavedNotes();
    } catch (error) {
        console.error('Error adding note:', error);
    }
}

async function deleteNote(noteId) {
    try {
        const response = await fetch(`/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        if (!response.ok) {
            console.error('Error deleting note:', response.statusText);
            return;
        }
        loadSavedNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

function editNoteForm(noteId) {
    window.location.href = `/notes/${noteId}/edit`;
}

function searchNotes() {
    const searchQuery = searchBar.value.toLowerCase();
    const notes = document.querySelectorAll('.note-item');

    notes.forEach(note => {
        const title = note.querySelector('strong').innerText.toLowerCase();
        const content = note.querySelector('p').innerText.toLowerCase();

        if (title.includes(searchQuery) || content.includes(searchQuery)) {
            note.style.display = 'flex';
        } else {
            note.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    loadSavedNotes();

    if (searchBar) {
        searchBar.addEventListener('input', searchNotes);
    }

    const addNoteBtn = document.getElementById('add-note-btn');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function (event) {
            event.preventDefault();
            addNote();
        });
    }
});
