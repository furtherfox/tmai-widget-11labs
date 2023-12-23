import React from 'react';

const AudioPlayer = React.forwardRef((props, ref) => (
  <audio ref={ref} hidden playsInline controls={props.controls} />
));

export default AudioPlayer;
