document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backTop = document.getElementById("backTop");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 650);
  }, { passive: true });

  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  form?.addEventListener("submit", e => {
    e.preventDefault();
    formStatus.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const message = [
      "Hi, I would like to know more about The GYM Fitness membership.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Fitness Goal: ${data.get("goal") || "Not selected"}`,
      `Preferred Membership: ${data.get("membership") || "Not selected"}`,
      `Message: ${data.get("message") || "No additional message"}`
    ].join("\n");

    const url = `https://wa.me/918487813625?text=${encodeURIComponent(message)}`;
    formStatus.textContent = "Opening WhatsApp with your enquiry…";
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // Highlight the active navigation item while scrolling.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navAnchors = [...document.querySelectorAll(".nav-links a[href^='#']")];

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));
});
