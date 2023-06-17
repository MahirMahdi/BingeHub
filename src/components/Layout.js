import Navbar from "./Navbar/Navbar.js";
import Footer from "./Footer.js";

export default function Layout({ children, nav_type }) {
  return (
    <div className="wrapper">
      <header>
        <Navbar home={nav_type} />
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
