import { useState, useEffect } from 'react';
import './styles/app.universal.css';
import './styles/about.css';
import Footer from './components/footer';

export default function About() {
    const [age, setAge] = useState<number>(0);
    
    useEffect(() => {
        // Calculate age based on birthdate
        const calculateAge = () => {
            const birthDate = new Date('2007-08-13');
            const today = new Date();
            
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            
            // Adjust age if birthday hasn't occurred yet this year
            const hasBirthdayOccurred = 
                today.getMonth() > birthDate.getMonth() || 
                (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
            
            if (!hasBirthdayOccurred) {
                calculatedAge--;
            }
            
            setAge(calculatedAge);
        };
        
        calculateAge();
        
        // Recalculate age if component is mounted across days
        const interval = setInterval(calculateAge, 1000 * 60 * 60 * 24);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="app">
            <div className="about-container">
                <div className="about-header">
                    <h1>About Me</h1>
                </div>
                
                <div className="about-content">
                    <section className="about-section personal-info">
                        <h2>Personal Information</h2>
                        <div className="info-item">
                            <span className="info-label">Name:</span>
                            <span className="info-value">Devdisa Avishka Bandara Dissanayake </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Age:</span>
                            <span className="info-value">{age} years old</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Birthday:</span>
                            <span className="info-value">August 13, 2007</span>
                        </div>
                    </section>
                    
                    <section className="about-section bio">
                        <h2>My Story</h2>
                        <div className="bio-content">
                            <p>
                                I am Devdisa Dissanayake  and I am {age} years old I was born in Sri Lanka. I studied in Ananda College for 11 years and Now I am studying Computer Science in ECU.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}