import Books from "./books";
import { getBooks } from "@/utils/sanity";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], 
  display: "swap",
});

export default async function Page() {
  const books = await getBooks();

  return (
    <section className={`sm:px-6 md:px-[8%] lg:px-[16%] py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 min-h-screen ${inter.className}`}>
      <Books data={books} />
    </section>
  );
}