const app = Vue.createApp({
    data() {
        return {
            scrolled: false
        }
    },
    methods: {
        checkScroll() {
            this.scrolled = window.scrollY > 50;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.checkScroll);
        // Check scroll position on page load
        this.checkScroll();
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.checkScroll);
    }
}).mount('#app');

// jQuery smooth scrolling
$(document).ready(function() {
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
});