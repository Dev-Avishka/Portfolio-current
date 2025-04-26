import { useState } from 'react';
import './styles/app.universal.css';
import './styles/hobbies.css';

export default function Hobbies() {
  const [isHovered, setIsHovered] = useState(null);
  
  const hobbiesData = [
    {
      id: 1,
      title: "Minecraft",
      description: "Playing Minecraft on my free time",
      image: "/hobby/minecraft.svg"
    },
    {
      id: 2,
      title: "Coding",
      description: "Building applications and solving problems through programming.",
      image: "/hobby/coding.jpg"
    },
    {
      id: 3,
      title: "Video Editing",
      description: "Editing Videos using Premiere pro",
      image: "/hobby/video.png"
    }
  ];

  return (
    <div className="app">
      <div className="hobbies-container">
        <h1 className="hobbies-title">My Hobbies</h1>
        
        <div className="hobbies-list">
          {hobbiesData.map((hobby) => (
            <div 
              key={hobby.id}
              className="hobby-item"
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className={`hobby-content ${isHovered === hobby.id ? 'hovered' : ''}`}>
                <div className="hobby-image-container">
                  <img 
                    src={hobby.image} 
                    alt={hobby.title} 
                    className="hobby-image" 
                  />
                </div>
                <div className="hobby-info">
                  <h3 className="hobby-title">{hobby.title}</h3>
                  <p className="hobby-description">{hobby.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}