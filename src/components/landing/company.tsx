"use client"

import { Button } from "@radix-ui/themes"


export function Company() {
  return (
      <section className="px-6 py-16 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Youre in good company</h2>
          <p className="text-gray-600 text-sm mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>

          <div className="grid grid-cols-4 gap-8 mb-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#cccccc] h-16 rounded"></div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button className="bg-[#18a0fb] hover:bg-[#1590eb] text-white px-8">Get Started</Button>
            <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
              Learn more
            </Button>
          </div>
        </div>
      </section>
  )
}
