const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");
if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

const params = new URLSearchParams(window.location.search);
const tracked = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "msclkid", "fbclid"];
for (const key of tracked) {
  const value = params.get(key) || localStorage.getItem("cdx_" + key) || "";
  if (params.get(key)) localStorage.setItem("cdx_" + key, params.get(key));
  document.querySelectorAll('[name="' + key + '"]').forEach((input) => input.value = value);
}

const variants = {
  investor: ["Run the Calgary duplex numbers before you tour.", "Compare rent, financing, reserves, suite status, and exit strategy before chasing the listing.", "Analyze a duplex deal"],
  seller: ["Sell your Calgary duplex with a buyer-segmented launch.", "Price and market the property for owner-occupiers, investors, suite-income buyers, and infill shoppers.", "Price my duplex"],
  suite: ["Find Calgary duplexes where suite income deserves a serious look.", "Verify suite status, lender treatment, rent assumptions, and resale risk before you write.", "Find suite-income duplexes"],
  infill: ["Compare Calgary infill duplexes with a sharper resale lens.", "Builder quality, layout, garage, finish durability, and nearby competition matter more than pretty photos.", "Compare infill duplexes"],
  half: ["Find a Calgary half duplex without generic listing noise.", "Separate true semi-detached value from portal clutter and detached-home comparison traps.", "Send me half duplexes"],
  full: ["Find full duplexes in Calgary with the due diligence already framed.", "Rent roll, suite status, utilities, financing, inspection scope, and exit strategy all matter.", "Find full duplexes"]
};
const intent = (params.get("intent") || params.get("adgroup") || "").toLowerCase();
const variant = variants[intent];
if (variant) {
  const h = document.querySelector("[data-dynamic-headline]");
  const c = document.querySelector("[data-dynamic-copy]");
  const b = document.querySelector("[data-dynamic-cta]");
  if (h) h.textContent = variant[0];
  if (c) c.textContent = variant[1];
  if (b) b.textContent = variant[2];
}

const pathfinder = document.querySelector("[data-pathfinder]");
if (pathfinder) {
  const data = JSON.parse(pathfinder.querySelector("[data-pathfinder-data]")?.textContent || "[]");
  const kicker = pathfinder.querySelector("[data-pathfinder-kicker]");
  const title = pathfinder.querySelector("[data-pathfinder-title]");
  const text = pathfinder.querySelector("[data-pathfinder-text]");
  const link = pathfinder.querySelector("[data-pathfinder-link]");
  const buttons = [...pathfinder.querySelectorAll("[data-pathfinder-option]")];
  const showPath = (id) => {
    const item = data.find((option) => option.id === id) || data[0];
    if (!item) return;
    buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.pathfinderOption === item.id));
    if (kicker) kicker.textContent = item.label;
    if (title) title.textContent = item.title;
    if (text) text.textContent = item.text;
    if (link) {
      link.textContent = item.cta;
      link.setAttribute("href", item.href);
    }
  };
  buttons.forEach((button) => button.addEventListener("click", () => showPath(button.dataset.pathfinderOption)));
}

const finder = document.querySelector("[data-community-finder]");
if (finder) {
  const cards = [...document.querySelectorAll("[data-community-card]")];
  const applyFilters = () => {
    const selected = Object.fromEntries([...finder.querySelectorAll("[data-filter]")].map((select) => [select.dataset.filter, select.value]));
    for (const card of cards) {
      const fit = selected.fit === "all" || card.dataset.fit === selected.fit;
      const quadrant = selected.quadrant === "all" || card.dataset.quadrant === selected.quadrant;
      const budget = selected.budget === "all" || card.dataset.budget === selected.budget;
      card.classList.toggle("is-hidden", !(fit && quadrant && budget));
    }
  };
  finder.querySelectorAll("[data-filter]").forEach((select) => select.addEventListener("change", applyFilters));
  applyFilters();
}

const calc = document.querySelector("[data-calculator]");
if (calc) {
  const output = calc.querySelector("[data-calc-output]");
  const note = calc.querySelector("[data-calc-note]");
  const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
  const read = (name) => Number(calc.querySelector('[data-calc="' + name + '"]')?.value || 0);
  const update = () => {
    const price = read("price");
    const down = read("down") / 100;
    const rate = read("rate") / 100 / 12;
    const rent = read("rent");
    const costs = read("costs");
    const principal = Math.max(0, price * (1 - down));
    const months = 25 * 12;
    const payment = rate ? principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : principal / months;
    const position = rent - costs - payment;
    output.textContent = money.format(position);
    note.textContent = position >= 0 ? "Positive before taxes, capital events, vacancy shocks, and transaction costs." : "Negative before taxes and capital events. Stress-test rent and repairs carefully.";
  };
  calc.querySelectorAll("input").forEach((input) => input.addEventListener("input", update));
  update();
}

const sellerScore = document.querySelector("[data-seller-score]");
if (sellerScore) {
  const output = document.querySelector("[data-seller-score-output]");
  const selects = [...sellerScore.querySelectorAll("[data-score]")];
  const updateSellerScore = () => {
    const score = selects.reduce((sum, select) => sum + Number(select.value || 0), 0);
    const strong = output?.querySelector("strong");
    const note = output?.querySelector("em");
    if (strong) strong.textContent = score + " / 100";
    if (note) {
      if (score >= 82) note.textContent = "Strong launch file. Next: price against current competition and choose the lead buyer segment.";
      else if (score >= 62) note.textContent = "Marketable, but some proof is missing. Tighten documents before buyers price in uncertainty.";
      else if (score >= 42) note.textContent = "Prep first. The property may still sell, but weak documentation or condition risk can hurt leverage.";
      else note.textContent = "High-friction launch. Build the file before pushing paid traffic or inviting hard negotiation.";
    }
  };
  selects.forEach((select) => select.addEventListener("change", updateSellerScore));
  updateSellerScore();
}