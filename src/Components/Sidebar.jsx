import Footer from "./Footer";

const Sidebar = ({ isOpen, onClose, songs, onSongSelect }) => {
  return (
    <div className={`left ${isOpen ? "open" : "closed"}`}>
      <div className="close" onClick={onClose}>
        <img className="invert" src="/img/closeicon.svg" alt="Close" />
      </div>
      <div className="home bg-grey rounded m-1 p-1">
        <div className="logo">
          <img width="110" className="invert" src="/img/logo.svg" alt="Logo" />
          <ul>
            <li>
              <img className="invert" src="/img/home.svg" alt="Home" />
              Home
            </li>
            <li>
              <img className="invert" src="/img/search.svg" alt="Search" />
              Search
            </li>
          </ul>
        </div>
        
      </div>
      <div className="library bg-grey rounded m-1 p-1">
        <div className="heading">
          <img className="invert" src="/img/playlist.svg" alt="Playlist" />
          <h2 className="g-2 font-semibold text-lg">Your Library</h2>
        </div>
        <div className="songlist ">
          <ul>
            {songs.map((song, index) => (
              <li key={index} onClick={() => onSongSelect(song)}>{song.name}
              <span><button>
                  <img src="/img/play.svg" alt="Play" className="w-5 invert" />
                </button></span></li>
              
            ))}
          </ul>
        </div>
        <div><Footer/></div>
      </div>
    </div>
  );
 
};

export default Sidebar;



