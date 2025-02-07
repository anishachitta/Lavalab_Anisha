import Inventory from "@/components/Inventory";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex">
      <Navbar />
      <main className="flex-1 ml-16 min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Inventory />
        </div>
      </main>
    </div>
  );
}
