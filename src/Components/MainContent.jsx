
import React, { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";
import "../style.css";

const MainContent = ({ setSongs, onSongSelect }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const albumFolders = ["allmoodsongs", "ForGirl's(mood-romantic)", "romanticsongs"];
      const albumData = await Promise.all(
        albumFolders.map(async (folder) => {
          try {
            const response = await fetch(`/songs/${folder}/info.json`);
            const data = await response.json();
            return { ...data, path: `/songs/${folder}` };
          } catch (error) {
            console.error(`Error loading ${folder} album data:`, error);
            return null;
          }
        })
      );

      setAlbums(albumData.filter((album) => album !== null));
    };

    fetchAlbums();
  }, []);

  const handleAlbumClick = async (album) => {
    try {
      const response = await fetch(`${album.path}/info.json`);
      const albumData = await response.json();
      const formattedSongs = albumData.songs.map((song) => ({
        name: song.title,
        src: `${album.path}/${song.file}`,
      }));

      setSongs(formattedSongs);
      if (formattedSongs.length > 0) {
        onSongSelect(formattedSongs[0]);
      }
    } catch (error) {
      console.error("Error loading songs:", error);
    }
  };

  return (
    <div className="spotifyPlaylists">
      <h1 className="text-3xl font-bold">Spotify Playlists</h1>
      <div className="cardContainer">
        {albums.map((album, index) => (
          <AlbumCard
            key={index}
            title={album.title}
            description={album.description}
            cover={`${album.path}/${album.cover}`}
            onClick={() => handleAlbumClick(album)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;