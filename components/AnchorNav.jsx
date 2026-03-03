import { AnchorMenu } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

// items: [{ text: string, targetIdName: string }]
//   targetIdName = the id of the section to scroll to (WITHOUT the # prefix)
// firstElementId = id of the first content section directly after this menu
//
// IMPORTANT: Place this component between the header and the first content section.
// Each section it links to must have a matching id on its root element.
// The menu becomes sticky on scroll and highlights the active section.
const AnchorNav = ({ items = [], firstElementId = "section-1" }) => (
  <AnchorMenu items={items} firstElementId={firstElementId} />
);

export default AnchorNav;
