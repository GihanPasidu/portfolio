import React, { useEffect, useState } from 'react';
import { Repository, getRepositories } from '../services/github';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const data = await getRepositories('GihanPasidu');
      setRepos(data);
    };
    fetchRepos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Featured Projects</h2>
        <p className="text-gray-600 mb-6 md:mb-8">A collection of my work and contributions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {repos.map((repo, index) => (
            <div 
              key={repo.id} 
              className="card-3d bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100"
              style={{ 
                opacity: 0,
                animation: 'fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                animationDelay: `${index * 0.15}s`
              }}
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-0">{repo.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">⭐ {repo.stargazers_count}</span>
                    <span className="text-sm text-gray-500">🍴 {repo.forks_count}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map(topic => (
                    <span 
                      key={topic}
                      className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center">
                    {repo.language && (
                      <span className="flex items-center text-sm text-gray-600">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        {repo.language}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Live Demo
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                      View Source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
