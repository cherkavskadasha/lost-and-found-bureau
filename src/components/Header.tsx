"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Search, Compass, LogIn, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter(); 

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Compass className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="hidden font-bold sm:inline-block">
            Бюро Знахідок
          </span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/lost" className="text-sm font-medium hover:text-primary transition-colors">
            Загублено
          </Link>
          <Link href="/found" className="text-sm font-medium hover:text-primary transition-colors">
            Знайдено
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted"></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-9 w-9 rounded-full focus:outline-none ring-2 ring-transparent focus-visible:ring-primary transition-all">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                  <AvatarFallback>{session.user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="cursor-pointer" 
                  onClick={() => router.push("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Мій кабінет</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="cursor-pointer" 
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Налаштування</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 cursor-pointer focus:text-red-600"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Вийти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => signIn()} className="gap-2">
                <LogIn className="h-4 w-4" />
                Увійти
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}