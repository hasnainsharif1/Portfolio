import React from 'react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-neon-bg relative overflow-hidden">
       {/* Decorative blob */}
       <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-neon-blue font-mono">03.</span> What I Do
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From architecture design to deployment, I offer comprehensive software solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            // Dynamically resolve icon
            const IconComponent = (Icons as any)[service.iconName] || Icons.Code2;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-neon-purple/50 hover:bg-slate-800/80 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-neon-purple/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-neon-purple group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;