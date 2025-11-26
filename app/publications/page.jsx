import Publications from "./publications";
import { getPublications } from "@/utils/sanity";

export default async function Page() {
  const publications = await getPublications();

  return (
    <section className="px-[8%] lg:px-[16%] py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 min-h-screen">
      <Publications data={publications} />
    </section>
  );
}
