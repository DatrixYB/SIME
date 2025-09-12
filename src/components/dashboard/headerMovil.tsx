/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import {  MenuIcon } from 'lucide-react';
// import ArrowRight from "@/assets/arrow-right.svg";
// import Logo from "@/assets/logo40.svg";
// import MenuIcon from "@/assets/MenuIcon.svg";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { getNavigationByRole } from '../utils/roleNavigation';
import { useUser } from '@/hooks/context/user-context';
import { Button } from '@radix-ui/themes';
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// import Image from "next/image";
export const HeaderMovil = () =>{

    const [isFormOpenC, setIsFormOpenC] = useState(false);

const toggleFormC = () => {
  setIsFormOpenC(!isFormOpenC);
};
const closeFormC = () => {
  setIsFormOpenC(false);
}
useEffect(() => {

  }, []);

    const user = useUser();
 
    const pathname = usePathname()

    const navigation = getNavigationByRole(user?.user?.role)
  
    return <>
    <header className="sticky top-0 backdrop-blur-sm shadow-md z-50 overflow-x-clip">

                <div className="py-5">
                    <div className="">
                    <div className="flex-1 items-center justify-between px-1">
            
                    {/* <Logo className= " rounded-full" alt="SAS LOGO"></Logo> */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleFormC()}}
                            className="cursor-pointer hover:shadow-md hover:shadow-black/50   p-2 bg-white/10 backdrop-blur-sm  "
                        >
                        
                                {/* <MenuIcon className="h-5 w-5  cursor-pointer" /> */}
                                
                        <MenuIcon className = "h-5 w-5 md:hidden"  />
                            
                        </button>
                        {isFormOpenC && (
                            // <nav className=" top-full   bg-white shadow-md flex flex-col gap-4 p-4 text-black/60">
                            //     <Link href="/" onClick={closeFormC}>Inicio</Link>
                            //     <Link href="/dashboard/sales"  onClick={closeFormC}>Sales</Link>
                            //     <Link href="/dashboard/pos"  onClick={closeFormC}>POS</Link>
                            //     {/* <Link href="/services"  onClick={closeFormC}>Servicios</Link> */}
                            //     {/* <Link href="/demos"  onClick={closeFormC}>Demos</Link> */}
                             
                            // </nav>
                                  <nav className="
                                  top-full   bg-white shadow-md flex flex-col gap-4 p-4 text-black/60">
        {navigation.map((item) => (
          <Button
            key={item.name}
            asChild
            variant={pathname === item.href ? "solid" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
          >
            <Link href={item.href}>
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>

          </Button>
        ))}

      </nav>
                        )}
              
                    </div>
                    </div>
                </div>

                   </header>
    </>
}