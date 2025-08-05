"use client"

import { Button } from "@radix-ui/themes"
import { Input } from "../ui/input"
import { Play } from "lucide-react"


export function Hero() {
  return (
     <section className="flex">
        <div className="flex-1 bg-[#cccccc] relative min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#18a0fb] rounded-full flex items-center justify-center mx-auto mb-8">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 max-w-md">
              The largest community of photo enthusiasts
            </h1>
            <Button className="bg-[#18a0fb] hover:bg-[#1590eb] text-white px-8">Join today</Button>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="w-80 bg-[#f5f5f5] p-8">
          <h2 className="text-xl font-semibold mb-2">Ready to take a free trial?</h2>
          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">Sign up for a free account</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Input placeholder="First name" className="flex-1" />
                <Input placeholder="Last name" className="flex-1" />
              </div>
              <Input placeholder="Email address" />
              <Input placeholder="Phone number" />
              <Button className="w-full bg-[#18a0fb] hover:bg-[#1590eb] text-white">Sign up</Button>
            </div>
          </div>
        </div>
      </section>
  )
}
