// JS Example: Adding subtle animation on scroll
const cards = document.querySelectorAll(".service-card, .detail-card");

window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        if (position < window.innerHeight - 50) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});
