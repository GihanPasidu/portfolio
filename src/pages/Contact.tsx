import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import StyledBox from '../components/StyledBox';
import { emailConfig } from '../config/emailConfig';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const templateParams = {
      name: formState.name,
      email: formState.email,
      message: formState.message,
      title: `Message from ${formState.name}`, // For the subject line
    };

    try {
      await emailjs.send(
        emailConfig.serviceId, 
        emailConfig.templateId, 
        templateParams, 
        emailConfig.publicKey
      );
      setSubmitResult({ 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      });
      // Reset form
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitResult({ 
        success: false, 
        message: 'Sorry, there was an error sending your message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container min-h-screen py-12 pt-24 md:pt-28 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Contact Me</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StyledBox>
            <h2 className="text-xl font-semibold mb-4 text-white">Get in Touch</h2>
            <p className="text-white/80 mb-6">
              Have a question or want to work together? Feel free to reach out to me using the form or through any of the channels below.
            </p>
            
            {/* Social Media Links - Vertical Layout */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <a href="mailto:cloudnextra@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">cloudnextra@gmail.com</a>
                </div>
              </div>
              
              {/* GitHub */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">GitHub</h3>
                  <a href="https://github.com/GihanPasidu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">@GihanPasidu</a>
                </div>
              </div>
              
              {/* LinkedIn */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">LinkedIn</h3>
                  <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">My LinkedIn Profile</a>
                </div>
              </div>
              
              {/* Twitter/X */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.196 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-white">Twitter</h3>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">@YourTwitterHandle</a>
                </div>
              </div>
            </div>
          </StyledBox>
          
          <StyledBox>
            <h2 className="text-xl font-semibold mb-4 text-white">Send a Message</h2>
            
            {submitResult && (
              <div className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-800/50 text-green-200' : 'bg-red-800/50 text-red-200'}`}>
                {submitResult.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name" 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Your email" 
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your message" 
                  rows={5}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </StyledBox>
        </div>
      </div>
    </div>
  );
};

export default Contact;
