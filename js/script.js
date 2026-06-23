document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Scroll-reveal: fade + rise elements into view, with a small stagger
  // for siblings inside the same container.
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var groups = {};
    revealEls.forEach(function (el, idx) {
      var key = el.parentElement;
      if (!groups[idx]) {}
    });
    // Stagger siblings sharing the same parent
    var parentMap = new Map();
    revealEls.forEach(function (el) {
      var p = el.parentElement;
      if (!parentMap.has(p)) parentMap.set(p, []);
      parentMap.get(p).push(el);
    });
    parentMap.forEach(function (group) {
      group.forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.4) + 's');
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Contact form: graceful client-side fallback (mailto) until a form
  // backend (e.g. Formspree / Web3Forms) endpoint is added in contact.html
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (form.getAttribute('action') && form.getAttribute('action').indexOf('FORM_ENDPOINT') === -1) {
        return; // a real backend has been configured, let it submit normally
      }
      e.preventDefault();
      var name = encodeURIComponent(form.name.value || '');
      var phone = encodeURIComponent(form.phone.value || '');
      var subject = encodeURIComponent(form.subject.value || 'Legal Consultation Enquiry');
      var message = encodeURIComponent(form.message.value || '');
      var body = 'Name: ' + name + '%0APhone: ' + phone + '%0A%0A' + message;
      window.location.href = 'mailto:advocatetejveer@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
});
