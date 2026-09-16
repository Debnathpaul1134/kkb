const sillyMessages = [
  'You have officially made this birthday website 100× prettier.',
  'The jury has decided: you are dangerously adorable.',
  'Doctor’s note: you are prescribed cake, flowers, and unlimited hugs.',
  'Breaking news: one pretty girl has stolen somebody’s whole attention.',
  'Congratulations! You are the main character — obviously.'
];
document.getElementById('silly-surprise').addEventListener('click', () => {
  const card = document.getElementById('silly-card');
  document.getElementById('silly-message').textContent = sillyMessages[Math.floor(Math.random() * sillyMessages.length)];
  card.classList.remove('show');
  requestAnimationFrame(() => card.classList.add('show'));
  document.getElementById('celebrate').click();
});
