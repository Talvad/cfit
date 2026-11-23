import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
