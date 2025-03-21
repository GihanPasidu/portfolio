const GITHUB_API = 'https://api.github.com';

export interface GithubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
  stargazers_count: number;
}

export const getGithubProfile = async (username: string): Promise<GithubProfile> => {
  const response = await fetch(`${GITHUB_API}/users/${username}`);
  return response.json();
};

export const getRepositories = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`${GITHUB_API}/users/${username}/repos`);
  return response.json();
};
