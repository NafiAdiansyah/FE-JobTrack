import Link from "next/link"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 to-green-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-emerald-900">JobTracker</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/login" className="px-4 py-2 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-200">
                Login
              </Link>
              <Link href="/register" className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Mulai Gratis
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between py-16 lg:py-24">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Track Your
              <span className="text-emerald-600 block">Dream Job</span>
              Applications
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Kelola lamaran kerja kamu dengan mudah dan profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="px-8 py-5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Mulai Gratis
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-200 font-semibold text-lg"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white rounded-2xl shadow-2xl p-6 transform rotate-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Jobs Applications</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">Frontend Developer</p>
                        <p className="text-xs text-gray-500">Tech Corp - Interview</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-gray-900 font-medium text-sm">UI/UX Designer</p>
                        <p className="text-xs text-gray-500">Design Studio - Pending</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
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

        {/*}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Semua yang kamu butuhkan untuk mengelola aplikasi kerja dengan efektif
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tracking Mudah</h3>
              <p className="text-gray-600 ">Pantau status setiap aplikasi dari applied hingga hired</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reminder Otomatis</h3>
              <p className="text-gray-600">Jangan lewatkan deadline dengan notifikasi pintar</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600">Lihat progress dan statistik aplikasi kamu</p>
            </div>
          </div>
        </section>*/}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="flex justify-center items-center gap-2">
              &copy; 2025 Job Application Tracker || Support Me on
              <span className="flex space-x-4 items-center text-gray-600">
                <a href="https://www.instagram.com/nafiadnsyh_" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/nafiadiansyah" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://www.github.com/NafiAdiansyah" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              </span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
