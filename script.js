const app = Vue.createApp({
    data() {
        return {
            scrolled: false,
            activeSection: "", // Track the currently active section
        };
    },
    methods: {
        checkScroll() {
            this.scrolled = window.scrollY > 50;
            this.updateActiveSection();
        },
        updateActiveSection() {
            const sections = document.querySelectorAll("section");
            let scrollPosition = window.scrollY + 100; // Offset for better detection

            sections.forEach((section) => {
                const top = section.offsetTop;
                const height = section.offsetHeight;

                // Update the active section based on the scroll position
                if (scrollPosition >= top && scrollPosition < top + height) {
                    this.activeSection = `#${section.id}`;
                }
            });

            // If scrolling back to top, ensure Home section becomes active
            if (window.scrollY < 50) {
                this.activeSection = "#home"; // Assuming your home section has an id="home"
            }
        },
        isActive(route) {
            return this.activeSection === route;
        },
    },
    mounted() {
        window.addEventListener("scroll", this.checkScroll);
        this.checkScroll(); // Check scroll position on mount
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.checkScroll);
    },
}).mount("#app");

// Resource data array - you can easily add/remove/modify resources
const resourceData = [
    {
        title: "JerseyCTF 2024",
        imageUrl: "imgs/JCTFIV.png",
        writeupUrl: "https://ctftime.org/event/2230/tasks/",
        techTalkUrl:
            "https://www.youtube.com/playlist?list=PLrcTWWy-esnD_HhRIpgMM5dIBiCDr9K4z",
        mobileImageUrl: "imgs/SMJCTFIV.png"
    },
    {
        title: "JerseyCTF 2023",
        imageUrl: "imgs/JCTFIII.png",
        writeupUrl: "https://ctftime.org/event/1908/tasks/",
        techTalkUrl:
            "https://www.youtube.com/playlist?list=PLrcTWWy-esnDXi3khogdlAgkisL19IM08",
        mobileImageUrl: "imgs/SMJCTFIII.png"
    },
    {
        title: "JerseyCTF 2022",
        imageUrl: "imgs/JCTFII.png",
        writeupUrl:
            "https://github.com/njitacm/jerseyctf-2022-challenges/tree/main/writeups",
        techTalkUrl:
            "https://www.youtube.com/playlist?list=PLrcTWWy-esnCuaiEMSj6Bst4phnq-Qg6B",
        mobileImageUrl: "imgs/SMJCTFII.png"
    },
    {
        title: "JerseyCTF 2021",
        imageUrl: "imgs/JCTFI.png",
        writeupUrl:
            "https://github.com/njitacm/jerseyctf-2021-challenges/tree/main/writeups",
        techTalkUrl:
            "https://www.youtube.com/playlist?list=PLrcTWWy-esnDYt1niwIETam5s-nljoeD9",
        mobileImageUrl: "imgs/SMJCTFI.png"
    },
];

// Function to create and append resource cards
function createResourceCards() {
    const container = $("#resource-cards-container");

    // Clear any existing content
    container.empty();

    // Loop through the resource data and create cards
    resourceData.forEach((resource) => {
        const card = `
            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div class="card card-custom h-100">
                <div class="img-container">
                  <img src="${resource.imageUrl}" alt="${resource.title}" class="img-desktop" />
                  <img src="${resource.mobileImageUrl}" alt="${resource.title}" class="img-mobile" />
                </div>
                <div class="card-body p-3 p-md-4">
                  <h3 class="report-title">${resource.title}</h3>
                  <div class="resource-links">
                    <a href="${resource.writeupUrl}" target="_blank" class="download-link d-inline-block">Writeup →</a>
                    <a href="${resource.techTalkUrl}" target="_blank" class="tech-talk-link d-inline-block">Tech Talk →</a>
                  </div>
                </div>
              </div>
            </div>
          `;

        // Append the card to the container
        container.append(card);
    });
}

// Initialize the cards
createResourceCards();





// JavaScript for the sponsors carousel
document.addEventListener('DOMContentLoaded', function() {
    // Pause animation on hover
    const sponsorsTrack = document.querySelector('.sponsors-track');
    
    if (sponsorsTrack) {
        sponsorsTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        sponsorsTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Adjust animation speed based on screen width
        function adjustScrollSpeed() {
            const width = window.innerWidth;
            let duration;
            
            if (width < 576) {
                duration = '15s'; // Faster on small screens
            } else if (width < 992) {
                duration = '15s'; // Medium speed on medium screens
            } else {
                duration = '15s'; // Normal speed on large screens
            }
            
            sponsorsTrack.style.animationDuration = duration;
        }
        
        // Initial adjustment
        adjustScrollSpeed();
        
        // Adjust on window resize
        window.addEventListener('resize', adjustScrollSpeed);
    }
});

// Optional: Check if images exist and replace with placeholders if not
function checkImages() {
    const sponsorLogos = document.querySelectorAll('.sponsor-logo');
    
    sponsorLogos.forEach(logo => {
        logo.onerror = function() {
            // If image fails to load, replace with a placeholder or text
            this.onerror = null;
            this.src = 'path/to/placeholder.png'; // Replace with your placeholder path
            this.alt = this.alt + ' (Logo)';
        };
    });
}

window.addEventListener('load', checkImages);






// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            
            // Reset previous error states
            document.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            
            // Validate name
            if (name === '') {
                document.getElementById('name').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate email
            if (email === '' || !isValidEmail(email)) {
                document.getElementById('email').classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('message').classList.add('is-invalid');
                isValid = false;
            }
            
            // If form is valid, proceed with submission
            if (isValid) {
                // In a real implementation, you would send this data to your server
                // For demo purposes, we'll just show a success message
                showFormSuccess();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show success message
    function showFormSuccess() {
        const formElements = contactForm.elements;
        
        // Disable form elements during "submission"
        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = true;
        }
        
        // Change button text to show processing
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual AJAX in production)
        setTimeout(function() {
            // Reset the form
            contactForm.reset();
            
            // Create success alert
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Your message has been sent successfully!';
            contactForm.appendChild(successAlert);
            
            // Re-enable form elements
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = false;
            }
            
            // Restore button text
            submitBtn.textContent = originalBtnText;
            
            // Remove success message after 5 seconds
            setTimeout(function() {
                successAlert.remove();
            }, 5000);
        }, 1500);
    }
});

// Form floating labels enhancement (optional)
const formControls = document.querySelectorAll('.form-control');
formControls.forEach(control => {
    control.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    control.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});