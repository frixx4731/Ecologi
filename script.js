document.addEventListener('DOMContentLoaded', () => {
    // Carrusel
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto avanzar cada 5 segundos
    setInterval(nextSlide, 5000);

    // Menú mobile
    const header = document.getElementById('header');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
        navLinks.classList.toggle('active');
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Validación de formulario
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');

        let isValid = true;

        // Validar nombre
        if (nombre.value.trim().length < 3) {
            isValid = false;
            showError(nombre, 'El nombre debe tener al menos 3 caracteres');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
            showError(email, 'Ingrese un correo válido');
        }

        // Validar mensaje
        if (mensaje.value.trim().length < 20) {
            isValid = false;
            showError(mensaje, 'El mensaje debe tener al menos 20 caracteres');
        }

        if (isValid) {
            contactForm.reset();
            alert('Mensaje enviado correctamente');
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('span');
        error.className = 'error-message';
        error.style.color = 'red';
        error.textContent = message;
        formGroup.appendChild(error);
        
        setTimeout(() => error.remove(), 3000);
    }

    // Actualizar año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});