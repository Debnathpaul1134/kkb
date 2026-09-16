const musicButton = document.getElementById('music-toggle');
const birthdayAudio = document.getElementById('birthday-audio');
const openingCurtain = document.getElementById('opening-curtain');
let musicOn = false;
let wantsMusic = false;

birthdayAudio.volume = .72;

function updateButton() {
  musicButton.setAttribute('aria-pressed', String(wantsMusic));
  musicButton.setAttribute('aria-label', wantsMusic ? 'Turn off birthday music' : 'Turn on birthday music');
  musicButton.querySelector('.music-toggle-text').textContent = wantsMusic ? 'Music on' : 'Music off';
}

async function startMusic() {
  wantsMusic = true;
  updateButton();
  try {
    await birthdayAudio.play();
    musicOn = true;
  } catch (_) {
    // The next genuine interaction (including a scroll) will retry playback.
  }
}

function stopMusic() {
  wantsMusic = false;
  musicOn = false;
  birthdayAudio.pause();
  updateButton();
}

musicButton.addEventListener('click', () => musicOn ? stopMusic() : startMusic());
birthdayAudio.addEventListener('ended', () => { musicOn = false; wantsMusic = false; updateButton(); });

openingCurtain.addEventListener('click', () => {
  openingCurtain.classList.add('is-open');
  startMusic();
  setTimeout(() => openingCurtain.remove(), 1450);
});
