/**
 * Cookie Consent Banner
 * Localized cookie consent banner with analytics integration
 * Supports: cs (Czech), uk (Ukrainian), en (English)
 */

(function() {
  'use strict';

  // Translations for cookie consent
  const translations = {
    cs: {
      bannerText: 'Používáme cookies pro zlepšení vašeho zážitku. Některé cookies jsou nezbytné pro fungování webu, zatímco jiné nám pomáhají analyzovat návštěvnost.',
      bannerLearnMore: 'Více informací',
      btnAcceptAll: 'Přijmout vše',
      btnRejectAll: 'Odmítnout vše',
      btnSettings: 'Nastavení',
      settingsTitle: 'Nastavení cookies',
      settingsDesc: 'Vyberte, které cookies chcete povolit. Nezbytné cookies nelze zakázat.',
      essentialTitle: 'Nezbytné cookies',
      essentialDesc: 'Tyto cookies jsou nutné pro správné fungování webu a nelze je zakázat.',
      analyticsTitle: 'Analytické cookies',
      analyticsDesc: 'Tyto cookies nám pomáhají pochopit, jak návštěvníci používají náš web. Pomáhají nám zlepšovat naše služby.',
      btnSave: 'Uložit nastavení',
      btnCancel: 'Zrušit',
      footerLink: 'Zásady cookies'
    },
    uk: {
      bannerText: 'Ми використовуємо cookies для покращення вашого досвіду. Деякі cookies є необхідними для роботи сайту, а інші допомагають нам аналізувати відвідуваність.',
      bannerLearnMore: 'Детальніше',
      btnAcceptAll: 'Прийняти все',
      btnRejectAll: 'Відхилити все',
      btnSettings: 'Налаштування',
      settingsTitle: 'Налаштування cookies',
      settingsDesc: 'Оберіть, які cookies ви хочете дозволити. Необхідні cookies не можна вимкнути.',
      essentialTitle: 'Необхідні cookies',
      essentialDesc: 'Ці cookies необхідні для правильної роботи сайту і не можуть бути вимкнені.',
      analyticsTitle: 'Аналітичні cookies',
      analyticsDesc: 'Ці cookies допомагають нам зрозуміти, як відвідувачі використовують наш сайт. Вони допомагають нам покращувати наші послуги.',
      btnSave: 'Зберегти налаштування',
      btnCancel: 'Скасувати',
      footerLink: 'Політика cookies'
    },
    en: {
      bannerText: 'We use cookies to improve your experience. Some cookies are essential for the website to function, while others help us analyze traffic.',
      bannerLearnMore: 'Learn more',
      btnAcceptAll: 'Accept All',
      btnRejectAll: 'Reject All',
      btnSettings: 'Settings',
      settingsTitle: 'Cookie Settings',
      settingsDesc: 'Choose which cookies you want to allow. Essential cookies cannot be disabled.',
      essentialTitle: 'Essential Cookies',
      essentialDesc: 'These cookies are necessary for the website to function properly and cannot be disabled.',
      analyticsTitle: 'Analytics Cookies',
      analyticsDesc: 'These cookies help us understand how visitors use our website. They help us improve our services.',
      btnSave: 'Save Settings',
      btnCancel: 'Cancel',
      footerLink: 'Cookie Policy'
    }
  };

  // Configuration
  let config = {
    gaId: '',
    policyUrls: {
      cs: 'cookies-cs.html',
      uk: 'cookies-uk.html',
      en: 'cookies-en.html'
    }
  };

  // Get current language from localStorage or document
  function getCurrentLanguage() {
    const storedLang = localStorage.getItem('siteLang');
    if (storedLang && translations[storedLang]) {
      return storedLang;
    }
    
    const docLang = document.documentElement.lang;
    if (docLang && translations[docLang]) {
      return docLang;
    }
    
    return 'cs'; // Default to Czech
  }

  // Get consent from localStorage
  function getConsent() {
    try {
      const stored = localStorage.getItem('site_cookie_consent');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading cookie consent:', e);
    }
    return null;
  }

  // Save consent to localStorage
  function saveConsent(consent) {
    try {
      localStorage.setItem('site_cookie_consent', JSON.stringify(consent));
      
      // Dispatch custom event
      const event = new CustomEvent('cookieConsentChanged', {
        detail: consent
      });
      window.dispatchEvent(event);
      
      return true;
    } catch (e) {
      console.error('Error saving cookie consent:', e);
      return false;
    }
  }

  // Load Google Analytics
  function loadGoogleAnalytics(gaId) {
    if (!gaId || gaId.trim() === '') {
      console.log('Google Analytics ID not provided, skipping GA initialization');
      return;
    }

    // Check if GA is already loaded
    if (window.gtag) {
      console.log('Google Analytics already loaded');
      return;
    }

    // Create and load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', gaId, {
      'anonymize_ip': true
    });

    console.log('Google Analytics loaded with ID:', gaId);
  }

  // Apply consent (load analytics if consented)
  function applyConsent(consent) {
    if (consent && consent.analytics === true) {
      loadGoogleAnalytics(config.gaId);
    }
  }

  // Create banner HTML
  function createBanner() {
    const lang = getCurrentLanguage();
    const t = translations[lang];
    const policyUrl = config.policyUrls[lang] || config.policyUrls.cs;

    const banner = document.createElement('div');
    banner.className = 'cookie-consent-banner';
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          ${t.bannerText}
          <a href="${policyUrl}" target="_blank">${t.bannerLearnMore}</a>
        </div>
        <div class="cookie-consent-buttons">
          <button class="cookie-consent-btn cookie-consent-btn-accept" id="cookie-accept-all">
            ${t.btnAcceptAll}
          </button>
          <button class="cookie-consent-btn cookie-consent-btn-reject" id="cookie-reject-all">
            ${t.btnRejectAll}
          </button>
          <button class="cookie-consent-btn cookie-consent-btn-settings" id="cookie-settings-btn">
            ${t.btnSettings}
          </button>
        </div>
      </div>
    `;

    return banner;
  }

  // Create settings modal HTML
  function createSettingsModal() {
    const lang = getCurrentLanguage();
    const t = translations[lang];

    const modal = document.createElement('div');
    modal.className = 'cookie-settings-modal';
    modal.id = 'cookie-settings-modal';
    modal.innerHTML = `
      <div class="cookie-settings-content">
        <button class="cookie-settings-close" id="cookie-settings-close">&times;</button>
        <div class="cookie-settings-header">
          <h2>${t.settingsTitle}</h2>
          <p>${t.settingsDesc}</p>
        </div>
        <div class="cookie-settings-options">
          <div class="cookie-option">
            <div class="cookie-option-header">
              <h3>${t.essentialTitle}</h3>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookie-essential" checked disabled>
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <p class="cookie-option-desc">${t.essentialDesc}</p>
          </div>
          <div class="cookie-option">
            <div class="cookie-option-header">
              <h3>${t.analyticsTitle}</h3>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookie-analytics">
                <span class="cookie-toggle-slider"></span>
              </label>
            </div>
            <p class="cookie-option-desc">${t.analyticsDesc}</p>
          </div>
        </div>
        <div class="cookie-settings-actions">
          <button class="cookie-settings-btn cookie-settings-btn-cancel" id="cookie-settings-cancel">
            ${t.btnCancel}
          </button>
          <button class="cookie-settings-btn cookie-settings-btn-save" id="cookie-settings-save">
            ${t.btnSave}
          </button>
        </div>
      </div>
    `;

    return modal;
  }

  // Show banner
  function showBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.add('show');
    }
  }

  // Hide banner
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('show');
    }
  }

  // Show settings modal
  function showSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
      // Load current consent into checkboxes
      const consent = getConsent();
      const analyticsCheckbox = modal.querySelector('#cookie-analytics');
      if (analyticsCheckbox) {
        analyticsCheckbox.checked = consent ? consent.analytics : false;
      }
      
      modal.classList.add('show');
    }
  }

  // Hide settings modal
  function hideSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
      modal.classList.remove('show');
    }
  }

  // Accept all cookies
  function acceptAll() {
    const consent = {
      essential: true,
      analytics: true,
      timestamp: new Date().toISOString()
    };
    
    saveConsent(consent);
    applyConsent(consent);
    hideBanner();
  }

  // Reject all cookies (except essential)
  function rejectAll() {
    const consent = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    };
    
    saveConsent(consent);
    hideBanner();
  }

  // Save settings from modal
  function saveSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    const analyticsCheckbox = modal.querySelector('#cookie-analytics');
    
    const consent = {
      essential: true,
      analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
      timestamp: new Date().toISOString()
    };
    
    saveConsent(consent);
    applyConsent(consent);
    hideSettings();
    hideBanner();
  }

  // Add footer link to cookie policy
  function addFooterLink() {
    const footer = document.querySelector('.footer-content');
    if (!footer) return;

    const lang = getCurrentLanguage();
    const t = translations[lang];
    const policyUrl = config.policyUrls[lang] || config.policyUrls.cs;

    // Check if link already exists
    if (document.querySelector('.footer-cookie-policy')) {
      return;
    }

    const linkDiv = document.createElement('div');
    linkDiv.className = 'footer-cookie-policy';
    linkDiv.innerHTML = `<a href="${policyUrl}">${t.footerLink}</a>`;
    
    footer.appendChild(linkDiv);
  }

  // Initialize cookie consent
  function initCookieConsent(options) {
    // Merge configuration
    if (options) {
      config = Object.assign({}, config, options);
    }

    // Check if consent already exists
    const existingConsent = getConsent();
    
    if (existingConsent) {
      // Consent already given, apply it
      applyConsent(existingConsent);
    } else {
      // No consent yet, show banner
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          setupBannerAndModal();
        });
      } else {
        setupBannerAndModal();
      }
    }

    // Add footer link
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addFooterLink);
    } else {
      addFooterLink();
    }
  }

  // Setup banner and modal
  function setupBannerAndModal() {
    // Create and append banner
    const banner = createBanner();
    document.body.appendChild(banner);

    // Create and append settings modal
    const modal = createSettingsModal();
    document.body.appendChild(modal);

    // Show banner
    showBanner();

    // Attach event listeners
    document.getElementById('cookie-accept-all').addEventListener('click', acceptAll);
    document.getElementById('cookie-reject-all').addEventListener('click', rejectAll);
    document.getElementById('cookie-settings-btn').addEventListener('click', showSettings);
    
    document.getElementById('cookie-settings-close').addEventListener('click', hideSettings);
    document.getElementById('cookie-settings-cancel').addEventListener('click', hideSettings);
    document.getElementById('cookie-settings-save').addEventListener('click', saveSettings);

    // Close modal when clicking outside
    const settingsModal = document.getElementById('cookie-settings-modal');
    settingsModal.addEventListener('click', function(e) {
      if (e.target === settingsModal) {
        hideSettings();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        hideSettings();
      }
    });
  }

  // Update banner and modal text when language changes
  function updateBannerLanguage() {
    const banner = document.getElementById('cookie-consent-banner');
    const modal = document.getElementById('cookie-settings-modal');
    
    if (banner) {
      const lang = getCurrentLanguage();
      const t = translations[lang];
      const policyUrl = config.policyUrls[lang] || config.policyUrls.cs;
      
      // Update banner text
      const bannerTextEl = banner.querySelector('.cookie-consent-text');
      if (bannerTextEl) {
        bannerTextEl.innerHTML = `
          ${t.bannerText}
          <a href="${policyUrl}" target="_blank">${t.bannerLearnMore}</a>
        `;
      }
      
      // Update banner buttons
      const acceptBtn = banner.querySelector('#cookie-accept-all');
      const rejectBtn = banner.querySelector('#cookie-reject-all');
      const settingsBtn = banner.querySelector('#cookie-settings-btn');
      
      if (acceptBtn) acceptBtn.textContent = t.btnAcceptAll;
      if (rejectBtn) rejectBtn.textContent = t.btnRejectAll;
      if (settingsBtn) settingsBtn.textContent = t.btnSettings;
    }
    
    if (modal) {
      const lang = getCurrentLanguage();
      const t = translations[lang];
      
      // Update modal title and description
      const modalTitle = modal.querySelector('.cookie-settings-header h2');
      const modalDesc = modal.querySelector('.cookie-settings-header p');
      if (modalTitle) modalTitle.textContent = t.settingsTitle;
      if (modalDesc) modalDesc.textContent = t.settingsDesc;
      
      // Update cookie option titles and descriptions
      const essentialTitle = modal.querySelector('.cookie-option:nth-child(1) h3');
      const essentialDesc = modal.querySelector('.cookie-option:nth-child(1) .cookie-option-desc');
      const analyticsTitle = modal.querySelector('.cookie-option:nth-child(2) h3');
      const analyticsDesc = modal.querySelector('.cookie-option:nth-child(2) .cookie-option-desc');
      
      if (essentialTitle) essentialTitle.textContent = t.essentialTitle;
      if (essentialDesc) essentialDesc.textContent = t.essentialDesc;
      if (analyticsTitle) analyticsTitle.textContent = t.analyticsTitle;
      if (analyticsDesc) analyticsDesc.textContent = t.analyticsDesc;
      
      // Update modal buttons
      const cancelBtn = modal.querySelector('#cookie-settings-cancel');
      const saveBtn = modal.querySelector('#cookie-settings-save');
      
      if (cancelBtn) cancelBtn.textContent = t.btnCancel;
      if (saveBtn) saveBtn.textContent = t.btnSave;
    }
    
    // Update footer link
    updateFooterLink();
  }
  
  // Update footer link when language changes
  function updateFooterLink() {
    const existingLink = document.querySelector('.footer-cookie-policy');
    if (existingLink) {
      const lang = getCurrentLanguage();
      const t = translations[lang];
      const policyUrl = config.policyUrls[lang] || config.policyUrls.cs;
      
      existingLink.innerHTML = `<a href="${policyUrl}">${t.footerLink}</a>`;
    }
  }
  
  // Listen for language changes
  window.addEventListener('languageChanged', function() {
    updateBannerLanguage();
  });

  // Expose public API
  window.initCookieConsent = initCookieConsent;
  
  // Helper function to get current consent (for use in other scripts)
  window.getCookieConsent = getConsent;

})();
