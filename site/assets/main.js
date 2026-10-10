// Right Homes: progressive enhancement only. The site works with this file missing.
(function () {
  'use strict';
  var PHONE = '01582 349155';

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Close the mobile menu when a link inside it is used or Escape is pressed.
  var menu = document.querySelector('.nav-mob');
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.removeAttribute('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') menu.removeAttribute('open');
    });
  }

  // Send enquiry forms in place. If anything fails, tell the visitor to call.
  document.querySelectorAll('form[data-enquiry]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var label = button.textContent;

    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.URLSearchParams) return; // fall back to a normal post
      e.preventDefault();
      button.disabled = true;
      button.textContent = 'Sending…';
      status.hidden = true;
      status.classList.remove('is-error');

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.classList.add('is-sent');
          status.textContent = 'Thank you. We have your details and will call you back.';
          status.hidden = false;
          status.focus && status.setAttribute('tabindex', '-1');
          status.focus();
        })
        .catch(function () {
          button.disabled = false;
          button.textContent = label;
          status.classList.add('is-error');
          status.textContent = 'Sorry, that did not send. Please call us on ' + PHONE + '.';
          status.hidden = false;
        });
    });
  });
})();
