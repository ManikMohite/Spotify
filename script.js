// let isPlaying = false;
// let currentIndex = 2;
// let audio = new Audio();
// let currentTime = 0;
// const playIcon = "play.svg";
// const pauseIcon = "pause.svg";

// const totalDuration = 180; // fallback duration if audio.duration isn't available
// let progressCircle = null;
// function loadSong(index) {
//   if (audio) {
//     audio.pause();
//     audio.currentTime = 0;
//   }

//   currentIndex = index;
//   audio.src = songs[currentIndex].url;
//   audio.load();

//   audio.oncanplay = () => {
//     audio.play().catch(err => console.error("Play error:", err));
//     isPlaying = true;
//     currentTime = 0;
    
//     console.log("Now playing:", songs[currentIndex].title);
//   };

//   audio.onerror = () => {
//     console.error("Failed to load audio:", audio.src);
//   };
// }

// function playSong() {
//   if (audio.paused) {
//     audio.play().catch(err => console.log("Resume error:", err));
//     isPlaying = true;
//     console.log("Resumed:");
//     audio.src="pause.svg";
//   } else {
//     audio.pause();
//     isPlaying = false;
//     console.log("Paused");
//   }
// }

// // Toggle play/pause on button click
// audio.addEventListener("play", () => {
//   play.src = pauseIcon;
//   icon.alt = "Pause Song"
// });

// audio.addEventListener("pause", () => {
//   play.src = playIcon;
//  icon.alt = "Play Song"
// });     

// function prevSong() {
//   const index = (currentIndex - 1 + songs.length) % songs.length;
//   loadSong(index);
// }

// function nextSong() {
//   const index = (currentIndex + 1) % songs.length;
//   loadSong(index);
// }

// function updateProgressBar() {
//   const duration = audio.duration || totalDuration;
//   const percent = (audio.currentTime / duration) * 100;
//   if (progressCircle) {
//     progressCircle.style.left = `${percent}%`;
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const switchBtn = document.getElementById("toggleBtn");
//   const view1 = document.querySelector(".create-list");
//   const view2 = document.getElementById("listContainer");
//   progressCircle = document.getElementById("progressCircle");

//   if (!switchBtn || !view1 || !view2) {
//     console.error("Missing DOM elements! Check your HTML IDs/classes.");
//     return;
//   }

//   view2.classList.add("hidden");
//   let showingView1 = true;

//   switchBtn.addEventListener("click", () => {
//     if (showingView1) {
//       view1.classList.add("hidden");
//       view2.classList.remove("hidden");
//       switchBtn.textContent = "Back to Library";
//     } else {
//       view2.classList.add("hidden");
//       view1.classList.remove("hidden");
//       switchBtn.textContent = "Create Playlist";
//     }
//     showingView1 = !showingView1;
//   });

//   // Attach click handlers for songs
//   const songElements = view2.getElementsByTagName("p");
//   Array.from(songElements).forEach((e, i) => {
//     e.addEventListener("click", () => {
//       console.log("Clicked song:", i);
//       loadSong(i);
//     });
//   });

//   audio.addEventListener("timeupdate", updateProgressBar);

//   document.addEventListener("DOMContentLoaded", () => {
//     // Make sure songs array is already declared and populated above this block
//     loadSong(currentIndex); // only call if songs.length > currentIndex
//   });
  
// });

let isPlaying = false;
let currentIndex = 0;
let audio = new Audio();
let progressCircle = null;
let currentTime = 0;

const playBtn = document.getElementById("play");
const playIcon = document.getElementById("playIcon"); // The <img> inside play button
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.querySelector(".progress-bar");
const line = document.querySelector(".line");
progressCircle = document.getElementById("progressCircle");

const playSRC = "play.svg";
const pauseSRC = "pause.svg";

// Load and play a song
function loadSong(index) {
  audio.pause();
  currentIndex = index;
  audio.src = songs[currentIndex].url;
  audio.load();

  audio.oncanplay = () => {
    audio.play();
    isPlaying = true;
    updatePlayButton();
  };

  audio.onerror = () => console.log("Error loading:", audio.src);
}

// Play / Pause toggle
function playSong() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
  } else {
    audio.pause();
    isPlaying = false;
  }
  updatePlayButton();
}

// Update play button icon
function updatePlayButton() {
  if (isPlaying) {
    playIcon.src = pauseSRC;
    playBtn.title = "Pause";
  } else {
    playIcon.src = playSRC;
    playBtn.title = "Play";
  }
}

// Previous Song
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
}

// Next Song
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  line.style.width = percent + "%";
  progressCircle.style.left = percent + "%";
});

// Click progress bar to seek
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

// Audio state UI updates
audio.addEventListener("play", () => {
  isPlaying = true;
  updatePlayButton();
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  updatePlayButton();
});

// Attach controls
playBtn.addEventListener("click", playSong);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Load default song on page load
document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentIndex);
});

