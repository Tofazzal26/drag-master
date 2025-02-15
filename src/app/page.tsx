"use client";
import { MessageCircle, Settings, Menu, TvMinimal, Bell } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Dashboard</div>
          <div>
            <div className="flex items-center gap-4">
              <Bell size={20} />
              <Image src="/man.png" width={40} height={40} alt="profile" />
              <h4>Tofazzal Hossain</h4>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="lg:w-64 bg-white shadow-md p-4 flex flex-col justify-between">
            <ul>
              <li className="p-2 rounded bg-[#7498fb] text-white flex items-center gap-2 cursor-pointer">
                <TvMinimal size={24} /> Home
              </li>
              <li className="p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer">
                <MessageCircle size={20} /> Messages
              </li>
              <li className="p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer">
                <Settings size={20} /> Settings
              </li>
            </ul>
            <div className="text-sm text-gray-500">© 2025 Drag Master</div>
          </aside>

          {/* Main Content Area */}
          <main className="p-6 flex-1">
            <h2 className="">Main</h2>
          </main>
        </div>
      </div>
    </div>
  );
}
