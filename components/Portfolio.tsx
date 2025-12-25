import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { Github, ExternalLink, X, CheckCircle2, Loader2 } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In development, use proxy (empty string = relative URL uses vite proxy)
        // In production, use full URL from environment variable
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const apiEndpoint = apiUrl ? `${apiUrl}/api/projects` : '/api/projects';
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Could not load projects from the server. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-neon-green font-mono">02.</span> Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A selection of my recent work, featuring full-stack applications, AI integrations, and developer tools.
          </p>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-neon-blue">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-mono text-sm">Loading data from backend...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10 bg-red-900/20 border border-red-900/50 rounded-lg">
            <p className="text-red-400 font-mono mb-2">Error: {error}</p>
            <p className="text-slate-500 text-sm">Try running 'npm run dev' to start both server and frontend.</p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-blue/10 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="px-6 py-2 bg-neon-blue/90 text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 flex-1">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs font-mono text-neon-blue bg-neon-blue/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs font-mono text-slate-500 py-1">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row relative"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-800 relative">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:hidden"></div>
                </div>

                <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-neon-blue font-mono text-sm mb-6">{selectedProject.role}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">About Project</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                     <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Tech Stack</h4>
                     <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-slate-800 text-slate-200 text-xs rounded-md border border-slate-700">
                            {tech}
                          </span>
                        ))}
                     </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-slate-800">
                    {selectedProject.repoLink && (
                      <a 
                        href={selectedProject.repoLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-white hover:text-neon-purple transition-colors"
                      >
                        <Github className="w-5 h-5" /> Source Code
                      </a>
                    )}
                    {selectedProject.demoLink && (
                      <a 
                        href={selectedProject.demoLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-white hover:text-neon-blue transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;