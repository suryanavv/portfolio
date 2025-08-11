// React core
import { useEffect, useRef, useState } from 'react';
import type React from 'react';

import './App.css';

// Animation
import { motion } from 'motion/react';

// Local components
import MediaBetweenText from './components/media-between-text';
import UnderlineToBackground from './components/underline-to-background';
import type { MediaBetweenTextRef } from './components/media-between-text';

// Animated icon components + their handles
import { LayersIcon } from './components/animated-layers-icon';
import { PenToolIcon } from './components/animated-pen-icon';
import { GithubIcon } from './components/animated-github-icon';
import { LinkedinIcon } from './components/animated-linkedin-icon';
import type { LayersIconHandle } from './components/animated-layers-icon';
import type { PenToolIconHandle } from './components/animated-pen-icon';
import type { GithubIconHandle } from './components/animated-github-icon';
import type { LinkedinIconHandle } from './components/animated-linkedin-icon';

// Assets
import Link from './assets/images/link.svg';
import ProfileImage from './assets/images/profile-image.jpg';
import ScaleBrush from './assets/images/scale-brush.svg';

// ------- Static data (kept outside component to avoid re-creation) -------
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
];

/** Social link descriptor used by the footer/nav list */
export type SocialLink = {
  label: string;
  href: string;
  iconType?: 'linkedin' | 'github' | null;
};

export const socialLinksData: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/your-profile',
    iconType: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/your-username',
    iconType: 'github',
  },
];

function App() {
  // ------- State -------
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const [hintDone, setHintDone] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isSmUp, setIsSmUp] = useState(false);

  // ------- Refs -------
  const squareRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const mediaBetweenTextRef = useRef<MediaBetweenTextRef>(null);
  const mediaBetweenTextWrapRef = useRef<HTMLDivElement>(null);
  const linkedinIconRef = useRef<LinkedinIconHandle>(null);
  const githubIconRef = useRef<GithubIconHandle>(null);
  const penToolIconRef = useRef<PenToolIconHandle>(null);
  const layersIconRef = useRef<LayersIconHandle>(null);

  // ------- Derived values -------
  const skills = skillsData;
  const projects = projectsData;
  const targetSize = isSmUp ? '128px' : '64px';

  // ------- Effects -------
  // Mount: set global body font and mark content loaded for entrance animations
  useEffect(() => {
    document.body.style.fontFamily = 'Poppins, sans-serif';
    setIsLoaded(true);
  }, []);

  // Track small/above breakpoint to alter interaction model
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => setIsSmUp(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Hint the image reveal by briefly opening/closing on first load
  useEffect(() => {
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

  // Kick off icon micro-interactions once on first load
  useEffect(() => {
    const startTO = window.setTimeout(() => {
      linkedinIconRef.current?.startAnimation();
      githubIconRef.current?.startAnimation();
      penToolIconRef.current?.startAnimation();
      layersIconRef.current?.startAnimation();
    }, 700);
    const stopTO = window.setTimeout(() => {
      linkedinIconRef.current?.stopAnimation();
      githubIconRef.current?.stopAnimation();
      penToolIconRef.current?.stopAnimation();
      layersIconRef.current?.stopAnimation();
    }, 2000);
    return () => {
      window.clearTimeout(startTO);
      window.clearTimeout(stopTO);
    };
  }, []);

  // Close media on outside click for small screens
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

  // ------- Handlers -------
  const startIcon = (type: SocialLink['iconType']) => {
    if (type === 'linkedin') linkedinIconRef.current?.startAnimation();
    if (type === 'github') githubIconRef.current?.startAnimation();
  };

  const stopIcon = (type: SocialLink['iconType']) => {
    if (type === 'linkedin') linkedinIconRef.current?.stopAnimation();
    if (type === 'github') githubIconRef.current?.stopAnimation();
  };

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
    // App viewport container
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image (blurred scenic backdrop) */}
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

      {/* Light gradient overlay to improve foreground contrast */}
      <div className="fixed inset-0 h-screen w-screen bg-gradient-to-b from-transparent to-white pointer-events-none"></div>

      {/* Foreground content scroller */}
      <div className="relative z-10 h-screen overflow-y-auto no-scrollbar">
        {/* Page content wrapper */}
        <div className={`max-w-3xl mx-auto px-6 md:px-10 pt-10 md:pt-20 text-black transition-all duration-500 my-6 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

          {/* 1) Intro: small bouncing shapes + greeting */}
          <div className="flex flex-col gap-2">
            {/* Bouncing trio: square, circle, triangle */}
            <motion.div
              className="flex items-center text-sm text-neutral-700 tracking-tight"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setIsBouncing(true)}
              onMouseLeave={() => setIsBouncing(false)}
            >
              <motion.div
                ref={squareRef}
                className="w-3.5 h-3.5 bg-black rounded-[3px] mr-1"
                animate={isBouncing ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: isBouncing ? Infinity : 0, delay: 0 }}
              />
              <motion.div
                ref={circleRef}
                className="w-3.5 h-3.5 bg-black rounded-full mr-0.5"
                animate={isBouncing ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: isBouncing ? Infinity : 0, delay: 0.1 }}
              />
              <motion.div
                ref={triangleRef}
                className="w-3.5 h-3.5 bg-black"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                animate={isBouncing ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 1, ease: 'easeInOut', repeat: isBouncing ? Infinity : 0, delay: 0.2 }}
              />
            </motion.div>
            {/* Greeting line */}
            <motion.div
              className="flex items-center gap-2 text-neutral-700 tracking-tight"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex items-center text-3xl font-caveat select-none">
                Hello! <span className='text-4xl'>👋🏼</span> , I'am 
              </span>
            </motion.div>
            {/* <span><span className="reenie-beanie-regular text-black select-none md:hover:animate-shake">Hello</span>Welcome, glad you’re here.</span> */}
            {/* <img src={Hello} alt="Hello" className="w-6 h-6 ml-2 md:hover:animate-shake" /> */}
            {/* <span>Welcome, glad you’re here.</span> */}

          </div>

          {/* 2) Hero: name, profile reveal, role, short blurb */}
          <header>
            <div className='flex items-center gap-2'>
              {/* Name/title */}
              <motion.h1
                className="font-editorial-ultralight text-[48px] sm:text-[64px] md:text-[84px] leading-[0.95] text-black select-none"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                Surya Naveen
              </motion.h1>
              {/* Profile image reveal between angle brackets */}
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
            {/* Role badge + playful brush icon */}
            <motion.div
              className="inline-flex items-center text-neutral-800 gap-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.14 }}
            >
              <UnderlineToBackground targetTextColor="#ffffff" className="py-0.5 rounded-sm">
                <span className="uppercase tracking-wider text-xs">Front-end Developer</span>
              </UnderlineToBackground>
              <motion.img
                src={ScaleBrush}
                alt=""
                className="w-5 h-5"
                style={{ transformOrigin: '75% 75%' }}
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 18, -12, 10, 0] }}
                transition={{ duration: 1, ease: 'easeOut' }}
                whileHover={{ rotate: [0, 10, -10, 0] }}
              />
            </motion.div>
            {/* Short about paragraph */}
            <motion.p
              className="mt-2 text-neutral-600 max-w-prose"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              I design and build minimal, accessible web experiences with focus on motion and micro‑interactions.
            </motion.p>
          </header>


          {/* 3) Skills: section header + chips */}
          <motion.section
            className='mt-6'
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.34 }}
          >
            <h2
              className="text-lg font-medium text-black flex items-center gap-2"
              onMouseEnter={() => penToolIconRef.current?.startAnimation()}
              onMouseLeave={() => penToolIconRef.current?.stopAnimation()}
              onClick={() => {
                penToolIconRef.current?.startAnimation();
                window.setTimeout(() => penToolIconRef.current?.stopAnimation(), 1200);
              }}
            >
              Skills <PenToolIcon ref={penToolIconRef} size={20} className="text-current" />
            </h2>
            {/* Skill chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <motion.span
                  key={skill.name}
                  className="px-3 py-1 rounded-full border border-neutral-200 text-neutral-700 hover:bg-black hover:text-white transition-all duration-200 will-change-transform"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 * idx }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* 4) Projects: list of recent works */}
          <motion.section
            className='mt-8'
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            <h2
              className="text-lg font-medium text-black flex items-center gap-2"
              onMouseEnter={() => layersIconRef.current?.startAnimation()}
              onMouseLeave={() => layersIconRef.current?.stopAnimation()}
              onClick={() => {
                layersIconRef.current?.startAnimation();
                window.setTimeout(() => layersIconRef.current?.stopAnimation(), 1200);
              }}
            >
              Projects <LayersIcon ref={layersIconRef} size={20} className="text-current" />
            </h2>
            {/* Project cards */}
            <div className="mt-4 space-y-6">
              {projects.map((project, idx) => (
                <motion.article
                  key={idx}
                  className="group border border-zinc-200 rounded-lg p-4 hover:border-black transition-colors"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                  transition={{ duration: 0.4, delay: 0.06 * idx }}
                >
                  {/* Card header: title + tiny external link hint */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial-regular text-xl text-black group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    <span className="text-xs text-neutral-500 inline-flex items-center gap-1">
                      Live <img src={Link} alt="" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  {/* Card body: description + tech stack */}
                  <p className="mt-1 text-sm text-neutral-600">{project.desc}</p>
                  <p className="text-xs text-neutral-500">{project.tech}</p>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* 5) Footer: thanks note + signature */}
          <motion.footer
            className='mt-8'
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            {/* Closing sentence */}
            <p className="text-neutral-600">Thanks for scrolling.</p>
            <motion.div
              className="flex items-center gap-2 text-4xl reenie-beanie-regular text-black mt-1 inline-block -rotate-2 hover:rotate-0 transition-transform"
              style={{ transformOrigin: '75% 75%' }}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 18, -12, 10, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              Suryanavv
              <span className='text-3xl'>✌🏼</span>
            </motion.div>
          </motion.footer>


          {/* 6) Social links: contact + profiles */}
          <motion.nav
            className='mt-6 mb-2'
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            {/* Contact email */}
            <p className="text-sm text-neutral-700">
              Feel free to contact me at{' '}
              <a href="mailto:suryanavv@gmail.com" className="underline hover:no-underline">
                suryanavv@gmail.com
              </a>
            </p>
            {/* Profile links list */}
            <motion.ul
              className="mt-1 flex flex-wrap gap-6 text-sm text-neutral-800"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {socialLinksData.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center gap-2 py-1.5 group"
                    onMouseEnter={() => startIcon(link.iconType)}
                    onMouseLeave={() => stopIcon(link.iconType)}
                  >
                    {link.iconType === 'linkedin' ? (
                      <LinkedinIcon ref={linkedinIconRef} size={16} className="text-current" />
                    ) : link.iconType === 'github' ? (
                      <GithubIcon ref={githubIconRef} size={16} className="text-current" />
                    ) : null}
                    <span className="flex gap-2 transition-all underline-offset-4 group-hover:underline">
                      {link.label}
                      <span aria-hidden className="-mr-1 inline-block">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.nav>
        </div>
      </div>
    </div>
  );
}

export default App;

