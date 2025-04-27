import { useState } from 'react';
import './styles/app.universal.css';
import './styles/education.css';


export default function Experience(){
    const [isHovered, setIsHovered] = useState(null);
  
    const experienceData = [
      {
        id: 1,
        institution: "Unemployeed",
        degree: "Nothing",
        period: "Present",
        description: "Hire me",
        current: true
      }
    ];
  
    return (
      <div className="app">
        <div className="timeline-container">
          <h1 className="timeline-title">My experienceal Journey</h1>
          <br></br>
          <div className="timeline-single-column">
            {experienceData.map((item, index) => (
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
                
                {index < experienceData.length - 1 && (
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