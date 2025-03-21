import React, { useEffect, useState, memo } from 'react';
import { Repository, getRepositories } from '../services/github';

const ProjectCard = memo(({ repo }: { repo: Repository }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-3d transform hover:-translate-y-1 transition-all duration-300">
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{repo.name}</h3>
      <p className="text-gray-600 mb-4 h-20 overflow-hidden">
        {repo.description || 'No description available'}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {repo.topics.map((topic) => (
          <span
            key={topic}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center">
          <span className="w-3 h-3 rounded-full mr-2" 
            style={{ 
              backgroundColor: repo.language ? 
                `var(--color-${repo.language.toLowerCase()})` : '#ccc'
            }}
          />
          {repo.language || 'Unknown'}
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {repo.stargazers_count}
        </span>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-50 border-t">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        View on GitHub
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
));

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Projects</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const paginatedRepos = repos.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedRepos.length < repos.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRepos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(Projects);
