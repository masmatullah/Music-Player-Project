const songs = [

{
name:"Song One",
artist:"Artist One",
file:"music/song1.mp3",
cover:"image/cover1.jpeg"
},

{
name:"Song Two",
artist:"Artist Two",
file:"music/song2.mp3",
cover:"image/cover1.jpeg"
},

{
name:"Song Three",
artist:"Artist Three",
file:"music/song3.mp3",
cover:"image/cover1.jpeg"
}

];

let songIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const progressContainer =
document.getElementById("progress-container");

const currentTime =
document.getElementById("current-time");

const duration =
document.getElementById("duration");

const volume =
document.getElementById("volume");

function loadSong(song){

title.innerText = song.name;
artist.innerText = song.artist;
audio.src = song.file;
cover.src = song.cover;

}

loadSong(songs[songIndex]);

function playSong(){

audio.play();

playBtn.innerHTML =
'<i class="fas fa-pause"></i>';

}

function pauseSong(){

audio.pause();

playBtn.innerHTML =
'<i class="fas fa-play"></i>';

}

playBtn.addEventListener("click",()=>{

if(audio.paused){
playSong();
}
else{
pauseSong();
}

});

document.getElementById("next")
.addEventListener("click",()=>{

songIndex++;

if(songIndex > songs.length-1){
songIndex = 0;
}

loadSong(songs[songIndex]);
playSong();

});

document.getElementById("prev")
.addEventListener("click",()=>{

songIndex--;

if(songIndex < 0){
songIndex = songs.length-1;
}

loadSong(songs[songIndex]);
playSong();

});

audio.addEventListener("timeupdate",()=>{

const percent =
(audio.currentTime/audio.duration)*100;

progress.style.width =
percent + "%";

currentTime.innerText =
formatTime(audio.currentTime);

duration.innerText =
formatTime(audio.duration);

});

function formatTime(time){

if(isNaN(time)) return "0:00";

const min = Math.floor(time/60);
const sec = Math.floor(time%60);

return `${min}:${sec<10?"0":""}${sec}`;

}

progressContainer.addEventListener("click",(e)=>{

const width =
progressContainer.clientWidth;

const clickX = e.offsetX;

audio.currentTime =
(clickX/width)*audio.duration;

});

volume.addEventListener("input",()=>{

audio.volume = volume.value;

});

audio.addEventListener("ended",()=>{

songIndex++;

if(songIndex > songs.length-1){
songIndex = 0;
}

loadSong(songs[songIndex]);
playSong();

});