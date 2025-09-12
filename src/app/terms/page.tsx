import { Header } from "@/components/landing/header"

import { Footer } from "@/components/landing/footer"
import TermsAndConditions from "@/components/landing/terms-conditions"


export default function Component() {
  return (
    <div className="min-h-screen bg-white ">

      {/* Header */}
<Header></Header>
<TermsAndConditions/>
     
      {/* Footer */}
         <Footer></Footer>

 
    </div>
  )
}
