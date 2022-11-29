/**
 * Around | Multipurpose Bootstrap Template
 * Copyright 2021 Createx Studio
 * Theme core scripts
 *
 * @author Createx Studio
 * @version 2.4.0
 */
(function () {
  'use strict';

  /**
   * Enable sticky behaviour of navigation bar on page scroll
  */

  var stickyNavbar = function () {
    var navbar = document.querySelector('.navbar-sticky');
    if (navbar == null) return;
    var navbarClass = navbar.classList,
        navbarH = navbar.offsetHeight,
        scrollOffset = 500;

    if (navbarClass.contains('navbar-floating') && navbarClass.contains('navbar-dark')) {
      window.addEventListener('scroll', function (e) {
        if (e.currentTarget.pageYOffset > scrollOffset) {
          navbar.classList.remove('navbar-dark');
          navbar.classList.add('navbar-light', 'navbar-stuck');
        } else {
          navbar.classList.remove('navbar-light', 'navbar-stuck');
          navbar.classList.add('navbar-dark');
        }
      });
    } else if (navbarClass.contains('navbar-floating') && navbarClass.contains('navbar-light')) {
      window.addEventListener('scroll', function (e) {
        if (e.currentTarget.pageYOffset > scrollOffset) {
          navbar.classList.add('navbar-stuck');
        } else {
          navbar.classList.remove('navbar-stuck');
        }
      });
    } else {
      window.addEventListener('scroll', function (e) {
        if (e.currentTarget.pageYOffset > scrollOffset) {
          document.body.style.paddingTop = navbarH + 'px';
          navbar.classList.add('navbar-stuck');
        } else {
          document.body.style.paddingTop = '';
          navbar.classList.remove('navbar-stuck');
        }
      });
    }
  }();

  /**
   * Anchor smooth scrolling
   * @requires https://github.com/cferdinandi/smooth-scroll/
  */

  var smoothScroll = function () {
    var selector = '[data-scroll]',
        fixedHeader = '[data-scroll-header]',
        scroll = new SmoothScroll(selector, {
      speed: 800,
      speedAsDuration: true,
      offset: 40,
      header: fixedHeader,
      updateURL: false
    });
  }();

  /**
   * Animate scroll to top button in/off view
  */

  var scrollTopButton = function () {
    var element = document.querySelector('.btn-scroll-top'),
        scrollOffset = 600;
    if (element == null) return;
    var offsetFromTop = parseInt(scrollOffset, 10);
    window.addEventListener('scroll', function (e) {
      if (e.currentTarget.pageYOffset > offsetFromTop) {
        element.classList.add('show');
      } else {
        element.classList.remove('show');
      }
    });
  }();

  /**
   * Ajaxify MailChimp subscription form
  */

  var subscriptionForm = function () {
    var form = document.querySelectorAll('.subscription-form');
    if (form === null) return;

    var _loop4 = function _loop4(i) {
      var button = form[i].querySelector('button[type="submit"]'),
          buttonText = button.innerHTML,
          input = form[i].querySelector('.form-control'),
          antispam = form[i].querySelector('.subscription-form-antispam'),
          status = form[i].querySelector('.subscription-status');
      form[i].addEventListener('submit', function (e) {
        if (e) e.preventDefault();
        if (antispam.value !== '') return;
        register(this, button, input, buttonText, status);
      });
    };

    for (var i = 0; i < form.length; i++) {
      _loop4(i);
    }

    var register = function register(form, button, input, buttonText, status) {
      button.innerHTML = 'Sending...'; // Get url for MailChimp

      var url = form.action.replace('/post?', '/post-json?'); // Add form data to object

      var data = '&' + input.name + '=' + encodeURIComponent(input.value); // Create and add post script to the DOM

      var script = document.createElement('script');
      script.src = url + '&c=callback' + data;
      document.body.appendChild(script); // Callback function

      var callback = 'callback';

      window[callback] = function (response) {
        // Remove post script from the DOM
        delete window[callback];
        document.body.removeChild(script); // Change button text back to initial

        button.innerHTML = buttonText; // Display content and apply styling to response message conditionally

        if (response.result == 'success') {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          status.classList.remove('status-error');
          status.classList.add('status-success');
          status.innerHTML = response.msg;
          setTimeout(function () {
            input.classList.remove('is-valid');
            status.innerHTML = '';
            status.classList.remove('status-success');
          }, 6000);
        } else {
          input.classList.remove('is-valid');
          input.classList.add('is-invalid');
          status.classList.remove('status-success');
          status.classList.add('status-error');
          status.innerHTML = response.msg.substring(4);
          setTimeout(function () {
            input.classList.remove('is-invalid');
            status.innerHTML = '';
            status.classList.remove('status-error');
          }, 6000);
        }
      };
    };
  }();

  var track = document.getElementById('track');

  var controlBtn = document.getElementById('play-pause');
  
  function playPause() {
      if (track.paused) {
          track.play();
          controlBtn.className = "pause-btn";
      } else { 
          track.pause();
          controlBtn.className = "play-btn";
      }
  }
  
  controlBtn.addEventListener("click", playPause);
  track.addEventListener("ended", function() {
    controlBtn.className = "play";
  });
  
})();
