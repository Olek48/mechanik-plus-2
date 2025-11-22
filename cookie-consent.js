/**
 * Cookie Consent Banner
 * Localized cookie consent banner for essential cookies only
 * Supports: cs (Czech), uk (Ukrainian), en (English)
 * 
 * Note: Google Analytics has been removed from this site.
 */

(function() {
  'use strict';

  // Translations for cookie consent (analytics options removed)
  const translations = {
    cs: {
      bannerText: 'Používáme cookies pro zlepšení vašeho zážitku. Tyto cookies jsou nezbytné pro fungování webu.',
      bannerLearnMore: 'Více informací',
      btnAcceptAll: 'Rozumím',
      btnSettings: 'Nastavení',
      settingsTitle: 'Nastavení cookies',
      settingsDesc: 'Níže jsou uvedeny cookies používané na našem webu.',
      essentialTitle: 'Nezbytné cookies',
      essentialDesc: 'Tyto cookies jsou nutné pro správné fungování webu a nelze je zakázat.',
      btnSave: 'Uložit nastavení',
      btnCancel: 'Zrušit',
      footerLink: 'Zásady cookies'
    },
    uk: {
      bannerText: 'Ми використовуємо cookies для покращення вашого досвіду. Ці cookies є необхідними для роботи сайту.',
      bannerLearnMore: 'Детальніше',
      btnAcceptAll: 'Зрозуміло',
      btnSettings: 'Налаштування',
      settingsTitle: 'Налаштування cookies',
      settingsDesc: 'Нижче наведено cookies, які використовуються на нашому сайті.',
      essentialTitle: 'Необхідні cookies',
      essentialDesc: 'Ці cookies необхідні для правильної роботи сайту і не можуть бути вимкнені.',
      btnSave: 'Зберегти налаштування',
      btnCancel: 'Скасувати',
      footerLink: 'Політика cookies'
    },
    en: {
      bannerText: 'We use cookies to improve your experience. These cookies are essential for the website to function.',
      bannerLearnMore: 'Learn more',
      btnAcceptAll: 'Got it',
      btnSettings: 'Settings',
      settingsTitle: 'Cookie Settings',
      settingsDesc: 'Below are the cookies used on our website.',
      essentialTitle: 'Essential Cookies',
      essentialDesc: 'These cookies are necessary for the website to function properly and cannot be disabled.',
      btnSave: 'Save Settings',
      btnCancel: 'Cancel',
      footerLink: 'Cookie Policy'
    }
  };

  // Configuration
  let config = {
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
          <button class="cookie-consent-btn cookie-consent-btn-settings" id="cookie-settings-btn">
            ${t.btnSettings}
          </button>
        </div>
      </div>
    `;

    return banner;
  }

  // Create settings modal HTML (only essential cookies now)
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

  // Accept all cookies (only essential now)
  function acceptAll() {
    const consent = {
      essential: true,
      timestamp: new Date().toISOString()
    };
    
    saveConsent(consent);
    hideBanner();
  }

  // Save settings from modal
  function saveSettings() {
    const consent = {
      essential: true,
      timestamp: new Date().toISOString()
    };
    
    saveConsent(consent);
    hideSettings();
    hideBanner();
  }

  // REMOVED: addFooterLink() function - was adding a duplicate cookie policy link in the footer

  // Initialize cookie consent
  function initCookieConsent(options) {
    // Merge configuration
    if (options) {
      config = Object.assign({}, config, options);
    }

    // Check if consent already exists
    const existingConsent = getConsent();
    
    if (!existingConsent) {
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

    // REMOVED: addFooterLink() call - no longer adding the duplicate footer link
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
      const settingsBtn = banner.querySelector('#cookie-settings-btn');
      
      if (acceptBtn) acceptBtn.textContent = t.btnAcceptAll;
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
      const essentialTitle = modal.querySelector('.cookie-option h3');
      const essentialDesc = modal.querySelector('.cookie-option .cookie-option-desc');
      
      if (essentialTitle) essentialTitle.textContent = t.essentialTitle;
      if (essentialDesc) essentialDesc.textContent = t.essentialDesc;
      
      // Update modal buttons
      const cancelBtn = modal.querySelector('#cookie-settings-cancel');
      const saveBtn = modal.querySelector('#cookie-settings-save');
      
      if (cancelBtn) cancelBtn.textContent = t.btnCancel;
      if (saveBtn) saveBtn.textContent = t.btnSave;
    }
    
    // REMOVED: updateFooterLink() call - no longer updating the removed footer link
  }
  
  // REMOVED: updateFooterLink() function - no longer needed since we removed the dynamic footer link
  
  // Listen for language changes
  window.addEventListener('languageChanged', function() {
    updateBannerLanguage();
  });

  // Expose public API
  window.initCookieConsent = initCookieConsent;
  
  // Helper function to get current consent (for use in other scripts)
  window.getCookieConsent = getConsent;

})();
