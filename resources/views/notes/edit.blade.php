<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Note - Echo Notes</title>
    <link rel="stylesheet" href="/css/editnote.css">
    <link rel="icon" href="/images/android-chrome-512x512.png" type="image/png">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <div class="container">
        <div class="note-input">
            <div class="note-header">
            </div>
            <div class="note-body">
                <form action="{{ route('notes.update', $note->id) }}" method="POST" id="note-form">
                    @csrf
                    @method('PUT')

                    <input type="text" class="note-title" name="title" id="note-title" value="{{ $note->title }}" required />

                    <textarea class="note-content" name="content" id="note-content" required>{{ $note->content }}</textarea>

                    <button type="submit" class="add-button">Update Note</button>
                </form>
            </div>
        </div>
    </div>

</body>

</html>
