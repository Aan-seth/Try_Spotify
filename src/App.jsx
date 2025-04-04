// App.js
import { useState, useEffect } from "react";
import "./style.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Playbar from "./Components/Playbar";
import MainContent from "./Components/MainContent";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState(false);

  useEffect(() => {
    const loadDefaultAlbum = async () => {
      try {
        const response = await fetch("/songs/allmoodsongs/info.json");
        const data = await response.json();
        const formattedSongs = data.songs.map(song => ({
          name: song.title,
          src: `/songs/allmoodsongs/${song.file}`,
        }));
        setSongs(formattedSongs);
        if (formattedSongs.length > 0) {
          setCurrentSong(formattedSongs[0]);
          setAutoPlayTrigger(true);
        }
      } catch (err) {
        console.error("Error loading default album:", err);
      }
    };

    loadDefaultAlbum();
  }, []);

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        songs={songs}
        currentSong={currentSong}
        onSongSelect={(song) => {
          setCurrentSong(song);
          setAutoPlayTrigger(true);
        }}
      />
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setSidebarOpen(true)} />
        <MainContent
          setSongs={setSongs}
          onSongSelect={(song) => {
            setCurrentSong(song);
            setAutoPlayTrigger(true);
          }}
        />
        <Playbar
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          autoPlayTrigger={autoPlayTrigger}
          setAutoPlayTrigger={setAutoPlayTrigger}
        />
      </div>
    </div>
  );
}

export default App;
