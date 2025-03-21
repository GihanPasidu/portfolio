import React, { useEffect, useState } from 'react';
import { GithubProfile, getGithubProfile } from '../services/github';

const Home: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getGithubProfile('GihanPasidu');
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:space-x-8 bg-white p-6 rounded-lg shadow">
          <img src={profile.avatar_url} alt="Profile" className="w-40 h-40 rounded-full mb-4 md:mb-0" />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">@{profile.login}</p>
            <p className="mt-2 text-gray-800">{profile.bio}</p>
            <div className="mt-4 space-y-2">
              {profile.location && (
                <p className="text-gray-600">
                  <span className="font-medium">📍 Location:</span> {profile.location}
                </p>
              )}
              {profile.company && (
                <p className="text-gray-600">
                  <span className="font-medium">🏢 Company:</span> {profile.company}
                </p>
              )}
              {profile.blog && (
                <p className="text-gray-600">
                  <span className="font-medium">🌐 Website:</span>{' '}
                  <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {profile.blog}
                  </a>
                </p>
              )}
              {profile.email && (
                <p className="text-gray-600">
                  <span className="font-medium">📧 Email:</span> {profile.email}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">🎉 Joined:</span>{' '}
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{profile.public_repos}</div>
            <div className="text-gray-600">Repositories</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">{profile.followers}</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-purple-600">{profile.following}</div>
            <div className="text-gray-600">Following</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {new Date(profile.created_at).getFullYear()}
            </div>
            <div className="text-gray-600">Member Since</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
