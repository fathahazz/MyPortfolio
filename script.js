            document.getElementById('year').textContent = new Date().getFullYear();

            /* ============ NAVBAR: mobile toggle ============ */
            const burgerBtn = document.getElementById('burgerBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const navbarOuterEl = document.querySelector('.navbar-outer');

            function closeMobileMenu() {
                mobileMenu.classList.remove('show');
                burgerBtn.classList.remove('open');
                burgerBtn.setAttribute('aria-expanded', false);
            }

            function openMobileMenu() {
                mobileMenu.classList.add('show');
                burgerBtn.classList.add('open');
                burgerBtn.setAttribute('aria-expanded', true);
            }

            burgerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = mobileMenu.classList.contains('show');
                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            mobileMenu.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', closeMobileMenu);
            });

            /* klik di mana saja di luar navbar -> tutup menu, tidak perlu pencet silang */
            document.addEventListener('click', (e) => {
                if (mobileMenu.classList.contains('show') && !navbarOuterEl.contains(e.target)) {
                    closeMobileMenu();
                }
            });

            /* scroll juga menutup menu supaya tidak mengganggu */
            window.addEventListener('scroll', () => {
                if (mobileMenu.classList.contains('show')) closeMobileMenu();
            });

            /* ============ NAVBAR: active link on scroll ============ */
            const sections = ['tentang', 'layanan', 'proyek', 'kontak'].map(id => document.getElementById(id));
            const navAnchors = document.querySelectorAll('.nav-links a[data-section], .mobile-menu a[data-section]');
            const heroEl = document.getElementById('hero');

            function setActive(id) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.dataset.section === id);
                });
            }

            function getNavbarHeight() {
                const navOuter = document.querySelector('.navbar-outer');
                return navOuter ? navOuter.getBoundingClientRect().height : 118;
            }

            function updateActiveOnScroll() {
                const probeY = getNavbarHeight() + 12; // titik tepat di bawah navbar
                let current = null;

                // hero dianggap aktif (artinya: tidak ada nav item aktif) kalau probeY masih di dalam hero
                if (heroEl.getBoundingClientRect().bottom > probeY) {
                    setActive(null);
                    return;
                }

                sections.forEach(sec => {
                    if (!sec) return;
                    const rect = sec.getBoundingClientRect();
                    if (rect.top <= probeY && rect.bottom > probeY) {
                        current = sec.id;
                    }
                });

                // fallback: kalau sudah lewat section terakhir (mendekati footer), tetap aktifkan yang terakhir terlihat
                if (!current) {
                    for (let i = sections.length - 1; i >= 0; i--) {
                        const sec = sections[i];
                        if (sec && sec.getBoundingClientRect().top <= probeY) {
                            current = sec.id;
                            break;
                        }
                    }
                }

                setActive(current);
            }

            let scrollTicking = false;
            window.addEventListener('scroll', () => {
                if (!scrollTicking) {
                    requestAnimationFrame(() => {
                        updateActiveOnScroll();
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            });
            window.addEventListener('resize', updateActiveOnScroll);
            updateActiveOnScroll();

            /* ============ BACK TO TOP ============ */
            const backToTopBtn = document.getElementById('backToTop');

            function updateBackToTop() {
                if (window.scrollY > window.innerHeight * 0.6) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }
            window.addEventListener('scroll', () => {
                requestAnimationFrame(updateBackToTop);
            });
            updateBackToTop();

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            /* ============ SCROLL REVEAL ============ */
            const revealEls = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12
            });
            revealEls.forEach(el => revealObserver.observe(el));

            /* ============ HERO: generate floating star particles (naik-turun) ============ */
            const heroStarsContainer = document.getElementById('heroStars');
            const starPositions = [{
                    top: '20%',
                    left: '18%',
                    size: 22,
                    delay: 0
                },
                {
                    top: '62%',
                    left: '10%',
                    size: 16,
                    delay: 0.8
                },
                {
                    top: '30%',
                    left: '85%',
                    size: 18,
                    delay: 1.4
                },
                {
                    top: '70%',
                    left: '90%',
                    size: 14,
                    delay: 0.4
                },
                {
                    top: '45%',
                    left: '50%',
                    size: 12,
                    delay: 1.1
                },
                {
                    top: '15%',
                    left: '55%',
                    size: 14,
                    delay: 0.2
                },
                {
                    top: '80%',
                    left: '45%',
                    size: 16,
                    delay: 1.7
                },
            ];
            starPositions.forEach((s, i) => {
                const star = document.createElement('div');
                star.className = 'sparkle-svg float-anim';
                star.style.top = s.top;
                star.style.left = s.left;
                star.style.animationDelay = s.delay + 's';
                star.innerHTML =
                    `<svg width="${s.size}" height="${s.size}" viewBox="0 0 40 40"><path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" fill="currentColor"/></svg>`;
                heroStarsContainer.appendChild(star);
            });

            /* float up-down keyframes injected once */
            const styleTag = document.createElement('style');
            styleTag.textContent = `
    @keyframes floatUpDown {
        0%   { transform: translateY(0px) rotate(var(--rot, 0deg)); }
        50%  { transform: translateY(-16px) rotate(var(--rot, 0deg)); }
        100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
    }
    .float-anim { animation: floatUpDown 4.5s ease-in-out infinite; }
    .hero-float.float-1 { --rot: -9deg; }
    .hero-float.float-2 { --rot: 7deg; }
    .hero-float.float-3 { --rot: 6deg; }
    .hero-float.float-4 { --rot: -7deg; }
    `;
            document.head.appendChild(styleTag);

            /* ============ TENTANG: sparkles follow cursor (within photo area) ============ */
            const photoWrap = document.getElementById('photoWrap');
            const orbitSparkles = document.querySelectorAll('.sparkle-orbit');

            function handleOrbitMove(clientX, clientY) {
                const rect = photoWrap.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (clientX - cx) / (rect.width / 2);
                const dy = (clientY - cy) / (rect.height / 2);

                orbitSparkles.forEach(el => {
                    const amt = parseFloat(el.dataset.amt) || 16;
                    const moveX = Math.max(-1, Math.min(1, dx)) * amt;
                    const moveY = Math.max(-1, Math.min(1, dy)) * amt;
                    el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
                });
            }
            window.addEventListener('mousemove', (e) => handleOrbitMove(e.clientX, e.clientY));

            /* ============ KONTAK: sparkles follow cursor within panel ============ */
            const kontakPanel = document.getElementById('kontakPanel');
            const kontakSparkles = document.querySelectorAll('.kontak-sparkle');

            kontakPanel.addEventListener('mousemove', (e) => {
                const rect = kontakPanel.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) / (rect.width / 2);
                const dy = (e.clientY - cy) / (rect.height / 2);

                kontakSparkles.forEach(el => {
                    const amt = parseFloat(el.dataset.amt) || 18;
                    const moveX = Math.max(-1, Math.min(1, dx)) * amt;
                    const moveY = Math.max(-1, Math.min(1, dy)) * amt;
                    el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.6}deg)`;
                });
            });
            kontakPanel.addEventListener('mouseleave', () => {
                kontakSparkles.forEach(el => {
                    el.style.transform = 'translate(0,0) rotate(0deg)';
                });
            });

            /* ============ PROYEK: toggle lihat semua / sembunyikan ============ */
            const toggleBtn = document.getElementById('toggleProyek');
            const toggleText = document.getElementById('toggleProyekText');
            const extraProjects = document.querySelectorAll('.project-card.hidden-extra');
            let expanded = false;

            toggleBtn.addEventListener('click', () => {
                expanded = !expanded;
                extraProjects.forEach(card => {
                    card.classList.toggle('hidden-extra', !expanded);
                    if (expanded) card.classList.add('in'); // langsung kelihatan tanpa nunggu observer
                });
                toggleText.textContent = expanded ? 'Sembunyikan proyek' : 'Lihat seluruh proyek';
                toggleBtn.classList.toggle('expanded', expanded);

                if (!expanded) {
                    document.getElementById('proyek').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });