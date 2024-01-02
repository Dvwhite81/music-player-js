import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';
import Library from './library';

const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const repeatButton = document.querySelector('#repeat');

const audio = new Audio();
let currentAudioIndex = 0;
let isPlaying = false;
let isRepeat = false;

function playAudio() {
  const currentAudio = Library[currentAudioIndex];
  console.log('currentAudio:', currentAudio);
  const titleElement = document.querySelector('#info h2');
  const artistElement = document.querySelector('#info h3');
  const progressBar = document.querySelector('#progress');

  audio.src = currentAudio.file;
  titleElement.textContent = currentAudio.title;
  artistElement.textContent = currentAudio.artist;
  progressBar.style.width = 0;

  audio.play();
  isPlaying = true;
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  playButton.style.display = 'inline-block';
  pauseButton.style.display = 'none';
}

function playNext() {
  currentAudioIndex++;
  if (currentAudioIndex >= Library.length) {
    currentAudioIndex = 0;
  }
  playAudio();
}

function playPrev() {
  currentAudioIndex--;
  if (currentAudioIndex < 0) {
    currentAudioIndex = Library.length - 1;
  }
  playAudio();
}

function updateProgressBar() {
  const { currentTime, duration } = audio;
  const progressBar = document.querySelector('#progress');
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  if (currentTime >= duration && isRepeat) {
    playAudio();
  } else if (currentTime >= duration) {
    pauseAudio();
  }
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  repeatButton.classList.toggle('active');
}

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);
repeatButton.addEventListener('click', toggleRepeat);
audio.addEventListener('ended', playNext);
audio.addEventListener('timeupdate', updateProgressBar);
