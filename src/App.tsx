import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/home';
import Contact from './pages/contact';
import About from './pages/about';
import Projects from './pages/projects';
import defaultIcon from './pages/default_icon.png';
import about from './icons/about.png'
import projects from './icons/projects.png'
import contact from './icons/contact.png';
import Settings from './pages/settings';

function App() {
  const [currentApp, setCurrentApp] = useState("home");
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // App definitions
  const apps = [
    { id: "about", name: "About Me", icon: about },
    { id: "projects", name: "Projects", icon: projects },
    { id: "contact", name: "Contact", icon: contact },
    { id: "skills", name: "Skills", icon: defaultIcon },
    { id: "education", name: "Education", icon: defaultIcon },
    { id: "resume", name: "Resume", icon: defaultIcon },
    { id: "blog", name: "Blog", icon: defaultIcon },
    { id: "achievements", name: "Achievements", icon: defaultIcon },
    { id: "gallery", name: "Gallery", icon: defaultIcon },
    { id: "testimonials", name: "Testimonials", icon: defaultIcon },
    { id: "hobbies", name: "Hobbies", icon: defaultIcon },
    { id: "settings", name: "Settings", icon: defaultIcon }
  ];
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format the current time
  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Handle app launching
  const launchApp = (appName: string) => {
    setCurrentApp(appName);
    setShowHomeScreen(false);
  };
  
  // Return to home screen
  const goHome = () => {
    setShowHomeScreen(true);
  };
  
  // Render the active app component
  const renderApp = () => {
    switch (currentApp) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      case "settings":
        return <Settings />;
      default:
        return <div className="app">App "{currentApp}" coming soon!</div>;
    }
  };

  return (
    <>
      <div className='frame'>
        <div className='tablet-screen'>
          <div className='status-bar'>
            <div className='status-left'>
              {formatTime()}
            </div>
            <div className='status-right'>
              <span className='status-icon'>📶</span>
              <span className='status-icon'>📱</span>
              <span className='status-icon'>🔋</span>
            </div>
          </div>
          
          <div className='content-area'>
            {showHomeScreen ? (
              <div className='app-grid'>
                {apps.map(app => (
                  <div 
                    key={app.id}
                    className='app-icon' 
                    onClick={() => launchApp(app.id)}
                  >
                    <div className='icon-image'>
                      <img src={app.icon} alt={app.name} className="app-icon-img" />
                    </div>
                    <div className='app-name'>{app.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='app-container'>
                {renderApp()}
              </div>
            )}
            
            {/* Floating Home Button */}
            <div className='home-button-container'>
              <div className='home-button' onClick={goHome}>
                <div className='home-button-inner'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;