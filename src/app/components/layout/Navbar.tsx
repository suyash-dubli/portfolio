export default function Navbar() {
    return (
      <nav className="sticky top-0 bg-gray-800 shadow-md z-50">
        <div className="max-w-1xl mx-auto px-4 py-4 flex justify-between items-center">
          <a 
            href="#hero" 
            className="text-xl font-bold text-white hover:text-teal-400 transition duration-300"
          >
            Suyash Kumar Dubli
          </a>
          <div className="space-x-10">
            <a href="#projects" className="hover:text-teal-400">Projects</a>
            <a href="#resume" className="hover:text-teal-400">Resume</a>
            <a href="#contact" className="hover:text-teal-400">Contact</a>
          </div>
        </div>
      </nav>
    );
  }