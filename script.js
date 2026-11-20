document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const serviceSelect = document.getElementById('serviceType');
  document.querySelectorAll('.select-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      if (serviceSelect && plan) {
        for (const option of serviceSelect.options) {
          if (option.value === plan) {
            serviceSelect.value = plan;
            break;
          }
        }
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const service = document.getElementById('serviceType').value;
      const message = document.getElementById('projectMessage').value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill in your name, email address, and project details before sending.';
        return;
      }

      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `Thank you, <strong>${escapeHtml(name)}</strong>! Your inquiry for <strong>${escapeHtml(service)}</strong> has been recorded. You can also click <a href="mailto:shongwesibusiso071@icloud.com?subject=${encodeURIComponent('Website Inquiry: ' + service)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}">here to send directly via your email app</a>.`;
      contactForm.reset();
    });
  }
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}