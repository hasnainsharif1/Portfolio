import React, { useState, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = `> Initializing Devolution core...\n> Loading modules: React, Node, AI...\n> Status: ONLINE\n> Welcome, User.`;
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [fullText]);

  return (
    <div className="w-full max-w-lg bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-2xl font-mono text-sm md:text-base">
      <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-slate-400 text-xs">bash — devolution-cli</span>
      </div>
      <div className="p-4 h-32 md:h-40 overflow-hidden relative">
        <pre className="text-neon-green whitespace-pre-wrap leading-relaxed">
          {text}
          <span className="animate-pulse inline-block w-2 h-4 bg-neon-green ml-1 align-middle"></span>
        </pre>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-slate-900/10"></div>
      </div>
    </div>
  );
};

export default Terminal;