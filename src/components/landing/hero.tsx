"use client"

import { Button } from "@radix-ui/themes"
import { Input } from "../ui/input"
import { Play } from "lucide-react"
import SignInForm from "./sig-in"
import Image from "next/image"
// import HeroBusiness from './../../../public/images/hero_business.png'
import HeroBusiness from './../../public/hero_business.png'
// import SignInForm from "./sig-in"


export function Hero() {
  return (
     <section className="md:flex">
        <div className=" flex-1 bg-[#cccccc] relative min-h-[400px] items-center justify-center ">
          <div className="text-center">
            {/* <div className="w-16 h-16 bg-[#18a0fb] rounded-full flex items-center justify-center mx-auto mb-8"> */}
              {/* <Play className="w-6 h-6 text-white fill-white" /> */}
            {/* </div> */}
            <Image src={HeroBusiness} width={400} height={400} alt="hero business"/>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 max-w-md">
              The largest community of photo enthusiasts
            </h1>
            {/* <Button className="bg-[#18a0fb] hover:bg-[#1590eb] text-white px-8">Join today</Button> */}
          </div>
        </div>

        {/* Sign Up Form */}
        <SignInForm></SignInForm>
       
      </section>
  )
}
