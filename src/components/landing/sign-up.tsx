"use client"

import { Button } from "@radix-ui/themes"
import { Input } from "../ui/input"


export function SignUp() {
  return (
        <section className="flex">
        <div className="flex-1 px-6 py-16">
          <p className="text-gray-600 text-sm max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
        </div>

        <div className="w-80 bg-[#f5f5f5] p-8">
          <h2 className="text-xl font-semibold mb-2">Ready to take a free trial?</h2>
          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">Log in for a account</h3>
            <div className="space-y-4">
              <Input placeholder="Email address" />
              <Input placeholder="Password" type="password" />
              <Button className="w-full bg-[#18a0fb] hover:bg-[#1590eb] text-white">Log in</Button>
            </div>
          </div>
        </div>
      </section>
  )
}
