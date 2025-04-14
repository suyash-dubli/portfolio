interface HeroProps {
}

export default function Hero() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Hi, I'm Suyash Kumar Dubli</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Full-Stack Developer with a focus on JavaScript, React, and 3D tools like Three.js.
        </p>
        <div className="mt-8 space-x-4">
          <a 
            href="#projects" 
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="inline-block border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}