import { useEffect, useState } from "react";
import "../css/adminanalytics.css";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";



function AdminAnalytics() {

  const [analytics, setAnalytics] = useState({

    total_news: 0,

    total_users: 0,

    total_saved: 0,

    categories: [],

    recent_news: []
  });

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/admin_analytics/"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="analytics-container">

      <h1>
        Admin Analytics Dashboard
      </h1>

      {/* TOP CARDS */}

      <div className="analytics-cards">

        <div className="card">
          <h2>Total News</h2>
          <p>{analytics.total_news}</p>
        </div>

        <div className="card">
          <h2>Total Users</h2>
          <p>{analytics.total_users}</p>
        </div>

        <div className="card">
          <h2>Saved News</h2>
          <p>{analytics.total_saved}</p>
        </div>

      </div>

      {/* CHART */}

      <div className="chart-box">

        <h2>
          Category Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={analytics.categories}>

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* RECENT NEWS */}

      <div className="recent-news">

        <h2>
          Recent News
        </h2>

        {
          analytics.recent_news.map((item, index) => (

            <div
              className="recent-card"
              key={index}
            >

              <h3>
                {item.title}
              </h3>

              <p>
                {item.category}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default AdminAnalytics;