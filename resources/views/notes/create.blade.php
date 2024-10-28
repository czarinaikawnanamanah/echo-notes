<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Echo Notes - Create Note</title>
    <link rel="stylesheet" href="/css/createnote.css">
    <link rel="stylesheet" href="/css/responsive.css">
    <link rel="icon" href="/images/android-chrome-512x512.png" type="image/png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="/css/toast.css">
</head>

<body>
    <div class="container">
        <div class="note-input">
            <div class="note-header">
            </div>
            <div class="note-body">
                <form action="{{ route('notes.store') }}" method="POST" id="note-form">
                    @csrf
                    <input type="text" class="note-title" placeholder="Title" name="title" id="note-title" required />
                    <textarea class="note-content" placeholder="What's on your mind?" name="content" id="note-content" required></textarea>
                    <button type="submit" class="add-button" id="add-note-btn" aria-label="Add Note">
                        <i class="fas fa-plus"></i>
                    </button>
                </form>
            </div>
        </div>

        <div class="note-list">
            <input type="text" class="search-bar" placeholder="Search notes..." id="search-bar" oninput="searchNotes()">
            <div class="note-list-content" id="notes-container">
                @foreach($notes as $index => $note)
                    <a href="{{ route('notes.edit', $note->id) }}" class="note-item-link">
                        <div class="note-item" style="background-color: {{ ['#c8baf5', '#b6c3f5', '#fad8fb'][$index % 3] }};">
                            <div class="note-details">
                                <strong class="note-title">{{ Str::limit($note->title, 20) }}</strong>
                                <p class="note-content">{{ Str::limit($note->content, 25) }}</p>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </div>

    <div id="toast" class="toast">
        Please provide both a title and content for the note.
    </div>

    <a href="{{ route('notes.index') }}" class="back-button" id="back-to-list-btn" aria-label="Return to List">
        <i class="fas fa-arrow-left"></i>
    </a>

    <script src="/js/createnote.js"></script>
</body>

</html>
