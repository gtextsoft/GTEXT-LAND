/**
 * Floating WhatsApp chat and sticky call button
 */
(function () {
  const config = window.GTEXTLAND_CONFIG;
  if (!config) return;

  const whatsappUrl =
    "https://wa.me/" +
    config.whatsapp +
    "?text=" +
    encodeURIComponent(config.whatsappMessage);

  const callLabel = config.phoneContact
    ? "Call " + config.phoneContact + " — GTEXTLAND"
    : "Call GTEXTLAND";

  const widgets = document.createElement("div");
  widgets.className = "lead-widgets";
  widgets.innerHTML =
    '<a href="' +
    whatsappUrl +
    '" class="lead-widget lead-widget-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp with GTEXTLAND">' +
    '<i class="fab fa-whatsapp"></i><span>WhatsApp</span></a>' +
    '<a href="tel:' +
    config.phone.replace(/\s/g, "") +
    '" class="lead-widget lead-widget-call" aria-label="' +
    callLabel +
    '">' +
    '<i class="fas fa-phone"></i><span>' +
    (config.phoneContact || "Call Us") +
    "</span></a>";

  document.body.appendChild(widgets);
})();
