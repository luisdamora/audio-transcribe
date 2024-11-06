import React from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-white mb-2">
        OpenAI API Key
      </label>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your OpenAI API key"
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-white"
      />
    </div>
  );
};

export default ApiKeyInput;
