import { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Welcome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <span className="text-xl font-bold text-emerald-900">JobTracker</span>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                Mulai Gratis
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-md hover:bg-emerald-50 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-5 bg-emerald-800 transition-transform duration-200 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-emerald-800 transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-emerald-800 transition-transform duration-200 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="md:hidden border-t border-emerald-100 py-3 flex flex-col gap-2 pb-4">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-200 font-medium text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-md font-medium text-center"
              >
                Mulai Gratis
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 sm:py-16 lg:py-24 gap-12">
          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Track Your
              <span className="text-emerald-600 block">Dream Job</span>
              Applications
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Kelola lamaran kerja kamu dengan mudah dan profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
              >
                Mulai Gratis
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-200 font-semibold text-lg text-center"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Illustration card */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 sm:w-80 h-72 sm:h-80 bg-white rounded-2xl shadow-2xl p-6 transform rotate-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Jobs Applications</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">Frontend Developer</p>
                        <p className="text-xs text-gray-500">Tech Corp - Interview</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">UI/UX Designer</p>
                        <p className="text-xs text-gray-500">Design Studio - Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">Full Stack Developer</p>
                        <p className="text-xs text-gray-500">StartupXYZ - Applied</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-lime-400 rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="flex flex-wrap justify-center items-center gap-2 text-sm sm:text-base">
              &copy; 2025 Job Application Tracker || Support Me on
              <span className="flex space-x-3 items-center text-gray-600 text-lg">
                <a href="https://www.instagram.com/nafiadnsyh_" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/nafiadiansyah" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><FaLinkedin /></a>
                <a href="https://www.github.com/NafiAdiansyah" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors"><FaGithub /></a>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
