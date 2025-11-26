import Conferences from "./conferences";
import { getConferences } from "@/utils/sanity";

export default async function Page() {
  const conferences = await getConferences();

  return (
    <section className="px-[8%] lg:px-[16%] py-16 md:py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-violet-50/40 min-h-screen">
      <Conferences data={conferences} />
    </section>
  );
}
