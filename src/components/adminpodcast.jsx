import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/adminpodcast.css";
import { useNavigate } from "react-router-dom";


function AdminPodcast() {

  // ================= STATE =================
  const [podcasts, setPodcasts] = useState([]);
const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audio, setAudio] = useState("");
  const [category, setCategory] = useState("all");

  const [editId, setEditId] = useState(null);

  const username = localStorage.getItem("username") || "Admin";
  const firstLetter = username.charAt(0).toUpperCase();

  // ================= FETCH PODCASTS =================
  useEffect(() => {
    fetchPodcasts();
  }, []);

 const fetchPodcasts = async () => {
  const res = await axios.get("http://127.0.0.1:8000/get_podcasts/");
  setPodcasts(res.data || []);
};

  // ================= CREATE PODCAST =================
  const createPodcast = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/create_podcasts/", {
        title,
        description,
        audio,
        category
      });

      toast.success("Podcast Created Successfully");

      clearForm();
      fetchPodcasts();

    } catch (err) {
      console.log(err);
      toast.error("Error creating podcast");
    }
  };

  // ================= EDIT PODCAST =================
  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setAudio(item.audio);
    setCategory(item.category);
  };

  // ================= UPDATE PODCAST =================
  const updatePodcast = async () => {
    try {
     await axios.patch(
  `http://127.0.0.1:8000/update_podcasts/${editId}/`,
  {
    title,
    description,
    audio,
    category
  }
);

      toast.success("Podcast Updated");
      clearForm();
      fetchPodcasts();

    } catch (err) {
      console.log(err);
    }
  };
  
  // ================= DELETE PODCAST =================
  const deletePodcast = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/delete_podcasts/${id}/`
      );

      toast.success("Podcast Deleted");
      fetchPodcasts();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= CLEAR FORM =================
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setAudio("");
    setCategory("all");
    setEditId(null);
  };

  return (
    <div className="admin-dashboard1">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar1">
        <h2>Podcast Panel</h2>

      
      </div>

      {/* ================= MAIN ================= */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar1">
          <h2>🎧 Podcast Management</h2>

          <div className="profile">
            <div className="avatar">{firstLetter}</div>
            <div>
              <h4>{username}</h4>
              <p>Admin</p>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="form-card1">

          <h3>{editId ? "Update Podcast" : "Create Podcast"}</h3>

          <input
            type="text"
            placeholder="Podcast Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Audio URL (mp3 link)"
            value={audio}
            onChange={(e) => setAudio(e.target.value)}
          />
          

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="news">News</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="technology">Technology</option>
          </select>

          <button
            className="btn1"
            onClick={editId ? updatePodcast : createPodcast}
          >
            {editId ? "Update Podcast" : "Create Podcast"}
          </button>

          {editId && (
            <button className="cancel-btn" onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>

        {/* ================= PODCAST LIST ================= */}
        <div className="grid">

          {podcasts.map((item) => (
            <div className="card" key={item.id}>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              {/* AUDIO PLAYER */}
              <audio controls>
                <source src={item.audio} type="audio/mp3" />
              </audio>

              <span className="tag">{item.category}</span>

              <div className="actions">

                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>

                <button onClick={() => deletePodcast(item.id)}>
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AdminPodcast;