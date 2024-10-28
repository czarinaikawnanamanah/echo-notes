<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Echo Notes</title>
    <link rel="stylesheet" href="/css/listofnotes.css">
    <link rel="icon" href="/images/android-chrome-512x512.png" type="image/png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="title-container">
            <img src="/images/android-chrome-512x512.png" alt="Icon" class="title-icon">
            <h1>Echo Notes</h1>
        </div>

        <div class="note-list">
            <div class="search-bar-container">
                <input 
                    type="text" 
                    class="search-bar" 
                    placeholder="Search notes..." 
                    id="search-bar"
                    oninput="searchNotes()"
                >
                <button id="add-note-btn" class="add-button" onclick="window.location.href='{{ route('notes.create') }}'">
                    <i class="fas fa-plus"></i> <!-- Add button redirects to the create page -->
                </button>
            </div>

            <div class="note-list-content" id="notes-container">
                @foreach($notes as $note)
                    <div class="note-item">
                        <div class="note-details">
                            <strong class="note-title">{{ $note->title }}</strong>
                            <p class="note-content">{{ Str::limit($note->content, 100) }}</p>
                        </div>
                        <div class="note-actions">
                            <button onclick="window.location.href='{{ route('notes.edit', $note->id) }}'" class="btn btn-warning edit-btn">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <form action="{{ route('notes.destroy', $note->id) }}" method="POST" style="display: inline-block;" onsubmit="return confirm('Are you sure you want to delete this note?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger delete-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <script src="/js/listofnotes.js"></script>
</body>
</html>
