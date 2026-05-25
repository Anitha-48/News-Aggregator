import Navbar from "../components/nav";
import "../css/home.css";

function Home() {

  return (

    <div className="home-page">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}

      <section
        className="hero-section"
        id="home"
      >

        <div className="overlay"></div>

        <div className="hero-content">

          {/* <span className="hero-tag">
            🔥 Live Global Headlines
          </span> */}

          <h1>
            Stay Updated With Latest News
          </h1>

          <p>
            Breaking news from India and around the world with real-time updates,
            trending stories, technology, politics, sports, entertainment and more.
          </p>

          <div className="hero-buttons">

            <a href="#trending">

              <button className="explore-btn">
                Explore News
              </button>

            </a>

            <a href="#categories">

              <button className="trending-btn">
                Trending Topics
              </button>

            </a>

          </div>

        </div>

      </section>

      {/* TRENDING SECTION */}

      {/* TRENDING SECTION */}

<section
  className="trending-section"
  id="trending"
>

  <div className="section-title">

    <h2>
      🔥 Tamil Nadu Trending News
    </h2>

    <p>
      Live breaking headlines from Tamil Nadu and India
    </p>

  </div>

  {/* AUTO SCROLL */}

  <div className="trending-wrapper">

    <div className="trending-grid">

      {/* CARD 1 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
          alt=""
        />

        <div className="trend-content">

          <span>Chennai</span>

          <h3>
            Chennai Metro Phase 2 work progressing rapidly
          </h3>

          <p>
            Tamil Nadu government accelerates metro expansion project.
          </p>

        </div>

      </div>

      {/* CARD 2 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
          alt=""
        />

        <div className="trend-content">

          <span>Sports</span>

          <h3>
            CSK fans celebrate massive IPL victory
          </h3>

          <p>
            Chennai Super Kings dominate thrilling match yesterday.
          </p>

        </div>

      </div>

      {/* CARD 3 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
          alt=""
        />

        <div className="trend-content">

          <span>Business</span>

          <h3>
            Tamil Nadu startups attract global investors
          </h3>

          <p>
            Chennai emerging as India's next technology hub.
          </p>

        </div>

      </div>

      {/* CARD 4 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt=""
        />

        <div className="trend-content">

          <span>Education</span>

          <h3>
            New smart classrooms launched across Tamil Nadu
          </h3>

          <p>
            Government improves digital learning infrastructure statewide.
          </p>

        </div>

      </div>

      {/* CARD 5 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
          alt=""
        />

        <div className="trend-content">

          <span>Health</span>

          <h3>
            Chennai hospitals adopt AI medical technology
          </h3>

          <p>
            Smart healthcare systems improving patient treatment speed.
          </p>

        </div>

      </div>

      {/* CARD 6 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
          alt=""
        />

        <div className="trend-content">

          <span>Politics</span>

          <h3>
            Tamil Nadu assembly discusses major reforms
          </h3>

          <p>
            Important policy changes announced for public welfare.
          </p>

        </div>

      </div>

      {/* CARD 7 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt=""
        />

        <div className="trend-content">

          <span>Weather</span>

          <h3>
            Heavy rainfall expected in coastal districts
          </h3>

          <p>
            Weather department issues alert for Tamil Nadu coast.
          </p>

        </div>

      </div>

      {/* CARD 8 */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7"
          alt=""
        />

        <div className="trend-content">

          <span>Technology</span>

          <h3>
            AI companies expanding operations in Chennai
          </h3>

          <p>
            IT sector growth creates thousands of new jobs.
          </p>

        </div>

      </div>

      {/* DUPLICATE FOR SMOOTH LOOP */}

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c"
          alt=""
        />

        <div className="trend-content">

          <span>Chennai</span>

          <h3>
            Chennai Metro Phase 2 work progressing rapidly
          </h3>

          <p>
            Tamil Nadu government accelerates metro expansion project.
          </p>

        </div>

      </div>

      <div className="trend-card">

        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
          alt=""
        />

        <div className="trend-content">

          <span>Sports</span>

          <h3>
            CSK fans celebrate massive IPL victory
          </h3>

          <p>
            Chennai Super Kings dominate thrilling match yesterday.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* CATEGORY SECTION */}


<section className="categories-section" id="categories">

  <div className="categories-top">

    <span className="category-tag">
      Explore Topics
    </span>

    <h2>
      Browse News Categories
    </h2>

    <p>
      Discover trending stories from multiple categories
      including technology, sports, politics, health,
      business and more.
    </p>

  </div>

  <div className="category-container">

    <div className="category-card">
      <div className="category-icon">⚽</div>
      <h3>Sports</h3>
      <p>Live scores and sports headlines</p>
    </div>

    <div className="category-card">
      <div className="category-icon">💻</div>
      <h3>Technology</h3>
      <p>Latest AI and tech innovations</p>
    </div>

    <div className="category-card">
      <div className="category-icon">💼</div>
      <h3>Business</h3>
      <p>Market updates and economy news</p>
    </div>

    <div className="category-card">
      <div className="category-icon">🏛️</div>
      <h3>Politics</h3>
      <p>Government and world politics</p>
    </div>

    <div className="category-card">
      <div className="category-icon">🏥</div>
      <h3>Health</h3>
      <p>Medical and healthcare updates</p>
    </div>

    <div className="category-card">
      <div className="category-icon">🎓</div>
      <h3>Education</h3>
      <p>Learning and education news</p>
    </div>
        
  </div>

</section>
      {/* CONTACT SECTION */}

      <section
        className="contact-section"
        id="contact"
      >

        <div className="contact-container">

          <div className="contact-left">

            <h2>
              Contact NewsHub
            </h2>

            <p>
              Have questions, feedback or partnership ideas?
              Reach out to our NewsHub team anytime.
            </p>

          </div>

          <div className="contact-right">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <textarea
              placeholder="Your Message"
            ></textarea>

            <button>
              Send Message
            </button>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <h2>
          NewsHub
        </h2>

        <p>
          © 2026 NewsHub. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;