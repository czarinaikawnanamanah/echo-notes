<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Note - Echo Notes</title>
    <link rel="stylesheet" href="/css/createnote.css"> 
    <link rel="icon" href="/images/android-chrome-512x512.png" type="image/png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div class="container">
        <div class="note-display">
            <h2>{{ $note->title }}</h2>
            <p class="note-content">{{ $note->content }}</p>
            <div class="note-actions">
                <a href="{{ route('notes.index') }}" class="btn btn-secondary">Back to List</a>
                <a href="{{ route('notes.edit', $note->id) }}" class="btn btn-warning">Edit Note</a>
            </div>
        </div>
    </div>

    <script src="/js/createnote.js"></script> 
</body>
</html>
