import Navbar from "@/components/navbar"
import HomeContent from "@/components/home-content"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex w-full justify-center">
        <main className="w-full max-w-[1440px] p-4 md:p-6 overflow-y-auto">
          <HomeContent />
        </main>
      </div>
    </div>
  )
}

