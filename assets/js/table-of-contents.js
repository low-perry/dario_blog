(function () {
  const toc = document.querySelector("[data-table-of-contents]");
  const tocList = document.querySelector("[data-table-of-contents-list]");
  const postContent = document.querySelector("[data-post-content]");

  if (!toc || !tocList || !postContent) return;

  const headings = Array.from(postContent.querySelectorAll("h2, h3"));
  if (headings.length === 0) return;

  const usedIds = new Set(
    Array.from(document.querySelectorAll("[id]"), (element) => element.id)
  );

  function createHeadingId(heading, index) {
    if (heading.id) return heading.id;

    const baseId =
      heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "") || `section-${index + 1}`;

    let id = baseId;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${baseId}-${suffix}`;
      suffix += 1;
    }

    heading.id = id;
    usedIds.add(id);
    return id;
  }

  const links = headings.map((heading, index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const headingId = createHeadingId(heading, index);

    item.className = `post-toc-item post-toc-item-${heading.tagName.toLowerCase()}`;
    link.href = `#${encodeURIComponent(headingId)}`;
    link.textContent = heading.textContent.trim();
    link.dataset.tocTarget = headingId;
    item.appendChild(link);
    tocList.appendChild(item);

    return link;
  });

  toc.hidden = false;

  let activeId = "";
  let scrollFrame;

  function setActiveLink(id) {
    if (id === activeId) return;
    activeId = id;

    links.forEach((link) => {
      const isActive = link.dataset.tocTarget === id;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveSection() {
    scrollFrame = undefined;
    const activationLine = Math.min(160, window.innerHeight * 0.25);
    let currentHeading = headings[0];

    for (const heading of headings) {
      if (heading.getBoundingClientRect().top > activationLine) break;
      currentHeading = heading;
    }

    setActiveLink(currentHeading.id);
  }

  function scheduleActiveSectionUpdate() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveSectionUpdate);
  window.addEventListener("hashchange", scheduleActiveSectionUpdate);
  updateActiveSection();
})();
