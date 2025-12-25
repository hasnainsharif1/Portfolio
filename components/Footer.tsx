import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-[#02050a] border-t border-slate-900 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-slate-500 font-mono text-sm">
          Designed & Built by <span className="text-neon-blue">GEVSolution</span>
        </p>
        <p className="text-slate-700 text-xs mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;