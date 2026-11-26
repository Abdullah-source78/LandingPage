// Pixolab Solutions - small helpers (no libraries)
document.documentElement.classList.add("js");

// 1. Header shadow when page is scrolled
const header = document.querySelector("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
const toTop = document.querySelector(".top");
const onScroll2 = () => toTop.classList.toggle("show", window.scrollY > 700);
onScroll2();
addEventListener("scroll", onScroll2, { passive: true });
onScroll();
addEventListener("scroll", onScroll, { passive: true });

// 2. Mobile side menu
const menu = document.querySelector(".menu");
const nav = document.getElementById("nav");
const scrim = document.querySelector(".scrim");
function setMenu(open) {
  nav.classList.toggle("open", open);
  scrim.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}
menu.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
scrim.addEventListener("click", () => setMenu(false));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
addEventListener("resize", () => { if (innerWidth > 860) setMenu(false); });

// 3. Reveal items as they scroll into view (staggered)
const items = document.querySelectorAll("[data-reveal]");
items.forEach((el, i) => el.style.setProperty("--d", (i % 3) * 0.08 + "s"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}

// 4. Copy email button
const copy = document.getElementById("copy");
copy.addEventListener("click", async () => {
  const email = "pixolabsolutions@gmail.com";
  try { await navigator.clipboard.writeText(email); } catch (e) {
    const t = document.createElement("textarea");
    t.value = email; document.body.appendChild(t); t.select();
    document.execCommand("copy"); t.remove();
  }
  const label = copy.querySelector("span");
  copy.classList.add("done");
  label.textContent = "Copied!";
  setTimeout(() => { copy.classList.remove("done"); label.textContent = "Copy email"; }, 2000);
});

// 5. Highlight the nav link of the section you are viewing
const links = document.querySelectorAll("nav a[href^='#']:not(.btn)");
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach((s) => spy.observe(s));

// 6. Click ripple on buttons
document.querySelectorAll(".btn").forEach((b) => {
  b.addEventListener("pointerdown", (e) => {
    const r = b.getBoundingClientRect();
    const s = Math.max(r.width, r.height) * 2.2;
    const d = document.createElement("span");
    d.className = "ripple";
    d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(d);
    setTimeout(() => d.remove(), 650);
  });
});
