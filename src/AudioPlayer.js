import React from 'react';
// Remove the import of 'styles' here
const AudioPlayer = React.forwardRef((props, ref) => (
  <audio ref={ref} hidden playsInline />
));

export default AudioPlayer;
