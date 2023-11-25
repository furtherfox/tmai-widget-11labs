import React from 'react';
import styles from './Widget.module.css';

// Define the voices array inside VoiceSelector.js
const voices = [
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda' },
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Bella' },
  { id: 'Dpt4AYuZnND49w3UfMvh', name: 'Neal' },
  { id: 'BmHTocN58fwVpATV1sQJ', name: 'Readwell' },
  // Add more voices as needed
];

const VoiceSelector = React.forwardRef(({ voiceId, setVoiceId, isVisible }, ref) => (
  <select
    ref={ref}
    className={`${styles['myWidget-voice-selector']} ${isVisible ? styles.visible : ''}`}
    value={voiceId}
    onChange={(e) => setVoiceId(e.target.value)}
  >
    {voices.map(voice => (
      <option key={voice.id} value={voice.id}>{voice.name}</option>
    ))}
  </select>
));

export default VoiceSelector;
