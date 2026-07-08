/**
 * Property image mapping for GTEXTLAND
 */
const GTEXTLAND_IMAGES = {
  hero: {
    main: "images/land/land-19.jpg",
    secondary: "images/land/land-20.jpg",
  },
  properties: {
    estate: "images/land/land-01.jpg",
    beach: "images/land/land-02.jpg",
    modern: "images/land/land-03.jpg",
    golf: "images/land/land-04.jpg",
    waterfront: "images/land/land-05.jpg",
    luxury: "images/land/land-06.jpg",
    development: "images/land/land-07.jpg",
    gated: "images/land/land-08.jpg",
  },
  about: "images/about-office.jpg",
  logo: "images/logo.png",
};

const PORTFOLIO_ESTATES = [
  { name: "Sardius Estate Ijebu-Ode", loc: "Ogun State", img: "images/land/land-01.jpg", link: "property-details.html" },
  { name: "Beryl Beach Front Ibeju-Lekki Ph.2", loc: "Lagos", img: "images/land/land-02.jpg", link: "property2-details.html" },
  { name: "Beryl Beach Front Ibeju-Lekki", loc: "Lagos", img: "images/land/land-03.jpg", link: "property2-details.html" },
  { name: "Beryl Forth City Kurudu", loc: "Abuja", img: "images/land/land-04.jpg", link: "property3-details.html" },
  { name: "Beryl Golf Estate Ibadan", loc: "Oyo State", img: "images/land/land-05.jpg", link: "property4-details.html" },
  { name: "Beryl Polo Estate Kobape", loc: "Ogun State", img: "images/land/land-06.jpg", link: "contact.html?subject=property" },
  { name: "Garnet Resort City Asokoro 2", loc: "Abuja", img: "images/land/land-07.jpg", link: "contact.html?subject=property" },
  { name: "Garnet Resort City Ibeju-Agbe", loc: "Lagos", img: "images/land/land-08.jpg", link: "contact.html?subject=property" },
  { name: "Jasper Estate Isheri North", loc: "Lagos", img: "images/land/land-09.jpg", link: "contact.html?subject=property" },
  { name: "Jasper Smart City Ibeju-Lekki", loc: "Lagos", img: "images/land/land-10.jpg", link: "contact.html?subject=property" },
  { name: "Jasper Smart City Ph.2", loc: "Lagos", img: "images/land/land-11.jpg", link: "contact.html?subject=property" },
  { name: "Prime Rose Farm City Itameru", loc: "Lagos", img: "images/land/land-12.jpg", link: "contact.html?subject=property" },
  { name: "Sapphire Water City Ikorodu", loc: "Lagos", img: "images/land/land-13.jpg", link: "property6-details.html" },
  { name: "Sardius Estate Epe", loc: "Lagos", img: "images/land/land-14.jpg", link: "property5-details.html" },
  { name: "Sardius Estate Guzape 2", loc: "Abuja", img: "images/land/land-15.jpg", link: "contact.html?subject=property" },
  { name: "White House Court Moniya", loc: "Oyo State", img: "images/land/land-16.jpg", link: "contact.html?subject=property" },
  { name: "White House Garden Atan", loc: "Ogun State", img: "images/land/land-17.jpg", link: "contact.html?subject=property" },
  { name: "White House Estate Kuje", loc: "Abuja", img: "images/land/land-18.jpg", link: "contact.html?subject=property" },
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
