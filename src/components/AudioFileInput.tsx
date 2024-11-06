import React from 'react';

interface AudioFileInputProps {
  onChange: (file: File | null) => void;
}

const AudioFileInput: React.FC<AudioFileInputProps> = ({ onChange }) => (
  <div className="mb-4">
    <input
      type="file"
      accept="audio/mpeg"
      onChange={(e) => onChange(e.target.files?.[0] || null)}
      className="block w-full text-sm text-white
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-orange-500 file:text-white
        hover:file:bg-orange-600"
    />
  </div>
);

export default AudioFileInput;
