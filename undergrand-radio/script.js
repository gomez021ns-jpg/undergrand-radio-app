const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const volume = document.getElementById("volume");
const vinyl = document.querySelector(".vinyl");
const track = document.getElementById("track");
const onAirIndicator = document.querySelector(".on-air");

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

// PLAY
playBtn.addEventListener("click", () => {
  audio.play().catch(err => {
    console.error("Playback failed:", err);
    track.innerText = "Error loading stream";
  });
  vinyl.classList.add("playing");
  onAirIndicator.classList.add("active");
});

// STOP (za live stream samo pause, bez currentTime)
stopBtn.addEventListener("click", () => {
  audio.pause();
  // Ne resetujemo currentTime za live stream
  vinyl.classList.remove("playing");
  onAirIndicator.classList.remove("active");
});

// VOLUME
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Error handling za audio
audio.addEventListener("error", (e) => {
  console.error("Audio error:", e);
  track.innerText = "Stream unavailable";
  vinyl.classList.remove("playing");
  onAirIndicator.classList.remove("active");
});
