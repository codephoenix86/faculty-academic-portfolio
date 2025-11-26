import Hero from "@/components/hero";
import { getProfile } from "@/utils/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const profile = await getProfile();

  return (
    <main>
      <Hero profile={profile} />
    </main>
  );
}
