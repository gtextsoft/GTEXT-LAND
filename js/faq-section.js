/**
 * Injects a consistent FAQ section on every page.
 * Skips pages that already contain a .faq-list, and inserts before the footer.
 */
(function () {
  if (document.querySelector(".faq-list")) return;
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const DEFAULT_FAQS = [
    {
      q: "What documents do I receive when I buy a plot?",
      a: "Every plot comes with verified documentation — Certificate of Occupancy (C of O) or equivalent title, survey plan, and deed of assignment upon completion.",
    },
    {
      q: "Do you offer flexible payment plans?",
      a: "Yes. We offer flexible installment plans tailored to your budget. Speak with our team to discuss options available for your chosen estate.",
    },
    {
      q: "Can diaspora and international investors buy?",
      a: "Absolutely. We support local and international investors with remote purchase processes, virtual tours, and full documentation assistance.",
    },
    {
      q: "How do I schedule a site inspection?",
      a: "Call us, chat on WhatsApp, or book a free consultation. We'll arrange a guided tour of your preferred estate at a convenient time.",
    },
    {
      q: "Are your estates fully serviced?",
      a: "Our estates feature gated communities, paved roads, drainage, perimeter fencing, and green spaces — giving you a ready-to-build plot from day one.",
    },
  ];

  const FAQ_SETS = {
    general: [
      { q: "What is GTEXTLAND and what do you offer?", a: "GTEXTLAND is a real estate investment company offering luxury serviced plots and land banking opportunities across Lagos, Abuja, Ibadan, Ogun State, and beyond — with verified titles and flexible payment plans." },
      { q: "Why should I invest in land with GTEXTLAND?", a: "With 10+ years of experience and 18+ estate developments, we combine strategic high-appreciation locations, fully serviced estates, and 100% verified documentation to protect and grow your investment." },
      { q: "Which locations do you cover?", a: "We currently develop estates across Lagos, Abuja, Ibadan, Ogun State, and other prime growth corridors in Nigeria, with new estates launching regularly." },
      { q: "How do I get started as a first-time investor?", a: "Book a free consultation or explore our properties online. Our advisors will match you with an estate that fits your budget and investment goals." },
      { q: "Are the titles verified and genuine?", a: "Yes. Every estate comes with verified documentation — Certificate of Occupancy (C of O) or equivalent title, survey plan, and deed of assignment." },
    ],
    about: [
      { q: "When was GTEXTLAND founded?", a: "GTEXTLAND was founded in 2015 and celebrated its 10th anniversary on October 10, 2025 — a decade of making luxury land ownership accessible across Nigeria." },
      { q: "What is GTEXTLAND's mission and vision?", a: "Our mission is to own 200 estates with over 25,000 luxury serviced plots sold by 2035. Our vision is to be the largest developer of luxurious green and smart estates." },
      { q: "Who leads the company?", a: "GTEXTLAND is led by Chairman Mike Okiro and Founder Dr. Stephen Akintayo, alongside an experienced management team guiding investors at every step." },
      { q: "What makes GTEXTLAND different?", a: "We deliver fully serviced, ready-to-build estates with gated communities, paved roads, drainage, and verified titles — backed by transparent, customer-first service." },
      { q: "How many estates has GTEXTLAND developed?", a: "We have 18+ estate developments and counting across Lagos, Abuja, Ibadan, and other high-growth locations in Nigeria." },
    ],
    services: [
      { q: "What services does GTEXTLAND provide?", a: "We offer property consultation, land banking, flexible payment plans, documentation support, guided site visits, and ongoing after-sales support." },
      { q: "How does the investment process work?", a: "It follows six steps: consultation, site visit, reservation, documentation, payment, and handover — with our team guiding you throughout." },
      { q: "What do your payment plans look like?", a: "We offer flexible installment options tailored to your budget, making luxury land ownership accessible. Terms vary by estate — speak with an advisor for details." },
      { q: "Do you handle all the legal paperwork?", a: "Yes. Our documentation support covers title verification, survey plans, and deed of assignment processing so your ownership is fully secured." },
      { q: "Is support available after I buy?", a: "Absolutely. Our after-sales team provides ongoing assistance from purchase through development and beyond." },
    ],
    properties: [
      { q: "How do I know which estate is right for me?", a: "Use the filters to compare locations, plot sizes, and pricing, or book a consultation and our advisors will recommend an estate matching your goals." },
      { q: "What plot sizes are available?", a: "Most estates offer standard 400 sqm plots, with mini-estate and multi-plot options available on select developments." },
      { q: "Can I reserve a plot online?", a: "Yes. Click 'Inquire' on any listing or contact us directly to reserve a plot with a deposit and lock in current pricing." },
      { q: "Do listed prices change?", a: "Prices appreciate over time as estates develop and demand grows. Reserving early secures the current price for your chosen plot." },
      { q: "Can I inspect a property before buying?", a: "Yes. We arrange guided physical or virtual site inspections so you can see roads, layout, and development progress firsthand." },
    ],
    portfolio: [
      { q: "How many estates are in your portfolio?", a: "Our portfolio features 18+ estate developments across Lagos, Abuja, Oyo, and Ogun State, with new estates added regularly." },
      { q: "Are all portfolio estates currently available?", a: "Availability varies by estate — some are pre-launch, some in active phases, and others sold out. Enquire about any estate for current status." },
      { q: "Which locations are covered in the portfolio?", a: "Our estates span prime corridors including Ibeju-Lekki, Ikorodu, Epe, Ijebu-Ode, Kurudu and Guzape (Abuja), Ibadan, and more." },
      { q: "How do I enquire about a specific estate?", a: "Click 'Explore' or 'Enquire About Any Estate' and our team will share pricing, documentation, and payment plan details." },
      { q: "Do you have upcoming estate launches?", a: "Yes. We launch new estates regularly — register your interest or subscribe to our newsletter to be notified first." },
    ],
    blog: [
      { q: "What topics does the GTEXTLAND blog cover?", a: "We share land banking insights, investment guides, diaspora buying tips, location spotlights like Ibeju-Lekki, and market updates for Nigerian real estate." },
      { q: "How often is new content published?", a: "We publish fresh articles regularly. Subscribe to our newsletter to receive new guides and estate updates directly in your inbox." },
      { q: "Can the blog help me decide where to invest?", a: "Yes. Our guides break down location trends, appreciation potential, and buying processes to help you make an informed decision." },
      { q: "Is the advice relevant to international investors?", a: "Definitely. Several articles focus on diaspora property investment, including remote purchase and documentation guidance." },
      { q: "How do I get personalised investment advice?", a: "Beyond the blog, you can book a free consultation for tailored recommendations based on your budget and goals." },
    ],
    careers: [
      { q: "What kinds of roles does GTEXTLAND hire for?", a: "We hire across sales, client relations, marketing, operations, IT, and administration as we grow our estates and team nationwide." },
      { q: "How do I apply for a position?", a: "Submit your details and CV through the application form on this page. Our HR team reviews every application and will reach out if there's a fit." },
      { q: "What is the work culture like?", a: "We're a driven, customer-oriented team built on integrity, accountability, and professionalism, with room to grow within a fast-expanding brand." },
      { q: "Do you offer growth and training opportunities?", a: "Yes. We invest in our people through mentorship and professional development as the company scales toward its 2035 goals." },
      { q: "Do I need prior real estate experience?", a: "Not always — we value drive and the right attitude. Relevant experience is a plus, but several roles welcome motivated newcomers." },
    ],
    team: [
      { q: "Who can I speak to about investing?", a: "Our advisory team is ready to help. Reach out to Olamilesi (+234 814 259 0965) or Martha (+234 703 193 0951), or book a free consultation." },
      { q: "Who leads GTEXTLAND?", a: "The company is led by Chairman Mike Okiro and Founder Dr. Stephen Akintayo, supported by dedicated branch and department heads." },
      { q: "How experienced is the team?", a: "Our professionals bring years of real estate, legal, and client-service expertise to guide your investment journey with confidence." },
      { q: "Can I request a dedicated advisor?", a: "Yes. Contact us and we'll pair you with an advisor who understands your goals and preferred estates." },
      { q: "How quickly does the team respond?", a: "We aim to respond to all enquiries within 24 hours via phone, WhatsApp, or email." },
    ],
    property: [
      { q: "What title and documents come with this estate?", a: "This estate is sold with verified documentation — Certificate of Occupancy (C of O) or equivalent title, survey plan, and deed of assignment upon completion." },
      { q: "What plot sizes are available here?", a: "Plots are typically 400 sqm, with mini-estate or multi-plot options where available. Contact us for the current layout." },
      { q: "Can I pay in installments for this estate?", a: "Yes. Flexible installment plans are available for this development — speak with our team to structure a plan that suits your budget." },
      { q: "How do I inspect this property?", a: "Book a physical or virtual inspection through us and we'll arrange a guided tour of the estate at a convenient time." },
      { q: "How is my plot allocated after purchase?", a: "Once payment terms are met, we complete documentation and allocate your plot within the estate, then hand over your ownership documents." },
    ],
  };

  const page = document.body.getAttribute("data-page") || "general";
  const faqs =
    window.PAGE_FAQS && window.PAGE_FAQS.length
      ? window.PAGE_FAQS
      : FAQ_SETS[page] || DEFAULT_FAQS;

  const items = faqs
    .map(
      (f) => `
      <div class="faq-item">
        <button class="faq-question" type="button">${f.q} <i class="fas fa-chevron-down"></i></button>
        <div class="faq-answer"><p>${f.a}</p></div>
      </div>`
    )
    .join("");

  const section = document.createElement("section");
  section.className = "section faq-auto-section";
  section.setAttribute("aria-label", "Frequently asked questions");
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">Questions & Answers</p>
        <h2 class="section-title">Frequently Asked Questions</h2>
      </div>
      <div class="faq-list">${items}</div>
    </div>`;

  footer.insertAdjacentElement("beforebegin", section);
})();
