import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/home';
import Contact from './pages/contact';
import About from './pages/about';
import Projects from './pages/projects';
import about from './icons/about.png'
import projects from './icons/projects.png'
import contact from './icons/contact.png';
import settings from './icons/settings.png';
import Settings from './pages/settings';
import skills from './icons/skills.png'
import cloud from './icons/cloud.png'
import Skills from './pages/skills';
import edu from './icons/edu.png';
import resume from './icons/resume.png';
import blog from './icons/blog.png';
import hobbies from './icons/hobbies.png';
import Education from './pages/education';
import Hobbies from './pages/hobbies';
import Resume from './pages/resume';
import Cloud from './pages/cloud';
import Blog from './pages/blog';
import appstore from './icons/appstore.png'
import Store from './pages/store';
import Calc from './pages/calc';
import calc from './icons/calculator.svg'
import work from './icons/work.png'
import Experience from './pages/experience';
function App() {
  const [currentApp, setCurrentApp] = useState("home");
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const iscloudinstalled = localStorage.getItem('installed_cloud') !== null;
  const iscalcinstalled = localStorage.getItem('installed_calc') !== null;
  // App definitions
  const apps = [
    { id: "about", name: "About Me", icon: about },
    { id: "projects", name: "Projects", icon: projects },
    { id: "contact", name: "Contact", icon: contact },
    { id: "skills", name: "Skills", icon: skills },
    { id: "education", name: "Education", icon: edu },
    { id: "resume", name: "Resume", icon: resume },
    { id: "blog", name: "Blog", icon: blog },
    { id: "exp", name: "Experience", icon: work },
    { id: "hobbies", name: "Hobbies", icon: hobbies },
    { id: "settings", name: "Settings", icon: settings },
    { id: "store", name: "App Store", icon: appstore },
  ];
  if (iscloudinstalled == true){
    apps.push({ id: "cloud", name: "Cloud", icon: cloud });
  }
  if (iscalcinstalled == true){
    apps.push({ id: "calc", name: "Calculator", icon: calc });
  }
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
      case "skills":
        return <Skills />;
      case "education":
        return <Education />;
      case "hobbies":
        return <Hobbies></Hobbies>
      case "resume":
        return <Resume />;
      case "cloud":
        return <Cloud />
      case "blog":
        return <Blog />
      case "store":
        return <Store />
      case "calc":
        return <Calc />
      case "exp":
        return <Experience />
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
              <span className='status-icon'>🛜</span>
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
      <div className='bottomtext'>
        <h1>Hey I am Dev Avihka Go through each app and Appstore to find info about me</h1>
      </div>
    </>
  );
}

export default App;