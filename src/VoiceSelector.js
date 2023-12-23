import React from 'react';
import styles from './Widget.module.css';

// Define the voices array inside VoiceSelector.js
const voices = [
  { id: 'XrExE9yKIg1WjnnlVkGX', name: 'Matilda' },
  { id: 'B39o9n11VEQdOhIebqpm', name: 'Natasha' },
  { id: 'IGH6ygtP7uvv4Q0FHddh', name: 'Katie' },
  { id: 'J8E3IZ0bgZbqMSMfIcez', name: 'Henry' },

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
