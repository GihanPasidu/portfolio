import React, { useEffect, useState } from 'react';
import { Repository, getRepositories } from '../services/github';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const data = await getRepositories('GihanPasidu');
        setRepos(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching repositories:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Loading Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100/20 p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">Oops!</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Featured Projects</h2>
        <p className="text-gray-600 mb-6 md:mb-8">A collection of my work and contributions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {repos.map((repo, index) => (
            <div 
              key={repo.id} 
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100/20 transform hover:-translate-y-1 transition-all duration-300"
              style={{ 
                opacity: 0,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
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
