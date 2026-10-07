// Theme toggle (remembers choice)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
} catch (e) {}
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const nav = document.querySelector(".nav nav");
document.querySelector(".menu-btn").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });

// Typing effect: edit these phrases
const phrases = ["technology", "building things", "learning every day"];
const el = document.getElementById("typed");
let p = 0, c = 0, deleting = false;
(function type() {
  const word = phrases[p];
  el.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
})();

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
}, { threshold: 0.15 });
document.querySelectorAll("section:not(.hero), .card").forEach((s) => { s.classList.add("reveal"); io.observe(s); });

// Skills: staggered entrance + bar fill
const skillIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); skillIO.unobserve(en.target); } });
}, { threshold: 0.3 });
document.querySelectorAll(".skill").forEach((s, i) => { s.style.setProperty("--i", i); skillIO.observe(s); });

document.getElementById("year").textContent = new Date().getFullYear();
