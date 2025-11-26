import Books from "./books";
import { getBooks } from "@/utils/sanity";

export default async function Page() {
  const books = await getBooks();

  return (
    <section className="px-[8%] lg:px-[16%] py-16 md:py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40 min-h-screen">
      <Books data={books} />
    </section>
  );
}
