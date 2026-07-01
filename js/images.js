/**
 * Property image mapping for GTEXTLAND
 */
const GTEXTLAND_IMAGES = {
  hero: {
    main: "images/hero-main.jpg",
    secondary: "images/hero-secondary.jpg",
  },
  properties: {
    estate: "images/property-estate.jpg",
    beach: "images/property-beach.jpg",
    modern: "images/property-modern.jpg",
    golf: "images/property-golf.jpg",
    waterfront: "images/property-waterfront.jpg",
    luxury: "images/property-luxury.jpg",
    development: "images/property-development.jpg",
    gated: "images/property-gated.jpg",
  },
  about: "images/about-office.jpg",
  logo: "images/logo.png",
};

const PORTFOLIO_ESTATES = [
  { name: "Sardius Estate Ijebu-Ode", loc: "Ogun State", img: "estate", link: "property-details.html" },
  { name: "Beryl Beach Front Ibeju-Lekki Ph.2", loc: "Lagos", img: "beach", link: "property2-details.html" },
  { name: "Beryl Beach Front Ibeju-Lekki", loc: "Lagos", img: "beach", link: "property2-details.html" },
  { name: "Beryl Forth City Kurudu", loc: "Abuja", img: "modern", link: "property3-details.html" },
  { name: "Beryl Golf Estate Ibadan", loc: "Oyo State", img: "golf", link: "property4-details.html" },
  { name: "Beryl Polo Estate Kobape", loc: "Ogun State", img: "luxury", link: "contact.html?subject=property" },
  { name: "Garnet Resort City Asokoro 2", loc: "Abuja", img: "development", link: "contact.html?subject=property" },
  { name: "Garnet Resort City Ibeju-Agbe", loc: "Lagos", img: "waterfront", link: "contact.html?subject=property" },
  { name: "Jasper Estate Isheri North", loc: "Lagos", img: "gated", link: "contact.html?subject=property" },
  { name: "Jasper Smart City Ibeju-Lekki", loc: "Lagos", img: "estate", link: "contact.html?subject=property" },
  { name: "Jasper Smart City Ph.2", loc: "Lagos", img: "development", link: "contact.html?subject=property" },
  { name: "Prime Rose Farm City Itameru", loc: "Lagos", img: "gated", link: "contact.html?subject=property" },
  { name: "Sapphire Water City Ikorodu", loc: "Lagos", img: "waterfront", link: "property6-details.html" },
  { name: "Sardius Estate Epe", loc: "Lagos", img: "luxury", link: "property5-details.html" },
  { name: "Sardius Estate Guzape 2", loc: "Abuja", img: "modern", link: "contact.html?subject=property" },
  { name: "White House Court Moniya", loc: "Oyo State", img: "gated", link: "contact.html?subject=property" },
  { name: "White House Garden Atan", loc: "Ogun State", img: "estate", link: "contact.html?subject=property" },
  { name: "White House Estate Kuje", loc: "Abuja", img: "development", link: "contact.html?subject=property" },
];

function propertyImg(key) {
  return GTEXTLAND_IMAGES.properties[key] || GTEXTLAND_IMAGES.properties.estate;
}

function renderPortfolioGrid(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = PORTFOLIO_ESTATES.map(
    (e) => `
    <article class="property-card">
      <div class="property-thumb">
        <img src="${propertyImg(e.img)}" alt="${e.name} — GTEXTLAND estate" loading="lazy" />
      </div>
      <div class="property-body">
        <h3>${e.name}</h3>
        <div class="property-meta"><span><i class="fas fa-map-marker-alt"></i> ${e.loc}</span></div>
        <div class="property-actions"><a href="${e.link}" class="btn btn-primary">Explore</a></div>
      </div>
    </article>`
  ).join("");
}
