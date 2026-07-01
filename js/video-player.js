/**
 * Property video showcase, embeds, and lightbox player
 */
(function () {
  const config = window.PROPERTY_VIDEOS;
  if (!config) return;

  function youtubeThumb(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  function youtubeEmbed(id) {
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  }

  function facadeHtml(id, title, thumb) {
    const img = thumb || youtubeThumb(id);
    return `
      <button type="button" class="video-facade" data-video-id="${id}" aria-label="Play video: ${title}">
        <img src="${img}" alt="" loading="lazy" />
        <span class="video-facade-play"><i class="fas fa-play"></i></span>
        <span class="video-facade-label">Watch Tour</span>
      </button>`;
  }

  let modal;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "video-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="video-modal-backdrop" data-close-video></div>
      <div class="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Property video">
        <button type="button" class="video-modal-close" data-close-video aria-label="Close video"><i class="fas fa-times"></i></button>
        <div class="video-modal-frame"></div>
        <p class="video-modal-title"></p>
      </div>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-video]")) closeVideo();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeVideo();
    });
    return modal;
  }

  function openVideo(id, title) {
    const m = ensureModal();
    m.querySelector(".video-modal-frame").innerHTML = `<iframe src="${youtubeEmbed(id)}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    m.querySelector(".video-modal-title").textContent = title || "";
    m.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeVideo() {
    if (!modal) return;
    modal.hidden = true;
    modal.querySelector(".video-modal-frame").innerHTML = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-video-id]");
    if (!trigger || trigger.tagName === "IFRAME") return;
    e.preventDefault();
    const id = trigger.getAttribute("data-video-id");
    const title = trigger.getAttribute("data-video-title") || trigger.getAttribute("aria-label") || "Property video";
    if (id) openVideo(id, title);
  });

  /* Property detail page — hero video block */
  const estateName = document.body.getAttribute("data-property");
  if (document.body.dataset.page === "property" && estateName && config.estates[estateName]) {
    const video = config.estates[estateName];
    const heroImg = document.querySelector(".detail-hero-img");
    if (heroImg && !document.querySelector(".property-video-block")) {
      const block = document.createElement("div");
      block.className = "property-video-block";
      block.innerHTML = `
        <div class="property-video-header">
          <p class="eyebrow">Virtual Tour</p>
          <h2>See ${estateName} in Action</h2>
          <p>Watch a guided walkthrough before you book a site visit.</p>
        </div>
        ${facadeHtml(video.youtubeId, video.title, heroImg.getAttribute("src"))}`;
      heroImg.insertAdjacentElement("afterend", block);
    }

    const sidebar = document.querySelector(".sidebar-card");
    const consultBtn = sidebar?.querySelector('a[href*="consultation"]');
    if (sidebar && consultBtn && !sidebar.querySelector(".property-watch-tour-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-ghost property-watch-tour-btn";
      btn.style.cssText = "width:100%;margin-bottom:0.75rem";
      btn.setAttribute("data-video-id", video.youtubeId);
      btn.setAttribute("data-video-title", video.title);
      btn.innerHTML = '<i class="fas fa-play-circle"></i> Watch Video Tour';
      consultBtn.insertAdjacentElement("beforebegin", btn);
    }
  }

  /* Homepage video showcase */
  const showcaseRoot = document.getElementById("video-showcase-root");
  if (showcaseRoot && config.featured?.length) {
    showcaseRoot.innerHTML = config.featured
      .map(
        (v) => `
      <article class="video-card">
        <button type="button" class="video-card-thumb" data-video-id="${v.youtubeId}" data-video-title="${v.title}" aria-label="Play: ${v.title}">
          <img src="${v.thumb || youtubeThumb(v.youtubeId)}" alt="" loading="lazy" />
          <span class="video-card-play"><i class="fas fa-play"></i></span>
          ${v.duration ? `<span class="video-card-duration">${v.duration}</span>` : ""}
        </button>
        <div class="video-card-body">
          <p class="video-card-estate">${v.estate}</p>
          <h3>${v.title}</h3>
        </div>
      </article>`
      )
      .join("");
  }

  document.querySelectorAll("[data-estate]").forEach((thumb) => {
    const name = thumb.getAttribute("data-estate");
    const video = config.estates[name];
    if (!video || thumb.querySelector(".thumb-play-btn")) return;

    thumb.classList.add("property-thumb--has-video");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumb-play-btn";
    btn.setAttribute("data-video-id", video.youtubeId);
    btn.setAttribute("data-video-title", video.title);
    btn.setAttribute("aria-label", `Watch video: ${name}`);
    btn.innerHTML = '<i class="fas fa-play"></i><span>Watch Tour</span>';
    thumb.appendChild(btn);
  });

  const channel = config.channel || window.GTEXTLAND_CONFIG?.social?.youtube;
  if (channel) {
    document.querySelectorAll(".youtube-channel-link").forEach((link) => {
      link.href = channel;
    });
  }
})();
