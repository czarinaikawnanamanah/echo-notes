const addNoteBtn = document.getElementById('add-note-btn');
const searchBar = document.getElementById('search-bar');

addNoteBtn.addEventListener('click', function () {
    window.location.href = "/notes/create";
});

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

document.querySelectorAll('.btn-danger').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const modal = document.createElement('div');
        modal.classList.add('custom-modal');
        modal.innerHTML = `
            <div class="modal-content" style="font-family: Tahoma;">
                <p>Are you sure you want to delete this note? - Ashken</p>
                <div class="modal-actions">
                    <button id="modal-confirm" class="modal-btn confirm-btn">Delete</button>
                    <button id="modal-cancel" class="modal-btn cancel-btn">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);

        document.getElementById('modal-confirm').addEventListener('click', () => {
            modal.remove();
            button.closest('form').submit();
        });

        document.getElementById('modal-cancel').addEventListener('click', () => {
            modal.remove();
        });
    });
});

document.querySelectorAll('.edit-btn').forEach(button => {
    button.innerHTML = '';
    button.innerHTML = '✏️';
    button.style.background = 'none';
    button.style.border = 'none';
    button.style.padding = '3px';
    button.style.fontSize = '1.5em';
    button.style.cursor = 'pointer';
    button.style.marginLeft = '12px';
});

document.querySelectorAll('.delete-btn').forEach(button => {
    button.innerHTML = '';
    button.innerHTML = '🗑️';
    button.style.background = 'none';
    button.style.border = 'none';
    button.style.padding = '3px';
    button.style.fontSize = '1.5em';
    button.style.cursor = 'pointer';
});

document.querySelectorAll('.note-actions').forEach(container => {
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '8px';
    container.style.flexWrap = 'nowrap';
});
