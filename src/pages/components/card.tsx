import { useState } from 'react';
import './styles/card.css';

type CardProp = {
    Title: string;
    image_path: string; // like after the title a square rounded image
    description: string; // in the back
    link: string; // in the back and in a take me button
}

export default function Card({ Title, image_path, description, link }: CardProp) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card-container">
            <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardFlip}>
                <div className="card-front">
                    <h3 className="card-title">{Title}</h3>
                    <div className="card-image-container">
                        <img src={image_path} alt={Title} className="card-image" />
                    </div>
                    <div className="card-flip-hint">
                        <span className="flip-icon">↻</span>
                        <span className="flip-text">Tap to flip</span>
                    </div>
                </div>
                <div className="card-back">
                    <h3 className="card-title">{Title}</h3>
                    <p className="card-description">{description}</p>
                    <a 
                        href={link} 
                        className="card-button" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Take me there
                    </a>
                    <div className="card-flip-back">
                        <span className="flip-icon">↻</span>
                        <span className="flip-text">Tap to flip back</span>
                    </div>
                </div>
            </div>
        </div>
    );
}