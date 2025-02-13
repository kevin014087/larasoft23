// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to: 'bassolekevin022@gmail.com' // Votre adresse email
            };

            // Envoyer le formulaire
            fetch('send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                } else {
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
            });
        });
    }
});

// Ajout d'effets visuels cyberpunk
document.addEventListener('DOMContentLoaded', function() {
    // Effet de glitch sur le titre principal
    const mainTitle = document.querySelector('#hero h1');
    if (mainTitle) {
        setInterval(() => {
            mainTitle.style.textShadow = Math.random() > 0.95 ? 
                '2px 2px #0ff, -2px -2px #f0f' : 
                '0 0 10px #0ff';
        }, 100);
    }

    // Effet de hover sur les cartes de service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});