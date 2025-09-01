import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Content_one } from "@/components/landing/content-one"
import { Content_two } from "@/components/landing/content-two"
import { Content_three } from "@/components/landing/content-three"
import { Company } from "@/components/landing/company"
import { SignUp } from "@/components/landing/sign-up"
import { Footer } from "@/components/landing/footer"


export default function Component() {
  return (
    <div className="min-h-screen bg-white ">
      {/* Header */}
<Header></Header>

      {/* Hero Section */}
    <Hero></Hero>

      {/* Content Section */}
 <Content_one></Content_one>

      {/* Image and Content Section */}
      <Content_two></Content_two>


      {/* Another Content Section */}
    <Content_three></Content_three>

      {/* Company Logos Section */}
   <Company></Company>

      {/* Bottom Sign Up Section */}
 <SignUp></SignUp>
      {/* Footer */}
    <Footer></Footer>
    </div>
  )
}
