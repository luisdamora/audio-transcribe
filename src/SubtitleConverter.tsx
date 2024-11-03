import { useState } from 'react';

const SubtitleConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [srtOutput, setSrtOutput] = useState('');

  const convertToSRT = () => {
    try {
      const data = JSON.parse(jsonInput);
      const chunks = data.output.chunks;

      const srt = chunks
        .map((chunk: { timestamp: number[], text: string }, index: number) => {
          const startTime = formatTime(chunk.timestamp[0]);
          const endTime = formatTime(chunk.timestamp[1]);

          return `${index + 1}
${startTime} --> ${endTime}
${chunk.text.trim()}

`;
        })
        .join('');

      setSrtOutput(srt);

    } catch (error) {
      console.error('Error converting to SRT:', error);
      setSrtOutput('Invalid JSON format');
    }

  };
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  };

  const downloadSRT = () => {
    const blob = new Blob([srtOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitles.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">JSON to SRT Converter</h2>
      <textarea
        className="w-full h-64 p-2 border rounded mb-4"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here..."
      />
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={convertToSRT}
        >
          Convert to SRT
        </button>
        {srtOutput && (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={downloadSRT}
          >
            Download SRT
          </button>
        )}
      </div>
      {srtOutput && (
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={srtOutput}
          readOnly
        />
      )}
    </div>
  );
};

export default SubtitleConverter;
