import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import readData from './readData';
import ActionButton from './ActionButton';
import LanguageButton from './LanguageButton';
import AudioPlayer from './AudioPlayer';
import LanguageSelector from './LanguageSelector';
import styles from './Widget.module.css';


const Widget = () => {
  const [language, setLanguage] = useState('en-US');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);
  const socketRef = useRef(null);
  

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const languageSelectorRef = useRef(null);


  const toggleLanguageSelector = () => {
    setShowLanguageSelector(!showLanguageSelector);
  };

  const handlePlayClick = () => {
    setIsLoading(true);

    if (!socketRef.current || socketRef.current.disconnected) {
      socketRef.current = io('https://safe-cliffs-13661-626ee06bf1b6.herokuapp.com/', { transports: ['websocket'] });

      socketRef.current.on('connect', () => {
        const contentToSend = document.documentElement.innerText;

        fetch('https://safe-cliffs-13661-626ee06bf1b6.herokuapp.com/audio_stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: contentToSend, language }),
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
      socketRef.current.emit('stop_tts');
      socketRef.current.disconnect();
    }
    setIsPlaying(false);
    setIsLoading(false);
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
    const handleAudioEnd = () => setIsPlaying(false);

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

  // Event listener to close language selector if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguageSelector && languageSelectorRef.current && !languageSelectorRef.current.contains(event.target)) {
        setShowLanguageSelector(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageSelector]);  


  return (
    <div className={styles['myWidget-container']}>
      <ActionButton 
        state={isLoading ? 'loading' : isPlaying ? 'stop' : 'play'} 
        onClick={handleActionClick} 
      />
      <LanguageButton onClick={toggleLanguageSelector} />
      {showLanguageSelector && (
        <LanguageSelector
          ref={languageSelectorRef}
          language={language}
          setLanguage={setLanguage}
          isVisible={showLanguageSelector}
        />
      )}
      <AudioPlayer ref={audioRef} />
    </div>
  );
      }  

export default Widget;
