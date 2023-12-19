const toggleBtn = document.getElementById('toggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');

    toggleBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');

      // Cambiar el ícono de hamburguesa a la "x" y viceversa
      if (mobileMenu.classList.contains('hidden')) {
        hamburgerIcon.classList.remove('fa-xmark');
        hamburgerIcon.classList.add('fa-bars');
      } else {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-xmark');
      }
    });