

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ===== 1. SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// ===== 2. BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== 3. SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const publications = [
    { title: "Secure Distributed Sparse Gaussian Process Models", year: 2024, venue: "AAAI" },
    { title: "IBATree: Interpretable Cancer Cell Classification", year: 2024, venue: "BIBM" },
    { title: "Enhanced Tree Regularization for Cancer Classification", year: 2024, venue: "BIBM" },
    { title: "Evaluating Saliency Methods on Leukemia Classification", year: 2023, venue: "ICDL" },
    { title: "Digital Twin-Driven Autonomous Driving Platform", year: 2022, venue: "INTELLECT" }
];

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const filtered = publications.filter(pub => 
        pub.title.toLowerCase().includes(query) ||
        pub.venue.toLowerCase().includes(query) ||
        pub.year.toString().includes(query)
    );
    
    if (filtered.length > 0) {
        let html = '<div class="search-result-list">';
        filtered.forEach(pub => {
            html += `
                <div class="search-result-item">
                    <div class="result-title">${pub.title}</div>
                    <div class="result-meta">${pub.venue} ${pub.year}</div>
                </div>
            `;
        });
        html += '</div>';
        searchResults.innerHTML = html;
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="no-results">No publications found</div>';
        searchResults.style.display = 'block';
    }
});

// Hide search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

// ===== 4. NAVIGATION ACTIVE STATE =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== 5. SMOOTH SCROLL =====
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 6. CV DOWNLOAD =====
document.getElementById('downloadCV').addEventListener('click', function(e) {
    e.preventDefault();
    
    const cvContent = `CURRICULUM VITAE
DR. MUHAMMAD UMAIR RAZA
========================

PERSONAL DETAILS:
----------------
Name: Muhammad Umair Raza, Ph.D.
Date of Birth: 1994
Nationality: Pakistani
Email: umair@szu.edu.cn
Phone: +86-18383163515

EDUCATION:
----------
2020-2024: Ph.D. Computer Science - Shenzhen University
2016-2020: M.S. Computer Science - SWUST, China
2014-2016: B.S. Computer Science - NCBA&E, Pakistan

PUBLICATIONS (12):
-----------------
1. AAAI 2024 - Secure Distributed Sparse Gaussian Process Models
2. IEEE BIBM 2024 - IBATree: Interpretable Cancer Cell Classification
3. IEEE BIBM 2024 - Enhanced Tree Regularization
4. IEEE ICDL 2023 - Evaluating Saliency Methods on Leukemia Classification
5. INTELLECT 2022 - Digital Twin-Driven Autonomous Driving Platform

Citations: 100+ | H-Index: 6

RESEARCH INTERESTS:
------------------
• Explainable AI (XAI)
• Interpretable Machine Learning
• Biomedical Image Processing
• Cancer Cell Classification

EXPERIENCE:
----------
2023-2024: Research Assistant, Shenzhen University
2022-2023: Teaching Assistant, Shenzhen University
2019-2022: Research Intern, SWUST, China

LANGUAGES:
---------
English (Fluent), Urdu (Native), Chinese (HSK 4)`;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dr_Umair_Raza_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// ===== 7. CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';
    successMsg.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Simulate sending (replace with actual Formspree endpoint)
        setTimeout(() => {
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            successMsg.style.background = '#d4edda';
            successMsg.style.color = '#155724';
            this.reset();
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }, 1500);
    } catch (error) {
        successMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error sending message';
        successMsg.style.background = '#f8d7da';
        successMsg.style.color = '#721c24';
    }
});

// ===== 8. VIDEO BACKGROUND FALLBACK =====
const video = document.getElementById('aiVideo');
video.addEventListener('error', () => {
    // If video fails, use solid color with pattern
    document.querySelector('.video-overlay').style.background = 
        'linear-gradient(135deg, #f5efe9 0%, #fff 100%)';
});

// ===== 9. FLOATING ICONS PARALLAX =====
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.floating-ai i');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    icons.forEach((icon, index) => {
        const speed = 20 + (index * 5);
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        icon.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== 10. INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Professor Dashboard Ready - Full Maza!');
    
    // Add current year to footer
    const yearElements = document.querySelectorAll('.footer p');
    yearElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace('2024', new Date().getFullYear());
    });
});