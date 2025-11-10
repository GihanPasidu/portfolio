import React, { useEffect, useState, memo } from 'react';
import { Repository, getRepositories } from '../services/github';
import StyledBox from '../components/StyledBox';

const ProjectCard = memo(({ repo }: { repo: Repository }) => (
  <StyledBox>
    <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
    <p className="text-white/80 description line-clamp-3 mb-2">{repo.description || 'No description available'}</p>
    {repo.homepage && (
      <div className="mt-4">
        <a 
          href={repo.homepage} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center"
        >
          <span>View Demo</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    )}
    <div className="mt-3 flex flex-wrap justify-between items-center gap-2">
      <span className="text-sm text-white/70">Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm flex items-center"
      >
        <span>View on GitHub</span>
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
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
        // Filter out forked repositories
        const ownRepos = data.filter(repo => !repo.fork);
        setRepos(ownRepos);
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
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
    <div className="projects-container pt-24 md:pt-28 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRepos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8 mb-12">
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
