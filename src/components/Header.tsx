"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Search, Compass, LogIn, LogOut, User, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/lost?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/50 bg-white/70 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-full focus:outline-none">
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-2xl border-slate-100 shadow-xl p-2 mt-2">
                <DropdownMenuItem onClick={() => router.push("/lost")} className="rounded-xl py-3 cursor-pointer text-slate-700 font-medium">
                  Загублені речі
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/found")} className="rounded-xl py-3 cursor-pointer text-slate-700 font-medium">
                  Знайдені речі
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/create")} className="rounded-xl py-3 cursor-pointer text-blue-600 font-bold bg-blue-50 mt-1">
                  + Створити оголошення
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-600 rounded-xl p-2 text-white shadow-md shadow-blue-600/20"
            >
              <Compass className="h-5 w-5" />
            </motion.div>
            <span className="hidden font-extrabold sm:inline-block text-xl tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
              Бюро Знахідок
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 flex-1 justify-center max-w-2xl px-8">
          <nav className="flex gap-6">
            <Link href="/lost" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              Загублено
            </Link>
            <Link href="/found" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              Знайдено
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Шукати оголошення..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-white/80 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm placeholder:text-slate-400"
            />
          </form>
        </div>

        <div className="flex items-center justify-end gap-3 min-w-[120px]">
          {status === "loading" ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link href="/create" className="hidden lg:flex">
                <Button variant="outline" className="h-10 rounded-full border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 font-bold shadow-sm transition-all">
                  Створити оголошення
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-11 w-11 rounded-full focus:outline-none ring-2 ring-transparent focus-visible:ring-blue-500 transition-all hover:ring-blue-200">
                  <Avatar className="h-11 w-11 border-2 border-white shadow-md">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-sky-100 text-blue-700 font-bold">
                      {session.user?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-60 rounded-2xl border-slate-100 shadow-xl mt-2 p-2" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-xl mb-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-slate-800">{session.user?.name}</p>
                        <p className="text-xs leading-none text-slate-500 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuItem 
                    className="cursor-pointer text-slate-700 focus:bg-blue-50 focus:text-blue-700 rounded-xl py-3 font-medium" 
                    onClick={() => router.push("/profile")}
                  >
                    <User className="mr-3 h-4 w-4" />
                    Мій кабінет
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    className="cursor-pointer text-slate-700 focus:bg-blue-50 focus:text-blue-700 rounded-xl py-3 font-medium" 
                    onClick={() => router.push("/profile/edit")}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Налаштування
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  
                  <DropdownMenuItem 
                    className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700 rounded-xl py-3 font-medium"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Вийти з акаунта
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={() => signIn()} 
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-10 shadow-lg shadow-blue-600/20 font-bold transition-all"
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