const blowButton = document.getElementById('blow-candle');
const blowStatus = document.getElementById('blow-status');
let candleIsOut = false;
let tapFallback = false;
function extinguishCandle() {
  if (candleIsOut) return;
  candleIsOut = true;
  document.getElementById('cake-scene').classList.add('candle-out');
  blowStatus.textContent = '✦ Wish granted — look who came for cake…';
  blowButton.classList.add('complete'); blowButton.disabled = true;
  document.getElementById('celebrate').click();
  setTimeout(() => { document.getElementById('cake-scene').classList.add('cake-eaten'); document.getElementById('cake-teddy').classList.add('arrive'); }, 550);
}
blowButton.addEventListener('click', async () => {
  if (candleIsOut) return;
  if (tapFallback) { extinguishCandle(); return; }
  if (!navigator.mediaDevices?.getUserMedia) { tapFallback = true; blowStatus.textContent = 'Tap once more to blow out the candle ✦'; return; }
  try {
    blowStatus.textContent = 'Listening… now blow gently into your phone 🎤';
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audio = new AudioContext(); const analyser = audio.createAnalyser();
    audio.createMediaStreamSource(stream).connect(analyser); analyser.fftSize = 512;
    const levels = new Uint8Array(analyser.frequencyBinCount); const started = Date.now();
    const listen = () => { analyser.getByteTimeDomainData(levels); const volume = levels.reduce((sum, value) => sum + Math.abs(value - 128), 0) / levels.length;
      if (volume > 13) { stream.getTracks().forEach(track => track.stop()); audio.close(); extinguishCandle(); return; }
      if (Date.now() - started > 10000) { stream.getTracks().forEach(track => track.stop()); audio.close(); tapFallback = true; blowStatus.textContent = 'Could not hear it? Tap the button again to blow it out.'; return; }
      requestAnimationFrame(listen); };
    listen();
  } catch { tapFallback = true; blowStatus.textContent = 'Microphone is off — tap the button again to blow it out.'; }
});
