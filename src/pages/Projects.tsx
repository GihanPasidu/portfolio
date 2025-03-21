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
      <h2 className="text-2xl font-bold mb-6">My Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {repos.map(repo => (
          <div key={repo.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View on GitHub
              </a>
            </div>
            <p className="text-gray-600 mb-4">{repo.description || 'No description available'}</p>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {repo.topics.map(topic => (
                  <span key={topic} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                {repo.language && (
                  <span className="flex items-center text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-gray-400 mr-1"></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center text-gray-600">
                  ⭐ {repo.stargazers_count} stars
                </span>
                <span className="flex items-center text-gray-600">
                  🍴 {repo.forks_count} forks
                </span>
              </div>

              {repo.homepage && (
                <a 
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  🌐 Live Demo
                </a>
              )}

              <div className="text-sm text-gray-500">
                Last updated: {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
