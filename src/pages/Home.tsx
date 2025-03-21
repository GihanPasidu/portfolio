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

  if (!profile) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-auto p-6 md:p-8 bg-gradient-to-br from-blue-800 to-blue-900 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-md transform hover:scale-110 transition-transform duration-300"></div>
                <img 
                  src={profile.avatar_url} 
                  alt={profile.name}
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl mx-auto object-cover hover:scale-105 transition-all duration-300 float-shadow"
                  style={{ 
                    objectFit: 'cover',
                    transform: 'translateZ(0)'  // Force GPU acceleration
                  }}
                />
              </div>
              <div className="mt-6 text-center text-white">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-blue-200 mt-2">@{profile.login}</p>
              </div>
            </div>
            <div className="p-6 md:p-8 fade-in w-full" style={{animationDelay: '0.3s'}}>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed">{profile.bio}</p>
                <div className="mt-6 space-y-3">
                  {profile.location && (
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {profile.location}
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">🏢 Company:</span> {profile.company}
                    </div>
                  )}
                  {profile.blog && (
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">🌐 Website:</span>{' '}
                      <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profile.blog}
                      </a>
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">📧 Email:</span> {profile.email}
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">🎉 Joined:</span>{' '}
                    {new Date(profile.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Repositories"
            value={profile.public_repos}
            color="blue"
          />
          <StatCard
            title="Followers"
            value={profile.followers}
            color="green"
          />
          <StatCard
            title="Following"
            value={profile.following}
            color="purple"
          />
          <StatCard
            title="Years Active"
            value={new Date().getFullYear() - new Date(profile.created_at).getFullYear()}
            color="yellow"
            suffix="yrs"
          />
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  color: 'blue' | 'green' | 'purple' | 'yellow';
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, suffix }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600'
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover-lift hover:shadow-xl">
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}{suffix}
      </div>
      <div className="text-gray-600 mt-1">{title}</div>
    </div>
  );
};

export default Home;
