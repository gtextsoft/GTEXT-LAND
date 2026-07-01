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

  const config = window.GTEXTLAND_CONFIG;

  const formSubjects = {
    enquiry: "New GTEXTLAND Website Enquiry",
    "register-interest": "GTEXTLAND — Register Interest",
    newsletter: "GTEXTLAND Newsletter Subscription",
    careers: "GTEXTLAND Careers Application",
    contact: "New GTEXTLAND Website Enquiry",
  };

  function setupFormSubmit(form, subjectKey, nextPath) {
    if (!config?.formSubmit) return;
    form.setAttribute("action", config.formSubmit);
    form.setAttribute("method", "POST");

    const hidden = {
      _subject: formSubjects[subjectKey] || formSubjects.enquiry,
      _captcha: "false",
      _template: "table",
      _next: new URL(nextPath, window.location.href).toString(),
    };

    Object.entries(hidden).forEach(([name, value]) => {
      if (!form.querySelector(`input[name="${name}"]`)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      }
    });
  }

  document.querySelectorAll(".lead-form").forEach((form) => {
    const type = form.dataset.formType || "enquiry";
    const page = document.body.getAttribute("data-page") || "general";
    let next = "contact.html?sent=true";
    if (type === "newsletter") next = `${page === "general" ? "index" : page}.html?subscribed=true`;
    if (type === "register-interest") next = window.location.pathname.split("/").pop() + "?registered=true";
    if (type === "careers") next = "careers.html?sent=true";
    setupFormSubmit(form, type, next);
  });

  const contactForm = document.querySelector("#contact-form.contact-form, .contact-form#contact-form");
  if (contactForm) {
    setupFormSubmit(contactForm, "contact", "contact.html?sent=true");
  }

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("sent") === "true") {
    const formCard =
      document.querySelector("#contact-form")?.closest(".form-card") ||
      document.querySelector("#careers-form")?.closest(".form-card") ||
      document.querySelector(".form-card");
    if (formCard && !formCard.querySelector(".form-success-message")) {
      const msg = document.createElement("div");
      msg.className = "form-success-message";
      msg.setAttribute("role", "alert");
      msg.textContent =
        document.body.dataset.page === "careers"
          ? "Thank you! Your application has been received. Our HR team will be in touch."
          : "Thank you! Your message has been sent. We'll respond within 24 hours.";
      formCard.prepend(msg);
    }
  }

  if (urlParams.get("registered") === "true") {
    const toolkit = document.querySelector(".lead-toolkit");
    if (toolkit && !toolkit.querySelector(".form-success-message")) {
      const msg = document.createElement("div");
      msg.className = "form-success-message";
      msg.textContent = "Thank you! Your interest has been registered. We'll contact you shortly.";
      toolkit.querySelector(".container").prepend(msg);
    }
  }

  if (urlParams.get("subscribed") === "true") {
    const nl = document.querySelector(".lead-newsletter");
    if (nl && !nl.querySelector(".form-success-message")) {
      const msg = document.createElement("div");
      msg.className = "form-success-message";
      msg.textContent = "You're subscribed! Watch your inbox for updates from GTEXTLAND.";
      nl.prepend(msg);
    }
  }

  const subjectParam = urlParams.get("subject");
  const subjectSelect = document.querySelector('select[name="subject"]');
  if (subjectParam && subjectSelect) {
    const map = { consultation: "investment", property: "property-inquiry" };
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
