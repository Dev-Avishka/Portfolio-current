import { useState, useEffect } from 'react';
import './styles/home.css';

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    // Set appropriate greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    
    // Update date and time
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return currentDate.toLocaleDateString(undefined, options);
  };

  return (
    <div className="app home-app">
      <div className="welcome-container">
        <div className="greeting-text">{greeting}</div>
        <h1 className="welcome-text">Welcome to My Portfolio</h1>
        <div className="date-text">{formatDate()}</div>
        
        <div className="home-intro">
          <p>I'm a Computer Science student passionate about creating innovative solutions. 
          This interactive portfolio demonstrates my skills and showcases my projects.</p>
          <p>Tap on any app icon to explore different sections of my portfolio.</p>
        </div>
        
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Years Coding</div>
          </div>
        </div>
        
        <div className="home-footer">
          <p>Built with React • Last Updated: April 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Home;