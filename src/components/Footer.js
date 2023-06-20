import {
  BsGoogle,
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsInstagram,
} from "react-icons/bs/index.esm.js";

export default function Footer() {
  return (
    <footer>
      <div className="social-media">
        <BsGoogle />
        <BsFacebook />
        <BsTwitter />
        <BsGithub />
        <BsInstagram />
      </div>
      <p className="support">Supported By</p>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        className="support-logo"
      />
    </footer>
  );
}
