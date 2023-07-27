import Navbar from "./Navbar/Navbar.js";
import Footer from "./Footer.js";

export default function Layout({ children }) {
  return (
    <>
      <div className="wrapper">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
