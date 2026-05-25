import { useEffect, useState } from "react";
import axios from "axios";
import "../css/adminuser.css";

function AdminUsers() {

  // ================= STATES =================

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [analytics, setAnalytics] = useState({

    total_users: 0,

    active_users: 0,

    blocked_users: 0,

    admins: 0

  });

  // ================= FETCH DATA =================

  useEffect(() => {

    fetchUsers();

    fetchAnalytics();

  }, []);

  // ================= FILTER USERS =================

  const filteredUsers = users.filter((user) => {

    return (

      user.username
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  // ================= FETCH USERS =================

  const fetchUsers = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/get_users/"

      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= FETCH ANALYTICS =================

  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/user_analytics/"

      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= DELETE USER =================

  const deleteUser = async (id) => {

    try {

      await axios.delete(

        `http://127.0.0.1:8000/delete_user/${id}/`

      );

      fetchUsers();

      fetchAnalytics();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= BLOCK / UNBLOCK =================

  const toggleStatus = async (id) => {

    try {

      await axios.patch(

        `http://127.0.0.1:8000/toggle_user_status/${id}/`

      );

      fetchUsers();

      fetchAnalytics();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="users-page">

      {/* HEADER */}

      <div className="users-header">

        <h1>
          Manage Users
        </h1>

        <p>
          Admin user management dashboard
        </p>

      </div>

      {/* ANALYTICS */}

      <div className="analytics-grid">

        <div className="analytics-card">

          <h2>
            {analytics.total_users}
          </h2>

          <p>
            Total Users
          </p>

        </div>

        <div className="analytics-card">

          <h2>
            {analytics.active_users}
          </h2>

          <p>
            Active Users
          </p>

        </div>

        <div className="analytics-card">

          <h2>
            {analytics.blocked_users}
          </h2>

          <p>
            Blocked Users
          </p>

        </div>

        <div className="analytics-card">

          <h2>
            {analytics.admins}
          </h2>

          <p>
            Admins
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search users by username or email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* TABLE */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Username</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th>Joined</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredUsers.map((user) => (

                <tr key={user.id}>

                  <td>
                    {user.id}
                  </td>

                  <td>
                    {user.username}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>

                    {
                      user.is_superuser
                        ? "Admin"
                        : "User"
                    }

                  </td>

                  <td>

                    {

                      user.is_active

                        ? (

                          <span className="active">

                            Active

                          </span>

                        )

                        : (

                          <span className="blocked">

                            Blocked

                          </span>

                        )

                    }

                  </td>

                  <td>

                    {
                      user.date_joined?.slice(0, 10)
                    }

                  </td>

                  <td className="actions">

                    <button
                      className="block-btn"
                      onClick={() =>
                        toggleStatus(user.id)
                      }
                    >

                      {
                        user.is_active
                          ? "Block"
                          : "Unblock"
                      }

                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(user.id)
                      }
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminUsers;