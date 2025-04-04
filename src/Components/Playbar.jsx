import { useRef, useState, useEffect } from "react";
import playIcon from "/img/play.svg";
import pauseIcon from "/img/pause.svg";
import volumeIcon from "/img/volume.svg";
import muteIcon from "/img/mute.svg";
import nextIcon from "/img/next.svg";
import previousIcon from "/img/previous.svg";
import "../style.css";

const Playbar = ({ songs, currentSong, setCurrentSong, autoPlayTrigger, setAutoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // "off" | "repeat-all" | "repeat-one"
  const audioRef = useRef(new Audio(currentSong?.src || ""));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentSong?.src || "";
    audio.load();

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", playNextSong);
    audio.volume = volume;

    if (isPlaying || autoPlayTrigger) {
      audio.play();
      setIsPlaying(true);
      setAutoPlayTrigger(false);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", playNextSong);
    };
  }, [currentSong, autoPlayTrigger]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (e) => {
    let newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPreviousVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const seekSong = (e) => {
    let newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const playNextSong = () => {
    const currentIndex = songs.findIndex(song => song.src === currentSong?.src);

    if (repeatMode === "repeat-one") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }

    let nextIndex;

    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentIndex && songs.length > 1);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= songs.length) {
        if (repeatMode === "repeat-all") {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    setCurrentSong(songs[nextIndex]);
  };

  const playPreviousSong = () => {
    const currentIndex = songs.findIndex(song => song.src === currentSong?.src);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="playbar">
      <input
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={seekSong}
        className="seekbar"
      />

      <div className="abovebar">
        <div className="songinfo">{currentSong?.name || "No Song Selected"}</div>
        <div className="songbuttons">
          <button onClick={playPreviousSong} title="Previous">
            <img width="25" src={previousIcon} alt="Previous" />
          </button>
          <button onClick={togglePlayPause} title="Play/Pause">
            <img width="25" src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
          </button>
          <button onClick={playNextSong} title="Next">
            <img width="25" src={nextIcon} alt="Next" />
          </button>
          <button onClick={() => setShuffle(!shuffle)} title="Shuffle">
            {shuffle ? "🔀" : "➡️"}
          </button>
          <button
            onClick={() =>
              setRepeatMode(prev =>
                prev === "off" ? "repeat-all" : prev === "repeat-all" ? "repeat-one" : "off"
              )
            }
            title="Repeat"
          >
            {repeatMode === "off" ? "🔁" : repeatMode === "repeat-all" ? "🔂" : "🔂 1"}
          </button>
        </div>
        <div className="timenvol">
          <div className="songtime">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="volume">
            <img
              width="24px"
              src={isMuted ? muteIcon : volumeIcon}
              alt="Mute/Unmute"
              onClick={toggleMute}
            />
            <input
              type="range"
              name="volume"
              value={volume * 100}
              onChange={changeVolume}
              disabled={isMuted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playbar;