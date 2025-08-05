"use client"

import { Button } from "@radix-ui/themes"


export function Header() {
  return (
         <header className="flex items-center justify-between px-6 py-4 border-b border-[#e5e5e5]">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#18a0fb] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg">SIME</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Community
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Company
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Help desk
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Resources
          </a>
          <Button className="bg-[#18a0fb] hover:bg-[#1590eb] text-white px-6">Get Started</Button>
        </div>
      </header>
  )
}
