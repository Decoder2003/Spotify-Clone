console.log("Welcom to Spotify by Dhruv");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('Assests/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Nai Lagda", filePath: "Assest/songs/1.mp3", coverPath: "Assests/covers/1.jpg"},
    {songName : "Befikar", filePath: "Assest/songs/2.mp3", coverPath: "Assests/covers/2.jpg"},
    {songName : "Shiddat", filePath: "Assest/songs/3.mp3", coverPath: "Assests/covers/3.jpg"},
    {songName : "Meherbaani", filePath: "Assest/songs/4.mp3", coverPath: "Assests/covers/4.jpg"},
    {songName : "Jannat Ve", filePath: "Assest/songs/5.mp3", coverPath: "Assests/covers/5.jpg"},
]

songItems.forEach((element, i)=> {
    element.getElementsByClassName("songCover")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})


// Handle Play-Pause 
masterPlay.addEventListener('click',()=> {
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=> {
    // Update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    if(audioElement.currentTime==audioElement.duration)
    {
        if(songIndex>=5)
        {
            songIndex = 1;
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `Assests/songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
})

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays= ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex-1].songName;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Assests/songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click',()=> {
    if(songIndex>=5)
    {
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Assests/songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click',()=> {
    if(songIndex<=1)
    {
        songIndex = 5;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Assests/songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})