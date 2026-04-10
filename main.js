/**
 * Laser Ink Academy - Scroll & Video Logic
 * Implements Taste-Skill navigation and interactive Video Scrubbing
 */

// ==========================================
// VIDEO SCRUBBING LOGIC
// ==========================================
const video = document.getElementById('hero-video');
const scrollWrapper = document.getElementById('hero-scrub-wrapper');
const heroOverlay = document.querySelector('.hero-overlay');

let scrollPos = 0;
let videoDuration = 0;
let isSeeking = false;
let lastSetTime = 0;

// Update video duration once metadata loads
const initVideo = () => {
    if (video) {
        videoDuration = video.duration;
        console.log('Video duration initialized:', videoDuration);
        
        // "Wake up" the video engine for seeking
        video.play().then(() => {
            video.pause();
            console.log('Video engine ready for scrubbing');
        }).catch(e => console.log('Autoplay policy requires scroll to start video:', e));
    }
};

if (video) {
    if (video.readyState >= 1) {
        initVideo();
    } else {
        video.addEventListener('loadedmetadata', initVideo);
    }
}

// Main Scrubbing function
function updateVideoFrame() {
    if (!video || !videoDuration || !scrollWrapper) {
        requestAnimationFrame(updateVideoFrame);
        return;
    }

    const wrapperRect = scrollWrapper.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const wrapperTop = scrollTop + wrapperRect.top;
    const scrollStart = wrapperTop;
    const scrollEnd = wrapperTop + scrollWrapper.offsetHeight - window.innerHeight;
    
    let currentScroll = scrollTop - scrollStart;
    
    // Clamp values
    if (currentScroll < 0) currentScroll = 0;
    const maxScroll = scrollEnd - scrollStart;
    if (currentScroll > maxScroll) currentScroll = maxScroll;

    const scrollFraction = maxScroll > 0 ? currentScroll / maxScroll : 0;
    
    // Calculate target time
    const targetTime = scrollFraction * videoDuration;
    
    // Seek video only if significantly different AND we are not currently seeking
    if (Math.abs(lastSetTime - targetTime) > 0.05 && !isSeeking) {
        lastSetTime = targetTime;
        isSeeking = true;
        
        // Use a faster internal seek mechanism if available (Chrome optimization)
        if (video.fastSeek) {
            video.fastSeek(targetTime);
        } else {
            video.currentTime = targetTime;
        }
    }

    // Fade out text as we reach the end of the video
    if (heroOverlay) {
        if (scrollFraction > 0.85) {
            heroOverlay.style.opacity = Math.max(0, 1 - ((scrollFraction - 0.85) * 6));
        } else {
            heroOverlay.style.opacity = 1;
        }
    }

    requestAnimationFrame(updateVideoFrame);
}

// Release the seek lock when the browser finishes decoding the frame
if (video) {
    video.addEventListener('seeked', () => {
        isSeeking = false;
    });
}

// Global Interaction Unlock (needed for some browsers to allow seeking)
const unlockVideo = () => {
    if (video && video.paused) {
        video.play().then(() => {
            video.pause();
            console.log('Video successfully unlocked by user interaction');
            window.removeEventListener('scroll', unlockVideo);
            window.removeEventListener('click', unlockVideo);
        }).catch(err => console.error('Unlock failed:', err));
    }
};

window.addEventListener('scroll', unlockVideo, { once: true });
window.addEventListener('click', unlockVideo, { once: true });

// Start animation loop
requestAnimationFrame(updateVideoFrame);

// ==========================================
// DOM INTERACTIVE FEATURES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.querySelector('.theme-toggle');
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeToggle) themeToggle.textContent = savedTheme === 'light' ? 'Modo Escuro' : 'Modo Claro';
    };

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        if (themeToggle) themeToggle.textContent = next === 'light' ? 'Modo Escuro' : 'Modo Claro';
    };

    themeToggle?.addEventListener('click', toggleTheme);
    initTheme();

    // Smooth Scroll & Active Nav Tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const trackActiveSection = () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", trackActiveSection);

    // Search Engine (Simple Local Implementation)
    const searchInput = document.querySelector('.search-input');
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const term = e.target.value.toLowerCase();
            if (term.length < 3) return;

            const content = document.querySelector('main');
            const elements = content.querySelectorAll('p, h2, h3, .bento-card');
            
            for (let el of elements) {
                if (el.textContent.toLowerCase().includes(term)) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.style.transition = 'background 0.5s';
                    el.style.background = 'rgba(197, 160, 89, 0.4)';
                    setTimeout(() => el.style.background = 'transparent', 3000);
                    break;
                }
            }
        }
    });

    // Bookmark Persistence
    window.addEventListener('scroll', () => {
        localStorage.setItem('laser_ink_last_pos', window.pageYOffset);
    });

    // Restore Position
    const lastPos = localStorage.getItem('laser_ink_last_pos');
    if (lastPos && window.pageYOffset === 0) {
        setTimeout(() => {
            window.scrollTo({ top: parseInt(lastPos), behavior: 'smooth' });
        }, 500);
    }

    // ==========================================
    // MOBILE NAVIGATION LOGIC
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const aside = document.querySelector('aside');
    const overlay = document.querySelector('.sidebar-overlay');
    const links = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        aside.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = aside.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle?.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);

    // Auto-close menu when a link is clicked (Mobile UX)
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                aside.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
