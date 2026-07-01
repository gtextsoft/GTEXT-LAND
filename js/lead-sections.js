/**
 * Shared lead-generation sections (forms, CTAs, newsletter)
 */
(function () {
  const config = window.GTEXTLAND_CONFIG;
  const footer = document.querySelector(".site-footer");
  if (!config || !footer || document.querySelector(".lead-toolkit")) return;

  const page = document.body.getAttribute("data-page") || "general";
  const showMiniContact = page !== "contact" && page !== "careers";
  const showRegisterInterest = page !== "careers";
  const brochure = config.brochure || "#";
  const propertyName =
    document.body.getAttribute("data-property") || "";

  const estateOptions = `
    <option value="" disabled selected>Select estate (optional)</option>
    <option value="Sardius Estate Ijebu-Ode">Sardius Estate Ijebu-Ode</option>
    <option value="Beryl Beach Front Ibeju-Lekki">Beryl Beach Front Ibeju-Lekki</option>
    <option value="Beryl Forth City Kurudu">Beryl Forth City Kurudu</option>
    <option value="Beryl Golf Estate Ibadan">Beryl Golf Estate Ibadan</option>
    <option value="Sardius Estate Epe">Sardius Estate Epe</option>
    <option value="Sapphire Water City Ikorodu">Sapphire Water City Ikorodu</option>
    <option value="Other">Other / Not sure yet</option>
  `;

  const selectedEstate =
    propertyName
      ? estateOptions.replace(
          `value="${propertyName}"`,
          `value="${propertyName}" selected`
        )
      : estateOptions;

  const miniContact = showMiniContact
    ? `
    <div class="lead-panel form-card">
      <h3>Quick Enquiry</h3>
      <p>Send us a message — we respond within 24 hours.</p>
      <form class="lead-form contact-form" data-form-type="enquiry" method="POST">
        <div class="form-group"><label>Name</label><input type="text" name="name" required placeholder="Your name" /></div>
        <div class="form-group"><label>Email</label><input type="email" name="email" required placeholder="you@email.com" /></div>
        <div class="form-group"><label>Phone</label><input type="tel" name="phone" placeholder="+234..." /></div>
        <div class="form-group"><label>Message</label><textarea name="message" rows="3" required placeholder="How can we help?"></textarea></div>
        <button type="submit" class="btn btn-primary" style="width:100%">Send Message</button>
      </form>
    </div>`
    : "";

  const html = `
  <section class="lead-toolkit section section-alt" aria-label="Get in touch with GTEXTLAND">
    <div class="container">
      <div class="lead-cta-bar">
        <div>
          <p class="eyebrow">Take the Next Step</p>
          <h2 class="section-title" style="font-size:1.5rem;margin-bottom:0.25rem">Ready to Invest in Land?</h2>
          <p class="section-subtitle" style="margin:0">Book a free consultation or download our estate brochure.</p>
        </div>
        <div class="lead-cta-actions">
          <a href="contact.html?subject=consultation" class="btn btn-primary btn-lg"><i class="fas fa-calendar-check"></i> Book Free Consultation</a>
          <a href="${brochure}" class="btn btn-secondary btn-lg" download><i class="fas fa-file-pdf"></i> Download Brochure</a>
        </div>
      </div>

      <div class="lead-forms-grid">
        ${
          showRegisterInterest
            ? `
        <div class="lead-panel form-card">
          <h3>Register Your Interest</h3>
          <p>Tell us which estate you're interested in and we'll reach out with details.</p>
          <form class="lead-form" data-form-type="register-interest" method="POST">
            <div class="form-group"><label>Full Name</label><input type="text" name="name" required placeholder="Your name" /></div>
            <div class="form-group"><label>Email</label><input type="email" name="email" required placeholder="you@email.com" /></div>
            <div class="form-group"><label>Phone</label><input type="tel" name="phone" required placeholder="+234..." /></div>
            <div class="form-group"><label>Estate of Interest</label><select name="estate" required>${selectedEstate}</select></div>
            <div class="form-group"><label>Notes</label><textarea name="message" rows="2" placeholder="Plot size, budget, timeline..."></textarea></div>
            <button type="submit" class="btn btn-primary" style="width:100%">Register Interest</button>
          </form>
        </div>`
            : ""
        }
        ${miniContact}
      </div>

      <div class="newsletter-box lead-newsletter">
        <h3 class="section-title" style="font-size:1.35rem">Newsletter Subscription</h3>
        <p class="section-subtitle" style="margin-inline:auto">Estate launches, investment tips, and exclusive offers.</p>
        <form class="newsletter-form lead-form" data-form-type="newsletter" method="POST">
          <input type="email" name="email" placeholder="Your email address" required aria-label="Email for newsletter" />
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </div>
  </section>`;

  footer.insertAdjacentHTML("beforebegin", html);
})();
