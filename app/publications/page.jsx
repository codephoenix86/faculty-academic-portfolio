import Publications from "./publications";
import { getPublications } from "@/utils/sanity";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], 
  display: "swap",
});

export default async function Page() {
  const publications = await getPublications();

  return (
    <section className={`sm:px-6 md:px-[8%] lg:px-[16%] py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 min-h-screen ${inter.className}`}>
      <Publications data={publications} />
    </section>
  );
}