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
            <div className="relative inline-block group">
              <a 
                href="/Suyash_Kumar_Dubli_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer" 
                className="hover:text-teal-400 relative"
              >
                Resume
              </a>
              <div className="absolute z-10 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 -top-10 left-1/2 transform -translate-x-1/2">
                Download Resume
              </div>
            </div>
            <a href="#contact" className="hover:text-teal-400">Contact</a>
          </div>
        </div>
      </nav>
    );
  }