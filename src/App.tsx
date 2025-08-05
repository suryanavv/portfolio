import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    document.body.style.fontFamily = 'Inter, sans-serif';
  }, []);

  return (
    <div className="bg-white text-gray-800 p-8 md:p-12 lg:p-24 max-w-4xl mx-auto font-inter transition-all duration-500">
      <header className="mb-12">
        <h1 className="text-xl font-medium tracking-tight hover:tracking-wider transition-all duration-300">
          Surya Naveen —
          <span className="font-light text-gray-500"> Front End Developer</span>
        </h1>
        <p className="text-gray-500 mt-2 hover:text-gray-700 transition-colors duration-300">
          Creating clean, minimal interfaces and simple web experiences.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-medium mb-4 hover:text-black transition-colors duration-300">Skills</h2>
        <p className="text-gray-500 mb-2 transition-transform duration-300 hover:scale-[1.01]">
          <strong className="text-gray-800 font-normal">
            React, Next.js, Tailwind CSS, JavaScript, HTML, CSS, Python, SQL, Databases, Figma, UI/UX Design, Canva
          </strong>
        </p>
        <p className="text-gray-500 mt-4 hover:text-gray-700 transition-colors duration-300">
          Comfortable working across the full stack, passionate about learning new tech and shipping clean interfaces.
        </p>
        <div className="mt-8 text-6xl text-gray-300">
          <span className="inline-block transform -rotate-12 animate-bounce">e</span>
          <span className="inline-block transform rotate-12 -ml-8 animate-bounce delay-200">u</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-6 hover:text-black transition-colors duration-300">Projects</h2>
        <div className="space-y-8">
          {[
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
          ].map((project, idx) => (
            <div
              key={idx}
              className="group transition-all duration-300 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <h3 className="font-bold text-gray-800 group-hover:underline">{project.title} — Live</h3>
                <svg
                  className="w-4 h-4 ml-1 text-gray-800 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <p className="text-gray-500 mb-1">{project.desc}</p>
              <p className="text-gray-500">{project.tech}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-6xl text-gray-300">
          <span className="inline-block transform -rotate-12 animate-bounce">e</span>
          <span className="inline-block transform rotate-12 -ml-8 animate-bounce delay-200">u</span>
        </div>
      </section>
    </div>
  );
}

export default App;
