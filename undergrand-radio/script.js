const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const volume = document.getElementById("volume");
const vinyl = document.querySelector(".vinyl");
const track = document.getElementById("track");
const onAirIndicator = document.querySelector(".on-air");

// PLAY
playBtn.addEventListener("click", () => {
  audio.play();
  vinyl.classList.add("playing");
  onAirIndicator.classList.add("active");
});

// STOP
stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  vinyl.classList.remove("playing");
  onAirIndicator.classList.remove("active");
});

// VOLUME
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// FAKE Now Playing (dok ne povežeš pravi stream metadata)
const tracks = [
  "Unknown Signal - Echoes",
  "Underground Beat - System Noise",
  "Dark Waves - Frequency Lost",
  "Static Pulse - Night Drive"
];

setInterval(() => {
  const random = tracks[Math.floor(Math.random() * tracks.length)];
  track.innerText = random;
}, 5000);
