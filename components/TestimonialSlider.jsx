import { useState } from "react";
import { Testimonial } from "@asu/unity-react-core";
import "../../node_modules/@asu/unity-react-core/dist/index.css";

const testimonials = [
  {
    id: 1,
    imageSource: "https://d3mjn4a0ozkizj.cloudfront.net/assets/team1.png",
    imageAltText: "Danielle S. McNamara",
    quote: {
      content:
        "SafeInsights represents a transformative opportunity to advance our understanding of student learning at scale. By connecting researchers with large-scale educational data through secure enclaves, we can unlock insights that were previously impossible to obtain and drive real classroom impact.",
      cite: {
        name: "Danielle S. McNamara",
        description: "Principal Investigator, SafeInsights@ASU",
      },
    },
  },
  {
    id: 2,
    imageSource: "https://d3mjn4a0ozkizj.cloudfront.net/assets/team2.png",
    imageAltText: "Bethany Weigele",
    quote: {
      content:
        "Our collaboration with SafeInsights opens new pathways for evidence-based research in higher education. The secure data infrastructure allows us to study learning patterns while fully protecting student privacy — a balance that is critical for advancing the field responsibly.",
      cite: {
        name: "Bethany Weigele",
        description: "Co-Investigator, SafeInsights@ASU",
      },
    },
  },
  {
    id: 3,
    imageSource: "https://d3mjn4a0ozkizj.cloudfront.net/assets/team.png",
    imageAltText: "Elizabeth Reilley",
    quote: {
      content:
        "The SafeInsights initiative brings together over 80 partners to create an unprecedented platform for learning research. ASU's involvement underscores our deep commitment to personalized, data-driven educational outcomes that benefit learners everywhere.",
      cite: {
        name: "Elizabeth Reilley",
        description: "Co-Investigator, SafeInsights@ASU",
      },
    },
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="uds-testimonial-slider">
      {/* Testimonial display — uses @asu/unity-react-core Testimonial */}
      <div className="uds-testimonial-slide" key={current}>
        <Testimonial
          imageSource={t.imageSource}
          imageAltText={t.imageAltText}
          quote={t.quote}
        />
      </div>

      {/* Controls row: prev — dots — next */}
      <div className="uds-testimonial-controls">
        <button
          className="btn btn-circle btn-circle-alt-gray"
          onClick={prev}
          aria-label="Previous testimonial"
        >
          <span className="fas fa-chevron-left" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <div className="uds-testimonial-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial by ${item.quote.cite.name}`}
              className={`uds-testimonial-dot${i === current ? " active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button
          className="btn btn-circle btn-circle-alt-gray"
          onClick={next}
          aria-label="Next testimonial"
        >
          <span className="fas fa-chevron-right" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <style>{`
        .uds-testimonial-slider {
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
        }
        .uds-testimonial-slide {
          animation: testimonialFadeIn 0.4s ease;
        }
        @keyframes testimonialFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .uds-testimonial-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        .uds-testimonial-dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .uds-testimonial-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #bbb;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .uds-testimonial-dot.active {
          background: #8c1d40;
          transform: scale(1.25);
        }
        .uds-testimonial-dot:hover {
          background: #8c1d40;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
