import { ASUFooter } from "@asu/component-header-footer";
import "@asu/unity-bootstrap-theme";

const Footer = ({ contact = null, social = null }) => {
  return <ASUFooter contact={contact} social={social} />;
};

export default Footer;
