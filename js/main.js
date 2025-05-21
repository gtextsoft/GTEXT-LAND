// GTEXTLAND - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Handle Image Plates Animation
    const imagePlates = document.querySelectorAll('.image-plate');
    
    imagePlates.forEach(plate => {
        plate.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
            
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        plate.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
            
            const overlay = this.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Show the initial slide
        testimonials[0].classList.add('active');
        dots[0].classList.add('active');
        
        function showSlide(n) {
            // Remove active class from all slides and dots
            testimonials.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Wrap around if at the end or beginning
            if (n >= testimonials.length) {
                currentSlide = 0;
            } else if (n < 0) {
                currentSlide = testimonials.length - 1;
            } else {
                currentSlide = n;
            }
            
            // Add active class to current slide and dot
            testimonials[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Event listeners for next/prev buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
            
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        // Auto rotate slides every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    // Create and append background shapes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.classList.contains('hero') && !section.classList.contains('cta')) {
            const bgShapes = document.createElement('div');
            bgShapes.className = 'bg-shapes';
            
            // Add random shapes
            for (let i = 0; i < 3; i++) {
                const shape = document.createElement('div');
                shape.className = `shape shape-${i+1}`;
                
                // Randomly assign colors
                const colorClasses = ['red', 'green-light', 'green-dark'];
                const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
                shape.classList.add(randomColor);
                
                bgShapes.appendChild(shape);
            }
            
            section.appendChild(bgShapes);
        }
    });
    
    // Growth Chart for About Page
    const growthCanvas = document.getElementById('growth-chart');
    if (growthCanvas) {
        const ctx = growthCanvas.getContext('2d');
        
        // Set canvas dimensions with proper scaling for retina displays
        const dpr = window.devicePixelRatio || 1;
        const rect = growthCanvas.getBoundingClientRect();
        
        growthCanvas.width = rect.width * dpr;
        growthCanvas.height = rect.height * dpr;
        growthCanvas.style.width = `${rect.width}px`;
        growthCanvas.style.height = `${rect.height}px`;
        
        ctx.scale(dpr, dpr);
        
        // Define the data points: Year and growth values
        const data = [
            { year: '2006', value: 10 },
            { year: '2007', value: 15 },
            { year: '2008', value: 20 },
            { year: '2009', value: 25 },
            { year: '2010', value: 35 },
            { year: '2011', value: 50 },
            { year: '2012', value: 70 },
            { year: '2013', value: 100 },
            { year: '2014', value: 145 },
            { year: '2015', value: 210 },
            { year: '2016', value: 300 },
            { year: '2017', value: 410 },
            { year: '2018', value: 520 },
            { year: '2019', value: 650 },
            { year: '2020', value: 790 },
            { year: '2021', value: 950 },
            { year: '2022', value: 1120 },
            { year: '2023', value: 1350 },
            { year: '2024', value: 1580 },
            { year: '2025', value: 1850 }
        ];
        
        // Set chart dimensions
        const chartWidth = rect.width - 40;
        const chartHeight = rect.height - 60;
        const marginLeft = 20;
        const marginBottom = 40;
        const marginTop = 20;
        
        // Calculate scales
        const xScale = chartWidth / (data.length - 1);
        const yScale = chartHeight / 1850; // 1850 is the max value
        
        // Draw the axes
        ctx.beginPath();
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        
        // Draw x-axis
        ctx.moveTo(marginLeft, chartHeight + marginTop);
        ctx.lineTo(marginLeft + chartWidth, chartHeight + marginTop);
        ctx.stroke();
        
        // Draw y-axis marks (invisible)
        ctx.textAlign = 'right';
        ctx.fillStyle = '#999';
        ctx.font = '10px Poppins';
        
        // Draw year labels on x-axis (only show every 2-3 years to avoid crowding)
        data.forEach((point, index) => {
            // Only show years divisible by 3 (2006, 2009, 2012, etc.) 
            // except always show the first and last year
            if (index === 0 || index === data.length - 1 || index % 3 === 0) {
                const x = marginLeft + (index * xScale);
                const y = chartHeight + marginTop + 15;
                
                ctx.textAlign = 'center';
                ctx.fillStyle = '#666';
                ctx.font = '10px Poppins';
                ctx.fillText(point.year, x, y);
                
                // Draw small tick mark
                ctx.beginPath();
                ctx.moveTo(x, chartHeight + marginTop);
                ctx.lineTo(x, chartHeight + marginTop + 5);
                ctx.stroke();
            }
        });
        
        // Draw the curve
        ctx.beginPath();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        ctx.moveTo(marginLeft, chartHeight + marginTop - (data[0].value * yScale));
        
        // Create points for the smooth curve
        const points = data.map((point, index) => {
            return {
                x: marginLeft + (index * xScale),
                y: chartHeight + marginTop - (point.value * yScale)
            };
        });
        
        // Draw smooth curve using bezier curves
        for (let i = 0; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        
        // Connect to the last point
        ctx.quadraticCurveTo(
            points[points.length - 2].x, 
            points[points.length - 2].y, 
            points[points.length - 1].x, 
            points[points.length - 1].y
        );
        
        ctx.stroke();
        
        // Draw circles at data points
        data.forEach((point, index) => {
            const x = marginLeft + (index * xScale);
            const y = chartHeight + marginTop - (point.value * yScale);
            
            // Draw outer circle
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw inner circle
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#3498db';
            ctx.fill();
        });
        
        // Add animation
        function animateChart() {
            ctx.clearRect(0, 0, growthCanvas.width, growthCanvas.height);
            
            // Draw axes and labels again
            ctx.beginPath();
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 1;
            ctx.moveTo(marginLeft, chartHeight + marginTop);
            ctx.lineTo(marginLeft + chartWidth, chartHeight + marginTop);
            ctx.stroke();
            
            data.forEach((point, index) => {
                const x = marginLeft + (index * xScale);
                const y = chartHeight + marginTop + 15;
                
                ctx.textAlign = 'center';
                ctx.fillStyle = '#666';
                ctx.font = '10px Poppins';
                ctx.fillText(point.year, x, y);
                
                ctx.beginPath();
                ctx.moveTo(x, chartHeight + marginTop);
                ctx.lineTo(x, chartHeight + marginTop + 5);
                ctx.stroke();
            });
            
            // Animate the curve
            animateLine(0);
        }
        
        let animationProgress = 0;
        const animationDuration = 1500; // 1.5 seconds
        let startTime;
        
        function animateLine(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            // Draw the curve with animation
            ctx.beginPath();
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            
            // Start point
            ctx.moveTo(marginLeft, chartHeight + marginTop - (data[0].value * yScale));
            
            // Calculate how many points to show based on animation progress
            const pointsToShow = Math.floor(progress * data.length);
            
            // Create points for the visible part of the curve
            const visiblePoints = points.slice(0, pointsToShow + 1);
            
            // Draw smooth curve for visible points
            for (let i = 0; i < visiblePoints.length - 1; i++) {
                const xc = (visiblePoints[i].x + visiblePoints[i + 1].x) / 2;
                const yc = (visiblePoints[i].y + visiblePoints[i + 1].y) / 2;
                ctx.quadraticCurveTo(visiblePoints[i].x, visiblePoints[i].y, xc, yc);
            }
            
            // If we have more than one point, connect the last visible curve
            if (visiblePoints.length > 1) {
                const lastIndex = visiblePoints.length - 1;
                if (lastIndex > 0) {
                    ctx.quadraticCurveTo(
                        visiblePoints[lastIndex - 1].x, 
                        visiblePoints[lastIndex - 1].y, 
                        visiblePoints[lastIndex].x, 
                        visiblePoints[lastIndex].y
                    );
                }
            }
            
            ctx.stroke();
            
            // Draw circles at data points
            visiblePoints.forEach((point, index) => {
                const x = point.x;
                const y = point.y;
                
                // Draw outer circle
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw inner circle
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#3498db';
                ctx.fill();
            });
            
            if (progress < 1) {
                requestAnimationFrame(animateLine);
            }
        }
        
        // Start the animation when the chart is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateLine);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(growthCanvas);
    }
    
    // 3D Parallax Effect for cards
    const cards = document.querySelectorAll('.value-card, .portfolio-card, .team-card, .mission, .vision, .estate-logo');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            const rotateX = (0.5 - yPercent) * 10; // -5 to 5 degrees
            const rotateY = (xPercent - 0.5) * 10; // -5 to 5 degrees
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Advanced Animation on scroll with GSAP-like timing
    const animateElements = document.querySelectorAll('.value-card, .portfolio-card, .team-card, .mission, .vision, .section-title, .section-subtitle');
    
    function checkIfInView() {
        animateElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // Stagger effect for elements
                setTimeout(() => {
                    element.classList.add('animate');
                }, index * 100); // 100ms delay between each element
            }
        });
    }
    
    // Add animation class to elements in view on page load
    window.addEventListener('load', checkIfInView);
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Property filtering functionality (for portfolio page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter portfolio items with animations
                portfolioItems.forEach(item => {
                    // First fade out all items
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all') {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 100);
                        } else if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 100);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
    
    // Testimonial slider with fade transitions
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial');
        const totalSlides = slides.length;
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const dots = document.querySelectorAll('.slider-dot');
        
        // Hide all slides except the first one
        for (let i = 0; i < totalSlides; i++) {
            if (i === 0) {
                slides[i].style.opacity = '1';
                slides[i].style.display = 'block';
            } else {
                slides[i].style.opacity = '0';
                slides[i].style.display = 'none';
            }
        }
        
        // Update active dot
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Change slide with fade effect
        function changeSlide(next) {
            slides[currentSlide].style.opacity = '0';
            
            setTimeout(() => {
                slides[currentSlide].style.display = 'none';
                
                if (next) {
                    currentSlide = (currentSlide + 1) % totalSlides;
                } else {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                
                slides[currentSlide].style.display = 'block';
                
                setTimeout(() => {
                    slides[currentSlide].style.opacity = '1';
                }, 50);
                
                updateDots();
            }, 300);
        }
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            changeSlide(true);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            changeSlide(false);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentSlide) {
                    slides[currentSlide].style.opacity = '0';
                    
                    setTimeout(() => {
                        slides[currentSlide].style.display = 'none';
                        currentSlide = index;
                        slides[currentSlide].style.display = 'block';
                        
                        setTimeout(() => {
                            slides[currentSlide].style.opacity = '1';
                        }, 50);
                        
                        updateDots();
                    }, 300);
                }
            });
        });
        
        // Auto slide every 5 seconds
        let sliderInterval = setInterval(() => {
            changeSlide(true);
        }, 5000);
        
        // Pause auto-slide on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                changeSlide(true);
            }, 5000);
        });
    }
    
    // Property Gallery Lightbox with zoom effect
    const galleryImages = document.querySelectorAll('.property-gallery img');
    const lightbox = document.querySelector('.lightbox');
    
    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.close-btn');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
                
                // Zoom-in effect
                lightboxImg.style.transform = 'scale(0.9)';
                lightboxImg.style.opacity = '0';
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    lightboxImg.style.transform = 'scale(1)';
                    lightboxImg.style.opacity = '1';
                }, 50);
            });
        });
        
        closeBtn.addEventListener('click', () => {
            // Zoom-out effect
            lightboxImg.style.transform = 'scale(0.9)';
            lightboxImg.style.opacity = '0';
            
            setTimeout(() => {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                // Zoom-out effect
                lightboxImg.style.transform = 'scale(0.9)';
                lightboxImg.style.opacity = '0';
                
                setTimeout(() => {
                    lightbox.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    }
    
    // Animated counter for statistics (if any)
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // milliseconds
            const increment = target / (duration / 16); // 60fps
            
            let currentCount = 0;
            
            function updateCount() {
                currentCount += increment;
                
                if (currentCount < target) {
                    counter.textContent = Math.ceil(currentCount).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
            
            // Only start counting when element is in view
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Enhanced Back to top button with progress indicator
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    
    // Create SVG for progress indicator
    backToTopBtn.innerHTML = `
        <svg class="progress-circle" width="40" height="40" viewBox="0 0 40 40">
            <circle class="progress-circle-bg" cx="20" cy="20" r="16" fill="none" stroke-width="3"></circle>
            <circle class="progress-circle-path" cx="20" cy="20" r="16" fill="none" stroke-width="3"></circle>
        </svg>
        <i class="fas fa-arrow-up"></i>
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Calculate and update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollProgress = scrollTop / docHeight;
        
        // Update the progress circle
        const circle = document.querySelector('.progress-circle-path');
        const radius = circle.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        
        // Calculate stroke dashoffset
        const offset = circumference * (1 - scrollProgress);
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        
        // Show/hide button based on scroll position
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Scroll to top with smooth animation
    backToTopBtn.addEventListener('click', () => {
        // Smooth scroll to top with easing
        const scrollTop = window.scrollY;
        const duration = 1000; // ms
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutCubic)
            const easing = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, scrollTop * (1 - easing));
            
            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }
        
        requestAnimationFrame(scrollStep);
    });
    
    // Add CSS for enhanced back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease-in-out;
            z-index: 99;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }
        
        .back-to-top i {
            position: absolute;
            z-index: 2;
        }
        
        .progress-circle {
            position: absolute;
            top: 0;
            left: 0;
            transform: rotate(-90deg);
        }
        
        .progress-circle-bg {
            stroke: rgba(255, 255, 255, 0.2);
        }
        
        .progress-circle-path {
            stroke: var(--secondary-color);
            transition: stroke-dashoffset 0.1s linear;
        }
        
        .animate {
            animation: fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes floating {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        /* Add staggered animation delay for card elements */
        .value-card:nth-child(1),
        .portfolio-card:nth-child(1),
        .team-card:nth-child(1) {
            animation-delay: 0.1s;
        }
        
        .value-card:nth-child(2),
        .portfolio-card:nth-child(2),
        .team-card:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .value-card:nth-child(3),
        .portfolio-card:nth-child(3),
        .team-card:nth-child(3) {
            animation-delay: 0.3s;
        }
        
        .value-card:nth-child(4),
        .portfolio-card:nth-child(4),
        .team-card:nth-child(4) {
            animation-delay: 0.4s;
        }
        
        .value-card:nth-child(5),
        .portfolio-card:nth-child(5),
        .team-card:nth-child(5) {
            animation-delay: 0.5s;
        }
        
        .value-card:nth-child(6),
        .portfolio-card:nth-child(6),
        .team-card:nth-child(6) {
            animation-delay: 0.6s;
        }
    `;
    
    document.head.appendChild(style);
    
    // Initialize the scroll progress indicator
    updateScrollProgress();
    
    // Add page transition effects
    const pageLinks = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition for internal links
            if (href && href.indexOf('http') !== 0) {
                e.preventDefault();
                
                // Create transition overlay
                const overlay = document.createElement('div');
                overlay.className = 'page-transition-overlay';
                
                // Add logo to center of transition
                overlay.innerHTML = `<img src="images/GL Logo.png" alt="GTEXTLAND Logo" class="transition-logo">`;
                
                document.body.appendChild(overlay);
                
                // Trigger transition animation
                setTimeout(() => {
                    overlay.classList.add('active');
                }, 10);
                
                // Navigate to new page after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });
    
    // Add transition effect CSS
    const transitionStyle = document.createElement('style');
    transitionStyle.textContent = `
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--primary-red), var(--dark-green));
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .page-transition-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .transition-logo {
            max-width: 150px;
            animation: pulsate 0.8s infinite alternate;
        }
        
        @keyframes pulsate {
            from {
                transform: scale(0.9);
                opacity: 0.8;
            }
            to {
                transform: scale(1.05);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(transitionStyle);
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
}); 