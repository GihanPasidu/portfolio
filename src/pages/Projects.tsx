import React, { useEffect, useState, memo } from 'react';
import { Repository, getRepositories } from '../services/github';
import StyledBox from '../components/StyledBox';

const ProjectCard = memo(({ repo }: { repo: Repository }) => (
  <StyledBox>
    <h3 className="text-xl font-semibold mb-2 text-white">{repo.name}</h3>
    <p className="text-white/80 description">{repo.description || 'No description available'}</p>
    {repo.homepage && (
      <div className="mt-4">
        <a 
          href={repo.homepage} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          View Demo
        </a>
      </div>
    )}
    <div className="mt-3 flex justify-between items-center">
      <span className="text-sm text-white/70">Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm"
      >
        View on GitHub
      </a>
    </div>
  </StyledBox>
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
          <p className="text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StyledBox className="bg-red-900/20 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-red-300 mb-2">Error Loading Projects</h3>
          <p className="text-red-200">{error}</p>
        </StyledBox>
      </div>
    );
  }

  const paginatedRepos = repos.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedRepos.length < repos.length;

  return (
    <div className="projects-container pt-24 md:pt-28"> {/* Increased top padding here */}
      <h1 className="text-3xl font-bold mb-8 text-center text-white">My Projects</h1>
      <div className="projects-grid">
        {paginatedRepos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(p => p + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(Projects);
