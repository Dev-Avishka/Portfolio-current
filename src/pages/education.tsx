import { useState } from 'react';
import './styles/app.universal.css';
import './styles/education.css';

export default function Education() {
  const [isHovered, setIsHovered] = useState(null);
  
  const educationData = [
    {
      id: 1,
      institution: "Edith Cowan University (ECU)",
      degree: "Computer Science",
      period: "2025 - Present",
      description: "Currently pursuing a degree in Computer Science",
      current: true
    },
    {
      id: 2,
      institution: "Edith Cowan College (ECC)",
      degree: "Computer Science",
      period: "2024 - 2025",
      description: "Finished the foundation degree",
      current: false
    },
    {
      id: 3,
      institution: "Ananda College",
      degree: "O/Ls Completed",
      period: "2012 - 2024",
      description: "Completed primary and secondary education including O/Ls",
      current: false
    }
  ];

  return (
    <div className="app">
      <div className="timeline-container">
        <h1 className="timeline-title">My Educational Journey</h1>
        <br></br>
        <div className="timeline-single-column">
          {educationData.map((item, index) => (
            <div key={item.id} className="timeline-item-wrapper">
              <div 
                className={`timeline-item ${item.current ? 'current' : 'past'}`}
          
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className={`timeline-content ${isHovered === item.id ? 'hovered' : ''}`}>
                  <div className="timeline-date">{item.period}</div>
                  <div className="timeline-box">
                    <h3>{item.institution}</h3>
                    <h4>{item.degree}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
              
              {index < educationData.length - 1 && (
                <div className="timeline-connector-vertical">
                  <div className="connector-line-vertical"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}