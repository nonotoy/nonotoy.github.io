// Language toggle functionality
(function() {
    const langToggle = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');

    // Get current language from localStorage or default to 'en'
    let currentLang = localStorage.getItem('language') || 'en';

    // Update UI based on current language
    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        currentLangSpan.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;

        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
    }

    // Initialize language on page load
    updateLanguage(currentLang);

    // Toggle between languages
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'ja' : 'en';
            updateLanguage(newLang);
        });
    }
})();
