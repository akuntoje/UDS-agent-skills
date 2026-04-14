import "@asu/unity-bootstrap-theme";

// SIZING: Always adapt minHeight and width to match the prompt or  design screenshot.
// If the design or prompt  shows a larger/smaller card, override via props.
const CardHover = ({
  image = "",
  imageAlt = "alt text",
  title = "Serving all learners at every stage of life",
  body = "As a comprehensive public research university, ASU is committed to providing excellence in education.",
  ctaLabel = "Call to Action",
  ctaHref = "#",
  // SIZING: set minHeight to match the card height in the design (e.g. "400px", "500px")
  minHeight = "400px",
  // SIZING: set width to match layout — "100%" fills its container column
  width = "100%",
}) => (
  <div className="content-section text-white" style={{ minHeight, width }}>
    <div className="image-holder">
      <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
    </div>
    <div className="content-holder">
      <div className="content-bg">
        <h3>{title}</h3>
        <div className="hidden-details">
          <p className="long-text">{body}</p>
          <a
            href={ctaHref}
            className="btn btn-gold btn-sm"
            data-ga="call to action"
            data-ga-name="onclick"
            data-ga-event="link"
            data-ga-action="click"
            data-ga-type="internal link (external if non asu.edu url)"
            data-ga-region="main content"
            data-ga-section="populate with heading text"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  </div>
);
export default CardHover;
