# Audio Transcription App

This application allows users to transcribe audio files using the OpenAI API.  It's built with React, TypeScript, and Vite.

## Components

The application consists of the following components:

- **`ApiKeyInput`**:  Accepts the user's OpenAI API key.  The key is stored as a password input type.
- **`AudioFileInput`**: Allows users to select an audio file (MPEG format).
- **`TranscribeButton`**:  Initiates the transcription process.  Displays "Processing..." while the transcription is in progress.  Disabled while transcribing.
- **`DownloadButton`**:  Allows users to download the transcription as an SRT file. Disabled until a transcription is available.
- **`Transcription`**: Displays the transcribed text.  Hidden until a transcription is available.

## Styling

The application uses Tailwind CSS-like utility classes for styling.  The primary color is orange, and a dark theme is used.

## Functionality

1. The user enters their OpenAI API key.
2. The user selects an audio file.
3. The user clicks the "Transcribe Audio" button.
4. The application sends the audio file to the OpenAI API for transcription.
5. The transcribed text is displayed in the `Transcription` component.
6. A "Download SRT" button becomes enabled, allowing the user to download the transcription.