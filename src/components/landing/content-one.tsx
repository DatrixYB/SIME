"use client"

import { Button } from "@radix-ui/themes"


export function Content_one() {
  return (
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
  )
}
