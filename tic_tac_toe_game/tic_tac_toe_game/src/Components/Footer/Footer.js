import LinkSvg from "../Assets/Link";
import "./Footer.css";

const Footer = ({ setShowModal }) => 
{
  return (
    <footer>
      <LinkSvg setShowModal={setShowModal} />
    </footer>
  );
};

export default Footer;