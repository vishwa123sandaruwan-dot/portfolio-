document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 8, 22, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.zIndex = '1000';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // Initialize Vanilla Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".service-card"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
        });
    }

    // Three.js Hero Animation
    const initHeroThree = () => {
        const container = document.getElementById('hero-canvas-container');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(5000 * 3);

        for(let i=0; i < 5000 * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.005,
            color: '#915EFF'
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    };

    // Three.js Contact Animation (Rotating Sphere)
    const initContactThree = () => {
        const container = document.getElementById('contact-canvas');
        if (!container || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshStandardMaterial({
            color: '#915EFF',
            wireframe: true
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.01;
            sphere.rotation.x += 0.01;
            renderer.render(scene, camera);
        };

        animate();
    };

    initHeroThree();
    initContactThree();

    // Contact Form Handling (WhatsApp Redirection)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const message = document.getElementById('contact-message').value;
            const phoneNumber = "94727851367"; // User's WhatsApp Number

            const whatsappMessage = `Hi, I'm ${name}. ${message}`;
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Open WhatsApp in a new tab
            window.open(whatsappURL, '_blank');
            
            // Optional: Reset form after sending
            contactForm.reset();
        });
    }

    // Timeline Scroll Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.2
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});
