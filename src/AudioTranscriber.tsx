import React, { useState, useEffect } from 'react';
import ApiKeyInput from './components/ApiKeyInput';
import AudioFileInput from './components/AudioFileInput';
import Transcription from './components/Transcription';
import TranscribeButton from './components/TranscribeButton';
import DownloadButton from './components/DownloadButton';

const AudioTranscriber = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem('openai_api_key', newApiKey);
  };

  const handleFileChange = (file: File | null) => {
    if (file && file.type === 'audio/mpeg') {
      setAudioFile(file);
    }
  };

  const processAudio = async () => {
    if (!audioFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'srt');

    try {
      const response = await fetch(
        'https://api.openai.com/v1/audio/transcriptions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const result = await response.text();
      setTranscription(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSRT = () => {
    if (!transcription) return;

    const srtContent = `${transcription}`;

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${audioFile?.name.replace('.mp3', '')}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover opacity-30"
      >
        <source src="/audio-transcribe/5453622-uhd_3840_2160_24fps_2.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-gray-900 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Audio Transcription
            </h2>

            <ApiKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
            <AudioFileInput onChange={handleFileChange} />

            <div className="flex gap-2">
              <TranscribeButton onClick={processAudio} disabled={!audioFile || isLoading} isLoading={isLoading} />
              <DownloadButton onClick={downloadSRT} disabled={!transcription} />
            </div>

            <Transcription transcription={transcription} />

            <footer className="mt-8 text-center text-gray-400 pt-4 border-t border-gray-800">
              <p>by Caprinosol</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioTranscriber;