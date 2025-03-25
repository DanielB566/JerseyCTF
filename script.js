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








