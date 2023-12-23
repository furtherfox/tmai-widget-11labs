import React, { useState, useEffect, useRef, useMemo } from 'react';
import io from 'socket.io-client';
import readData from './readData';
import ActionButton from './ActionButton';
import LanguageButton from './LanguageButton';
import AudioPlayer from './AudioPlayer';
import LanguageSelector from './LanguageSelector';
import VoiceSelector from './VoiceSelector';
import styles from './Widget.module.css';

const Widget = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const token = document.getElementById('widget-root').getAttribute('data-token');
  const defaultLanguage = document.getElementById('widget-root').getAttribute('data-default-language');
  const defaultVoice = document.getElementById('widget-root').getAttribute('data-default-voice');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceId, setVoiceId] = useState(localStorage.getItem('voiceId') || defaultVoice || 'XrExE9yKIg1WjnnlVkGX');
  const [language, setLanguage] = useState(localStorage.getItem('language') || defaultLanguage || 'English');
  const audioRef = useRef(null);
  const socketRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const voiceSelectorRef = useRef(null); // Ref for the voice selector
  
  // Memoize buttonTexts
  const buttonTexts = useMemo(() => ({
    English: { play: 'Tell me about it', stop: 'Stop' },
    Spanish: { play: 'Cuéntame sobre esto', stop: 'Detener' },
    French: { play: 'Raconte-moi à propos de cela', stop: 'Arrêter' },
    German: { play: 'Erzähl mir darüber', stop: 'Stopp' },
    Polish: { play: 'Opowiedz mi o tym', stop: 'Zatrzymaj' },
    Italian: { play: 'Raccontami di questo', stop: 'Fermare' },
    Portuguese: { play: 'Conta-me sobre isso', stop: 'Parar' },
    Hindi: { play: 'इसके बारे में मुझे बताओ', stop: 'रोकें' },
    Arabic: { play: 'أخبرني عن هذا', stop: 'توقف' }
  }), []);  

  // Modify the setLanguage function to also update the actionButtonText
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Update setVoiceId to save to localStorage
  const handleVoiceChange = (newVoiceId) => {
    setVoiceId(newVoiceId);
    localStorage.setItem('voiceId', newVoiceId); // Save to localStorage
  };

  const toggleLanguageSelector = () => {
    setShowLanguageSelector(!showLanguageSelector);
  };
  
  
  const handlePlayClick = () => {
    // Reset audio player for a new stream
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = '';
  }
  setIsLoading(true);

  if (!socketRef.current || socketRef.current.disconnected) {
    socketRef.current = io('https://tmai-server-11labs.herokuapp.com/', { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      const contentToSend = document.documentElement.innerText;

      fetch('https://tmai-server-11labs.herokuapp.com/generate_audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the JWT token in the request header
        },
        body: JSON.stringify({ 
          content: contentToSend, 
          language, 
          voiceId, 
        }), 
      })
      .then(response => {
        const mediaSource = new MediaSource();
        audioRef.current.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', () => {
          const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
          const reader = response.body.getReader();

          readData(
            sourceBuffer, 
            mediaSource, 
            reader, 
            () => setIsLoading(false), // onEndOfStream
            () => {                   // onPlay
              if (!isPlaying) {
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                  setIsLoading(false);
                }).catch(err => {
                  console.error('Error playing audio:', err);
                });
              }
            },
            (err) => {               // onError
              console.error('Error fetching audio:', err);
              setIsLoading(false);
            }
          );
        });
      })
      .catch(err => {
        console.error('Error fetching audio:', err);
        setIsLoading(false);
      });
    });
  }
};
  



const handleStopClick = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = '';
  }
  if (socketRef.current && socketRef.current.connected) {
    socketRef.current.emit('stop_tts'); // Emit "stop_tts" event to the server
    socketRef.current.disconnect();
  }
  setIsPlaying(false);
  setIsLoading(false);

  // Remove the SourceBuffer from the MediaSource and close the MediaSource
  if (audioRef.current && audioRef.current.srcObject) {
    const mediaSource = audioRef.current.srcObject;
    const sourceBuffer = mediaSource.sourceBuffers[0];
    if (sourceBuffer) {
      sourceBuffer.abort(); // Abort the SourceBuffer
      mediaSource.removeSourceBuffer(sourceBuffer);
    }
    mediaSource.endOfStream(); // End the MediaSource
  }
};

const handleActionClick = () => {
  if (isLoading) return; // Prevent action when loading
  isPlaying ? handleStopClick() : handlePlayClick();
};

useEffect(() => {
  return () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };
}, []);

useEffect(() => {
  const audioElement = audioRef.current;

  // Updated handleAudioEnd function
  const handleAudioEnd = () => {
    setIsPlaying(false);
    setIsLoading(false);

    // Reset the audio player
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
    }

    // Disconnect the socket
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.disconnect();
    }
  };

  if (audioElement) {
    audioElement.addEventListener('ended', handleAudioEnd);
  }

  return () => {
    if (audioElement) {
      audioElement.removeEventListener('ended', handleAudioEnd);
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };
}, []);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (showLanguageSelector && 
        languageSelectorRef.current && 
        !languageSelectorRef.current.contains(event.target) &&
        voiceSelectorRef.current && 
        !voiceSelectorRef.current.contains(event.target)) {
      setShowLanguageSelector(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showLanguageSelector]);

// Get the current language's texts
const currentTexts = buttonTexts[language];

  return (
    <div className={styles['myWidget-container']}>
      <ActionButton
        state={isLoading ? 'loading' : isPlaying ? 'stop' : 'play'}
        onClick={handleActionClick}
        playText={currentTexts.play}
        stopText={currentTexts.stop}
      />
      <LanguageButton
        onClick={toggleLanguageSelector}
        className={styles['myWidget-languageButton']}
      />
      {showLanguageSelector && (
        <>
          <VoiceSelector
            ref={voiceSelectorRef}
            voiceId={voiceId}
            setVoiceId={handleVoiceChange}
            isVisible={showLanguageSelector}
          />
          <LanguageSelector
            ref={languageSelectorRef}
            language={language}
            setLanguage={handleLanguageChange}
            isVisible={showLanguageSelector}
          />
        </>
      )}
      <AudioPlayer ref={audioRef} controls />
    </div>
  );  
}

export default Widget;
