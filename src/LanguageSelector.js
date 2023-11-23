import React from 'react';
import styles from './Widget.module.css';

// Use React.forwardRef to pass the ref to the select element
const LanguageSelector = React.forwardRef(({ language, setLanguage, isVisible }, ref) => (
  <select
    ref={ref} // Attach the ref to the select element
    className={`${styles['myWidget-language-selector']} ${isVisible ? styles.visible : ''}`}
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="en-US">English</option>
    <option value="es-ES">Spanish</option>
    <option value="fr-FR">French</option>
    <option value="de-DE">German</option>
    <option value="pl-PL">Polish</option>
    <option value="it-IT">Italian</option>
    <option value="pt-PT">Portuguese</option>
    <option value="hi-IN">Hindi</option>
    <option value="ar-AR">Arabic</option>
  </select>
));

export default LanguageSelector;

