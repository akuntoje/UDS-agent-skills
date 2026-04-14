import { Accordion } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

const AccordionSection = () => (
  <Accordion
    openedCard={1}
    cards={[
      {
        content: {
          header: "What is SafeInsights?",
          body: "<p>SafeInsights is a secure research platform built on ASU infrastructure that enables trusted data sharing between institutions and researchers.</p>",
        },
      },
      {
        color: "gray",
        content: {
          header: "Who can use SafeInsights?",
          body: "<p>SafeInsights is available to researchers, institutions, and organizations looking for a privacy-preserving environment to collaborate on sensitive data.</p>",
        },
      },
      {
        color: "maroon",
        content: {
          header: "How do I get access?",
          body: "<p>Submit a request through the RFI form on this page and our team will reach out to guide you through the onboarding process.</p>",
        },
      },
      {
        color: "dark",
        content: {
          header: "Is my data secure?",
          body: "<p>Yes. SafeInsights uses industry-standard encryption and access controls to ensure your data remains protected at all times.</p>",
        },
      },
    ]}
  />
);

export default AccordionSection;
