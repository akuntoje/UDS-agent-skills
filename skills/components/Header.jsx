import { ASUHeader } from "@asu/component-header-footer";
import "@asu/unity-bootstrap-theme";

const ASU_FALLBACK_LOGO =
  "https://www.asu.edu/asuthemes/5.0/assets/asu_sunburst_logo_white.png";

const Header = ({
  siteTitle = "ASU Site",
  parentOrg = "",
  parentOrgUrl = "",
  navItems = [],
  logoSrc = ASU_FALLBACK_LOGO,
  logoAlt = "Site Logo",
  logoHref = "/",
  logoMobileSrc = null,
}) => {
  const dsNavItems = navItems.map((item) => ({
    isActive: false,
    htmlLink: { text: item.text, uri: item.href, target: item.target || "_self" },
    children: (item.children || []).map((child) => ({
      hasBorderTop: false,
      htmlLink: { text: child.text, uri: child.href, target: child.target || "_self" },
    })),
  }));

  return (
    <ASUHeader
      title={siteTitle}
      parentOrg={parentOrg}
      parentOrgUrl={parentOrgUrl}
      logo={{
        alt: logoAlt,
        src: logoSrc,
        href: logoHref,
        mobileSrc: logoMobileSrc || logoSrc,
      }}
      navTree={dsNavItems}
    />
  );
};

export default Header;
