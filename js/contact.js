function sendEmail(e) {
    e.preventDefault();
    
    // Récupérer le bouton submit
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    
    // Préparer les paramètres pour EmailJS
    const templateParams = {
        from_name: e.target.name.value,
        from_email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
        to_email: 'ulrichfotso10@gmail.com'
    };

    // Envoyer l'email via EmailJS
    emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        templateParams
    )
    .then(function(response) {
        console.log('Email envoyé!', response);
        // Message de succès
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
        submitBtn.classList.add('success');
        
        // Réinitialiser le formulaire
        e.target.reset();
        
        // Rétablir le bouton après 3 secondes
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('success');
        }, 3000);
    })
    .catch(function(error) {
        console.error('Erreur d\'envoi:', error);
        // Message d'erreur
        submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur d\'envoi';
        submitBtn.classList.add('error');
        
        // Rétablir le bouton après 3 secondes
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('error');
        }, 3000);
        
        // Backup : ouvrir le client mail par défaut
        const mailtoLink = `mailto:ulrichfotso10@gmail.com?subject=${encodeURIComponent(templateParams.subject)}&body=${encodeURIComponent(
            `De: ${templateParams.from_name} (${templateParams.from_email})\n\n${templateParams.message}`
        )}`;
        window.location.href = mailtoLink;
    });
} 