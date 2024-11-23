"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Workflow, Megaphone, Radio, User } from 'lucide-react'

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Workflows", href: "/workflows", icon: Workflow },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Audiences", href: "/audiences", icon: Users },
  { name: "Channels", href: "/channels", icon: Radio },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mx-4 flex justify-between">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-bold sm:inline-block">Audience Sync</span>
            </Link>
            <>
            <NavigationMenu>
                <NavigationMenuList>
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "h-9 px-3",
                            pathname === item.href && "bg-muted font-medium"
                        )}
                        >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                ))}
                </NavigationMenuList>
            </NavigationMenu>
            </>
        </div>
        <Button
          className="inline-flex items-center md:hidden"
          variant="outline"
          size="icon"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        
      </div>
    </header>
  )
}

