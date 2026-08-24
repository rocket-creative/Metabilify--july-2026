import { Reveal } from "@/components/Reveal";
import { AboutSection } from "./AboutSection";

/** `when` is empty for the one entry the source does not date. */
const milestones: { when: string; title: string; body: string }[] = [
  {
    when: "2012-Present",
    title: "Federally Supported Research",
    body: "Consecutive U.S. Department of Energy Genomic Science Program awards support large-scale systems biology, computational, and multiomics research involving Baxter and collaborators at the Danforth Center.",
  },
  {
    when: "",
    title: "The 3,800-Sample Challenge",
    body: "A large untargeted metabolomics experiment in the Baxter lab produces approximately 3,800 samples and exposes the limits of conventional LC/MS data-processing workflows at this scale.",
  },
  {
    when: "2023",
    title: "Big Ideas 3.0",
    body: "Team Metablify wins the Danforth Center competition and a $10,000 grant by audience vote.",
  },
  {
    when: "2023-2024",
    title: "Danforth Proof-of-Concept Funding",
    body: "Four grants totaling $200,000 help advance the IP-protected technology.",
  },
  {
    when: "2024",
    title: "DTC Leads Commercialization",
    body: "Danforth Technology Company leads the spinout effort, bringing together the technology, scientific founders, entrepreneurial leadership, company-building resources, and capital.",
  },
  {
    when: "2024",
    title: "Metablify Founded",
    body: "Michael Bielski partners with Ivan Baxter, Allen Hubbard, and Louis Connelly to form the company.",
  },
  {
    when: "2024",
    title: "Initial Investment",
    body: "DTC and QRM Capital become initial investors, with public reporting identifying a $500,000 investment from DTC.",
  },
  {
    when: "2024",
    title: "Arch Grants",
    body: "Metablify joins the 2024 Arch Grants cohort and receives $75,000 in equity-free, non-dilutive funding.",
  },
  {
    when: "2025",
    title: "Startup to Watch",
    body: "Metablify is named a St. Louis INNO Startup to Watch and begins external validation work with potential partners.",
  },
  {
    when: "Today",
    title: "Expanding the Platform",
    body: "Metablify is advancing its LC/MS mass-feature analysis platform, with metabolomics as the most mature application and proteomics as an important next area of development.",
  },
];

export function JourneyTimeline() {
  return (
    <AboutSection
      eyebrow="Our Journey"
      title="Science Created the Opportunity. An Ecosystem Helped Build the Company."
    >
      {/* One Reveal for the whole rail: animating each row separately would
          break the continuous line between markers. */}
      <Reveal>
        <ol className="about-timeline">
          {milestones.map((item) => (
            <li key={item.title} className="about-timeline-item">
              <span className="about-timeline-marker" aria-hidden="true">
                <span className="about-timeline-ring" />
                <span className="about-timeline-core" />
              </span>
              <p className="about-timeline-when">{item.when}</p>
              <div>
                <h3 className="about-timeline-title">{item.title}</h3>
                <p className="about-timeline-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </AboutSection>
  );
}
