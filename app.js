/**
 * LIMOVA CAFÉ NICE — JAVASCRIPT LOGIC
 * Navigation, Chatbot Yoni & Formulaire de Réservation
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Chatbot Yoni Widget Logic ---
  const chatBtn = document.getElementById('chatBtn');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (chatBtn && chatPanel && chatClose) {
    chatBtn.addEventListener('click', () => {
      chatPanel.classList.toggle('active');
      if (chatPanel.classList.contains('active')) {
        chatInput?.focus();
      }
    });

    chatClose.addEventListener('click', () => {
      chatPanel.classList.remove('active');
    });
  }

  // Handle Quick Actions
  window.handleQuickAction = function(topic) {
    let userText = '';
    let botReply = '';

    switch(topic) {
      case 'carte':
        userText = 'Consulter la carte des cafés';
        botReply = 'Avec plaisir ! Nous proposons des crus de spécialité d’Éthiopie (Yirgacheffe), Colombie, Guatemala et un sublime Panama Geisha. Vous pouvez les découvrir sur notre page <a href="menu.html" style="color:#C6923B; font-weight:bold; text-decoration:underline;">La Carte</a> !';
        break;
      case 'douceurs':
        userText = 'Voir les douceurs du jour';
        botReply = 'Nos pâtisseries sont fraîches du matin : tarte fine aux pommes caramélisées (5,50 €), brownie chocolat Valrhona & noix de pécan (5,00 €), tartelette citron yuzu et cookies fleur de sel !';
        break;
      case 'reserver':
        userText = 'Réserver une table';
        botReply = 'Très bonne idée ! Vous pouvez directement bloquer votre table sur notre formulaire en ligne : <a href="reservation.html" style="color:#C6923B; font-weight:bold; text-decoration:underline;">Cliquez ici pour réserver</a>.';
        break;
      case 'horaires':
        userText = 'Adresse et horaires';
        botReply = 'Nous sommes situés au <strong>25 avenue Jean Médecin à Nice</strong>. Ouvert du lundi au samedi de 7h30 à 19h30, et le dimanche pour le brunch de 9h30 à 17h00 !';
        break;
      case 'equipe':
        userText = 'Parler à Reouven ou Yoan';
        botReply = 'Reouven Bokobza et Yoan Drahy sont au café toute la journée pour vous recevoir avec grand sourire. N’hésitez pas à venir discuter extraction ou torréfaction directement au comptoir !';
        break;
      case 'brunch':
        userText = 'Infos sur le brunch du dimanche';
        botReply = 'Notre Grand Brunch a lieu chaque dimanche de 11h00 à 15h30 au tarif de 29 € (viennoiseries, pancakes maison, œufs bios au choix, avocado toast et cafés de spécialité à volonté) !';
        break;
      case 'nocturne':
        userText = 'La soirée spéciale du jeudi';
        botReply = 'Tous les jeudis soirs de 19h00 à 23h00, c’est notre soirée dégustation : accords cafés grands crus & tapas gourmandes avec musique d’ambiance feutrée !';
        break;
      default:
        userText = topic;
        botReply = 'Je suis là pour vous aider ! Vous pouvez réserver votre table ou venir nous rendre visite au 25 avenue Jean Médecin.';
    }

    addMessage(userText, 'user');
    setTimeout(() => {
      addMessage(botReply, 'bot');
    }, 400);
  };

  function addMessage(htmlContent, sender) {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg msg-${sender}`;
    msgDiv.innerHTML = htmlContent;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    const lower = text.toLowerCase();
    setTimeout(() => {
      if (lower.includes('brunch')) {
        handleQuickAction('brunch');
      } else if (lower.includes('jeudi') || lower.includes('soir') || lower.includes('nocturne')) {
        handleQuickAction('nocturne');
      } else if (lower.includes('carte') || lower.includes('café') || lower.includes('menu') || lower.includes('prix')) {
        handleQuickAction('carte');
      } else if (lower.includes('réserver') || lower.includes('reservation') || lower.includes('table')) {
        handleQuickAction('reserver');
      } else if (lower.includes('adresse') || lower.includes('où') || lower.includes('horaire') || lower.includes('ouvert') || lower.includes('nice')) {
        handleQuickAction('horaires');
      } else if (lower.includes('reouven') || lower.includes('yoan') || lower.includes('équipe')) {
        handleQuickAction('equipe');
      } else if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) {
        addMessage('Bonjour ! C’est un plaisir de vous accueillir chez Limova Café. Que puis-je vous préparer aujourd’hui ?', 'bot');
      } else {
        addMessage('Merci pour votre message ! Reouven, Yoan et toute notre équipe vous attendent avec grand plaisir au 25 avenue Jean Médecin. Vous pouvez réserver votre table en ligne via l’onglet <a href="reservation.html" style="color:#C6923B; font-weight:bold;">Réservation</a>.', 'bot');
      }
    }, 450);
  }

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserMessage();
    });
  }

  // --- 2. Reservation Form Handling ---
  const resForm = document.getElementById('reservationForm');
  const resFeedback = document.getElementById('reservationFeedback');

  if (resForm && resFeedback) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('resName')?.value || 'Client';
      const guests = document.getElementById('resGuests')?.value || '2';
      const date = document.getElementById('resDate')?.value || 'Bientôt';
      const time = document.getElementById('resTime')?.value || '12:00';
      const type = document.getElementById('resType')?.options[document.getElementById('resType').selectedIndex]?.text || 'Café & Douceurs';

      resFeedback.style.display = 'block';
      resFeedback.innerHTML = `
        <div style="background: #EBF7EE; border: 1.5px solid #27AE60; border-radius: 14px; padding: 24px; color: #1E4620; text-align: center; box-shadow: 0 4px 16px rgba(39, 174, 96, 0.12);">
          <div style="font-size: 36px; margin-bottom: 8px;">✨☕</div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 24px; color: #1E4620; margin-bottom: 8px;">Réservation Confirmée !</h3>
          <p style="font-size: 15px; margin-bottom: 12px;">Merci <strong>${name}</strong>, votre table pour <strong>${guests} personne(s)</strong> est bien réservée le <strong>${date} à ${time}</strong> (${type}).</p>
          <p style="font-size: 13px; color: #357A38;">Reouven Bokobza & Yoan Drahy vous attendent avec impatience au 25 avenue Jean Médecin à Nice.</p>
        </div>
      `;

      resForm.reset();
      resFeedback.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- 3. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isFlex = navMenu.style.display === 'flex';
      navMenu.style.display = isFlex ? 'none' : 'flex';
      if (!isFlex) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '80px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#FDFBF7';
        navMenu.style.padding = '24px';
        navMenu.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
        navMenu.style.gap = '16px';
        navMenu.style.borderBottom = '1px solid rgba(37,22,16,0.1)';
      }
    });
  }

});
