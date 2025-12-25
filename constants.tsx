import { Service, Skill } from './types';
import { 
  Code2, 
  BrainCircuit, 
  ShoppingCart, 
  LayoutTemplate
} from 'lucide-react';
import React from 'react';

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const SKILLS: Skill[] = [
  { name: 'React.js', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 90, category: 'Backend' },
  { name: 'Laravel (PHP)', level: 85, category: 'Backend' },
  { name: 'Python', level: 88, category: 'Backend' },
  { name: 'MySQL / PostgreSQL', level: 85, category: 'Database' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
  { name: 'AI / ML Integration', level: 80, category: 'AI/ML' },
  { name: 'Git & DevOps', level: 85, category: 'Tools' },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using React, Node.js, Laravel, and modern databases.',
    iconName: 'Code2'
  },
  {
    id: 's2',
    title: 'AI & Automation',
    description: 'Integrating LLMs (Gemini, OpenAI) and automation scripts to optimize business workflows.',
    iconName: 'BrainCircuit'
  },
  {
    id: 's3',
    title: 'CMS Solutions',
    description: 'Custom WordPress plugins, theme development, and migration of legacy sites to modern CMS architectures.',
    iconName: 'LayoutTemplate'
  },
  {
    id: 's4',
    title: 'E-Commerce & TikTok',
    description: 'Setup and management tools for TikTok Shop, Shopify, and custom e-commerce platforms.',
    iconName: 'ShoppingCart'
  },
];

export const SOCIAL_LINKS = [
  { platform: 'GitHub', url: 'https://github.com' },
  { platform: 'LinkedIn', url: 'https://linkedin.com' },
  { platform: 'Fiverr', url: 'https://fiverr.com' },
];