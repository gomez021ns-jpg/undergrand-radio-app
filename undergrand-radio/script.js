const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const volume = document.getElementById("volume");
const vinyl = document.querySelector(".vinyl");
const track = document.getElementById("track");
const onAirIndicator = document.querySelector(".on-air");

// Zeno.fm Metadata - ID mounta iz URL-a
const MOUNT_ID = "rp1swb5pgzzuv";
let metadataInterval = null;

function updateTrackName(trackName) {
  if (trackName && trackName.trim() !== "") {
    track.innerText = trackName;
  } else {
    track.innerText = "UnderGRAND Radio";
  }
}

// Funkcija za preuzimanje metapodataka sa Zeno.fm
async function fetchMetadata() {
  try {
    // Zeno.fm API za metapodatke
    const response = await fetch(`https://api.zeno.fm/api/mounts/metadata/subscribe/${MOUNT_ID}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Zeno vraća podatke u različitim formatima, proveravamo strukturu
    let trackName = "";
    
    if (data.now_playing) {
      // Format: { now_playing: { artist: "...", title: "..." } }
      if (data.now_playing.artist && data.now_playing.title) {
        trackName = `${data.now_playing.artist} - ${data.now_playing.title}`;
      } else if (data.now_playing.text) {
        trackName = data.now_playing.text;
      }
    } else if (data.streamTitle) {
      // Alternativni format
      trackName = data.streamTitle;
    } else if (data.title) {
      trackName = data.title;
    } else if (typeof data === 'string') {
      trackName = data;
    }
    
    if (trackName) {
      updateTrackName(trackName);
    }
  } catch (error) {
    console.error("Error fetching metadata from Zeno.fm:", error);
    // Pokušaj alternativnog metoda - parsing ICY headera kroz proxy
    // ili ostavi trenutni naziv
  }
}

// Inicijalni naziv
updateTrackName("");

// PLAY
playBtn.addEventListener("click", () => {
  audio.play().catch(err => {
    console.error("Playback failed:", err);
    track.innerText = "Error loading stream";
  });
  vinyl.classList.add("playing");
  onAirIndicator.classList.add("active");
  
  // Pokreni polling za metapodatke kada krene reprodukcija
  if (!metadataInterval) {
    fetchMetadata(); // Prvo odmah pozovi
    metadataInterval = setInterval(fetchMetadata, 10000); // Ažuriraj svakih 10 sekundi
  }
});

// STOP (za live stream samo pause, bez currentTime)
stopBtn.addEventListener("click", () => {
  audio.pause();
  // Ne resetujemo currentTime za live stream
  vinyl.classList.remove("playing");
  onAirIndicator.classList.remove("active");
  
  // Zaustavi polling kada se pauzira
  if (metadataInterval) {
    clearInterval(metadataInterval);
    metadataInterval = null;
  }
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
