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
  { name: "Sardius Estate Ijebu-Ode", loc: "Ogun State", img: "images/estates/estate-01.jpg", link: "property-details.html" },
  { name: "Beryl Beach Front Ibeju-Lekki Ph.2", loc: "Lagos", img: "images/estates/estate-02.jpg", link: "property2-details.html" },
  { name: "Beryl Beach Front Ibeju-Lekki", loc: "Lagos", img: "images/estates/estate-03.jpg", link: "property2-details.html" },
  { name: "Beryl Forth City Kurudu", loc: "Abuja", img: "images/estates/estate-04.jpg", link: "property3-details.html" },
  { name: "Beryl Golf Estate Ibadan", loc: "Oyo State", img: "images/estates/estate-05.jpg", link: "property4-details.html" },
  { name: "Beryl Polo Estate Kobape", loc: "Ogun State", img: "images/estates/estate-06.jpg", link: "contact.html?subject=property" },
  { name: "Garnet Resort City Asokoro 2", loc: "Abuja", img: "images/estates/estate-07.jpg", link: "contact.html?subject=property" },
  { name: "Garnet Resort City Ibeju-Agbe", loc: "Lagos", img: "images/estates/estate-08.jpg", link: "contact.html?subject=property" },
  { name: "Jasper Estate Isheri North", loc: "Lagos", img: "images/estates/estate-09.jpg", link: "contact.html?subject=property" },
  { name: "Jasper Smart City Ibeju-Lekki", loc: "Lagos", img: "images/estates/estate-10.jpg", link: "contact.html?subject=property" },
  { name: "Jasper Smart City Ph.2", loc: "Lagos", img: "images/estates/estate-11.jpg", link: "contact.html?subject=property" },
  { name: "Prime Rose Farm City Itameru", loc: "Lagos", img: "images/estates/estate-12.jpg", link: "contact.html?subject=property" },
  { name: "Sapphire Water City Ikorodu", loc: "Lagos", img: "images/estates/estate-13.jpg", link: "property6-details.html" },
  { name: "Sardius Estate Epe", loc: "Lagos", img: "images/estates/estate-14.jpg", link: "property5-details.html" },
  { name: "Sardius Estate Guzape 2", loc: "Abuja", img: "images/estates/estate-15.jpg", link: "contact.html?subject=property" },
  { name: "White House Court Moniya", loc: "Oyo State", img: "images/estates/estate-16.jpg", link: "contact.html?subject=property" },
  { name: "White House Garden Atan", loc: "Ogun State", img: "images/estates/estate-17.jpg", link: "contact.html?subject=property" },
  { name: "White House Estate Kuje", loc: "Abuja", img: "images/estates/estate-18.jpg", link: "contact.html?subject=property" },
];

function propertyImg(key) {
  if (key && (key.includes("/") || key.includes("."))) return key;
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
