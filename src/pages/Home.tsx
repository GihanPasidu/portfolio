import React, { useEffect, useState, memo } from 'react';
import { GithubProfile, getGithubProfile } from '../services/github';
import StyledBox from '../components/StyledBox';

const techStack = [
  {
    name: 'React',
    icon: 'https://techstack-generator.vercel.app/react-icon.svg',
    color: 'text-sky-500',
    url: 'https://react.dev'
  },
  {
    name: 'JavaScript',
    icon: 'https://techstack-generator.vercel.app/js-icon.svg',
    color: 'text-yellow-400',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    name: 'TypeScript',
    icon: 'https://techstack-generator.vercel.app/ts-icon.svg',
    color: 'text-blue-600',
    url: 'https://www.typescriptlang.org'
  },
  {
    name: 'Python',
    icon: 'https://techstack-generator.vercel.app/python-icon.svg',
    color: 'text-blue-500',
    url: 'https://www.python.org'
  },
  {
    name: 'Java',
    icon: 'https://techstack-generator.vercel.app/java-icon.svg',
    color: 'text-red-600',
    url: 'https://www.java.com'
  },
  {
    name: 'CPP',
    icon: 'https://techstack-generator.vercel.app/cpp-icon.svg',
    color: 'text-blue-700',
    url: 'https://isocpp.org'
  },
  {
    name: 'CSHarp',
    icon: 'https://techstack-generator.vercel.app/csharp-icon.svg',
    color: 'text-green-600',
    url: 'https://learn.microsoft.com/en-us/dotnet/csharp'
  },
  {
    name: 'RestAPI',
    icon: 'https://techstack-generator.vercel.app/restapi-icon.svg',
    color: 'text-gray-700',
    url: 'https://restfulapi.net'
  },
  {
    name: 'Redux',
    icon: 'https://techstack-generator.vercel.app/redux-icon.svg',
    color: 'text-purple-600',
    url: 'https://redux.js.org'
  },
  {
    name: 'Webpack',
    icon: 'https://techstack-generator.vercel.app/webpack-icon.svg',
    color: 'text-blue-500',
    url: 'https://webpack.js.org'
  },
  {
    name: 'AWS',
    icon: 'https://techstack-generator.vercel.app/aws-icon.svg',
    color: 'text-orange-500',
    url: 'https://aws.amazon.com'
  },
  {
    name: 'Git',
    icon: 'https://techstack-generator.vercel.app/github-icon.svg',
    color: 'text-gray-900',
    url: 'https://git-scm.com'
  },
  {
    name: 'MySQL',
    icon: 'https://techstack-generator.vercel.app/mysql-icon.svg',
    color: 'text-blue-600',
    url: 'https://www.mysql.com'
  },
  {
    name: 'Django',
    icon: 'https://techstack-generator.vercel.app/django-icon.svg',
    color: 'text-green-700',
    url: 'https://www.djangoproject.com'
  },
  {
    name: 'Docker',
    icon: 'https://techstack-generator.vercel.app/docker-icon.svg',
    color: 'text-sky-600',
    url: 'https://www.docker.com'
  },
  {
    name: 'Nginx',
    icon: 'https://techstack-generator.vercel.app/nginx-icon.svg',
    color: 'text-green-500',
    url: 'https://www.nginx.com'
  }
];

const Home: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getGithubProfile('GihanPasidu');
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen px-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error || !profile) {
    return <div className="text-center text-red-500 p-4">{error || 'Failed to load profile'}</div>;
  }

  return (
    <div className="home-container pt-24 md:pt-28 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Welcome to My Portfolio</h1>
      <div className="home-content mb-8">
        <StyledBox>
          <p className="text-white/90 text-lg">
            I am a software developer specializing in web development, 
            creating responsive and interactive web applications.
          </p>
          <div className="cta-button mt-4">
            <a href="/projects" className="inline-block bg-blue-600/90 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-colors duration-300">View My Projects</a>
          </div>
        </StyledBox>
      </div>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <StyledBox className="mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-auto p-6 bg-gradient-to-br from-blue-800/80 to-blue-900/80 text-center rounded-lg mb-6 md:mb-0">
                <div className="relative mx-auto w-32 h-32 md:w-48 md:h-48">
                  <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-pulse"></div>
                  <img 
                    src={profile?.avatar_url} 
                    alt={profile?.name || 'Profile Picture'}
                    className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="mt-6 text-center text-white">
                  <h1 className="text-2xl md:text-3xl font-bold">{profile?.name}</h1>
                  <p className="text-blue-200 mt-2">@{profile?.login}</p>
                </div>
              </div>
              <div className="p-4 md:p-8 fade-in w-full" style={{animationDelay: '0.3s'}}>
                <div className="prose max-w-none">
                  <p className="text-lg text-white/90 leading-relaxed">{profile.bio}</p>
                  <div className="mt-6 space-y-3">
                    {profile.location && (
                      <div className="flex items-center text-white/80">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.location}
                      </div>
                    )}
                    {profile.company && (
                      <div className="flex items-center text-white/80">
                        <span className="font-medium">🏢 Company:</span> {profile.company}
                      </div>
                    )}
                    {profile.blog && (
                      <div className="flex items-center text-white/80">
                        <span className="font-medium">🌐 Website:</span>{' '}
                        <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                          {profile.blog}
                        </a>
                      </div>
                    )}
                    {profile.email && (
                      <div className="flex items-center text-white/80">
                        <span className="font-medium">📧 Email:</span> {profile.email}
                      </div>
                    )}
                    <div className="flex items-center text-white/80">
                      <span className="font-medium">🎉 Joined:</span>{' '}
                      {new Date(profile.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StyledBox>

          {/* Tech Stack Section */}
          <StyledBox className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Tech Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {techStack.map((tech, index) => (
                <TechStackItem key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </StyledBox>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <StatCard
              title="Repositories"
              value={profile?.public_repos || 0}
              color="blue"
            />
            <StatCard
              title="Followers"
              value={profile?.followers || 0}
              color="green"
            />
            <StatCard
              title="Following"
              value={profile?.following || 0}
              color="purple"
            />
            <StatCard
              title="Years Active"
              value={profile ? new Date().getFullYear() - new Date(profile.created_at).getFullYear() : 0}
              color="yellow"
              suffix="yrs"
            />
          </div>
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

const StatCard = memo<StatCardProps>(({ title, value, color, suffix }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    yellow: 'text-yellow-600'
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-300 hover-lift hover:shadow-xl border border-white/10">
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>
        {value}{suffix}
      </div>
      <div className="text-white/80 mt-1">{title}</div>
    </div>
  );
});

const TechStackItem = memo(({ tech, index }: { tech: typeof techStack[0]; index: number }) => (
  <a
    href={tech.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center p-4 bg-white/5 backdrop-blur-md rounded-lg hover-3d border border-white/10"
    style={{
      opacity: 0,
      animation: 'fadeUp 0.5s ease-out forwards',
      animationDelay: `${index * 0.1}s`
    }}
  >
    <img 
      src={tech.icon} 
      alt={tech.name}
      loading="lazy"
      className="w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-110"
    />
    <span className={`font-medium ${tech.color}`}>{tech.name}</span>
  </a>
));

export default memo(Home);
