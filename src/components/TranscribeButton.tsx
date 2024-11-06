import React from 'react';

interface TranscribeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const TranscribeButton: React.FC<TranscribeButtonProps> = ({ onClick, disabled, isLoading }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex-1 py-2 px-4 rounded-md text-white font-medium
      ${disabled ? 'bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'}`}
  >
    {isLoading ? 'Processing...' : 'Transcribe Audio'}
  </button>
);

export default TranscribeButton;
