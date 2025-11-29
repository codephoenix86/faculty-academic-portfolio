import { Inter } from 'next/font/google';
import Resources from "./resources";
import { getResources } from "@/utils/sanity";

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default async function Page() {
  const resources = await getResources();

  return (
    <section className={`${inter.className} px-4 sm:px-[8%] lg:px-[16%] py-12 sm:py-16 md:py-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50`}>
      <Resources data={resources} />
    </section>
  );
}