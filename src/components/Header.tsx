"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Compass, LogIn, LogOut, User, Settings, Menu, Shield, Bell } from "lucide-react";
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
import { useState, useEffect } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/notifications")
        .then(res => res.json())
        .then(data => setNotifications(Array.isArray(data) ? data : []))
        .catch(err => console.error("Помилка сповіщень", err));
    }
  }, [status]);

  const handleMarkAsRead = async () => {
    if (unreadCount === 0) return;
    await fetch("/api/notifications", { method: "PUT" });
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/50 bg-white/70 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full focus:outline-none">
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 rounded-2xl border-slate-100 shadow-xl p-2 mt-2">
                <DropdownMenuItem onClick={() => router.push("/lost")} className="rounded-xl py-3 cursor-pointer text-slate-700 font-medium">Загублені речі</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/found")} className="rounded-xl py-3 cursor-pointer text-slate-700 font-medium">Знайдені речі</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/create")} className="rounded-xl py-3 cursor-pointer text-indigo-600 font-bold bg-indigo-50 mt-1 mb-1">+ Створити оголошення</DropdownMenuItem>
                
                {(session?.user as any)?.role === "ADMIN" && (
                  <DropdownMenuItem onClick={() => router.push("/admin")} className="rounded-xl py-3 cursor-pointer text-emerald-600 font-bold bg-emerald-50 mt-1 border border-emerald-100">
                    <Shield className="mr-2 h-4 w-4" /> Адмін-панель
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }} className="bg-blue-600 rounded-xl p-2 text-white shadow-md shadow-blue-600/20">
              <Compass className="h-5 w-5" />
            </motion.div>
            <span className="hidden font-extrabold sm:inline-block text-xl tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
              Бюро Знахідок
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 justify-center max-w-2xl px-8">
          <nav className="flex gap-8">
            <Link href="/lost" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Загублено</Link>
            <Link href="/found" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Знайдено</Link>
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3 min-w-[120px]">
          {status === "loading" ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200"></div>
          ) : session ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/create" className="hidden lg:flex">
                <Button className="h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] border-0">
                  Створити оголошення
                </Button>
              </Link>

              <DropdownMenu onOpenChange={(open) => open && handleMarkAsRead()}>
                <DropdownMenuTrigger className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-2xl border-slate-100 shadow-xl p-2 mt-2">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-bold text-slate-800 p-2">Сповіщення</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className={`p-3 text-sm rounded-xl mb-1 ${n.isRead ? 'text-slate-600 bg-white' : 'bg-blue-50 text-blue-900 font-medium'}`}>
                          {n.message}
                          <div className="text-[10px] text-slate-400 mt-2 font-normal">
                            {new Date(n.createdAt).toLocaleDateString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-sm text-slate-400">У вас немає нових сповіщень</div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-11 w-11 rounded-full focus:outline-none ring-2 ring-transparent focus-visible:ring-blue-500 transition-all hover:ring-blue-200 ml-2">
                  <Avatar className="h-11 w-11 border-2 border-white shadow-md">
                    <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-700 font-bold">{session.user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-60 rounded-2xl border-slate-100 shadow-xl mt-2 p-2" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal p-3 bg-slate-50 rounded-xl mb-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-slate-800">{session.user?.name}</p>
                        <p className="text-xs leading-none text-slate-500 truncate">{session.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer text-slate-700 focus:bg-indigo-50 focus:text-indigo-700 rounded-xl py-3 font-medium" onClick={() => router.push("/profile")}>
                    <User className="mr-3 h-4 w-4" /> Мій кабінет
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-slate-700 focus:bg-indigo-50 focus:text-indigo-700 rounded-xl py-3 font-medium" onClick={() => router.push("/profile/edit")}>
                    <Settings className="mr-3 h-4 w-4" /> Налаштування
                  </DropdownMenuItem>
                  {(session.user as any)?.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator className="bg-slate-100 my-1" />
                      <DropdownMenuItem className="cursor-pointer text-emerald-700 focus:bg-emerald-50 focus:text-emerald-800 rounded-xl py-3 font-bold" onClick={() => router.push("/admin")}>
                        <Shield className="mr-3 h-4 w-4" /> Адмін-панель
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  <DropdownMenuItem className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700 rounded-xl py-3 font-medium" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-3 h-4 w-4" /> Вийти з акаунта
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={() => signIn()} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 h-10 shadow-lg shadow-indigo-600/20 font-bold transition-all">
                <LogIn className="h-4 w-4" /> Увійти
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}