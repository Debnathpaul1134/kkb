let musicContext, musicTimer, musicOn = false;

// The traditional Happy Birthday to You melody in its familiar rhythm.
const melody = [
  [0, 392, .28], [.32, 392, .28], [.64, 440, .55], [1.25, 392, .55], [1.86, 523.25, .55], [2.48, 493.88, 1.05],
  [3.72, 392, .28], [4.04, 392, .28], [4.36, 440, .55], [4.97, 392, .55], [5.58, 587.33, .55], [6.20, 523.25, 1.05],
  [7.44, 392, .28], [7.76, 392, .28], [8.08, 783.99, .55], [8.69, 659.25, .55], [9.30, 523.25, .55], [9.91, 493.88, .55], [10.52, 440, 1.05],
  [11.76, 698.46, .28], [12.08, 698.46, .28], [12.40, 659.25, .55], [13.01, 523.25, .55], [13.62, 587.33, .55], [14.23, 523.25, 1.25]
];
const chords = [[0,[261.63,329.63,392]],[3.72,[196,246.94,293.66]],[7.44,[261.63,329.63,392]],[11.76,[174.61,220,261.63]],[14.23,[261.63,329.63,392]]];

function pianoTone(freq, start, duration, volume = .07) {
  const gain = musicContext.createGain();
  const note = musicContext.createOscillator();
  const shimmer = musicContext.createOscillator();
  note.type = 'triangle'; shimmer.type = 'sine';
  note.frequency.value = freq; shimmer.frequency.value = freq * 2;
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + .025);
  gain.gain.exponentialRampToValueAtTime(volume * .45, start + .16);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  note.connect(gain); shimmer.connect(gain); gain.connect(musicContext.destination);
  note.start(start); shimmer.start(start); note.stop(start + duration + .03); shimmer.stop(start + duration + .03);
}
function playSong() {
  const start = musicContext.currentTime + .08;
  melody.forEach(([time, note, duration]) => pianoTone(note, start + time, duration));
  chords.forEach(([time, notes]) => notes.forEach(note => pianoTone(note, start + time, 1.35, .018)));
  musicTimer = setTimeout(() => { if (musicOn) playSong(); }, 16800);
}
document.getElementById('music').addEventListener('click', function () {
  if (!musicOn) {
    musicContext = new (window.AudioContext || window.webkitAudioContext)();
    musicOn = true; playSong();
    this.textContent = '❚❚ Pause the Happy Birthday song'; this.setAttribute('aria-pressed', 'true');
  } else {
    musicOn = false; clearTimeout(musicTimer); musicContext.close();
    this.textContent = '♪ Play the Happy Birthday song'; this.setAttribute('aria-pressed', 'false');
  }
});
