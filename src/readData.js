const readData = (sourceBuffer, mediaSource, reader, onEndOfStream, onPlay, onError) => {
    const processChunk = ({ done, value }) => {
      if (done) {
        if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
          mediaSource.endOfStream();
        }
        onEndOfStream();
        return;
      }
  
      if (!sourceBuffer.updating) {
        sourceBuffer.appendBuffer(value);
        onPlay();
      }
  
      // Continue reading the next chunk after the current one has been appended
      sourceBuffer.addEventListener('updateend', () => {
        reader.read().then(processChunk).catch(onError);
      }, { once: true });
    };
  
    // Start the reading process
    reader.read().then(processChunk).catch(onError);
  };
  
export default readData;
