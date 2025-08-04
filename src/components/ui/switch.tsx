'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    {...props}
    className={cn(
      'appearance-none inline-flex items-center w-[44px] h-[26px] rounded-full bg-gray-300 transition-colors duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
      'data-[state=checked]:bg-blue-600',
      className
    )}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'block w-[22px] h-[22px] bg-white rounded-full shadow-md transition-transform duration-300',
        'data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]'
      )}
    />
  </SwitchPrimitives.Root>
))

Switch.displayName = 'CustomSwitch'

export { Switch }
