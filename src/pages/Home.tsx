import React, { useEffect, useState } from 'react';
import { GithubProfile, getGithubProfile } from '../services/github';

const Home: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Replace 'yourusername' with your actual GitHub username
      const data = await getGithubProfile('yourusername');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-6">
          <img src={profile.avatar_url} alt="Profile" className="w-32 h-32 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">@{profile.login}</p>
            <p className="mt-2">{profile.bio}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{profile.public_repos}</div>
            <div className="text-gray-600">Repositories</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{profile.followers}</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold">{profile.following}</div>
            <div className="text-gray-600">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
