import { Button } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

// color: "gold" | "maroon" | "gray" | "dark"
// size: "default" | "small" | "xsmall" | "medium" | "large"
// href: if provided, renders as <a> link; otherwise renders as <button>
// icon: FontAwesome array e.g. ["fas", "arrow-right"]
const UDSButton = ({
  label = "Click here",
  color = "gold",
  size = "default",
  href = undefined,
  onClick = undefined,
  disabled = false,
  icon = undefined,
  target = "_self",
}) => (
  <Button
    label={label}
    color={color}
    size={size}
    href={href}
    onClick={onClick}
    disabled={disabled}
    icon={icon}
    target={target}
  />
);

export default UDSButton;
