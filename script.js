/**
 * SnapFind AI — Standalone Client Scripts
 * Pure Vanilla JavaScript • No external dependencies • GitHub Pages Compatible
 */

// ==========================================================================
// Centralized URL & Distribution Configuration
// Edit these URLs in one place to update all buttons across the landing page.
// ==========================================================================
window.SNAPFIND_CONFIG = {
  // Official Android APK download URL (points to GitHub Releases latest)
  androidDownloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_ANDROID_REPOSITORY/releases/latest',

  // Official Web App URL (exact AI Studio companion URL)
  webAppUrl: 'https://ai.studio/apps/79820a43-d6e8-4fb0-bf58-67c532dd6733?fullscreenApplet=true'
};

document.addEventListener('DOMContentLoaded', () => {
  syncConfigLinks();
  initMobileNav();
  initFaqAccordions();
  initInteractiveSearchDemo();
  initSmartSnapsTabs();
  initCopyButtons();
  highlightActiveNavLink();
});

/* --------------------------------------------------------------------------
   0. Link Synchronization
   -------------------------------------------------------------------------- */
function syncConfigLinks() {
  if (!window.SNAPFIND_CONFIG) return;

  const downloadLinks = document.querySelectorAll('[data-sf-link="android-download"]');
  downloadLinks.forEach(el => {
    if (window.SNAPFIND_CONFIG.androidDownloadUrl) {
      el.href = window.SNAPFIND_CONFIG.androidDownloadUrl;
    }
  });

  const webAppLinks = document.querySelectorAll('[data-sf-link="web-app"]');
  webAppLinks.forEach(el => {
    if (window.SNAPFIND_CONFIG.webAppUrl) {
      el.href = window.SNAPFIND_CONFIG.webAppUrl;
    }
  });
}

/* --------------------------------------------------------------------------
   1. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');

  if (!toggleBtn || !drawer) return;

  const toggle = () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', toggle);

  // Close when clicking internal links
  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   2. FAQ Accordion System (with Full Accessibility)
   -------------------------------------------------------------------------- */
function initFaqAccordions() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Toggle this item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Natural Language Search Simulation Demo
   -------------------------------------------------------------------------- */
const SAMPLE_MOCK_DATA = [
  {
    title: 'Chase Wire Confirmation #8492',
    category: 'Banking & Payments',
    categoryClass: 'mockup-tag-payment',
    text: 'Payment sent to Stride Studio Inc. $1,450.00 USD on Sep 14. Transaction ID: 9482-CHASE.',
    matchTags: ['payment', 'wire', 'chase', 'banking', '$1,450', 'usd']
  },
  {
    title: 'Delta Boarding Pass SEA → SFO',
    category: 'Travel',
    categoryClass: 'mockup-tag-code',
    text: 'Flight DL 1284 • Seat 14A • Terminal 2 • Gate B7 • Departs 08:45 AM PDT.',
    matchTags: ['flight', 'delta', 'travel', 'sea', 'sfo', 'boarding pass', 'gate']
  },
  {
    title: 'Python FastAPI Auth Middleware',
    category: 'Work',
    categoryClass: 'mockup-tag-code',
    text: 'async def verify_jwt_token(auth_header: str): decode payload with RS256 algorithm.',
    matchTags: ['python', 'code', 'fastapi', 'jwt', 'auth', 'algorithm', 'token']
  },
  {
    title: 'Office Wi-Fi Guest Password QR',
    category: 'Work',
    categoryClass: 'mockup-tag-code',
    text: 'SSID: Studio_Guest_5G • Key: StrideSecure#2026! • QR decoded automatically.',
    matchTags: ['wifi', 'wi-fi', 'password', 'qr', 'ssid', 'network']
  },
  {
    title: 'Confidential Seed Phrase / Vault Record',
    category: 'Private & Sensitive',
    categoryClass: 'mockup-tag-vault',
    text: '[PROTECTED IN VAULT] Encrypted visual memory. Pin/Biometric authorization required.',
    matchTags: ['seed', 'phrase', 'vault', 'private', 'sensitive', 'secret', 'password']
  },
  {
    title: 'Amazon Invoice - Noise Cancelling Headphones',
    category: 'Receipts & Shopping',
    categoryClass: 'mockup-tag-payment',
    text: 'Order #114-829104-3918 • Total $279.00 USD • Delivered Sep 20.',
    matchTags: ['amazon', 'receipt', 'shopping', 'invoice', 'headphones', '$279', 'order']
  }
];

function initInteractiveSearchDemo() {
  const input = document.getElementById('demoSearchInput');
  const resultsContainer = document.getElementById('demoResultsContainer');
  const queryChips = document.querySelectorAll('.query-chip');

  if (!input || !resultsContainer) return;

  function renderResults(query) {
    const q = (query || '').trim().toLowerCase();

    const filtered = SAMPLE_MOCK_DATA.filter(item => {
      if (!q) return true;
      const titleMatch = item.title.toLowerCase().includes(q);
      const textMatch = item.text.toLowerCase().includes(q);
      const tagMatch = item.matchTags.some(t => t.toLowerCase().includes(q) || q.includes(t));
      return titleMatch || textMatch || tagMatch;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: var(--sf-text-muted);">
          <svg style="margin: 0 auto 12px auto; color: var(--sf-text-muted);" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <p style="font-size: 0.95rem; color: var(--sf-text);">No matching screenshot found for "${escapeHtml(query)}"</p>
          <p style="font-size: 0.8rem; margin-top: 4px;">SnapFind AI indexes OCR text, context, and metadata to retrieve images accurately.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(item => {
      let snippet = escapeHtml(item.text);
      if (q && q.length > 2) {
        const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
        snippet = snippet.replace(regex, '<mark>$1</mark>');
      }

      return `
        <article class="result-card">
          <div class="result-header">
            <span class="mockup-tag ${item.categoryClass}">${escapeHtml(item.category)}</span>
            <span style="font-size: 0.7rem; color: var(--sf-ai); font-weight: 600;">Indexed &bull; OCR Match</span>
          </div>
          <h4 style="font-size: 0.95rem; color: var(--sf-text); font-weight: 600;">${escapeHtml(item.title)}</h4>
          <p class="result-snippet">${snippet}</p>
        </article>
      `;
    }).join('');
  }

  // Initial render
  renderResults('');

  // Handle typing with debounce
  let timeout;
  input.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      renderResults(e.target.value);
    }, 150);
  });

  // Handle preset chips
  queryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      queryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-query') || chip.textContent.trim();
      input.value = val;
      renderResults(val);
    });
  });
}

/* --------------------------------------------------------------------------
   4. Smart Snaps Filter Tabs
   -------------------------------------------------------------------------- */
function initSmartSnapsTabs() {
  const tabs = document.querySelectorAll('.snap-filter-tab');
  const cards = document.querySelectorAll('.snap-category-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Copy Helper Buttons
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy') || '';
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--sf-ai)';
        btn.style.borderColor = 'var(--sf-ai)';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Active Nav Link Highlighter
   -------------------------------------------------------------------------- */
function highlightActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* Helper Utilities */
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
