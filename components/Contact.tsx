import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSent(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-[#050a14] border-t border-slate-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-neon-green font-mono">04.</span> Get In Touch
          </h2>
          <p className="text-slate-400">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Contact Info Side */}
          <div className="col-span-1 space-y-8">
             <div className="space-y-4">
               <h3 className="text-white font-bold text-xl">Contact Info</h3>
               <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-neon-blue" />
                  <a href="mailto:hasnainsharif713@gmail.com" className="hover:text-white transition-colors">hasnainsharif713@gmail.com</a>
               </div>
               <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-neon-blue" />
                  <span>Remote / Global</span>
               </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-white font-bold text-xl">Socials</h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link) => (
                    <a 
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-neon-blue hover:text-black transition-all duration-300"
                    >
                      {link.platform[0]}
                    </a>
                  ))}
                </div>
             </div>
          </div>

          {/* Form Side */}
          <div className="col-span-1 md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-mono text-slate-500">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-mono text-slate-500">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                  <label htmlFor="subject" className="text-sm font-mono text-slate-500">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  />
              </div>

              <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-mono text-slate-500">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  ></textarea>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded border border-red-900/50">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isSent}
                className={`w-full py-4 rounded-lg font-bold text-black transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSent 
                  ? 'bg-green-500 cursor-default' 
                  : 'bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90'
                }`}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : isSent ? (
                  <>
                    <CheckCircle className="w-5 h-5" /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;