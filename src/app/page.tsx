import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero Section */}
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

      {/* Content Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Snap photos and share like never before</h2>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="font-semibold mb-3">Sed ut perspiciatis</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
              </p>
              <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
                Learn more
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Lorem ipsum dolor</h3>
              <p className="text-gray-600 text-sm mb-4">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident.
              </p>
              <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
                Learn more
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="font-semibold mb-3">Nemo enim ipsum</h3>
              <p className="text-gray-600 text-sm mb-4">
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
                vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
              </p>
              <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
                Learn more
              </Button>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Tempor incididunt</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur quis autem vel eum iure reprehenderit.
              </p>
              <Button variant="outline" className="text-[#18a0fb] border-[#18a0fb] bg-transparent">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image and Content Section */}
      <section className="px-6 py-16 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-[#cccccc] h-64 rounded-lg"></div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Sed ut perspiciatis unde omnis</h3>
              <p className="text-gray-600 text-sm">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Another Content Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sed ut perspiciatis unde omnis</h3>
              <p className="text-gray-600 text-sm">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
              </p>
            </div>
            <div className="bg-[#cccccc] h-64 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
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

      {/* Bottom Sign Up Section */}
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

      {/* Footer */}
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
    </div>
  )
}
