import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import Overview from "./overview/page";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-scroll">
      <Overview />
      <Sidebar />
    </main>
  );
}
