/**
 * Injects a consistent FAQ section on every page.
 * Skips pages that already contain a .faq-list, and inserts before the footer.
 */
(function () {
  if (document.querySelector(".faq-list")) return;
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const faqs = (window.PAGE_FAQS && window.PAGE_FAQS.length ? window.PAGE_FAQS : [
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
  ]);

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
