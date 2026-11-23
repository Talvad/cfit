import Footer from "@/components/footer";
import '../globals.css'

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
    <main>{children}</main>
    <Footer/>
    </>
  );
}
