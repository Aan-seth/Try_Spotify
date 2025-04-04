import { useState } from "react";
import "./style.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Playbar from "./Components/Playbar";
import MainContent from "./Components/MainContent";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [songs, setSongs] = useState([]); // Store album songs
  const [currentSong, setCurrentSong] = useState(null); // Track playing song

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        songs={songs} 
        onSongSelect={setCurrentSong} 
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setSidebarOpen(true)} />
        <MainContent setSongs={setSongs} onSongSelect={setCurrentSong} />

        <Playbar
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
}

export default App;
