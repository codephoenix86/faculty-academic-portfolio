import Contact from "./contact";
import { getProfile } from "@/utils/sanity";

export default async function page() {
  const profile = await getProfile();

  return (
    <section className="bg-gray-50 min-h-screen">
      <Contact profile={profile} />
    </section>
  );
}
