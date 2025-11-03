// Language toggle functionality
(function() {
    const langToggle = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');

    // URL mapping for language switching
    const urlMappings = {
        '/': { en: '/', ja: '/ja/' },
        '/ja/': { en: '/', ja: '/ja/' },
        '/publications': { en: '/publications', ja: '/ja/publications' },
        '/ja/publications': { en: '/publications', ja: '/ja/publications' },
        '/blog': { en: '/blog', ja: '/ja/blog' },
        '/ja/blog': { en: '/blog', ja: '/ja/blog' }
    };

    // Get current page's language from meta tag or URL
    function getCurrentPageLang() {
        // Check if page has lang meta in front matter
        const htmlLang = document.documentElement.lang;
        if (htmlLang) return htmlLang;

        // Detect from URL
        const path = window.location.pathname;
        if (path.startsWith('/ja/') || path === '/ja') return 'ja';
        return 'en';
    }

    // Get current language from page or localStorage
    let currentLang = getCurrentPageLang();
    localStorage.setItem('language', currentLang);

    // Update UI based on current language
    function updateLanguageUI(lang) {
        currentLangSpan.textContent = lang.toUpperCase();
        document.documentElement.lang = lang;
    }

    // Initialize language display
    updateLanguageUI(currentLang);

    // Get the alternative language URL for current page
    function getAlternativeUrl(currentPath, targetLang) {
        // Normalize path (remove trailing slash for comparison, except for root)
        let normalizedPath = currentPath;
        if (currentPath !== '/' && currentPath.endsWith('/')) {
            normalizedPath = currentPath.slice(0, -1);
        }

        // Check if we have a direct mapping
        if (urlMappings[normalizedPath]) {
            return urlMappings[normalizedPath][targetLang];
        }

        // If no direct mapping, try to construct URL
        if (targetLang === 'ja') {
            // Switch to Japanese version
            if (!normalizedPath.startsWith('/ja')) {
                return '/ja' + normalizedPath;
            }
        } else {
            // Switch to English version
            if (normalizedPath.startsWith('/ja')) {
                const withoutJa = normalizedPath.replace(/^\/ja/, '');
                return withoutJa || '/';
            }
        }

        // Fallback to home page of target language
        return targetLang === 'ja' ? '/ja/' : '/';
    }

    // Toggle between languages
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            const newLang = currentLang === 'en' ? 'ja' : 'en';
            const currentPath = window.location.pathname;
            const newUrl = getAlternativeUrl(currentPath, newLang);

            // Update localStorage
            localStorage.setItem('language', newLang);

            // Navigate to the new URL
            window.location.href = newUrl;
        });
    }
})();
