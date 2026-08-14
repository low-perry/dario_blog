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

  let activeSignature = "";
  let scrollFrame;

  function setActiveLinks(ids) {
    const signature = ids.join("|");
    if (signature === activeSignature) return;
    activeSignature = signature;

    const activeIds = new Set(ids);
    const currentId = ids[0];

    links.forEach((link) => {
      const isActive = activeIds.has(link.dataset.tocTarget);
      link.classList.toggle("is-active", isActive);

      if (link.dataset.tocTarget === currentId) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateVisibleSections() {
    scrollFrame = undefined;
    const viewportTop = Math.min(100, window.innerHeight * 0.15);
    const viewportBottom =
      window.innerHeight - Math.min(72, window.innerHeight * 0.1);
    const postBottom = postContent.getBoundingClientRect().bottom;
    const visibleIds = [];

    headings.forEach((heading, index) => {
      const sectionTop = heading.getBoundingClientRect().top;
      const nextHeading = headings[index + 1];
      const sectionBottom = nextHeading
        ? nextHeading.getBoundingClientRect().top
        : postBottom;

      if (sectionTop < viewportBottom && sectionBottom > viewportTop) {
        visibleIds.push(heading.id);
      }
    });

    setActiveLinks(visibleIds);
  }

  function scheduleActiveSectionUpdate() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateVisibleSections);
  }

  window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveSectionUpdate);
  window.addEventListener("hashchange", scheduleActiveSectionUpdate);
  updateVisibleSections();
})();
