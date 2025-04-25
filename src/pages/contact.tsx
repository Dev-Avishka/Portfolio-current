import { useState } from 'react';
import './styles/app.universal.css';
import './styles/contact.css';
import emailjs from '@emailjs/browser';
import Footer from './components/footer';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
    
        const serviceID = 'service_huj9yfx';
        const templateID = 'template_227vzvg';
        const publicKey = 'CiyomFaloFH6O5h5s';
    
        emailjs.send(serviceID, templateID, formData, publicKey)
            .then((response) => {
                console.log('SUCCESS! 🥳', response.status, response.text);
                setIsSubmitting(false);
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            })
            .catch((err) => {
                console.error('FAILED... 😵', err);
                setIsSubmitting(false);
                setSubmitStatus('error');
            });
    };
    

    return (
        <div className="app">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch</h1>
                    <div className="contact-info">
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <a href="mailto:dabdissanayake@gmail.com">dabdissanayake@gmail.com</a>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone:</span>
                            <a href="tel:+94722744040">+94 (722) 744040</a>
                        </div>
                    </div>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input 
                            type="text" 
                            id="subject" 
                            name="subject" 
                            value={formData.subject}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows={6} 
                            value={formData.message}
                            onChange={handleChange}
                            required 
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-btn" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    {submitStatus === 'success' && (
                        <div className="status-message success">
                            Message sent successfully!
                        </div>
                    )}
                    
                    {submitStatus === 'error' && (
                        <div className="status-message error">
                            Failed to send message. Please try again.
                        </div>
                    )}
                </form>
            </div>
            <Footer />
        </div>
    );
}