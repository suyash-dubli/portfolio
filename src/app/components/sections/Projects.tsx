
'use client'
import React, { useState, useEffect } from 'react';
import ProjectCard from '../ui/ProjectCard';

interface Project {
  title: string;
  description: string;
  url?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        // IMPORTANT: Replace YOUR_GITHUB_USERNAME and YOUR_GITHUB_TOKEN
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
        const token = process.env.GITHUB_TOKEN; // Store this securely, preferably in environment variables
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            'Authorization': `${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();
        
        // Map GitHub repositories to project format
        const projectList: Project[] = repos
          .filter((repo: any) => !repo.fork) // Optionally exclude forked repositories
          .map((repo: any) => ({
            title: repo.name,
            description: repo.description || 'No description available',
            url: repo.html_url
          }))
          .slice(0, 9); // Limit to top 9 projects

        setProjects(projectList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        setIsLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <section id="projects" className="py-16 bg-gray-800 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            title={project.title} 
            description={project.description}
            url={project.url}
          />
        ))}
      </div>
    </section>
  );
}
