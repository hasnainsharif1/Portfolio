import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Code, Database, Cpu, Wrench } from 'lucide-react';

const About: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  const getIcon = (category: string) => {
    switch(category) {
      case 'Frontend': return <Code className="w-5 h-5 text-neon-blue" />;
      case 'Backend': return <Database className="w-5 h-5 text-neon-purple" />;
      case 'AI/ML': return <Cpu className="w-5 h-5 text-neon-green" />;
      default: return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-neon-bg relative border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            <span className="text-neon-purple font-mono">01.</span> About Me
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            className="h-1 bg-neon-purple mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Bio Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-slate-400 leading-relaxed"
          >
            <h3 className="text-2xl font-bold text-white">
              Engineering Digital Experiences for over <span className="text-neon-blue">5 Years</span>
            </h3>
            <p>
              Hello! I'm Hasnain Sharif, a Full-Stack Engineer. I have a passion for creating things that live on the internet, 
              from simple websites to complex cloud-based software architectures.
            </p>
            <p>
              My journey started with a simple "Hello World" in Python and has evolved into managing 
              <span className="text-white font-semibold"> 250+ completed projects</span> for clients globally. 
              Whether it's integrating the latest AI models or converting legacy systems to modern CMS, 
              I bring precision and creativity to every line of code.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <div className="text-3xl font-bold text-white mb-1">250+</div>
                <div className="text-sm font-mono text-slate-500">Projects Completed</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                <div className="text-3xl font-bold text-white mb-1">5+</div>
                <div className="text-sm font-mono text-slate-500">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-1 gap-6"
          >
             {categories.map((cat, idx) => (
               <div key={idx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-neon-blue/30 transition-colors">
                 <div className="flex items-center gap-3 mb-4">
                   {getIcon(cat)}
                   <h4 className="text-lg font-semibold text-white">{cat}</h4>
                 </div>
                 <div className="space-y-4">
                   {SKILLS.filter(s => s.category === cat).map((skill) => (
                     <div key={skill.name}>
                       <div className="flex justify-between text-sm mb-1">
                         <span className="text-slate-300 font-mono">{skill.name}</span>
                         <span className="text-slate-500">{skill.level}%</span>
                       </div>
                       <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${skill.level}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1, delay: 0.2 }}
                           className={`h-full rounded-full ${
                              cat === 'Frontend' ? 'bg-neon-blue' : 
                              cat === 'Backend' ? 'bg-neon-purple' : 
                              cat === 'AI/ML' ? 'bg-neon-green' : 'bg-slate-400'
                           }`}
                         ></motion.div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;