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
  DropdownMenuGroup, // Додали цей імпорт!
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-xl p-1.5 text-white shadow-sm"
          >
            <Compass className="h-5 w-5" />
          </motion.div>
          <span className="hidden font-extrabold sm:inline-block text-xl tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
            Бюро Знахідок
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/lost" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Загублено
          </Link>
          <Link href="/found" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            Знайдено
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
            <Search className="h-5 w-5" />
          </Button>

          {status === "loading" ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-slate-200"></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-10 w-10 rounded-full focus:outline-none ring-2 ring-transparent focus-visible:ring-indigo-500 transition-all hover:ring-indigo-200">
                <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                  <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56 rounded-xl border-slate-100 shadow-lg mt-1" align="end">
                
                {/* Огорнули Label у Group, щоб виправити помилку */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-slate-800">{session.user?.name}</p>
                      <p className="text-xs leading-none text-slate-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator className="bg-slate-100" />
                
                <DropdownMenuItem 
                  className="cursor-pointer text-slate-600 focus:bg-indigo-50 focus:text-indigo-700 py-2.5" 
                  onClick={() => router.push("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">Мій кабінет</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  className="cursor-pointer text-slate-600 focus:bg-indigo-50 focus:text-indigo-700 py-2.5" 
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="font-medium">Налаштування</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-slate-100" />
                <DropdownMenuItem 
                  className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700 py-2.5"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">Вийти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => signIn()} 
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 h-10 shadow-md shadow-indigo-200"
              >
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