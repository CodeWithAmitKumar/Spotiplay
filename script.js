
// dark and light mode
const switchEl = document.getElementById('switch');
const bodyEl = document.body;

switchEl.addEventListener('change', function() {
  if (this.checked) {
    bodyEl.classList.add('dark-theme');
  } else {
    bodyEl.classList.remove('dark-theme');
  }
});
switchEl.checked = false;


//progress bar refresh
function resetProgressBar() {
  // Set the progress bar to start at 0 when the page loads
  document.getElementById("myProgressBar").value = 0;
}


//initialize variables

let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

// songs Array
let songs = [
  {songName: "Aaj Ki Raat - Stree2", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg"},
  {songName: "Khoob Surat - Stree2", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg"},
  {songName: "Battyan Bujhado", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
  {songName: "Gulab Phoolor Kanta", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
  {songName: "Laila Mai Laila", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
  {songName: "Dilbar Dilbar", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
  {songName: "Dil Cheez Tujhe Dedi", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg"},
  {songName: "Pyaar hota Kayi Baar Hai", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg"},
  {songName: "Lut Gaye", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
  {songName: "Tu Mo Love Story", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity =1;
  }
  else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity =0;
  }
})

// listen to event
audioElement.addEventListener('timeupdate', ()=> {
  console.log('timeupdate');
  // update the progress bar value
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  
  console.log(progress);
  myProgressBar.value = progress;


  
})

myProgressBar.addEventListener('change', ()=> {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

