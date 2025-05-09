import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import HomeContent from "@/components/home-content"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <HomeContent />
        </main>
      </div>
    </div>
  )
}

