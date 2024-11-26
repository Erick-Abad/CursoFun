document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.navbar-hamburger');
    const menu = document.querySelector('.navbar-menu');
  
    hamburger.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  });
  