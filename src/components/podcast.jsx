import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/podcast.css";

function Podcast() {
  const [episodes, setEpisodes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const username = localStorage.getItem("username");

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetchPodcasts();
  }, [category]);

 const fetchPodcasts = async () => {
  try {
    setLoading(true);

    const url =
      category === "all"
        ? "http://127.0.0.1:8000/get_podcasts/"
        : `http://127.0.0.1:8000/get_podcasts/?category=${category}`;

    const res = await axios.get(url);

    setEpisodes(res.data || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  // 🔍 SEARCH FILTER
  const filteredEpisodes = episodes.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  // 🎧 SAFE AUDIO PLAY (NO ABORT ERROR)
  const handlePlay = (url) => {
    if (!url) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.play().catch((err) => {
      console.log("Audio play error:", err);
    });
  };

  // ⭐ SAVE TO BACKEND (REAL)
  const handleSave = async (item) => {
    try {
      await axios.post("http://127.0.0.1:8000/save_podcasts/", {
        title: item.title,
        description: item.description,
        audio: item.audio,
        category: item.category,
        user: username,
      });

      alert("Podcast saved successfully!");
    } catch (err) {
      console.log(err);
      alert("Failed to save podcast");
    }
  };

  return (
    <div className="podcast-page">

      {/* HEADER */}
      <div className="podcast-header">
        <h1>🎧 News Podcast Hub</h1>

        <input
          type="text"
          placeholder="Search podcasts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY */}
      <div className="podcast-categories">
        <button onClick={() => setCategory("all")}>All</button>
        <button onClick={() => setCategory("politics")}>Politics</button>
        <button onClick={() => setCategory("technology")}>Technology</button>
        <button onClick={() => setCategory("health")}>Health</button>
        <button onClick={() => setCategory("sports")}>Sports</button>
      </div>

      {/* GRID */}
      <div className="podcast-grid">

        {filteredEpisodes.map((item) => (
          <div className="podcast-card" key={item.id}>

            <div className="podcast-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <span className="tag">{item.category}</span>
            </div>

            {/* AUDIO PLAYER (REAL) */}
            {item.audio && (
              <audio controls className="audio-player">
                <source src={item.audio} type="audio/mpeg" />
              </audio>
            )}

            {/* ACTIONS */}
            <div className="podcast-actions">

              <button
                className="play-btn"
                onClick={() => handlePlay(item.audio)}
              >
                ▶ Play
              </button>

              <button
                className="save-btn"
                onClick={() => handleSave(item)}
              >
                ⭐ Save
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Podcast;