import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="language-switcher">
      <button className="language-switcher-button">
        <Globe size={18} />
        <span className="language-switcher-label">{currentLanguage.flag} {currentLanguage.name}</span>
        <svg className="language-switcher-arrow" width="12" height="12" viewBox="0 0 12 12">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>
      <div className="language-switcher-dropdown">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-switcher-item ${i18n.language === language.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
            {i18n.language === language.code && (
              <svg className="language-check" width="16" height="16" viewBox="0 0 16 16">
                <path d="M13 4L6 11 3 8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
