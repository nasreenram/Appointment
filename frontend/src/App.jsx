import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // We will connect this to FastAPI backend later
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="z-10 max-w-4xl w-full">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Next-Gen App
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Powered by FastAPI, Prisma, React, and Tailwind CSS. A unified full-stack architecture ready for the future.
          </p>
        </header>

        {/* Dashboard Cards Content */}
        <main className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-8 rounded-3xl shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
            <div className="h-12 w-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">FastAPI Backend</h2>
            <p className="text-gray-400 leading-relaxed mb-6">High-performance async Python backend configured with Prisma ORM and absolute type safety.</p>
            <button className="text-sm border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 px-4 py-2 rounded-full transition-colors font-medium">Verify Connection</button>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Tailwind Flow</h2>
            <p className="text-gray-400 leading-relaxed mb-6">Utility-first styling with zero-runtime React rendering. Fast, scalable, and responsive by default.</p>
            <div className="flex gap-2">
              <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 rounded-full border border-purple-500/20">React</span>
              <span className="bg-pink-500/10 text-pink-400 text-xs px-3 py-1 rounded-full border border-pink-500/20">Vite</span>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default App
