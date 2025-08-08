import { useEffect, useState, useRef } from 'react';
import './App.css';
import { TextShimmer } from '../components/text-shimmer';
import UnderlineToBackground from '../components/underline-to-background';
import ScaleBrush from './assets/scale-brush.svg';
import Pen from './assets/pen.svg';
import Project from './assets/project.svg';
import Link from './assets/link.svg';
import Hello from './assets/hello.svg';
import LinkedIn from './assets/linkedin.svg';
import GitHub from './assets/github.svg';

// Static data moved outside the component to avoid re-creation on every render
export const skillsData = [
  { name: 'React', cursor: "url('https://cdn.simpleicons.org/react/61DAFB'), auto" },
  { name: 'Next.js', cursor: "url('https://cdn.simpleicons.org/nextdotjs/000000'), auto" },
  { name: 'Tailwind CSS', cursor: "url('https://cdn.simpleicons.org/tailwindcss/06B6D4'), auto" },
  { name: 'JavaScript', cursor: "url('https://cdn.simpleicons.org/javascript/F7DF1E'), auto" },
  { name: 'HTML', cursor: "url('https://cdn.simpleicons.org/html5/E34F26'), auto" },
  { name: 'CSS', cursor: "url('https://cdn.simpleicons.org/css3/1572B6'), auto" },
  { name: 'Python', cursor: "url('https://cdn.simpleicons.org/python/3776AB'), auto" },
  { name: 'SQL', cursor: "url('https://www.svgrepo.com/show/331760/sql-database-generic.svg'), auto" },
  { name: 'MongoDB', cursor: "url('https://cdn.simpleicons.org/mongodb/47A248'), auto" },
  { name: 'Supabase', cursor: "url('https://cdn.simpleicons.org/supabase/3ECF8E'), auto" },
  { name: 'Figma', cursor: "url('https://cdn.simpleicons.org/figma/000000'), auto" },
  { name: 'Canva', cursor: "url('https://cdn.simpleicons.org/canva/00C4CC'), auto" },
];

export const projectsData = [
  {
    title: 'Portfolio Website',
    desc: 'A portfolio with subtle animation visual appealing interface',
    tech: 'Next.js, Tailwind CSS',
  },
  {
    title: 'Task Manager App',
    desc: 'Minimal todo tracker with real-time sync',
    tech: 'React, Firebase',
  },
  {
    title: 'Landing Page',
    desc: 'SaaS landing page with modern design',
    tech: 'HTML, Alpine.js',
  },
  {
    title: 'REST API Starter',
    desc: 'RESTful boilerplate with authentication',
    tech: 'Node.js, Express',
  },
  {
    title: 'Design System',
    desc: 'Component library with documentation',
    tech: 'Typescript, Storybook',
  },
  {
    title: 'Blog Platform',
    desc: 'Markdown blogging platform',
    tech: 'Next.js, MongoDB',
  },
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const squareRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);

  const restartBounce = () => {
    const refs = [squareRef, circleRef, triangleRef];
    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.animation = 'none';
        ref.current.offsetHeight; // Trigger reflow
        ref.current.style.animation = 'bounce-once 1s ease-in-out infinite';
        if (index === 1) { // Circle
          ref.current.style.animationDelay = '0.1s';
        } else if (index === 2) { // Triangle
          ref.current.style.animationDelay = '0.2s';
        }
      }
    });
  };

  const stopBounce = () => {
    const refs = [squareRef, circleRef, triangleRef];
    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.animation = 'bounce-once 1s ease-in-out';
        if (index === 1) { // Circle
          ref.current.style.animationDelay = '0.1s';
        } else if (index === 2) { // Triangle
          ref.current.style.animationDelay = '0.2s';
        }
      }
    });
  };

  useEffect(() => {
    document.body.style.fontFamily = 'Inter, sans-serif';
    setIsLoaded(true);
  }, []);

  const skills = skillsData;

  const projects = projectsData;

  return (
    <div className="min-h-screen bg-white">
      {/* New outer div for centering with gaps */}
        <div className={`max-w-4xl mx-auto py-24 px-8 text-black font-sans transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-0'}`}>
          
          {/* Header Section */}
          <div className="mb-12">
            {/* Geometric Shapes */}
            <div className="flex mb-4" onMouseEnter={restartBounce} onMouseLeave={stopBounce}>
              <div ref={squareRef} className="w-4 h-4 bg-black rounded-xs mr-0.5 animate-bounce-once" />
              <div ref={circleRef} className="w-4 h-4 bg-black rounded-full animate-bounce-once" style={{ animationDelay: '0.1s' }} />
              <div ref={triangleRef}
                className="w-4 h-4 bg-black animate-bounce-once"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  animationDelay: '0.2s'
                }}
              />
            </div>

            {/* Intro Text */}
            <div className="mb-2 text-gray-800 text-base font-light flex items-center gap-2 animate-slide-in">
              <img
                src={Hello || "/placeholder.svg"}
                alt="Hello"
                className="w-10 h-10 md:hover:animate-shake"
              />
              there, this is
            </div>

            {/* Name and Title */}
            <div className="animate-bounce-once" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center">
                  <UnderlineToBackground targetTextColor="#f0f0f0" className="cursor-pointer" as="span">
                    <span className="mx-0 md:mx-1 select-none">
                      <TextShimmer
                        duration={1.2}
                        className="text-xl font-medium [--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-200)] dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)]"
                      >
                        Surya Naveen
                      </TextShimmer>
                    </span>
                  </UnderlineToBackground>
                </span>
                <span className="font-light text-gray-500"> — </span>
                <span className="text-lg font-light text-gray-500 tracking-tight md:hover:tracking-wider transition-all duration-300">
                  Front End Developer
                  <img
                    src={ScaleBrush || "/placeholder.svg"}
                    alt="ScaleBrush"
                    className="inline w-6 h-6 ml-2 mb-1 md:hover:animate-shake"
                  />
                </span>
              </div>
              <p className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
                Creating clean, minimal interfaces and web experiences.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 animate-bounce-once" style={{ animationDelay: '0.35s' }}>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-500 hover:text-black hover:underline transition-opacity duration-300"
                >
                  <img src={LinkedIn || "/placeholder.svg"} alt="LinkedIn" className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-500 hover:text-black hover:underline transition-opacity duration-300"
                >
                  <img src={GitHub || "/placeholder.svg"} alt="GitHub" className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-12 animate-bounce-once" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-medium mb-4 hover:text-black transition-colors duration-300 cursor-default">
              Skills
              <img
                src={Pen || "/placeholder.svg"}
                alt="Pen"
                className="inline w-6 h-6 ml-2 mb-1 md:hover:animate-shake"
              />
            </h2>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-gray-800 font-normal px-2 py-1 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{
                      cursor: skill.cursor,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-500 mt-4 hover:text-gray-700 transition-colors duration-300">
              Comfortable working across the full stack, passionate about learning new tech and shipping clean interfaces.
            </p>
          </div>

          {/* Projects Section */}
          <div className="animate-bounce-once" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-medium mb-6 hover:text-black transition-colors duration-300">
              Projects
              <img
                src={Project || "/placeholder.svg"}
                alt="Project"
                className="inline w-6 h-6 ml-2 mb-1 md:hover:animate-shake"
              />
            </h2>
            <div className="space-y-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group transition-all duration-300 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="font-bold text-gray-800 group-hover:underline">
                      {project.title} — Live
                      <img
                        src={Link || "/placeholder.svg"}
                        alt="Link"
                        className="inline w-4 h-4 ml-2 mb-1 transform hover:scale-125 hover:rotate-12 hover:animate-shake transition-transform duration-300 animate-slide-in"
                      />
                    </span>
                  </div>
                  <p className="text-gray-500 mb-1">{project.desc}</p>
                  <p className="text-gray-500">{project.tech}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col pt-10 relative animate-bounce-once" style={{ animationDelay: '0.6s' }}>
            <span className="text-gray-500">Thank you,</span>
            <div className="text-4xl reenie-beanie-regular transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <span className="relative select-none">
                <TextShimmer
                  duration={1.2}
                  className="[--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-200)] dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)]"
                >
                  Suryanavv
                </TextShimmer>
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 opacity-80"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2,5 Q15,2 30,5 T58,5 Q75,8 85,5 T98,5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    className="text-gray-800"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;