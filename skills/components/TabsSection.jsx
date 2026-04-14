import { TabbedPanels } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

// tabs: [{ id: string, label: string, content: string (HTML or text) }]
// bgColor: optional CSS class e.g. "bg-dark" for dark background
// Each tab child must have id and title props — TabbedPanels reads these for tab headers.
const TabsSection = ({ tabs = [], bgColor = "" }) => (
  <TabbedPanels initialTab={tabs[0]?.id} bgColor={bgColor}>
    {tabs.map((tab) => (
      <div key={tab.id} id={tab.id} title={tab.label}>
        <div className="container py-4">
          <div dangerouslySetInnerHTML={{ __html: tab.content }} />
        </div>
      </div>
    ))}
  </TabbedPanels>
);

export default TabsSection;
