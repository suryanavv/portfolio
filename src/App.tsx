import { useEffect, useState, useRef } from 'react';
import type React from 'react';
import './App.css';
import UnderlineToBackground from './components/underline-to-background';
import MediaBetweenText from './components/media-between-text';
import type { MediaBetweenTextRef } from './components/media-between-text';
import ScaleBrush from './assets/scale-brush.svg';
import Pen from './assets/pen.svg';
import Project from './assets/project.svg';
import Link from './assets/link.svg';
import Hello from './assets/hello.svg';
import ProfileImage from './assets/profile-image.jpg';
import LinkedIn from './assets/linkedin.svg';
import GitHub from './assets/github.svg';

// Static data moved outside the component to avoid re-creation on every render
export const skillsData = [
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'Tailwind CSS' },
  { name: 'TypeScript' },
  { name: 'JavaScript' },
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'Framer Motion' },
  { name: 'Figma' },
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
  const mediaBetweenTextRef = useRef<MediaBetweenTextRef>(null);
  const mediaBetweenTextWrapRef = useRef<HTMLDivElement>(null);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [hintDone, setHintDone] = useState(false);

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
    document.body.style.fontFamily = 'Poppins, sans-serif';
    setIsLoaded(true);
  }, []);

  const skills = skillsData;

  const projects = projectsData;
  const [isSmUp, setIsSmUp] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => setIsSmUp(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const targetSize = isSmUp ? '128px' : '64px';

  // On initial load, briefly open then close the media to hint its presence
  useEffect(() => {
    const hasRunRef = { current: false } as { current: boolean };
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    const openTO = window.setTimeout(() => {
      mediaBetweenTextRef.current?.animate();
      setIsMediaOpen(true);
    }, 400);
    const closeTO = window.setTimeout(() => {
      mediaBetweenTextRef.current?.reset();
      setIsMediaOpen(false);
      setHintDone(true);
    }, 1400);
    return () => {
      window.clearTimeout(openTO);
      window.clearTimeout(closeTO);
    };
  }, []);

  useEffect(() => {
    if (isSmUp) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        mediaBetweenTextWrapRef.current &&
        !mediaBetweenTextWrapRef.current.contains(e.target as Node)
      ) {
        mediaBetweenTextRef.current?.reset();
        setIsMediaOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isSmUp]);

  const handleMediaToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSmUp) return; // hover on desktop/tablet
    e.stopPropagation();
    if (isMediaOpen) {
      mediaBetweenTextRef.current?.reset();
      setIsMediaOpen(false);
    } else {
      mediaBetweenTextRef.current?.animate();
      setIsMediaOpen(true);
    }
  };
  return (
        <div className="relative h-screen w-full overflow-hidden">
          {/* Background image */}
          <picture className="fixed inset-0 h-screen w-screen overflow-hidden opacity-100 pointer-events-none">
            <source
              type="image/webp"
              srcSet="
                https://persistent.oaistatic.com/burrito-nux/640.webp 640w,
                https://persistent.oaistatic.com/burrito-nux/1280.webp 1280w,
                https://persistent.oaistatic.com/burrito-nux/1920.webp 1920w
              "
            />
            <img
              className="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-50 blur-2xl"
              alt=""
              aria-hidden="true"
              src="https://persistent.oaistatic.com/burrito-nux/640.webp"
              srcSet="
                https://persistent.oaistatic.com/burrito-nux/640.webp 640w,
                https://persistent.oaistatic.com/burrito-nux/1280.webp 1280w,
                https://persistent.oaistatic.com/burrito-nux/1920.webp 1920w
              "
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
    
          {/* Gradient overlay */}
          <div className="fixed inset-0 h-screen w-screen bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    
          {/* Content */}
          <div className="relative z-10 h-screen overflow-y-auto no-scrollbar">
        <div className={`max-w-3xl mx-auto px-6 md:px-10 py-10 md:py-20 text-black transition-all duration-500 my-6 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

          {/* 1. Hello welcome note */}
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center text-sm text-zinc-700 tracking-tight animate-slide-in" onMouseEnter={restartBounce} onMouseLeave={stopBounce}>
              <div ref={squareRef} className="w-3.5 h-3.5 bg-black rounded-[3px] mr-1 animate-bounce-once" />
              <div ref={circleRef} className="w-3.5 h-3.5 bg-black rounded-full mr-0.5 animate-bounce-once" style={{ animationDelay: '0.1s' }} />
              <div ref={triangleRef} className="w-3.5 h-3.5 bg-black animate-bounce-once" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '0.2s' }} />
            </div>
            <div className="flex items-center gap-2 text-zinc-700 tracking-tight animate-slide-in">
              <span className="flex items-center text-2xl md:hover:animate-shake">
                <img src={Hello} alt="Hello" className="w-12 h-12" />
              </span>
              <span>Welcome, glad you’re here.</span>
            </div>
            {/* <span><span className="reenie-beanie-regular text-black select-none md:hover:animate-shake">Hello</span>Welcome, glad you’re here.</span> */}
            {/* <img src={Hello} alt="Hello" className="w-6 h-6 ml-2 md:hover:animate-shake" /> */}
            {/* <span>Welcome, glad you’re here.</span> */}
          
          </div>

          {/* 2. Name - role tag */}
          <header className='mb-8'>
            <div className='flex items-center gap-2'>
            <h1 className="font-editorial-ultralight text-[44px] sm:text-[56px] md:text-[72px] leading-[0.95] text-black select-none">
              Surya Naveen
            </h1>
            <div ref={mediaBetweenTextWrapRef} onClick={handleMediaToggle} className="select-none">
            <MediaBetweenText
                firstText="<"
                secondText=">"
                mediaUrl={ProfileImage}
                mediaType="image"
                triggerType={isSmUp ? (hintDone ? 'hover' : 'ref') : 'ref'}
                mediaContainerClassName="w-full h-16 sm:h-32 overflow-hidden rounded-full"
                className="cursor-pointer text-4xl sm:text-7xl text-black font-light flex flex-row items-center"
                animationVariants={{
                  initial: { width: 0 },
                  animate: {
                    width: targetSize,
                    transition: { duration: 0.4, type: "spring", bounce: 0 },
                  },
                }}
              ref={mediaBetweenTextRef}
              />
              </div>
              </div>
            <div className="mt-2 inline-flex items-center gap-2 text-zinc-600">
              <UnderlineToBackground targetTextColor="#ffffff" className="py-0.5 rounded-sm">
                <span className="uppercase tracking-wider text-xs">Front-end Developer</span>
              </UnderlineToBackground>
              <img src={ScaleBrush} alt="" className="w-5 h-5 md:hover:animate-shake" />
            </div>
            <p className="mt-4 text-zinc-600 max-w-prose">I design and build minimal, accessible web experiences with focus on motion and micro‑interactions.</p>
          </header>

          {/* 3. Social media links */}
          <nav className="mb-12">
            <ul className="flex flex-wrap gap-4 text-sm text-zinc-700">
              <li>
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-black transition-colors">
                  <img src={LinkedIn} alt="LinkedIn" className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-black transition-colors">
                  <img src={GitHub} alt="GitHub" className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="mailto:suryanavv@gmail.com" className="inline-flex items-center gap-2 hover:text-black transition-colors">
                  <span className="w-4 h-4 rounded-full bg-black inline-block" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* 4. Skill set */}
          <section className="mb-14">
            <h2 className="text-sm font-medium text-black flex items-center gap-2">
              Skills <img src={Pen} alt="" className="w-5 h-5 md:hover:animate-shake" />
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`px-3 py-1 rounded-full border border-zinc-200 text-zinc-700 hover:bg-black hover:text-white transition-all duration-200 will-change-transform ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* 5. Projects */}
          <section>
            <h2 className="text-sm font-medium text-black flex items-center gap-2">
              Projects <img src={Project} alt="" className="w-5 h-5 md:hover:animate-shake" />
            </h2>
            <div className="mt-6 space-y-6">
              {projects.map((project, idx) => (
                <article key={idx} className="group border border-zinc-200 rounded-lg p-4 hover:border-black transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial-regular text-xl text-black group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    <span className="text-xs text-zinc-500 inline-flex items-center gap-1">
                      Live <img src={Link} alt="" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600">{project.desc}</p>
                  <p className="text-xs text-zinc-500">{project.tech}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 6. Thank note */}
          <footer className="pt-12 md:pt-16">
            <p className="text-zinc-600">Thanks for scrolling.</p>
            <div className="text-4xl reenie-beanie-regular mt-1 inline-block -rotate-2 hover:rotate-0 transition-transform">
              Suryanavv
            </div>
          </footer>
        </div>
      </div>
        </div>
  );
}

export default App;

