const GITHUB_API = 'https://api.github.com';

export interface GithubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company: string;
  email: string;
  blog: string;
  twitter_username: string;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
  homepage: string;
  forks_count: number;
  watchers_count: number;
  default_branch: string;
}

export const getGithubProfile = async (username: string): Promise<GithubProfile> => {
  const response = await fetch(`${GITHUB_API}/users/${username}`);
  return response.json();
};

export const getRepositories = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${GITHUB_API}/users/${username}/repos`);
  return response.json();
};
