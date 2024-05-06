const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

// sıra
let index;

// döngü
let loop = true;

// şarkı listesi
const songList = [
  {
    name: "366.Gün",
    link: "assets/sagopa-366gün.mp3",
    artist: "Sagopa Kajmer",
    image: "assets/366.jpeg",
  },
  {
    name: "Caney",
    link: "assets/caney.mp3",
    artist: "Azer Bülbül",
    image: "assets/azer.jpeg",
  },
  {
    name: "Vesselam",
    link: "assets/vesselam.mp3",
    artist: "Sagopa Kajmer",
    image: "assets/sago.jpeg",
  },
  {
    name: "Onca Şeyin Ardından",
    link: "assets/Sagopa Kajmer - Onca Şeyin Ardından.mp3",
    artist: "Sagopa Kajmerr",
    image: "assets/sagopa.jpeg",
  },
  {
    name: "Wasted Years",
    link: "assets/wasted-years-2015-remaster.mp3",
    artist: "Iron Maiden",
    image: "assets/ironmaiden.jpeg",
  },
];

// şarkı atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;
  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  // Şarkıyı Oynat
  playAudio();
  playListContainer.classList.add("hide");
};

// oynatma Listesini göster
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

// zaman tutucu
setInterval(() => {
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

// tekrar tıklanıldığında
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

// Karıştırıcı Tıklanıldığında

shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});
// ilerleme çubuğuna tıklanıldığında
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  let coordEnd = event.clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  audio.currentTime = progress * audio.duration;
});

// Şarkıyı oynatma
const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

// Şarkıyı Durdur
const pauseAudio = () => {
  audio.pause();
  playButton.classList.remove("hide");
  pauseButton.classList.add("hide");
};

const previousSong = () => {
  pauseAudio();
  index = index - 1;
  if (index < 0) {
    index = songList.length - 1;
  }
  setSong(index);
};

// şarkı bittiğinde diğer şarkıya geç
audio.onended = () => {
  nextSong();
};

// zaman düzenleme
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

// Şarkı süresi değiştikçe

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// sonraki şarkı
const nextSong = () => {
  if (loop) {
    if (index == songList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songList.length);
    setSong(randIndex);
  }
};

// Event Listeners
nextButton.addEventListener("click", nextSong);
playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
prevButton.addEventListener("click", previousSong);
// sarki listesi olustur

const initPlaylist = () => {
  for (const i in songList) {
    playListSongs.innerHTML += `<li class="playlistSong" onclick="setSong(${i})">
      <div class="playlist-image-container">
        <img src="${songList[i].image}" />
      </div>
      <div class="playlist-song-details">
        <span id="playlist-song-name">${songList[i].name}</span>
        <span id="playlist-song-artist-album">${songList[i].artist}</span>
      </div>
    </li>`;
  }
};

// Initialize
window.onload = () => {
  index = 0;
  setSong(index);
  initPlaylist();
  pauseAudio();
};
