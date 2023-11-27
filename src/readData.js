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
      // Additional check to ensure the sourceBuffer is still part of the mediaSource
      if (Array.from(mediaSource.sourceBuffers).includes(sourceBuffer)) {
        sourceBuffer.appendBuffer(value);
        onPlay();
      } else {
        console.error("SourceBuffer has been removed. Stopping data processing.");
        return; // Exit the function to stop processing further chunks
      }
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
