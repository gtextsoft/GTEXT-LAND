/**
 * Renders a consistent site footer on every page.
 * Fills the content of an existing <footer class="site-footer"> element.
 */
(function () {
  const config = window.GTEXTLAND_CONFIG || {};
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const social = config.social || {};
  const propertiesPage = config.propertiesPage || "properties.html";
  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <img src="images/logo.png" alt="GTEXTLAND" class="brand-logo" width="180" height="48" />
          </a>
          <p>Luxury serviced plots and land investment across Nigeria. Building wealth through strategic real estate — 10 years strong since 2015.</p>
          <div class="footer-social">
            <a href="${social.facebook || "https://www.facebook.com/gtextland"}" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
            <a href="${social.twitter || "https://x.com/gtextland"}" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
            <a href="${social.instagram || "https://www.instagram.com/gtextland"}" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
            <a href="${social.linkedin || "https://www.linkedin.com/company/gtextland"}" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
            <a href="${social.youtube || "https://www.youtube.com/@gtextland"}" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="team.html">Our Team</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Properties</h4>
          <ul>
            <li><a href="${propertiesPage}">All Properties</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="property-details.html">Sardius Ijebu-Ode</a></li>
            <li><a href="property2-details.html">Beryl Beach Front</a></li>
            <li><a href="${config.propertyPortal || "https://portal.gtextland.com"}" target="_blank" rel="noopener noreferrer">Live View Portal</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:${(config.phone || "+2348142590965").replace(/\s/g, "")}">${config.phone || "+234 814 259 0965"} (${config.phoneContact || "Olamilesi"})</a></li>
            <li><a href="tel:${(config.phoneAlt || "+2347031930951").replace(/\s/g, "")}">${config.phoneAlt || "+234 703 193 0951"} (${config.phoneAltContact || "Martha"})</a></li>
            <li><a href="mailto:${config.email || "info@gtextland.com"}">${config.email || "info@gtextland.com"}</a></li>
            <li><a href="sitemap.html">Site Map</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} GTEXTLAND. All rights reserved.</p>
        <p>${(config.address && config.address.full) || "Ibeju Lekki, Lagos State, Nigeria"}</p>
      </div>
    </div>`;
})();
