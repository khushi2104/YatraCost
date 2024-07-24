// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Language.css'
const LanguageSwitcher = ({ onClose }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('mr')}>Marathi</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
