import React from 'react';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  imageUrl: string;
  repoLink?: string;
  demoLink?: string;
  role: string;
  features: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'AI/ML';
  // Fix: Ensure React namespace is available via import
  icon?: React.ReactNode;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface NavItem {
  label: string;
  href: string;
}