import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  email: string | null;
}

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
  license: {
    name: string;
  } | null;
}

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes
const cache: Record<string, { data: any; timestamp: number }> = {};

function getCachedData(key: string) {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache[key] = { data, timestamp: Date.now() };
}

export async function getGithubProfile(username: string): Promise<GithubProfile> {
  const cacheKey = `profile-${username}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await octokit.users.getByUsername({ username });
    setCachedData(cacheKey, data);
    return data as GithubProfile;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw new Error('Failed to fetch GitHub profile');
  }
}

export async function getRepositories(username: string): Promise<Repository[]> {
  const cacheKey = `repos-${username}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      direction: 'desc',
      per_page: 100,
    });
    setCachedData(cacheKey, data);
    return data as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
}
