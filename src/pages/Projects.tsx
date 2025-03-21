import React, { useEffect, useState } from 'react';
import { Repository, getRepositories } from '../services/github';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      // Replace 'yourusername' with your actual GitHub username
      const data = await getRepositories('yourusername');
      setRepos(data);
    };
    fetchRepos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map(repo => (
          <div key={repo.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
            <p className="text-gray-600 mb-4">{repo.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                {repo.language}
              </span>
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
