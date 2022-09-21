console.log("Welcome to Spotify");

//initailise the variable
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Agar Tum Sath Ho", filePath: "1.mp3", coverPath: "Spotify_Clone\covers\cover1.jpg" },
    { songName: "Hawayein", filePath: "2.mp3", coverPath: "Spotify_Clone\covers\cover2.jpg" },
    { songName: "Kesariya", filePath: "3.mp3", coverPath: "Spotify_Clone\covers\cover3.jpg" },
    { songName: "Desh Mere", filePath: "4.mp3", coverPath: "Spotify_Clone\covers\cover4.jpg" },
    { songName: "Pachtaoge", filePath: "5.mp3", coverPath: "Spotify_Clone\covers\cover5.jpg" },
    { songName: "Khairiyat Poocho", filePath: "6.mp3", coverPath: "Spotify_Clone\covers\cover6.jpg" },
    { songName: "Tera Fitoor", filePath: "7.mp3", coverPath: "Spotify_Clone\covers\cover7.jpg" },
    { songName: "Channa Mereya", filePath: "8.mp3", coverPath: "Spotify_Clone\covers\cover8.jpg" },

]



//Handle play/pause
masterPlay.addEventListener('click', (element) => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        console.log(audioElement.src);
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        let str= audioElement.src.slice(audioElement.src.length-5).charAt(0)
        console.log(str)
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            console.log(Number(element.id)+1);
            if(str==(Number(element.id)+1)){
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
            gif.style.opacity = 1;
            }

        })
       
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
        let str= audioElement.src.slice(audioElement.src.length-5).charAt(0)
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            if(str==(Number(element.id)+1)){
                element.classList.remove('fa-pause');
                element.classList.add('fa-play');
                gif.style.opacity = 1;
                }
        })
       
    }
})




//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        gif.style.opacity = 0;
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            gif.style.opacity = 1;
            audioElement.src = `${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
        }

    })
});



//next button

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 7;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
})

