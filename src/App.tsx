import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SubtitleConverter from './SubtitleConverter';
import AudioTranscriber from './AudioTranscriber';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <SubtitleConverter /> */}
      <AudioTranscriber />
    </>
  );
}

export default App;
