import React, { useState, useEffect } from 'react';

const AudioTranscriber = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeyChange = (event) => {
    const newApiKey = event.target.value;
    setApiKey(newApiKey);
    localStorage.setItem('openai_api_key', newApiKey);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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

    // Convert transcription to SRT format
    const srtContent = `${transcription}`;

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${audioFile.name.replace('.mp3', '')}.srt`;
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
        <source src="/public/5453622-uhd_3840_2160_24fps_2.mp4" type="video/mp4" />
      </video>

      {/* Content Card */}
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-gray-900 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Audio Transcription
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Enter your OpenAI API key"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-white"
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                accept="audio/mpeg"
                onChange={handleFileChange}
                className="block w-full text-sm text-white
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-orange-500 file:text-white
                  hover:file:bg-orange-600"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={processAudio}
                disabled={!audioFile || isLoading}
                className={`flex-1 py-2 px-4 rounded-md text-white font-medium
                  ${!audioFile || isLoading ? 'bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                {isLoading ? 'Processing...' : 'Transcribe Audio'}
              </button>

              <button
                onClick={downloadSRT}
                disabled={!transcription}
                className={`py-2 px-4 rounded-md text-white font-medium 
                  ${transcription ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-600'}`}
              >
                Download SRT
              </button>
            </div>

            {transcription && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Transcription:
                </h3>
                <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-md">
                  <p className="text-white">{transcription}</p>
                </div>
              </div>
            )}

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
  // return (
  //   <div className="max-w-2xl mx-auto p-6">
  //     <h2 className="text-2xl font-bold mb-4">Audio Transcription</h2>

  //     <div className="mb-6">
  //       <label className="block text-sm font-medium text-gray-700 mb-2">
  //         OpenAI API Key
  //       </label>
  //       <input
  //         type="password"
  //         value={apiKey}
  //         onChange={handleApiKeyChange}
  //         placeholder="Enter your OpenAI API key"
  //         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  //       />
  //     </div>

  //     <div className="mb-4">
  //       <input
  //         type="file"
  //         accept="audio/mpeg"
  //         onChange={handleFileChange}
  //         className="block w-full text-sm text-gray-500
  //           file:mr-4 file:py-2 file:px-4
  //           file:rounded-md file:border-0
  //           file:text-sm file:font-semibold
  //           file:bg-blue-50 file:text-blue-700
  //           hover:file:bg-blue-100"
  //       />
  //     </div>

  //     <div className="flex gap-2">
  //       <button
  //         onClick={processAudio}
  //         disabled={!audioFile || isLoading}
  //         className={`flex-1 py-2 px-4 rounded-md text-white font-medium
  //           ${
  //             !audioFile || isLoading
  //               ? 'bg-gray-400'
  //               : 'bg-blue-600 hover:bg-blue-700'
  //           }`}
  //       >
  //         {isLoading ? 'Processing...' : 'Transcribe Audio'}
  //       </button>

  //       <button
  //         onClick={downloadSRT}
  //         disabled={!transcription}
  //         className={`py-2 px-4 rounded-md text-white font-medium ${
  //           transcription ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'
  //         }`}
  //       >
  //         Download SRT
  //       </button>
  //     </div>

  //     {transcription && (
  //       <div className="mt-6">
  //         <h3 className="text-lg font-semibold mb-2">Transcription:</h3>
  //         <div className="p-4 bg-gray-50 rounded-md">
  //           <p>{transcription}</p>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
// };

