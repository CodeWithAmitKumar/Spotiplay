// Dark and Light Mode with Local Storage
const switchEl = document.getElementById("switch");
const bodyEl = document.body;

// Load dark mode preference from local storage
if (localStorage.getItem("dark-mode") === "enabled") {
  bodyEl.classList.add("dark-theme");
  switchEl.checked = true;
} else {
  switchEl.checked = false;
}

switchEl.addEventListener("change", function () {
  if (this.checked) {
    bodyEl.classList.add("dark-theme");
    localStorage.setItem("dark-mode", "enabled");
  } else {
    bodyEl.classList.remove("dark-theme");
    localStorage.setItem("dark-mode", "disabled");
  }
});

// Progress bar reset on refresh
function resetProgressBar() {
  document.getElementById("myProgressBar").value = 0;
}

// Initialize variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Songs Array
let songs = [
  {
    songName: "Aaj Ki Raat - Stree2",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpeg",
  },
  {
    songName: "Khoob Surat - Stree2",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpeg",
  },
  {
    songName: "Battyan Bujhado",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Gulab Phoolor Kanta",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Laila Mai Laila",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Dilbar Dilbar",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Dil Cheez Tujhe Dedi",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpeg",
  },
  {
    songName: "Pyaar hota Kayi Baar Hai",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpeg",
  },
  {
    songName: "Lut Gaye",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Tu Mo Love Story",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Update the song items with song data
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;


  // for download
  let downloadBtn = document.createElement('a');
  downloadBtn.href = songs[i].filePath;
  downloadBtn.download = `${songs[i].songName}.mp3`;
  downloadBtn.innerHTML = '<span class="DownloadBtn"><i class="fa-duotone fa-solid fa-download"></i></span>';
  element.appendChild(downloadBtn);
});

// Handle play/pause click for master play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;  // Show the GIF when playing
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;  // Hide the GIF when paused
  }
});

// Update progress bar as song plays
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Handle progress bar change to jump within the song
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons to default (play icon)
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

// Play individual song and handle play/pause logic
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    let currentIndex = parseInt(e.target.id);  // Get clicked song index

    // Toggle play/pause for the current song
    if (songIndex === currentIndex && !audioElement.paused) {
      audioElement.pause();
      e.target.classList.remove("fa-circle-pause");
      e.target.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity = 0;  // Hide GIF when paused
    } else {
      makeAllPlays();  // Reset other songs to play icon
      songIndex = currentIndex;
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");

      audioElement.src = songs[songIndex].filePath;
      audioElement.currentTime = 0;  // Reset song time
      audioElement.play();

      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      gif.style.opacity = 1;  // Show GIF when playing
    }
  });
});

// Reset progress bar and GIF when song ends
audioElement.addEventListener("ended", () => {
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  gif.style.opacity = 0;  // Hide GIF when the song ends
  myProgressBar.value = 0;  // Reset progress bar
});

// Next button setup
document.getElementById("next").addEventListener('click', () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;  // Reset song time
  audioElement.play();

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;  // Show GIF when playing
});

// Previous button setup
document.getElementById("previous").addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;  // Reset song time
  audioElement.play();

  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;  // Show GIF when playing
});
