import React from 'react';

interface TranscriptionProps {
  transcription: string;
}

const Transcription: React.FC<TranscriptionProps> = ({ transcription }) => {
  if (!transcription) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-white">Transcription:</h3>
      <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-md">
        <p className="text-white">{transcription}</p>
      </div>
    </div>
  );
};

export default Transcription;
