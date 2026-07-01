document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      siteNav.classList.toggle("open");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        siteNav.classList.remove("open");
      });
    });
  }

  const contactForm = document.querySelector(".contact-form");
  const config = window.GTEXTLAND_CONFIG;

  if (contactForm && config?.formSubmit) {
    contactForm.setAttribute("action", config.formSubmit);
    contactForm.setAttribute("method", "POST");

    const hiddenFields = {
      _subject: "New GTEXTLAND Website Enquiry",
      _captcha: "false",
      _template: "table",
      _next: new URL("contact.html?sent=true", window.location.href).toString(),
    };

    Object.entries(hiddenFields).forEach(([name, value]) => {
      if (!contactForm.querySelector(`input[name="${name}"]`)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        contactForm.appendChild(input);
      }
    });
  }

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("sent") === "true") {
    const formCard = document.querySelector(".form-card");
    if (formCard && !formCard.querySelector(".form-success-message")) {
      const msg = document.createElement("div");
      msg.className = "form-success-message";
      msg.setAttribute("role", "alert");
      msg.textContent =
        "Thank you! Your message has been sent. We'll respond within 24 hours.";
      formCard.prepend(msg);
    }
  }

  const subjectParam = urlParams.get("subject");
  const subjectSelect = document.querySelector('select[name="subject"]');
  if (subjectParam && subjectSelect) {
    const map = { consultation: "investment", careers: "other", property: "property-inquiry" };
    const val = map[subjectParam] || subjectParam;
    if (subjectSelect.querySelector(`option[value="${val}"]`)) {
      subjectSelect.value = val;
    }
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
});
