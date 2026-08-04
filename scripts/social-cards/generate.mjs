import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "../..");
const outputRoot = path.join(projectRoot, "assets/images/social");
const postDirectory = path.join(projectRoot, "_posts");

const WIDTH = 1200;
const HEIGHT = 630;

const palettes = [
  ["#f5c2e7", "#89b4fa", "#fab387"],
  ["#a6e3a1", "#89dceb", "#b4befe"],
  ["#f9e2af", "#fab387", "#f5c2e7"],
  ["#cba6f7", "#89b4fa", "#a6e3a1"],
  ["#94e2d5", "#b4befe", "#f5c2e7"],
];

const pageCards = [
  {
    source: "index.markdown",
    output: "pages/home.png",
    eyebrow: "PERSONAL ORBIT / HOME",
    title: "Hello there. I'm Dario.",
    description: "Software developer, curious writer and AstroPink's mission control.",
    signal: "ORBIT 00",
    palette: ["#f5c2e7", "#89dceb", "#fab387"],
  },
  {
    source: "about.markdown",
    output: "pages/me.png",
    eyebrow: "PERSONAL ORBIT / ME",
    title: "Developer by day. Space tinkerer always.",
    description: "A small tour through my work, interests and the universe behind this site.",
    signal: "ORBIT 01",
    palette: ["#fab387", "#f5c2e7", "#89b4fa"],
  },
  {
    source: "blog.markdown",
    output: "pages/blog.png",
    eyebrow: "SIGNAL ARCHIVE / BLOG",
    title: "Notes from the edge of the frontend.",
    description: "Experiments, technical writing and things worth understanding properly.",
    signal: "ARCHIVE",
    palette: ["#a6e3a1", "#89dceb", "#cba6f7"],
  },
  {
    source: "contact.markdown",
    output: "pages/contact.png",
    eyebrow: "OPEN CHANNEL / CONTACT",
    title: "Send a signal across the void.",
    description: "Talk code, writing, open source—or challenge me to a game of chess.",
    signal: "COMMS 04",
    palette: ["#b4befe", "#89b4fa", "#f5c2e7"],
  },
];

function parseFrontMatter(contents) {
  const match = contents.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((entry) => {
        const value = entry[2].trim().replace(/^(["'])(.*)\1$/, "$2");
        return [entry[1], value];
      }),
  );
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function hashString(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pseudoRandom(seed) {
  let state = seed || 1;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function wrapText(text, maxWidth, fontSize, maxLines) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const estimatedWidth = candidate.length * fontSize * 0.52;
    if (estimatedWidth <= maxWidth || !current) {
      current = candidate;
      continue;
    }

    lines.push(current);
    current = word;
  }

  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;

  const visible = lines.slice(0, maxLines);
  visible[maxLines - 1] = `${visible[maxLines - 1].replace(/[.,:;!?-]*$/, "")}…`;
  return visible;
}

function textLines(lines, x, y, lineHeight, className) {
  return `<text x="${x}" y="${y}" class="${className}">${lines
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("")}</text>`;
}

async function dataUri(filePath, mimeType) {
  const data = await fs.readFile(filePath);
  return `data:${mimeType};base64,${data.toString("base64")}`;
}

async function buildSvg(card) {
  const seed = hashString(card.title);
  const random = pseudoRandom(seed);
  const [accent, secondary, warm] = card.palette ?? palettes[seed % palettes.length];
  const fontSize = card.title.length > 76 ? 47 : card.title.length > 52 ? 53 : 61;
  const titleLines = wrapText(card.title, 710, fontSize, 4);
  const titleLineHeight = Math.round(fontSize * 1.08);
  const descriptionY = 182 + titleLineHeight * titleLines.length + 26;
  const descriptionLines = wrapText(card.description, 690, 25, 2);
  const astronaut = await dataUri(
    path.join(projectRoot, "assets/images/astronaout2-removebg-preview.png"),
    "image/png",
  );
  const regularFont = await dataUri(
    path.join(projectRoot, "assets/fonts/inter/static/Inter_18pt-Regular.ttf"),
    "font/ttf",
  );
  const boldFont = await dataUri(
    path.join(projectRoot, "assets/fonts/inter/static/Inter_18pt-Bold.ttf"),
    "font/ttf",
  );

  const stars = Array.from({ length: 52 }, () => {
    const x = Math.round(random() * WIDTH);
    const y = Math.round(random() * HEIGHT);
    const radius = (random() * 1.7 + 0.45).toFixed(2);
    const opacity = (random() * 0.52 + 0.18).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="#f5f7ff" opacity="${opacity}"/>`;
  }).join("");

  const orbitRotation = Math.round(random() * 38 - 19);
  const planetOffset = Math.round(random() * 26 - 13);
  const titleMarkup = textLines(titleLines, 72, 182, titleLineHeight, "title");
  const descriptionMarkup = textLines(descriptionLines, 74, descriptionY, 33, "description");
  const categories = escapeXml(card.categories || "DARIO HAXHIRAJ");
  const date = escapeXml(card.date || "DARIOHAXHIRAJ.ONLINE");

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @font-face { font-family: "InterCard"; src: url("${regularFont}"); font-weight: 400; }
        @font-face { font-family: "InterCard"; src: url("${boldFont}"); font-weight: 700; }
        .eyebrow { font: 700 18px "InterCard", sans-serif; letter-spacing: 3px; fill: ${accent}; }
        .title { font: 700 ${fontSize}px "InterCard", sans-serif; letter-spacing: -1.7px; fill: #f7f3ff; }
        .description { font: 400 25px "InterCard", sans-serif; fill: #c9c9dc; }
        .meta { font: 700 16px "InterCard", sans-serif; letter-spacing: 2px; fill: #d9d8e8; }
        .signal { font: 700 14px "InterCard", sans-serif; letter-spacing: 2.4px; fill: #0d1022; }
      </style>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#090b1a"/>
        <stop offset="0.55" stop-color="#11142c"/>
        <stop offset="1" stop-color="#19132b"/>
      </linearGradient>
      <radialGradient id="planet" cx="35%" cy="28%" r="75%">
        <stop offset="0" stop-color="${secondary}"/>
        <stop offset="0.58" stop-color="${accent}"/>
        <stop offset="1" stop-color="#47375f"/>
      </radialGradient>
      <radialGradient id="glow">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.34"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="22"/>
      </filter>
      <clipPath id="cardClip"><rect width="1200" height="630" rx="32"/></clipPath>
    </defs>

    <g clip-path="url(#cardClip)">
      <rect width="1200" height="630" fill="url(#background)"/>
      <circle cx="1020" cy="84" r="265" fill="url(#glow)" filter="url(#softGlow)"/>
      <circle cx="742" cy="655" r="240" fill="${warm}" opacity="0.06" filter="url(#softGlow)"/>
      ${stars}

      <path d="M48 98 H642" stroke="${accent}" stroke-opacity="0.28"/>
      <circle cx="48" cy="98" r="4" fill="${accent}"/>
      <text x="72" y="84" class="eyebrow">${escapeXml(card.eyebrow)}</text>

      ${titleMarkup}
      ${descriptionMarkup}

      <g transform="translate(960 ${318 + planetOffset}) rotate(${orbitRotation})">
        <ellipse cx="0" cy="0" rx="205" ry="91" fill="none" stroke="${secondary}" stroke-width="2" stroke-opacity="0.42" stroke-dasharray="5 11"/>
        <ellipse cx="0" cy="0" rx="244" ry="137" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.14"/>
        <circle cx="-198" cy="-23" r="8" fill="${warm}"/>
        <circle cx="214" cy="42" r="5" fill="${secondary}"/>
      </g>

      <circle cx="960" cy="${318 + planetOffset}" r="112" fill="#080a16" opacity="0.7" filter="url(#softGlow)"/>
      <circle cx="960" cy="${318 + planetOffset}" r="104" fill="url(#planet)"/>
      <path d="M884 ${300 + planetOffset} Q960 ${258 + planetOffset} 1039 ${296 + planetOffset}" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="12" stroke-linecap="round"/>
      <image href="${astronaut}" x="978" y="${338 + planetOffset}" width="204" height="204" transform="rotate(-8 1080 ${440 + planetOffset})"/>

      <g transform="translate(881 117)">
        <rect width="158" height="34" rx="17" fill="${accent}"/>
        <circle cx="18" cy="17" r="5" fill="#0d1022"/>
        <text x="34" y="22" class="signal">${escapeXml(card.signal)}</text>
      </g>

      <path d="M72 548 H1128" stroke="#ffffff" stroke-opacity="0.12"/>
      <text x="72" y="582" class="meta">${categories.toUpperCase()}</text>
      <text x="1128" y="582" text-anchor="end" class="meta">${date.toUpperCase()}</text>
      <rect x="12" y="12" width="1176" height="606" rx="24" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
    </g>
  </svg>`;
}

async function renderCard(card) {
  const destination = path.join(outputRoot, card.output);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const svg = await buildSvg(card);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(destination);
  return path.relative(projectRoot, destination);
}

const rendered = [];

for (const card of pageCards) {
  rendered.push(await renderCard(card));
}

const postFiles = (await fs.readdir(postDirectory))
  .filter((file) => /\.(md|markdown)$/i.test(file))
  .sort();

for (const file of postFiles) {
  const contents = await fs.readFile(path.join(postDirectory, file), "utf8");
  const frontMatter = parseFrontMatter(contents);
  const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(md|markdown)$/i, "");
  const categories = (frontMatter.categories || "FIELD NOTE")
    .split(/\s+/)
    .slice(0, 3)
    .join(" / ");
  const date = file.slice(0, 10);
  const seed = hashString(frontMatter.title || slug);

  rendered.push(
    await renderCard({
      output: `posts/${slug}.png`,
      eyebrow: `FIELD NOTE / ${categories}`,
      title: frontMatter.title || slug.replaceAll("-", " "),
      description: frontMatter.excerpt || "A field note from Dario's personal orbit.",
      categories,
      date,
      signal: `SIGNAL ${String((seed % 97) + 1).padStart(2, "0")}`,
      palette: palettes[seed % palettes.length],
    }),
  );
}

console.log(`Generated ${rendered.length} social cards:`);
for (const file of rendered) console.log(`  ${file}`);
