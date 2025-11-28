import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProfile, incrementVisitorCount } from "@/utils/sanity";

export const metadata = {
  title: "Portfolio",
  description: "Academic portfolio website",
};

export default async function RootLayout({ children }) {
  const profile = await getProfile();
  
  // Increment visitor count on every page load
  if (profile?._id) {
    await incrementVisitorCount(profile._id);
  }
  
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <NavBar />

          {/* Main Content */}
          <main className="grow">{children}</main>

          {/* Global Footer */}
          <Footer profile={profile} />
        </div>
      </body>
    </html>
  );
}