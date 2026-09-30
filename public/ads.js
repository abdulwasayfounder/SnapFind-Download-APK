/**
 * SnapFind AI — Website Advertising Integration Module (ads.js)
 *
 * PRIVACY & COMPLIANCE:
 * - This website landing page runs strictly on static HTML/CSS/JS.
 * - Website advertising scripts are completely isolated from user data.
 * - NEVER send screenshot contents, OCR text, or image metadata to ad networks.
 * - NEVER expose sensitive user information or pass image data in page URLs.
 */

(function () {
  'use strict';

  function initAds() {
    // Preserves existing embedded ad scripts (e.g. Adsterra invoke.js containers)
    const slots = document.querySelectorAll('.ad-slot');
    slots.forEach(slot => {
      // If the slot has child elements (such as user-inserted ad scripts or iframes), keep it visible
      if (slot.children.length > 0) {
        slot.style.display = 'flex';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }

  window.SnapFindAds = {
    refresh: initAds
  };
})();
