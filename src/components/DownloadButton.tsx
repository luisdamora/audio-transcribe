import React from 'react';

interface DownloadButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`py-2 px-4 rounded-md text-white font-medium 
      ${disabled ? 'bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'}`}
  >
    Download SRT
  </button>
);

export default DownloadButton;
