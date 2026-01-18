import React, { useEffect, useState, memo, useRef } from 'react';
import { GithubProfile, getGithubProfile } from '../services/github';
import StyledBox from '../components/StyledBox';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const techStack = [
  {
    name: 'React',
    icon: 'https://techstack-generator.vercel.app/react-icon.svg',
    color: 'text-sky-500',
    url: 'https://react.dev',
    category: 'Frontend'
  },
  {
    name: 'Next.js',
    icon: 'https://techstack-generator.vercel.app/nginx-icon.svg',
    color: 'text-white',
    url: 'https://nextjs.org',
    category: 'Frontend'
  },
  {
    name: 'TypeScript',
    icon: 'https://techstack-generator.vercel.app/ts-icon.svg',
    color: 'text-blue-600',
    url: 'https://www.typescriptlang.org',
    category: 'Language'
  },
  {
    name: 'JavaScript',
    icon: 'https://techstack-generator.vercel.app/js-icon.svg',
    color: 'text-yellow-400',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    category: 'Language'
  },
  {
    name: 'Python',
    icon: 'https://techstack-generator.vercel.app/python-icon.svg',
    color: 'text-blue-500',
    url: 'https://www.python.org',
    category: 'Language'
  },
  {
    name: 'Node.js',
    icon: 'https://techstack-generator.vercel.app/restapi-icon.svg',
    color: 'text-green-500',
    url: 'https://nodejs.org',
    category: 'Backend'
  },
  {
    name: 'Java',
    icon: 'https://techstack-generator.vercel.app/java-icon.svg',
    color: 'text-red-600',
    url: 'https://www.java.com',
    category: 'Language'
  },
  {
    name: 'C++',
    icon: 'https://techstack-generator.vercel.app/cpp-icon.svg',
    color: 'text-blue-700',
    url: 'https://isocpp.org',
    category: 'Language'
  },
  {
    name: 'AWS',
    icon: 'https://techstack-generator.vercel.app/aws-icon.svg',
    color: 'text-orange-500',
    url: 'https://aws.amazon.com',
    category: 'Cloud'
  },
  {
    name: 'Docker',
    icon: 'https://techstack-generator.vercel.app/docker-icon.svg',
    color: 'text-sky-600',
    url: 'https://www.docker.com',
    category: 'DevOps'
  },
  {
    name: 'Kubernetes',
    icon: 'https://techstack-generator.vercel.app/nginx-icon.svg',
    color: 'text-blue-500',
    url: 'https://kubernetes.io',
    category: 'DevOps'
  },
  {
    name: 'GraphQL',
    icon: 'https://techstack-generator.vercel.app/restapi-icon.svg',
    color: 'text-pink-500',
    url: 'https://graphql.org',
    category: 'API'
  },
  {
    name: 'MongoDB',
    icon: 'https://techstack-generator.vercel.app/django-icon.svg',
    color: 'text-green-600',
    url: 'https://www.mongodb.com',
    category: 'Database'
  },
  {
    name: 'PostgreSQL',
    icon: 'https://techstack-generator.vercel.app/mysql-icon.svg',
    color: 'text-blue-600',
    url: 'https://www.postgresql.org',
    category: 'Database'
  },
  {
    name: 'Redis',
    icon: 'https://techstack-generator.vercel.app/redux-icon.svg',
    color: 'text-red-500',
    url: 'https://redis.io',
    category: 'Database'
  },
  {
    name: 'Git',
    icon: 'https://techstack-generator.vercel.app/github-icon.svg',
    color: 'text-gray-900',
    url: 'https://git-scm.com',
    category: 'Tools'
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
    <div className="home-container pt-24 md:pt-28 px-4 pb-16">
      {/* Hero Section */}
      <div className="container mx-auto mb-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Full Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Building modern web applications with cutting-edge technologies
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <StyledBox className="mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-auto p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-center rounded-lg mb-6 md:mb-0 backdrop-blur-xl">
                <div className="relative mx-auto w-32 h-32 md:w-48 md:h-48 group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400/30 animate-pulse"></div>
                  <img 
                    src={profile?.avatar_url} 
                    alt={profile?.name || 'Profile Picture'}
                    className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-white/20 shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="mt-6 text-center text-white">
                  <h2 className="text-2xl md:text-3xl font-bold">{profile?.name}</h2>
                  <p className="text-blue-300 mt-2">@{profile?.login}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a 
                      href={`https://github.com/${profile?.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                      aria-label="GitHub Profile"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
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
            <h2 className="text-3xl font-bold mb-8 text-white text-center">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Tech Stack & Skills
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {techStack.map((tech, index) => (
                <TechStackItem key={tech.name} tech={tech} index={index} />
              ))}
            </div>
          </StyledBox>

          {/* Stats Section with Modern Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <StatCard
              title="Repositories"
              value={profile?.public_repos || 0}
              color="blue"
              icon="📚"
            />
            <StatCard
              title="Followers"
              value={profile?.followers || 0}
              color="green"
              icon="👥"
            />
            <StatCard
              title="Following"
              value={profile?.following || 0}
              color="purple"
              icon="🤝"
            />
            <StatCard
              title="Years Active"
              value={profile ? new Date().getFullYear() - new Date(profile.created_at).getFullYear() : 0}
              color="yellow"
              suffix="+"
              icon="⭐"
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
  icon: string;
}

const StatCard = memo<StatCardProps>(({ title, value, color, suffix, icon }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    purple: 'from-purple-500 to-purple-700',
    yellow: 'from-yellow-500 to-yellow-700'
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="relative z-10">
        <div className="text-4xl mb-2">{icon}</div>
        <div className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
          {value}{suffix}
        </div>
        <div className="text-white/80 mt-1 text-sm">{title}</div>
      </div>
    </div>
  );
});

const TechStackItem = memo(({ tech, index }: { tech: typeof techStack[0]; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.1, freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  return (
    <a
      ref={ref}
      href={tech.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center p-4 bg-white/5 backdrop-blur-md rounded-lg transition-all duration-500 border border-white/10 hover:border-white/30 hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDelay: `${index * 50}ms`
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 blur-md bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-50 transition-opacity"></div>
        <img 
          src={tech.icon} 
          alt={tech.name}
          loading="lazy"
          className="relative w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
        />
      </div>
      <span className={`font-medium ${tech.color} transition-all`}>{tech.name}</span>
      <span className="text-xs text-white/50 mt-1">{tech.category}</span>
    </a>
  );
});

export default memo(Home);
