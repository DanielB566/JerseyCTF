const app = Vue.createApp({
    data() {
        return {
            scrolled: false,
            activeSection: ''  // Track the currently active section
        };
    },
    methods: {
        checkScroll() {
            this.scrolled = window.scrollY > 50;
            this.updateActiveSection();
        },
        updateActiveSection() {
            const sections = document.querySelectorAll('section');
            let scrollPosition = window.scrollY + 100; // Offset for better detection

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;

                // Update the active section based on the scroll position
                if (scrollPosition >= top && scrollPosition < top + height) {
                    this.activeSection = `#${section.id}`;
                }
            });

            // If scrolling back to top, ensure Home section becomes active
            if (window.scrollY < 50) {
                this.activeSection = '#home';  // Assuming your home section has an id="home"
            }
        },
        isActive(route) {
            return this.activeSection === route;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.checkScroll);
        this.checkScroll(); // Check scroll position on mount
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.checkScroll);
    }
}).mount('#app');




    // Resource data array - you can easily add/remove/modify resources
    const resourceData = [
        {
            title: "JerseyCTF 2024",
            imageUrl: "https://picsum.photos/600/400",
            writeupUrl: "https://ctftime.org/event/2230/tasks/",
            techTalkUrl: "https://www.youtube.com/playlist?list=PLrcTWWy-esnD_HhRIpgMM5dIBiCDr9K4z"
        },
        {
            title: "JerseyCTF 2023",
            imageUrl: "https://picsum.photos/600/400",
            writeupUrl: "https://ctftime.org/event/1908/tasks/",
            techTalkUrl: "https://www.youtube.com/playlist?list=PLrcTWWy-esnDXi3khogdlAgkisL19IM08"
        },
        {
            title: "JerseyCTF 2022",
            imageUrl: "https://picsum.photos/600/400",
            writeupUrl: "https://github.com/njitacm/jerseyctf-2022-challenges/tree/main/writeups",
            techTalkUrl: "https://www.youtube.com/playlist?list=PLrcTWWy-esnCuaiEMSj6Bst4phnq-Qg6B"
        },
        {
            title: "JerseyCTF 2021",
            imageUrl: "https://picsum.photos/600/400",
            writeupUrl: "https://github.com/njitacm/jerseyctf-2021-challenges/tree/main/writeups",
            techTalkUrl: "https://www.youtube.com/playlist?list=PLrcTWWy-esnDYt1niwIETam5s-nljoeD9"
        }
    ];

    // Function to create and append resource cards
    function createResourceCards() {
        const container = $('#resource-cards-container');
        
        // Clear any existing content
        container.empty();
        
        // Loop through the resource data and create cards
        resourceData.forEach(resource => {
            const card = `
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div class="card card-custom h-100">
                        <div class="img-container">
                            <img src="${resource.imageUrl}" alt="${resource.title}" class="report-img">
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

