"use client"


export function Footer() {
  return (
     <footer className="border-t border-[#e5e5e5] px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Help desk
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Community
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Company
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#18a0fb] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg">SIME</span>
            </div>

            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Help desk
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Blog
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Resources
              </a>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#cccccc] rounded-full"></div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-xs mt-4">© 2024 SIME. All rights reserved.</p>
        </div>
      </footer>
  )
}
