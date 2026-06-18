import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(root, "..");
const siteUrl = "https://calgaryduplexes.ca";
const today = "June 11, 2026";

const matrixStats = {
  communities: 218,
  segments: 4380,
  activeSegments: 438,
  soldSegments: 3504,
  generatedAt: "2026-06-11",
  source: "Local Matrix export manifest in calgary-hoods-deepdive-main/data/matrix-exports/matrix-export-manifest.csv",
  note: "Matrix raw exports and aggregates were not present yet. The site is wired for the database, but no private MLS sold/listing data is published."
};

const sources = [
  {
    label: "CREB May 2026 Calgary Monthly Statistics",
    url: "https://www.creb.com/Housing_Statistics/documents/05_2026_Calgary_Monthly_Stats_Package.pdf",
    note: "Public Calgary market context: May 2026 semi-detached benchmark price $691,100, 217 sales, 593 inventory, 2.73 months of supply, and balanced conditions."
  },
  {
    label: "City of Calgary secondary suites",
    url: "https://www.calgary.ca/development/home-building/secondary-suites.html",
    note: "City guidance on secondary suites, suite registry, permitting, and legalizing existing suites."
  },
  {
    label: "Local Matrix export manifest",
    url: "README.md",
    note: "Internal export plan covers Calgary full duplex and semi-detached half-duplex segments by community, status, and year."
  }
];

const nav = [
  ["Buy", "duplexes-for-sale-calgary.html"],
  ["Invest", "calgary-duplex-investment.html"],
  ["Sell", "sell-my-duplex-calgary.html"],
  ["Neighbourhoods", "duplex-neighbourhoods-calgary.html"],
  ["Suite rules", "legal-suite-duplex-calgary.html"],
  ["Start", "#lead-form"]
];

const intentPages = [
  {
    slug: "duplexes-for-sale-calgary",
    title: "Duplexes for Sale in Calgary",
    eyebrow: "Buyer search",
    h1: "Calgary duplexes for sale, filtered by what actually matters.",
    summary: "Skip the broad search feed. Get a duplex shortlist that separates half duplexes, full duplexes, infill pairs, suite potential, garage layout, zoning questions, and resale risk before you waste weekends.",
    intent: "Buyer lead",
    cta: "Build my duplex shortlist",
    sections: [
      ["The fast filter", "A Calgary duplex search gets messy because portals mix semi-detached half duplexes, side-by-side full duplexes, row-style properties, and homes marketed with suite potential. This page routes buyers by intent first, then narrows the neighbourhood and risk checklist."],
      ["What we screen before showings", "Property subtype, title structure, suite status, parking, basement access, mechanical separation, renovation age, school/commute fit, resale pressure, and whether the asking price makes sense against fresh comparable sales once Matrix exports are available."],
      ["How PPC tests fit", "This page is built to adapt by ad group. Send traffic from 'Calgary duplexes for sale', 'half duplex Calgary', 'duplex with suite Calgary', or 'infill duplex Calgary' and the intake will preserve the term, campaign, and visitor intent."]
    ],
    checklist: ["Half duplex vs full duplex", "Legal suite or suite potential", "Garage and parking needs", "Neighbourhood quadrant", "Renovated vs value-add", "Offer timing and comparable sales"]
  },
  {
    slug: "half-duplexes-for-sale-calgary",
    title: "Half Duplexes for Sale Calgary",
    eyebrow: "Semi-detached focus",
    h1: "Find a Calgary half duplex without getting buried in generic listings.",
    summary: "Semi-detached homes can be brilliant first homes, move-up options, or downsizer plays, but the value depends on layout, title, location, finish level, and competing detached prices.",
    intent: "Half duplex buyer",
    cta: "Send me half duplex options",
    sections: [
      ["Why half duplexes need their own search", "Many buyers use a detached-home mindset and miss the details that drive half-duplex value: shared wall quality, lot orientation, basement usability, parking, infill finish packages, and how nearby detached inventory is priced."],
      ["Best-fit buyers", "Half duplexes often suit buyers who want more space than a condo or townhouse, lower maintenance than a detached home, or newer inner-city construction without paying for both sides of a full duplex."],
      ["Negotiation angles", "We look for days-on-market pressure, duplicate builder product, competing new inventory, basement completion quality, and whether the seller's pricing logic matches the latest semi-detached market."]
    ],
    checklist: ["Shared wall and noise", "Fee-simple vs condo detail", "Basement development", "Garage access", "Builder warranty", "Comparable semi-detached sales"]
  },
  {
    slug: "full-duplexes-for-sale-calgary",
    title: "Full Duplexes for Sale Calgary",
    eyebrow: "Both sides",
    h1: "Full duplexes in Calgary for investors, house hackers, and family compounds.",
    summary: "A full duplex is not just a bigger half duplex. It is an income, financing, tenancy, renovation, and exit-plan decision wrapped in one address.",
    intent: "Full duplex buyer",
    cta: "Find full duplex opportunities",
    sections: [
      ["The full-duplex question", "Are you buying for rental yield, redevelopment optionality, multi-generational living, future strata/title options, or long-term land control? The answer changes the properties worth seeing."],
      ["Due diligence stack", "Rent roll, suite legality, leases, utility separation, insurance, fire separation, roof and mechanical age, parking, tenant access, and whether recent renovations were permitted can all change the true value."],
      ["Financing reality", "Lender treatment can differ by owner-occupied versus investment use, rent inclusion, number of units, suite status, and documentation. This site keeps the real estate and financing questions connected early."]
    ],
    checklist: ["Rent roll", "Vacancy plan", "Legal suite status", "Utility separation", "Inspection scope", "Financing scenario"]
  },
  {
    slug: "calgary-duplex-investment",
    title: "Calgary Duplex Investment",
    eyebrow: "Investor desk",
    h1: "Run Calgary duplex deals like a disciplined operator.",
    summary: "A duplex investment needs more than a cap-rate guess. Test rent, vacancy, repairs, financing, suite compliance, future exit value, and neighbourhood liquidity before you chase the listing.",
    intent: "Investor lead",
    cta: "Analyze a duplex deal",
    sections: [
      ["Deal math", "The calculator on this site estimates monthly cash flow from price, down payment, rent, taxes, insurance, repairs, and financing assumptions. It is deliberately simple so PPC traffic can move quickly from ad click to qualified conversation."],
      ["Neighbourhood fit", "A good investment area is not always the trendiest area. We look for tenant demand, transit, schools, employment access, renovation stock, infill pressure, resale depth, and whether duplex inventory actually trades there."],
      ["Data ladder", "Public CREB data gives a citywide signal. The Matrix manifest gives the community-level export map. Once private exports are loaded, this site can publish aggregate-only community signals without exposing private listing data."]
    ],
    checklist: ["Monthly rent", "Vacancy reserve", "Repairs reserve", "Insurance", "Suite status", "Exit strategy"]
  },
  {
    slug: "duplex-with-suite-calgary",
    title: "Calgary Duplex with Suite",
    eyebrow: "Suite-aware",
    h1: "Looking for a Calgary duplex with suite income? Verify first.",
    summary: "Suite income can change affordability, but suite status, egress, permits, safety requirements, lender treatment, and tenant rules matter before you write the offer.",
    intent: "Suite buyer",
    cta: "Check suite-fit duplexes",
    sections: [
      ["Legal does not mean assumed", "A listing description is not enough. Buyers should verify registry status, permits, egress windows, separate entrance, cooking facilities, bathroom, smoke/CO requirements, and whether the suite is truly self-contained."],
      ["Why this matters", "Suite issues can affect financing, insurance, rentability, resale, renovation budget, inspection scope, and buyer confidence when you eventually sell."],
      ["How we route the search", "The intake asks whether you need legal suite only, suite potential, illegal/non-conforming education, or just a layout that could work for extended family."]
    ],
    checklist: ["Suite registry check", "Permit history", "Separate entrance", "Egress windows", "Lender rent treatment", "Insurance review"]
  },
  {
    slug: "infill-duplex-calgary",
    title: "Infill Duplex Calgary",
    eyebrow: "Inner-city build",
    h1: "Calgary infill duplexes with a sharper resale lens.",
    summary: "Modern infill duplexes can be beautiful, but the real decision is builder quality, micro-location, finish durability, layout, parking, warranty, and how many similar units are competing nearby.",
    intent: "Infill buyer",
    cta: "Compare infill duplexes",
    sections: [
      ["The infill trap", "Pretty photos can hide awkward storage, thin outdoor space, poor basement usability, busy-road exposure, builder shortcuts, or a price that assumes luxury without comparable support."],
      ["What to compare", "Builder track record, warranty, mechanical specs, insulation and sound transfer, outdoor space, garage size, basement ceiling height, appliance package, and nearby resale history."],
      ["PPC angle", "This page is built for high-intent searches where buyers are already comparing new infill product. The CTA moves them into a comparison workflow, not a generic contact form."]
    ],
    checklist: ["Builder history", "Warranty", "Sound transfer", "Garage", "Basement layout", "Nearby competing infills"]
  },
  {
    slug: "sell-my-duplex-calgary",
    title: "Sell My Duplex Calgary",
    eyebrow: "Seller launch",
    h1: "Selling a Calgary duplex takes a different marketing machine.",
    summary: "A duplex can attract owner-occupiers, investors, builders, families, downsizers, and suite-income buyers. The launch should segment those audiences, not throw one generic listing at everyone.",
    intent: "Seller lead",
    cta: "Price my duplex",
    sections: [
      ["Positioning before price", "Half duplex, full duplex, legal suite, infill, renovation, tenant-occupied, development lot, and side-by-side ownership each need a different buyer story and ad funnel."],
      ["Media and distribution", "Strong photos are table stakes. The better campaign uses floor-plan clarity, suite/tenant details where appropriate, neighbourhood proof, investor math, social retargeting, Google intent pages, and follow-up by buyer segment."],
      ["Valuation stack", "We combine live competition, recent sales, property condition, rental angle, replacement cost, and the Matrix export plan so pricing can become more precise as your private data fills in."]
    ],
    checklist: ["Subtype clarity", "Tenant details", "Suite documentation", "Repair list", "Media plan", "Investor and owner-occupier ads"]
  },
  {
    slug: "calgary-duplex-valuation",
    title: "Calgary Duplex Valuation",
    eyebrow: "Pricing room",
    h1: "Get a Calgary duplex valuation built around buyer segments.",
    summary: "Duplex value depends on who the best buyer is: owner-occupier, investor, builder, house hacker, family buyer, or infill shopper.",
    intent: "Valuation lead",
    cta: "Request a duplex valuation",
    sections: [
      ["Why duplex valuation is different", "Detached comps alone can distort value. Duplex pricing needs subtype, income potential, suite status, age, land, renovations, parking, title structure, and buyer pool segmentation."],
      ["What we need", "Address, subtype, suite status, tenant status, recent upgrades, photos if available, mortgage timing, preferred possession, and whether you want maximum exposure or quiet pre-market testing."],
      ["Output", "You should leave with a pricing range, likely buyer groups, prep priorities, launch plan, and PPC angles worth testing before going broad."]
    ],
    checklist: ["Address", "Subtype", "Suite status", "Tenant status", "Upgrades", "Timeline"]
  },
  {
    slug: "duplex-neighbourhoods-calgary",
    title: "Best Calgary Neighbourhoods for Duplexes",
    eyebrow: "Community map",
    h1: "Calgary duplex neighbourhoods, mapped by intent.",
    summary: "Different duplex buyers need different neighbourhood logic: commute, schools, rental demand, infill product, established lots, entry price, or resale depth.",
    intent: "Neighbourhood research",
    cta: "Pick my duplex areas",
    sections: [
      ["Not one best list", "The strongest Calgary duplex area for an investor may not be the strongest area for a family buyer. This site groups communities by intent so ad traffic can land on the right decision path."],
      ["Matrix coverage", `The local Matrix export plan includes duplex segments across ${matrixStats.communities} Calgary communities. When exports are loaded, community pages can show aggregate-only signals such as counts, median sale prices, and days on market.`],
      ["Start with tradeoffs", "Inner-city infills, established west-side half duplexes, affordable northeast options, southeast newer product, and full-duplex rental plays all deserve different shortlists."]
    ],
    checklist: ["Commute", "School fit", "Rental demand", "Infill pressure", "Entry price", "Resale depth"]
  },
  {
    slug: "nw-calgary-duplexes",
    title: "NW Calgary Duplexes",
    eyebrow: "Quadrant page",
    h1: "NW Calgary duplexes for buyers who care about resale and lifestyle fit.",
    summary: "Northwest Calgary duplex searches often revolve around schools, transit, university access, established communities, hill views, and move-up family demand.",
    intent: "NW buyer",
    cta: "Show me NW duplexes",
    sections: [
      ["NW search logic", "Clarify whether you want established inner-NW product, newer suburban options, university-adjacent rental demand, or a quieter family-oriented half duplex."],
      ["What to watch", "LRT proximity, slope and lot grade, garage access, renovation age, school boundaries, basement layout, and competition from detached homes."],
      ["PPC fit", "Use this page for quadrant campaigns and retarget visitors into specific community shortlists."]
    ],
    checklist: ["LRT access", "School boundaries", "Garage", "Basement", "Slope", "Detached competition"]
  },
  {
    slug: "ne-calgary-duplexes",
    title: "NE Calgary Duplexes",
    eyebrow: "Quadrant page",
    h1: "NE Calgary duplexes for value, rent demand, and practical access.",
    summary: "Northeast duplex searches can serve first-time buyers, investors, airport/industrial commuters, multi-generational households, and buyers prioritizing price-to-space.",
    intent: "NE buyer",
    cta: "Show me NE duplexes",
    sections: [
      ["NE search logic", "The opportunity is often price, rentability, transit, and larger household fit. The risk is assuming every low price is a deal without checking condition, suite status, and resale liquidity."],
      ["What to watch", "Legal suite details, parking, mechanical age, renovation permits, tenant profile, airport noise context, and community-level sales depth."],
      ["PPC fit", "Good for value, investor, suite-income, and first-home campaigns."]
    ],
    checklist: ["Suite status", "Parking", "Mechanical age", "Transit", "Rent demand", "Inspection scope"]
  },
  {
    slug: "sw-calgary-duplexes",
    title: "SW Calgary Duplexes",
    eyebrow: "Quadrant page",
    h1: "SW Calgary duplexes with location, finish, and land value in focus.",
    summary: "Southwest duplex demand ranges from inner-city infill buyers to established west-side move-up searches and practical family half duplexes.",
    intent: "SW buyer",
    cta: "Show me SW duplexes",
    sections: [
      ["SW search logic", "Segment the search by inner-city infill, west-side school/commute preference, established older stock, and newer suburban value."],
      ["What to watch", "Builder quality, lot orientation, busy-road exposure, garage usability, basement development, finish durability, and nearby competing new builds."],
      ["PPC fit", "Strong for infill, luxury half-duplex, and seller valuation campaigns."]
    ],
    checklist: ["Builder quality", "Lot orientation", "Garage", "Finish level", "Busy-road exposure", "Comparable sales"]
  },
  {
    slug: "se-calgary-duplexes",
    title: "SE Calgary Duplexes",
    eyebrow: "Quadrant page",
    h1: "SE Calgary duplexes for newer product, family layouts, and lake-community searches.",
    summary: "Southeast Calgary duplex searches often involve newer communities, family layouts, lake access, commute patterns, and price gaps versus detached homes.",
    intent: "SE buyer",
    cta: "Show me SE duplexes",
    sections: [
      ["SE search logic", "Clarify whether the priority is lake lifestyle, newer construction, affordability, commute to industrial/employment nodes, or a family floor plan."],
      ["What to watch", "HOA/community fees, builder warranty, basement development, garage size, road access, schools, and resale competition from detached homes."],
      ["PPC fit", "Good for family buyer, new construction, lake-community, and move-up campaigns."]
    ],
    checklist: ["HOA fees", "Builder warranty", "Schools", "Garage", "Commute", "Detached alternatives"]
  },
  {
    slug: "legal-suite-duplex-calgary",
    title: "Legal Suite Duplex Calgary",
    eyebrow: "Compliance lens",
    h1: "Calgary duplex suite questions need verification, not vibes.",
    summary: "Use this page to route buyers and sellers who care about legal suites, secondary suite rules, registry checks, permits, and rentability.",
    intent: "Suite compliance",
    cta: "Review suite questions",
    sections: [
      ["City rules matter", "The City of Calgary describes a secondary suite as a self-contained residence with kitchen, living/sleeping, bathroom facilities, and an outside-accessible entrance, with guidance for adding or legalizing suites."],
      ["Buyer due diligence", "Verify registry status, permit history, egress, fire/smoke separation, heating and ventilation, electrical, plumbing, parking, and whether the lender or insurer accepts the rent treatment."],
      ["Seller prep", "Gather documents before launch. A suite-income buyer wants confidence, not a vague listing note."]
    ],
    checklist: ["Registry", "Permits", "Egress", "Entrance", "Fire/smoke details", "Insurance and lender review"]
  }
];

const featureCards = [
  ["PPC adaptive", "UTM, GCLID, keyword, and intent fields are captured into the form. Query strings can change the hero, CTA, and lead type."],
  ["Matrix-ready", `${matrixStats.segments.toLocaleString("en-CA")} duplex export segments are mapped locally across ${matrixStats.communities} communities for future aggregate data.`],
  ["No fake scarcity", "The copy avoids invented listing counts, sold prices, guarantees, and fake reviews. It pushes visitors into a real shortlist or valuation workflow."],
  ["Seller + buyer funnels", "The same domain can test buyer search, investor analysis, suite-income intent, infill comparisons, and seller valuation traffic."]
];

const pathfinderOptions = [
  {
    id: "buy",
    label: "I want to buy",
    title: "Start with subtype and neighbourhood fit.",
    text: "You need a shortlist that separates half duplex, full duplex, infill, suite potential, and practical family layouts before showings.",
    href: "duplexes-for-sale-calgary.html",
    cta: "Build a buyer shortlist"
  },
  {
    id: "sell",
    label: "I may sell",
    title: "Package the duplex for the right buyer segment.",
    text: "Seller value depends on whether the strongest buyer is owner-occupier, investor, house hacker, builder, family, or downsizer.",
    href: "sell-my-duplex-calgary.html",
    cta: "Open seller workbench"
  },
  {
    id: "invest",
    label: "I am investing",
    title: "Run rent, repairs, financing, and exit risk.",
    text: "A duplex deal is not just purchase price. It needs rent evidence, vacancy assumptions, suite status, capex, insurance, and resale liquidity.",
    href: "calgary-duplex-investment.html",
    cta: "Analyze investment"
  },
  {
    id: "suite",
    label: "I need suite income",
    title: "Verify the suite story before trusting the numbers.",
    text: "Registry, permits, egress, entrance, fire/smoke details, lender treatment, and insurance can change the buyer pool and the offer.",
    href: "duplex-with-suite-calgary.html",
    cta: "Review suite path"
  },
  {
    id: "areas",
    label: "I need areas",
    title: "Pick communities by buyer intent, not vibes.",
    text: "Compare infill, value, family, full-duplex, and newer-product clusters with watch-outs and Matrix export priorities.",
    href: "duplex-neighbourhoods-calgary.html",
    cta: "Open neighbourhood desk"
  }
];

const neighbourhoodGroups = [
  ["Inner-city infill", "Altadore, Killarney/Glengarry, Richmond, Rosscarrock, Mount Pleasant, Capitol Hill", "Builder quality, finish package, garage, basement, road exposure"],
  ["Established west", "Glamorgan, Glenbrook, Lakeview, Signal Hill, Strathcona Park, West Springs", "School fit, renovation age, detached alternatives, resale depth"],
  ["Value and rental demand", "Dover, Forest Lawn, Marlborough, Pineridge, Whitehorn, Falconridge", "Suite status, tenant demand, mechanicals, parking, inspection scope"],
  ["Newer suburban product", "Mahogany, Seton, Legacy, Belmont, Evanston, Sage Hill", "Builder warranty, HOA fees, commute, detached price gap"],
  ["Full-duplex watchlist", "Bowness, Montgomery, Ogden, Highland Park, Tuxedo Park, Renfrew", "Rent roll, redevelopment optionality, land, utility separation"]
];

const duplexCommunityProfiles = [
  {
    name: "Altadore",
    quadrant: "CC",
    fit: "infill",
    budget: "premium",
    buyer: "Inner-city half-duplex buyer",
    why: "Strong brand-name search area for newer infill duplexes, Marda Loop access, schools, parks, and resale-minded buyers.",
    watch: "Busy-road edges, builder quality, basement usability, garage dimensions, and nearby competing new builds.",
    ppc: "Bid on infill and luxury-half-duplex terms; send sellers to valuation creative."
  },
  {
    name: "Killarney/Glengarry",
    quadrant: "SW",
    fit: "infill",
    budget: "premium",
    buyer: "Infill comparison shopper",
    why: "Deep infill recognition, west inner-city access, and steady buyer awareness make it useful for comparison content.",
    watch: "Similar builder product can make pricing sensitive. Compare finish level, lot exposure, and DOM pressure.",
    ppc: "Use for ad groups around new infill duplex Calgary and sell my infill duplex."
  },
  {
    name: "Richmond",
    quadrant: "SW",
    fit: "infill",
    budget: "premium",
    buyer: "Move-up buyer",
    why: "Inner-city access with a duplex-heavy mental map for buyers comparing Altadore, Killarney, South Calgary, and Bankview.",
    watch: "Micro-location matters: slope, road noise, parking, basement light, and infill saturation.",
    ppc: "Landing angle: compare Richmond duplexes before overpaying for finish."
  },
  {
    name: "Mount Pleasant",
    quadrant: "N",
    fit: "infill",
    budget: "premium",
    buyer: "NW/inner-north infill buyer",
    why: "Works for buyers who want inner-city access with north-side routes, SAIT/University proximity, and newer semi-detached product.",
    watch: "Check grade, garage access, suite layouts, and whether pricing is leaning on location more than build quality.",
    ppc: "Test north inner-city infill and half-duplex Calgary terms."
  },
  {
    name: "Bowness",
    quadrant: "NW",
    fit: "investment",
    budget: "mid",
    buyer: "Full-duplex or value-add investor",
    why: "Older stock, redevelopment conversation, river/west access, and investor curiosity make it a good full-duplex watchlist area.",
    watch: "Flood context, older systems, lot particulars, tenant quality, suite legality, and renovation scope.",
    ppc: "Test full duplex Calgary, value-add duplex, and rental property Calgary."
  },
  {
    name: "Montgomery",
    quadrant: "NW",
    fit: "investment",
    budget: "mid",
    buyer: "Land-value and rental-demand buyer",
    why: "University/Foothills access, redevelopment pressure, and mixed older/newer product make it useful for investors and infill shoppers.",
    watch: "Slope, road exposure, older mechanicals, tenant handling, and whether the deal is land value or income value.",
    ppc: "Route to investor calculator plus neighbourhood comparison."
  },
  {
    name: "Glenbrook",
    quadrant: "W",
    fit: "family",
    budget: "mid",
    buyer: "Practical west-side half-duplex buyer",
    why: "Established west-side access with more practical pricing than the trophy inner-city infill set.",
    watch: "Renovation age, parking, schools by address, detached alternatives, and condition gap between similar homes.",
    ppc: "Test west Calgary duplexes and family half-duplex terms."
  },
  {
    name: "Glamorgan",
    quadrant: "W",
    fit: "family",
    budget: "mid",
    buyer: "Move-up or downsizing buyer",
    why: "Established west-side routines, MRU access, and practical housing stock make it a useful alternative to inner-city infill.",
    watch: "Older-home systems, condo-style confusion, garage/storage, and direct comparison against detached homes.",
    ppc: "Use as a comparison card for SW/W buyers."
  },
  {
    name: "Dover",
    quadrant: "E",
    fit: "value",
    budget: "entry",
    buyer: "Value and suite-income searcher",
    why: "Often enters conversations around affordability, rent demand, and east-side access.",
    watch: "Suite status, mechanical age, renovation quality, parking, tenant assumptions, and resale liquidity.",
    ppc: "Bid carefully on affordable duplex Calgary and duplex with suite Calgary."
  },
  {
    name: "Forest Lawn",
    quadrant: "E",
    fit: "value",
    budget: "entry",
    buyer: "Investor and value buyer",
    why: "High awareness for value-oriented east Calgary searches, with demand from buyers prioritizing price-to-space and rental possibilities.",
    watch: "Block-by-block condition, suite verification, insurance, tenant profile, and renovation permits.",
    ppc: "Send to due-diligence-heavy copy; avoid overpromising returns."
  },
  {
    name: "Marlborough",
    quadrant: "NE",
    fit: "value",
    budget: "entry",
    buyer: "Transit and price-sensitive buyer",
    why: "NE LRT/service access and established housing stock make it a practical comparison area for value seekers.",
    watch: "Exact route, parking, older systems, suite quality, and whether affordability survives repairs.",
    ppc: "Test NE duplexes and first-home duplex ad groups."
  },
  {
    name: "Whitehorn",
    quadrant: "NE",
    fit: "value",
    budget: "entry",
    buyer: "NE family or investor buyer",
    why: "Airport/northeast access, established services, and practical price-to-space searches make it a useful PPC segment.",
    watch: "Mechanical age, illegal suite risk, parking, tenant turnover, and inspection findings.",
    ppc: "Pair with suite verification and rental-income caution messaging."
  },
  {
    name: "Mahogany",
    quadrant: "SE",
    fit: "newer",
    budget: "mid",
    buyer: "Newer-product family buyer",
    why: "Lake/community-brand demand and newer product make it useful for buyers comparing duplexes against detached homes.",
    watch: "HOA fees, detached alternatives, garage size, road access, and builder warranty details.",
    ppc: "Test lake community duplex and SE Calgary duplex ad groups."
  },
  {
    name: "Seton",
    quadrant: "SE",
    fit: "newer",
    budget: "mid",
    buyer: "Hospital/SE employment route buyer",
    why: "Newer community services, South Health Campus access, and suburban product make it a strong intent cluster.",
    watch: "Construction phasing, commute route, fee structure, builder specs, and resale depth.",
    ppc: "Use for SE newer duplex and family layout search campaigns."
  },
  {
    name: "Evanston",
    quadrant: "N",
    fit: "newer",
    budget: "mid",
    buyer: "North suburban family buyer",
    why: "Newer north-side homes, family routines, and ring-road access give it a clear practical search angle.",
    watch: "Transit backup, garage size, school planning, detached alternatives, and builder product repetition.",
    ppc: "Test north Calgary duplexes and family half-duplex terms."
  },
  {
    name: "Sage Hill",
    quadrant: "N",
    fit: "newer",
    budget: "mid",
    buyer: "Northwest-ish suburban buyer",
    why: "Retail/service access and newer product make it a good search segment for buyers who want practical daily-life convenience.",
    watch: "Road access, construction edges, condo/fee details, and product duplication.",
    ppc: "Pair with comparison against Evanston, Nolan Hill, Sherwood, and Kincora."
  }
];

const ppcExperiments = [
  ["Buyer - broad", "calgary duplexes for sale", "duplexes-for-sale-calgary.html", "Shortlist request", "Exclude rentals, definition-only, kijiji, free, plans"],
  ["Half duplex", "half duplex for sale calgary", "half-duplexes-for-sale-calgary.html", "Subtype clarity beats generic listing pages", "Exclude apartment, fourplex, commercial"],
  ["Full duplex", "full duplex for sale calgary", "full-duplexes-for-sale-calgary.html", "Due diligence language filters better investor leads", "Exclude triplex, apartment building if not wanted"],
  ["Suite income", "duplex with legal suite calgary", "duplex-with-suite-calgary.html", "Verification-first copy improves lead quality", "Exclude illegal suite guarantee, cashflow guaranteed"],
  ["Investor", "calgary duplex investment property", "calgary-duplex-investment.html", "Calculator users become higher-intent consults", "Exclude wholesale, no money down"],
  ["Seller", "sell my duplex calgary", "sell-my-duplex-calgary.html", "Buyer-segment launch plan wins valuation leads", "Exclude rent my duplex, property manager"]
];

const matrixExportQueue = [
  ["P0", "Current active", "Full Duplex + Semi Detached", "Altadore, Killarney/Glengarry, Richmond, Mount Pleasant, Bowness, Montgomery", "Build first live shortlist and ad proof."],
  ["P0", "Current pending", "Full Duplex + Semi Detached", "Same six communities", "Find current pressure before pricing seller leads."],
  ["P1", "2026 sold YTD", "Full Duplex + Semi Detached", "Inner-city infill + value/rental clusters", "Turn generic claims into aggregate price/DOM ranges."],
  ["P1", "2025 sold", "Full Duplex + Semi Detached", "All PPC target communities", "Baseline neighbourhood landing pages."],
  ["P2", "2024-2023 sold", "Full Duplex + Semi Detached", "Communities with enough rows", "Trend context and seller valuation backup."]
];

const sellerBuyerSegments = [
  ["Owner-occupier", "Wants a home first, maybe suite income second.", "Floor plan, finish, parking, yard, schools, commute, mortgage comfort.", "Overloading the listing with investor math and tenant jargon."],
  ["House hacker", "Wants to live in one part and offset payment risk.", "Suite status, entrance, rent evidence, privacy, laundry, parking, lender treatment.", "Implying rent income without showing verification steps."],
  ["Pure investor", "Wants durable income, clean risk, and an exit path.", "Rent roll, leases, vacancy, repairs, insurance, capex, resale liquidity.", "Pretty lifestyle media without numbers or tenant documents."],
  ["Builder / land buyer", "Cares about dirt, frontage, land use, and future optionality.", "Lot, zoning/land-use context, lane, services, demolition friction, nearby builds.", "Spending too much on staging when land value is the story."],
  ["Family buyer", "Wants space and flexibility without detached pricing.", "Bedrooms, storage, garage, schools, parks, basement, noise, winter routines.", "Ignoring practical household details in favour of vague luxury copy."],
  ["Downsizer", "Wants lower maintenance with ownership feel.", "Stairs, snow, parking, main-floor function, storage, medical/errand access.", "Marketing only to younger infill buyers."]
];

const sellerLaunchTimeline = [
  ["Day -21", "Positioning call", "Clarify subtype, likely buyer groups, suite/tenant status, repairs, timing, and whether the best story is owner-occupier, investor, land, or infill."],
  ["Day -14", "Document room", "Collect permits, suite registry evidence, leases, utility notes, renovation invoices, warranties, floor plans, RPR/title items, and known defects."],
  ["Day -10", "Pre-market proof", "Build comparable set, active competition view, buyer objections, showing rules, tenant notice plan, and price-band strategy."],
  ["Day -7", "Media capture", "Shoot photography, vertical video, floor-plan clarity, suite/entrance details where appropriate, neighbourhood context, and investor proof assets."],
  ["Day -2", "Audience build", "Prepare MLS remarks, landing page, Google/search ad groups, social retargeting, buyer database tags, and agent-to-agent message angles."],
  ["Launch day", "Go live", "Publish, push segmented ads, notify buyer pools, track showing feedback, and watch which audience clicks: home, suite, investor, land, or infill."],
  ["Day +7", "Pressure read", "Review showing count, saves, ad CTR, search terms, questions, objections, and competing listings before changing price or messaging."],
  ["Offer stage", "Negotiate by buyer type", "Owner-occupier, investor, tenant-occupied, and builder offers have different condition risks, deposit logic, possession needs, and proof questions."]
];

const sellerEvidenceRows = [
  ["Subtype proof", "Half duplex, full duplex, side-by-side, condo/fee simple, titled parking, and ownership boundaries.", "Prevents search mismatch and buyer confusion."],
  ["Suite file", "Registry link, permit history, egress, entrance, fire/smoke details, appliances, lease/rent treatment notes.", "Suite-income buyers need confidence before they pay for the income story."],
  ["Tenant file", "Lease terms, rent, deposits, utilities, notices, showing access, vacancy plan, and privacy-safe disclosure.", "Tenant friction can change the buyer pool and offer conditions."],
  ["Repair file", "Roof, furnace, hot water, windows, foundation, drainage, electrical, plumbing, insulation, grading.", "Reduces surprise renegotiation and helps price the risk honestly."],
  ["Upgrade file", "Invoices, permits, warranties, appliance age, contractor notes, before/after context.", "Lets the listing prove value instead of merely claiming renovated."],
  ["Micro-location file", "Road exposure, lane, parking, transit, schools by address, services, redevelopment context.", "Neighbourhood brand is not enough; the exact block sells or hurts the property."]
];

const sellerAdAngles = [
  ["Valuation", "What is my Calgary duplex worth?", "Request a segmented duplex valuation", "Best for seller search traffic and retargeting warm visitors."],
  ["Infill seller", "Selling an infill duplex in Calgary?", "Price against competing new builds", "Best for Altadore, Killarney, Richmond, Mount Pleasant, South Calgary."],
  ["Suite-income seller", "Does your duplex have a suite story?", "Package the income proof before launch", "Best where suite verification can improve buyer confidence."],
  ["Full-duplex seller", "Selling both sides of a Calgary duplex?", "Bring investor and owner-user buyers to the same launch", "Best for rent-roll and side-by-side ownership conversations."],
  ["Tenant occupied", "Selling with tenants in place?", "Plan showings, documents, and investor messaging", "Best for landlords worried about access and condition risk."],
  ["Quiet valuation", "Not ready for MLS?", "Test buyer demand before you commit", "Best for owners exploring timing, price, and prep scope."]
];

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function copyAsset(from, to) {
  const target = path.join(root, to);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(workspaceRoot, from), target);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function pageUrl(file) {
  return file === "index.html" ? `${siteUrl}/` : `${siteUrl}/${file}`;
}

function schemaFor(page, file) {
  const isHome = file === "index.html";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["RealEstateAgent", "LocalBusiness"],
        "@id": `${siteUrl}/#agent`,
        name: "Calgary Duplexes - Cody Tritter & REPYYC",
        alternateName: ["CalgaryDuplexes.ca", "REPYYC", "Real Estate Partners Calgary"],
        url: siteUrl,
        image: `${siteUrl}/assets/repyyc-brokerage.png`,
        logo: `${siteUrl}/assets/repyyc-logo.png`,
        telephone: "+1-403-478-5587",
        email: "info@repyyc.com",
        priceRange: "$$",
        areaServed: ["Calgary", "Airdrie", "Okotoks", "Cochrane", "Chestermere"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Calgary",
          addressRegion: "AB",
          addressCountry: "CA"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "CalgaryDuplexes.ca",
        description: "Calgary duplex search, valuation, investment analysis, suite-aware buyer guidance, and REPYYC lead routing.",
        publisher: { "@id": `${siteUrl}/#agent` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/duplexes-for-sale-calgary.html?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": isHome ? "WebPage" : "Article",
        "@id": `${pageUrl(file)}#page`,
        url: pageUrl(file),
        name: page.title,
        headline: page.h1 || page.title,
        description: page.summary,
        dateModified: "2026-06-11",
        about: ["Calgary duplexes", "Calgary half duplexes", "Calgary real estate", "Secondary suites"],
        isPartOf: { "@id": `${siteUrl}/#website` }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl(file)}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Does CalgaryDuplexes.ca show live MLS listings?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The site captures search intent and routes buyers into a duplex shortlist workflow. Live listing availability should be verified through current MLS-style search and a licensed real estate professional."
            }
          },
          {
            "@type": "Question",
            name: "Can I use this site to value a Calgary duplex?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, the seller intake is designed for duplex valuation, but pricing requires current comparable sales, property condition, suite status, and live competition."
            }
          },
          {
            "@type": "Question",
            name: "Is suite income guaranteed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Suite income, legality, rentability, financing treatment, and insurance should be verified for the specific property."
            }
          }
        ]
      }
    ]
  };
}

function sourceNotes() {
  return `<section class="source-band" id="sources">
    <div class="wrap">
      <p class="eyebrow">Source notes</p>
      <h2>Built for speed, but grounded in verifiable signals.</h2>
      <div class="source-grid">
        ${sources.map((source) => `<a class="source-card" href="${source.url}" target="${source.url.startsWith("http") ? "_blank" : "_self"}" rel="noopener">
          <strong>${esc(source.label)}</strong>
          <span>${esc(source.note)}</span>
        </a>`).join("")}
      </div>
      <p class="fine-print">Last reviewed ${today}. Private Matrix exports are not published here until aggregate-only data is processed and reviewed.</p>
    </div>
  </section>`;
}

function formBlock(page) {
  return `<section class="lead-band" id="lead-form">
    <div class="wrap lead-grid">
      <div>
        <p class="eyebrow">Start the duplex desk</p>
        <h2>${esc(page.cta || "Start my duplex plan")}</h2>
        <p>${esc(page.intent || "Calgary duplex lead")} traffic lands here with campaign fields preserved. Tell us what you want and the follow-up can match the exact search angle.</p>
        <div class="mini-proof">
          <span>${matrixStats.communities} community export map</span>
          <span>Buyer, seller, investor flows</span>
          <span>No fake listing counts</span>
        </div>
      </div>
      <form name="calgary-duplex-lead" method="post" data-netlify="true" action="thank-you.html" class="lead-form">
        <input type="hidden" name="form-name" value="calgary-duplex-lead">
        <input type="hidden" name="page_intent" value="${esc(page.intent || "Home")}">
        <input type="hidden" name="utm_source">
        <input type="hidden" name="utm_medium">
        <input type="hidden" name="utm_campaign">
        <input type="hidden" name="utm_term">
        <input type="hidden" name="utm_content">
        <input type="hidden" name="gclid">
        <input type="hidden" name="msclkid">
        <input type="hidden" name="fbclid">
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Email<input type="email" name="email" autocomplete="email" required></label>
        <label>Phone<input name="phone" autocomplete="tel"></label>
        <label>Goal<select name="goal" required>
          <option value="">Choose one</option>
          <option>Buy a half duplex</option>
          <option>Buy a full duplex</option>
          <option>Analyze an investment</option>
          <option>Find suite-income options</option>
          <option>Sell or value my duplex</option>
          <option>Compare neighbourhoods</option>
        </select></label>
        <label>Budget / estimated value<select name="budget">
          <option value="">Not sure yet</option>
          <option>Under $550k</option>
          <option>$550k-$700k</option>
          <option>$700k-$900k</option>
          <option>$900k-$1.2M</option>
          <option>$1.2M+</option>
        </select></label>
        <label>Neighbourhoods or notes<textarea name="notes" rows="4" placeholder="Example: legal suite only, NW preferred, full duplex with tenants, valuation for Killarney half duplex..."></textarea></label>
        <label class="consent"><input type="checkbox" name="consent" required> I agree to be contacted about my Calgary duplex search or valuation.</label>
        <button class="button button-dark" type="submit">Send duplex request</button>
        <p class="form-note">Do not send SINs, banking documents, tenant private information, or confidential MLS documents through this form.</p>
      </form>
    </div>
  </section>`;
}

function pathfinderTool() {
  const defaultOption = pathfinderOptions[0];
  return `<section class="pathfinder-band" id="pathfinder">
    <div class="wrap pathfinder-grid" data-pathfinder>
      <div>
        <p class="eyebrow">Start here</p>
        <h2>Tell the site what kind of duplex decision this is.</h2>
        <p>A useful Calgary duplex page should route you fast. Choose the job, then the site points you to the right workflow instead of making every visitor read the same page.</p>
        <div class="pathfinder-buttons">
          ${pathfinderOptions.map((item, index) => `<button type="button" data-pathfinder-option="${item.id}" class="${index === 0 ? "is-active" : ""}">${esc(item.label)}</button>`).join("")}
        </div>
      </div>
      <article class="pathfinder-result">
        <span data-pathfinder-kicker>${esc(defaultOption.label)}</span>
        <h3 data-pathfinder-title>${esc(defaultOption.title)}</h3>
        <p data-pathfinder-text>${esc(defaultOption.text)}</p>
        <a class="button button-dark" data-pathfinder-link href="${defaultOption.href}">${esc(defaultOption.cta)}</a>
      </article>
      <script type="application/json" data-pathfinder-data>${JSON.stringify(pathfinderOptions)}</script>
    </div>
  </section>`;
}

function communityDesk({ compact = false } = {}) {
  const shown = compact ? duplexCommunityProfiles.slice(0, 8) : duplexCommunityProfiles;
  return `<section class="intel-band" id="community-desk">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Useful neighbourhood desk</p>
          <h2>Calgary duplex areas with an actual search reason.</h2>
        </div>
        <p>These are not fake rankings. They are working buckets for ad tests, buyer shortlists, seller positioning, and Matrix export priority. Each card tells you why the area belongs in the duplex conversation and what can go wrong.</p>
      </div>
      <div class="finder-bar" data-community-finder>
        <label>Buyer intent
          <select data-filter="fit">
            <option value="all">All intents</option>
            <option value="infill">Inner-city infill</option>
            <option value="investment">Full duplex / investor</option>
            <option value="family">Family / west established</option>
            <option value="value">Value / suite-income</option>
            <option value="newer">Newer suburban</option>
          </select>
        </label>
        <label>Quadrant
          <select data-filter="quadrant">
            <option value="all">All Calgary</option>
            <option value="CC">City Centre</option>
            <option value="SW">SW</option>
            <option value="NW">NW</option>
            <option value="N">North</option>
            <option value="NE">NE</option>
            <option value="SE">SE</option>
            <option value="E">East</option>
            <option value="W">West</option>
          </select>
        </label>
        <label>Budget lane
          <select data-filter="budget">
            <option value="all">Any budget</option>
            <option value="entry">Entry / value</option>
            <option value="mid">Mid-market</option>
            <option value="premium">Premium infill</option>
          </select>
        </label>
      </div>
      <div class="community-grid">
        ${shown.map((item) => `<article class="community-card" data-community-card data-fit="${item.fit}" data-quadrant="${item.quadrant}" data-budget="${item.budget}">
          <div class="community-card-top">
            <span>${esc(item.quadrant)}</span>
            <strong>${esc(item.name)}</strong>
          </div>
          <p class="card-role">${esc(item.buyer)}</p>
          <dl>
            <dt>Why it belongs</dt>
            <dd>${esc(item.why)}</dd>
            <dt>Watch-outs</dt>
            <dd>${esc(item.watch)}</dd>
            <dt>PPC angle</dt>
            <dd>${esc(item.ppc)}</dd>
          </dl>
        </article>`).join("")}
      </div>
      ${compact ? `<p class="more-link"><a class="text-link" href="duplex-neighbourhoods-calgary.html">Open the full neighbourhood desk</a></p>` : ""}
    </div>
  </section>`;
}

function matrixExportBoard() {
  return `<section class="matrix-band" id="matrix-queue">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Make the Matrix useful</p>
          <h2>First export batches that would immediately improve the site.</h2>
        </div>
        <p>The local Matrix manifest is real, but empty exports are not useful to visitors. This queue turns the scaffold into a practical data plan: current supply first, then recent sold history, then deeper trend context.</p>
      </div>
      <div class="matrix-table" role="table" aria-label="Duplex Matrix export priority queue">
        <div class="matrix-row matrix-head" role="row">
          <span>Priority</span><span>Export</span><span>Subtype</span><span>Communities</span><span>Why</span>
        </div>
        ${matrixExportQueue.map((row) => `<div class="matrix-row" role="row">
          ${row.map((cell) => `<span>${esc(cell)}</span>`).join("")}
        </div>`).join("")}
      </div>
      <p class="fine-print">Publishing rule: show aggregate-only community metrics after enough rows exist; never expose private listing rows or imply live MLS inventory unless connected to a compliant live search.</p>
    </div>
  </section>`;
}

function ppcExperimentBoard() {
  return `<section class="ppc-band" id="ppc-board">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">PPC lab</p>
          <h2>Campaigns worth testing first.</h2>
        </div>
        <p>This is the practical ad plan: one intent, one landing page, one conversion action. It keeps spend from smearing across generic real estate clicks.</p>
      </div>
      <div class="ppc-grid">
        ${ppcExperiments.map(([campaign, keyword, page, hypothesis, negatives]) => `<article class="ppc-card">
          <span>${esc(campaign)}</span>
          <h3>${esc(keyword)}</h3>
          <a href="${page}">${esc(page)}</a>
          <p>${esc(hypothesis)}</p>
          <small>Negative seed: ${esc(negatives)}</small>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function propertyTriageBoard() {
  const checks = [
    ["Subtype", "Is it semi-detached half duplex, full duplex, row/townhouse, or marketing noise?"],
    ["Title and use", "Fee simple, condo, tenant occupied, owner occupied, or two-side acquisition?"],
    ["Suite status", "Registry, permits, egress, entrance, fire/smoke, insurance, and lender rent treatment."],
    ["Income proof", "Rent roll, lease terms, vacancy assumption, utilities, deposits, and tenant notice risk."],
    ["Building risk", "Roof, windows, foundation, drainage, shared wall, mechanicals, electrical, plumbing, insulation."],
    ["Exit plan", "Who buys this later: owner-occupier, investor, builder, family, or suite-income buyer?"]
  ];
  return `<section class="triage-band" id="triage-board">
    <div class="wrap">
      <p class="eyebrow">Property triage</p>
      <h2>What a useful duplex shortlist should answer before showings.</h2>
      <div class="triage-grid">
        ${checks.map(([title, text], index) => `<article class="triage-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function sellerReadinessTool() {
  return `<section class="seller-tool-band" id="seller-readiness">
    <div class="wrap seller-tool-grid">
      <div>
        <p class="eyebrow">Seller workbench</p>
        <h2>Duplex launch readiness score.</h2>
        <p>This does not value the property. It tells a duplex seller what will make the launch cleaner, what buyer group is easiest to attract, and where weak documentation may cost leverage.</p>
        <div class="seller-score-result" data-seller-score-output>
          <span>Launch readiness</span>
          <strong>0 / 100</strong>
          <em>Adjust the fields to build a launch profile.</em>
        </div>
      </div>
      <div class="seller-score" data-seller-score>
        <label>Property type
          <select data-score="subtype">
            <option value="12">Semi-detached half duplex</option>
            <option value="16">Full duplex / both sides</option>
            <option value="10">Infill half duplex</option>
            <option value="8">Not sure</option>
          </select>
        </label>
        <label>Suite / income file
          <select data-score="suite">
            <option value="18">Legal/registered suite or clean income package</option>
            <option value="10">Suite potential or incomplete file</option>
            <option value="6">No suite story</option>
            <option value="2">Unclear or risky suite claim</option>
          </select>
        </label>
        <label>Tenant situation
          <select data-score="tenant">
            <option value="16">Vacant or owner occupied</option>
            <option value="12">Tenant with clean lease/showing plan</option>
            <option value="6">Tenant file incomplete</option>
            <option value="3">Access or notice risk</option>
          </select>
        </label>
        <label>Repair confidence
          <select data-score="repairs">
            <option value="18">Major systems documented</option>
            <option value="12">Some updates documented</option>
            <option value="7">Known deferred maintenance</option>
            <option value="3">Unknown condition</option>
          </select>
        </label>
        <label>Media readiness
          <select data-score="media">
            <option value="16">Photo/video/floor plan ready</option>
            <option value="10">Needs light prep</option>
            <option value="5">Needs cleaning/staging/repairs</option>
            <option value="2">Tenant or access limits media</option>
          </select>
        </label>
        <label>Market proof
          <select data-score="proof">
            <option value="20">Recent comps + active competition reviewed</option>
            <option value="12">Some comparable context</option>
            <option value="6">Relying on estimate sites</option>
            <option value="2">No clear pricing support</option>
          </select>
        </label>
      </div>
    </div>
  </section>`;
}

function sellerSegmentMatrix() {
  return `<section class="seller-segment-band" id="seller-segments">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Buyer segmentation</p>
          <h2>One duplex can be six different listings.</h2>
        </div>
        <p>A strong duplex launch decides which buyer deserves the lead story, then still gives the other buyer pools enough proof to raise their hands.</p>
      </div>
      <div class="segment-table" role="table" aria-label="Calgary duplex seller buyer segment matrix">
        <div class="segment-row segment-head" role="row">
          <span>Buyer</span><span>They want</span><span>Proof to show</span><span>Common mistake</span>
        </div>
        ${sellerBuyerSegments.map((row) => `<div class="segment-row" role="row">${row.map((cell) => `<span>${esc(cell)}</span>`).join("")}</div>`).join("")}
      </div>
    </div>
  </section>`;
}

function sellerEvidenceRoom() {
  return `<section class="evidence-band" id="seller-evidence">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Pre-list document room</p>
          <h2>Documents that make duplex buyers less nervous.</h2>
        </div>
        <p>The more complex the duplex story, the more the sale depends on proof. This section turns buyer objections into a prep list before the first showing.</p>
      </div>
      <div class="evidence-grid">
        ${sellerEvidenceRows.map(([title, collect, why]) => `<article class="evidence-card">
          <h3>${esc(title)}</h3>
          <p>${esc(collect)}</p>
          <span>${esc(why)}</span>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function sellerLaunchCalendar() {
  return `<section class="calendar-band" id="seller-calendar">
    <div class="wrap">
      <p class="eyebrow">Launch calendar</p>
      <h2>A better duplex launch starts before the sign goes up.</h2>
      <div class="timeline">
        ${sellerLaunchTimeline.map(([day, title, text]) => `<article class="timeline-item">
          <span>${esc(day)}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(text)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function sellerAdBoard() {
  return `<section class="seller-ad-band" id="seller-ads">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Seller PPC</p>
          <h2>Ad angles for finding duplex owners.</h2>
        </div>
        <p>These angles are built for fast PPC tests. Each one should have its own ad group, landing variant, call tracking number, and conversion label.</p>
      </div>
      <div class="seller-ad-grid">
        ${sellerAdAngles.map(([angle, hook, cta, use]) => `<article class="seller-ad-card">
          <span>${esc(angle)}</span>
          <h3>${esc(hook)}</h3>
          <p>${esc(cta)}</p>
          <small>${esc(use)}</small>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function calculator() {
  return `<section class="tool-band" id="deal-calculator">
    <div class="wrap tool-grid">
      <div>
        <p class="eyebrow">PPC conversion tool</p>
        <h2>Quick duplex cash-flow tester.</h2>
        <p>Give investors something useful before they bounce. This is educational only, but it turns a cold click into a better conversation.</p>
      </div>
      <div class="calc" data-calculator>
        <label>Purchase price<input type="number" data-calc="price" value="750000" min="0" step="10000"></label>
        <label>Down payment %<input type="number" data-calc="down" value="20" min="0" max="100" step="1"></label>
        <label>Interest rate %<input type="number" data-calc="rate" value="5.25" min="0" step="0.05"></label>
        <label>Monthly rent<input type="number" data-calc="rent" value="4200" min="0" step="100"></label>
        <label>Taxes / insurance / repairs monthly<input type="number" data-calc="costs" value="1200" min="0" step="50"></label>
        <div class="calc-result">
          <span>Estimated monthly position</span>
          <strong data-calc-output>$0</strong>
          <em data-calc-note>Adjust the fields to test a scenario.</em>
        </div>
      </div>
    </div>
  </section>`;
}

function header() {
  return `<header class="site-header">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="top-strip">
      <span>Calgary duplex search, valuation, and PPC testing desk</span>
      <a href="tel:+14034785587">403-478-5587</a>
    </div>
    <nav class="nav">
      <a class="brand" href="index.html" aria-label="CalgaryDuplexes.ca home">
        <img src="assets/repyyc-logo.png" alt="" width="42" height="42">
        <span><b>Calgary</b>Duplexes.ca</span>
      </a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
      <div class="menu" id="site-menu">
        ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
      </div>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <a class="footer-brand" href="index.html">CalgaryDuplexes.ca</a>
        <p>Built for Calgary duplex buyers, sellers, investors, and PPC testing. Powered by Cody Tritter, REPYYC, and Real Estate Partners Calgary positioning.</p>
      </div>
      <div>
        <strong>Core funnels</strong>
        <a href="duplexes-for-sale-calgary.html">Buyer search</a>
        <a href="calgary-duplex-investment.html">Investor analysis</a>
        <a href="sell-my-duplex-calgary.html">Seller valuation</a>
      </div>
      <div>
        <strong>Compliance</strong>
        <a href="privacy-policy.html">Privacy</a>
        <a href="disclaimer.html">Disclaimer</a>
        <a href="sitemap.xml">Sitemap</a>
      </div>
    </div>
  </footer>`;
}

function homePage() {
  const page = {
    title: "Calgary Duplexes | Buy, Sell, Invest, and Test PPC",
    h1: "Calgary duplexes, without the generic real estate sludge.",
    summary: "A high-intent duplex desk for half duplex buyers, full duplex investors, suite-income searches, infill comparisons, and seller valuations across Calgary.",
    intent: "Home",
    cta: "Start my Calgary duplex plan"
  };
  return layout(page, "index.html", `<main id="main">
    <section class="hero">
      <div class="hero-media">
        <img src="assets/repyyc-brokerage.png" alt="REPYYC Calgary real estate team and brokerage visual">
      </div>
      <div class="wrap hero-content">
        <p class="eyebrow">CalgaryDuplexes.ca</p>
        <h1 data-dynamic-headline>${page.h1}</h1>
        <p class="hero-copy" data-dynamic-copy>${page.summary}</p>
        <div class="hero-actions">
          <a class="button button-gold" href="#lead-form" data-dynamic-cta>Find duplexes</a>
          <a class="button button-light" href="#deal-calculator">Run deal math</a>
        </div>
        <div class="hero-stats" aria-label="Calgary duplex site signals">
          <span><b>${matrixStats.communities}</b> communities mapped</span>
          <span><b>${matrixStats.segments.toLocaleString("en-CA")}</b> Matrix segments ready</span>
          <span><b>$691k</b> May 2026 semi benchmark</span>
        </div>
      </div>
    </section>
    <section class="band">
      <div class="wrap">
        <p class="eyebrow">Funnels</p>
        <h2>Built to rank organically and learn fast from paid traffic.</h2>
        <div class="feature-grid">
          ${featureCards.map(([title, text]) => `<article class="feature-card"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
        </div>
      </div>
    </section>
    ${pathfinderTool()}
    <section class="split-band">
      <div class="wrap split">
        <div>
          <p class="eyebrow">Neighbourhood intelligence</p>
          <h2>Not every duplex click wants the same Calgary.</h2>
          <p>Send PPC to the exact intent page, then let the intake tell you which ad groups deserve budget: first home, suite income, investor, infill, quadrant, valuation, or full-duplex acquisition.</p>
          <a class="text-link" href="duplex-neighbourhoods-calgary.html">Explore neighbourhood logic</a>
        </div>
        <img class="map-image" src="assets/calgary-map.webp" alt="Calgary community map visual">
      </div>
    </section>
    <section class="band">
      <div class="wrap">
        <p class="eyebrow">Community intent map</p>
        <h2>Five duplex search patterns worth testing.</h2>
        <div class="neighbourhood-grid">
          ${neighbourhoodGroups.map(([title, areas, watch]) => `<article class="neighbourhood-card"><h3>${esc(title)}</h3><p>${esc(areas)}</p><span>${esc(watch)}</span></article>`).join("")}
        </div>
      </div>
    </section>
    ${communityDesk({ compact: true })}
    ${propertyTriageBoard()}
    ${ppcExperimentBoard()}
    ${calculator()}
    <section class="band dark-band">
      <div class="wrap">
        <p class="eyebrow">Matrix status</p>
        <h2>The duplex database scaffold exists. The private exports still need to be filled.</h2>
        <div class="status-grid">
          <div><b>${matrixStats.segments.toLocaleString("en-CA")}</b><span>duplex Matrix export segments planned</span></div>
          <div><b>${matrixStats.soldSegments.toLocaleString("en-CA")}</b><span>sold-history segments mapped</span></div>
          <div><b>0</b><span>private raw export rows published</span></div>
        </div>
        <p>${esc(matrixStats.note)}</p>
      </div>
    </section>
    ${formBlock(page)}
    ${sourceNotes()}
  </main>`);
}

function articlePage(page) {
  const file = `${page.slug}.html`;
  const sellerSections = page.slug === "sell-my-duplex-calgary" || page.slug === "calgary-duplex-valuation"
    ? sellerReadinessTool() + sellerSegmentMatrix() + sellerEvidenceRoom() + sellerLaunchCalendar() + sellerAdBoard()
    : "";
  return layout(page, file, `<main id="main">
    <section class="page-hero">
      <div class="wrap page-hero-grid">
        <div>
          <p class="eyebrow">${esc(page.eyebrow)}</p>
          <h1>${esc(page.h1)}</h1>
          <p>${esc(page.summary)}</p>
          <div class="hero-actions">
            <a class="button button-gold" href="#lead-form">${esc(page.cta)}</a>
            <a class="button button-light" href="index.html#deal-calculator">Run deal math</a>
          </div>
        </div>
        <div class="intent-panel">
          <span>Intent</span>
          <strong>${esc(page.intent)}</strong>
          <p>Use this page for organic targeting and paid ad groups that match the visitor's job-to-be-done.</p>
        </div>
      </div>
    </section>
    <section class="content-band">
      <div class="wrap content-grid">
        <article class="content-stack">
          ${page.sections.map(([title, text]) => `<section><h2>${esc(title)}</h2><p>${esc(text)}</p></section>`).join("")}
        </article>
        <aside class="checklist">
          <h2>Duplex checklist</h2>
          ${page.checklist.map((item) => `<label><input type="checkbox"> ${esc(item)}</label>`).join("")}
          <a class="button button-dark" href="#lead-form">${esc(page.cta)}</a>
        </aside>
      </div>
    </section>
    ${sellerSections}
    ${page.slug === "duplex-neighbourhoods-calgary" ? communityDesk() + matrixExportBoard() + propertyTriageBoard() + ppcExperimentBoard() : ""}
    ${page.slug.includes("investment") ? calculator() : ""}
    ${formBlock(page)}
    ${sourceNotes()}
  </main>`);
}

function simplePage({ file, title, h1, body }) {
  const page = { title, h1, summary: body.slice(0, 150), intent: "Policy", cta: "Contact CalgaryDuplexes.ca" };
  return layout(page, file, `<main id="main">
    <section class="page-hero compact">
      <div class="wrap">
        <p class="eyebrow">CalgaryDuplexes.ca</p>
        <h1>${esc(h1)}</h1>
        <p>${esc(body)}</p>
      </div>
    </section>
  </main>`);
}

function thankYouPage() {
  return simplePage({
    file: "thank-you.html",
    title: "Thank You | CalgaryDuplexes.ca",
    h1: "Your duplex request is in.",
    body: "Thanks. The next step is to match your request to the right Calgary duplex workflow: buyer shortlist, investment analysis, suite review, neighbourhood comparison, or seller valuation."
  });
}

function layout(page, file, main) {
  const description = page.summary || "Calgary duplex search, valuation, and lead generation.";
  return `<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(page.title)} | CalgaryDuplexes.ca</title>
    <meta name="description" content="${esc(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="${pageUrl(file)}">
    <meta name="theme-color" content="#111111">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${pageUrl(file)}">
    <meta property="og:title" content="${esc(page.title)} | CalgaryDuplexes.ca">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="${siteUrl}/assets/repyyc-brokerage.png">
    <meta property="og:locale" content="en_CA">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="assets/repyyc-logo.png" type="image/png">
    <link rel="stylesheet" href="assets/styles.css">
    <script type="application/ld+json">${JSON.stringify(schemaFor(page, file))}</script>
  </head>
  <body>
    ${header()}
    ${main}
    ${footer()}
    <script src="assets/script.js" defer></script>
  </body>
</html>`;
}

function stylesheet() {
  return `:root {
  --ink: #111111;
  --muted: #686868;
  --paper: #ffffff;
  --soft: #f7f5ef;
  --line: #e6e1d8;
  --gold: #ffc629;
  --gold-dark: #d79a00;
  --teal: #0e7166;
  --blue: #1d4d73;
  --green: #567d3f;
  --max: 1180px;
  --radius: 8px;
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.12);
}
* { box-sizing: border-box; letter-spacing: 0; }
html { scroll-behavior: smooth; overflow-x: hidden; }
body { margin: 0; color: var(--ink); background: var(--paper); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif; line-height: 1.55; overflow-x: hidden; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
input, select, textarea, button { font: inherit; }
.skip-link { position: absolute; left: 16px; top: -80px; background: var(--ink); color: #fff; padding: 10px 14px; z-index: 99; border-radius: var(--radius); }
.skip-link:focus { top: 14px; }
.wrap { width: min(var(--max), calc(100% - 32px)); margin: 0 auto; }
.top-strip { min-height: 36px; display: flex; align-items: center; justify-content: center; gap: 18px; background: var(--ink); color: #fff; font-size: .82rem; font-weight: 800; text-transform: uppercase; }
.top-strip a { color: var(--gold); }
.site-header { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,.96); backdrop-filter: blur(14px); border-bottom: 1px solid rgba(0,0,0,.07); }
.nav { width: min(var(--max), calc(100% - 32px)); margin: 0 auto; min-height: 74px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.brand, .footer-brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 950; font-size: 1.05rem; }
.brand img { width: 42px; height: 42px; border-radius: 50%; }
.menu { display: flex; align-items: center; gap: 6px; }
.menu a { padding: 10px 12px; border-radius: var(--radius); font-weight: 850; font-size: .9rem; }
.menu a:hover, .menu a:focus { background: var(--soft); }
.menu-button { display: none; border: 1px solid var(--line); background: #fff; border-radius: var(--radius); padding: 9px 12px; font-weight: 900; }
.hero { position: relative; min-height: 720px; display: grid; align-items: end; overflow: hidden; background: #000; }
.hero-media { position: absolute; inset: 0; }
.hero-media img { width: 100%; height: 100%; object-fit: cover; opacity: .45; }
.hero:after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.5) 45%, rgba(0,0,0,.18)); }
.hero-content { position: relative; z-index: 1; color: #fff; padding: 130px 0 58px; }
.eyebrow { margin: 0 0 12px; color: var(--gold-dark); font-size: .78rem; font-weight: 950; text-transform: uppercase; }
.hero .eyebrow, .dark-band .eyebrow { color: var(--gold); }
h1, h2, h3, p { margin-top: 0; }
h1 { max-width: 880px; font-size: clamp(3rem, 8vw, 6.7rem); line-height: .88; letter-spacing: 0; margin-bottom: 22px; }
h2 { font-size: clamp(2rem, 5vw, 4rem); line-height: .96; margin-bottom: 18px; }
h3 { font-size: 1.15rem; line-height: 1.15; margin-bottom: 10px; }
.hero-copy, .page-hero p, .split p, .tool-band p, .lead-band p { max-width: 720px; font-size: 1.18rem; color: rgba(255,255,255,.84); }
.page-hero p, .split p, .tool-band p, .lead-band p { color: #333; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin: 28px 0; }
.button { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 18px; border-radius: var(--radius); border: 1px solid transparent; font-weight: 950; cursor: pointer; }
.button-gold { background: var(--gold); color: #111; box-shadow: 0 12px 34px rgba(255,198,41,.22); }
.button-light { background: rgba(255,255,255,.92); color: #111; }
.button-dark { background: var(--ink); color: #fff; width: fit-content; }
.text-link { color: var(--blue); font-weight: 950; border-bottom: 2px solid var(--gold); }
.hero-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); max-width: 880px; border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.11); backdrop-filter: blur(10px); }
.hero-stats span { min-height: 86px; padding: 16px; display: grid; align-content: center; border-right: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.86); }
.hero-stats span:last-child { border-right: 0; }
.hero-stats b { display: block; color: #fff; font-size: 1.75rem; line-height: 1; }
.band, .split-band, .content-band, .tool-band, .lead-band, .source-band { padding: 82px 0; }
.feature-grid, .source-grid, .neighbourhood-grid, .status-grid { display: grid; gap: 16px; }
.feature-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 28px; }
.feature-card, .source-card, .neighbourhood-card, .intent-panel, .checklist, .calc, .lead-form { border: 1px solid var(--line); border-radius: var(--radius); background: #fff; padding: 22px; box-shadow: 0 10px 30px rgba(0,0,0,.04); }
.feature-card:nth-child(2) { border-top: 5px solid var(--teal); }
.feature-card:nth-child(3) { border-top: 5px solid var(--blue); }
.feature-card:nth-child(4) { border-top: 5px solid var(--green); }
.feature-card p, .neighbourhood-card p, .source-card span, .checklist, .content-stack p, .form-note, .fine-print { color: var(--muted); }
.pathfinder-band { padding: 82px 0; background: #f7f5ef; }
.pathfinder-grid { display: grid; grid-template-columns: 1fr .85fr; gap: 36px; align-items: start; }
.pathfinder-grid > div > p { color: var(--muted); max-width: 690px; }
.pathfinder-buttons { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.pathfinder-buttons button { min-height: 42px; border: 1px solid #d8d2c8; border-radius: 999px; background: #fff; padding: 9px 13px; font-weight: 950; cursor: pointer; }
.pathfinder-buttons button.is-active { background: var(--ink); border-color: var(--ink); color: #fff; }
.pathfinder-result { border: 1px solid var(--line); border-radius: var(--radius); background: #fff; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,.04); display: grid; gap: 12px; }
.pathfinder-result span { color: var(--gold-dark); font-weight: 950; text-transform: uppercase; font-size: .78rem; }
.pathfinder-result h3 { font-size: clamp(1.8rem, 4vw, 2.8rem); }
.pathfinder-result p { color: var(--muted); }
.split-band, .tool-band { background: var(--soft); }
.split { display: grid; grid-template-columns: 1fr .95fr; align-items: center; gap: 48px; }
.map-image { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius); box-shadow: var(--shadow); }
.neighbourhood-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); margin-top: 28px; }
.neighbourhood-card span { display: block; margin-top: 14px; color: var(--teal); font-weight: 850; }
.dark-band { background: #151515; color: #fff; }
.dark-band p { max-width: 860px; color: rgba(255,255,255,.76); }
.status-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 22px 0; }
.status-grid div { padding: 20px; border: 1px solid rgba(255,255,255,.18); border-radius: var(--radius); }
.status-grid b { display: block; font-size: 2.5rem; line-height: 1; color: var(--gold); }
.status-grid span { color: rgba(255,255,255,.78); }
.page-hero { background: #151515; color: #fff; padding: 88px 0; }
.page-hero.compact { min-height: 50vh; display: grid; align-items: center; }
.page-hero-grid { display: grid; grid-template-columns: 1fr 340px; gap: 42px; align-items: end; }
.page-hero h1 { font-size: clamp(2.8rem, 7vw, 5.9rem); }
.intent-panel { background: #fff; color: var(--ink); }
.intent-panel span { color: var(--muted); font-weight: 900; text-transform: uppercase; font-size: .78rem; }
.intent-panel strong { display: block; font-size: 1.8rem; line-height: 1.05; margin: 6px 0 14px; }
.content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 42px; align-items: start; }
.content-stack { display: grid; gap: 34px; }
.content-stack h2 { font-size: clamp(1.8rem, 4vw, 3rem); }
.checklist { position: sticky; top: 120px; display: grid; gap: 12px; }
.checklist h2 { font-size: 1.7rem; }
.checklist label, .lead-form label, .calc label { display: grid; gap: 6px; font-weight: 850; }
.checklist input { width: 18px; height: 18px; }
.tool-grid, .lead-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 36px; align-items: start; }
.calc { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.calc input, .lead-form input, .lead-form select, .lead-form textarea { width: 100%; border: 1px solid #d8d2c8; border-radius: var(--radius); padding: 12px; background: #fff; min-height: 46px; }
.calc-result { grid-column: 1 / -1; background: var(--ink); color: #fff; border-radius: var(--radius); padding: 18px; }
.calc-result strong { display: block; font-size: 2.4rem; color: var(--gold); }
.calc-result em { color: rgba(255,255,255,.72); font-style: normal; }
.lead-band { background: #f1eee6; }
.lead-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.lead-form label:has(textarea), .lead-form .consent, .lead-form button, .form-note { grid-column: 1 / -1; }
.consent { display: flex !important; grid-template-columns: none !important; align-items: start; flex-direction: row; font-size: .92rem; color: #333; }
.consent input { width: 18px; height: 18px; margin-top: 3px; }
.mini-proof { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
.mini-proof span { border: 1px solid #d8d2c8; background: #fff; border-radius: 999px; padding: 8px 10px; font-weight: 850; font-size: .86rem; }
.source-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 24px; }
.source-card { display: grid; gap: 8px; }
.intel-band, .matrix-band, .ppc-band, .triage-band { padding: 82px 0; }
.intel-band, .ppc-band { background: #fff; }
.matrix-band, .triage-band { background: #f7f5ef; }
.section-head { display: grid; grid-template-columns: .9fr 1.1fr; gap: 36px; align-items: end; margin-bottom: 28px; }
.section-head p:last-child { color: var(--muted); font-size: 1.05rem; }
.finder-bar { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin: 22px 0 24px; padding: 16px; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; }
.finder-bar label { display: grid; gap: 7px; font-weight: 900; }
.finder-bar select { min-height: 46px; border: 1px solid #d8d2c8; border-radius: var(--radius); padding: 10px; background: #fff; }
.community-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.community-card { display: grid; gap: 12px; border: 1px solid var(--line); border-radius: var(--radius); padding: 18px; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,.04); }
.community-card.is-hidden { display: none; }
.community-card-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.community-card-top span { display: inline-flex; align-items: center; justify-content: center; min-width: 42px; height: 32px; border-radius: 999px; background: var(--ink); color: #fff; font-weight: 950; font-size: .78rem; }
.community-card-top strong { font-size: 1.2rem; line-height: 1.05; text-align: right; }
.card-role { margin: 0; color: var(--teal); font-weight: 900; }
.community-card dl { margin: 0; display: grid; gap: 7px; }
.community-card dt { color: #222; font-weight: 950; font-size: .78rem; text-transform: uppercase; }
.community-card dd { margin: 0 0 8px; color: var(--muted); }
.more-link { margin-top: 22px; }
.matrix-table { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; background: #fff; }
.matrix-row { display: grid; grid-template-columns: .55fr .9fr 1fr 1.6fr 1.25fr; }
.matrix-row span { padding: 14px; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); color: #3e3e3e; }
.matrix-row span:last-child { border-right: 0; }
.matrix-row:last-child span { border-bottom: 0; }
.matrix-head { background: #151515; }
.matrix-head span { color: #fff; font-weight: 950; }
.ppc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.ppc-card { border: 1px solid var(--line); border-radius: var(--radius); padding: 20px; display: grid; gap: 8px; background: #fff; }
.ppc-card span { width: fit-content; border-radius: 999px; background: var(--soft); color: #333; padding: 6px 9px; font-weight: 900; font-size: .78rem; }
.ppc-card a { color: var(--blue); font-weight: 900; word-break: break-word; }
.ppc-card p { color: #333; margin: 0; }
.ppc-card small { color: var(--muted); line-height: 1.45; }
.triage-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 26px; }
.triage-card { border: 1px solid var(--line); border-radius: var(--radius); background: #fff; padding: 20px; }
.triage-card span { color: var(--gold-dark); font-weight: 950; }
.triage-card p { color: var(--muted); margin-bottom: 0; }
.seller-tool-band, .seller-segment-band, .evidence-band, .calendar-band, .seller-ad-band { padding: 82px 0; }
.seller-tool-band, .evidence-band, .seller-ad-band { background: #fff; }
.seller-segment-band, .calendar-band { background: #f7f5ef; }
.seller-tool-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 36px; align-items: start; }
.seller-tool-grid > *, .pathfinder-grid > *, .tool-grid > *, .lead-grid > *, .content-grid > *, .section-head > * { min-width: 0; }
.seller-score { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.04); }
.seller-score label { display: grid; gap: 7px; font-weight: 900; }
.seller-score select { width: 100%; min-width: 0; min-height: 46px; border: 1px solid #d8d2c8; border-radius: var(--radius); padding: 10px; background: #fff; }
.seller-score-result { margin-top: 24px; background: #151515; color: #fff; border-radius: var(--radius); padding: 20px; max-width: 420px; }
.seller-score-result span { display: block; color: rgba(255,255,255,.7); font-weight: 900; text-transform: uppercase; font-size: .78rem; }
.seller-score-result strong { display: block; color: var(--gold); font-size: 3rem; line-height: 1; margin: 8px 0; }
.seller-score-result em { color: rgba(255,255,255,.75); font-style: normal; }
.segment-table { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; background: #fff; }
.segment-row { display: grid; grid-template-columns: .8fr 1fr 1.25fr 1.1fr; }
.segment-row span { padding: 14px; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); color: #3e3e3e; }
.segment-row span:last-child { border-right: 0; }
.segment-row:last-child span { border-bottom: 0; }
.segment-head { background: #151515; }
.segment-head span { color: #fff; font-weight: 950; }
.evidence-grid, .seller-ad-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.evidence-card, .seller-ad-card { border: 1px solid var(--line); border-radius: var(--radius); background: #fff; padding: 20px; display: grid; gap: 8px; }
.evidence-card h3, .seller-ad-card h3 { margin-bottom: 0; }
.evidence-card p, .seller-ad-card p { margin: 0; color: #333; }
.evidence-card span, .seller-ad-card small { color: var(--muted); }
.seller-ad-card span { width: fit-content; border-radius: 999px; background: var(--ink); color: #fff; padding: 6px 9px; font-weight: 950; font-size: .78rem; }
.timeline { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 26px; }
.timeline-item { position: relative; border: 1px solid var(--line); border-radius: var(--radius); background: #fff; padding: 20px; }
.timeline-item span { display: inline-flex; margin-bottom: 12px; color: var(--gold-dark); font-weight: 950; text-transform: uppercase; font-size: .8rem; }
.timeline-item p { color: var(--muted); margin-bottom: 0; }
.site-footer { background: #111; color: #fff; padding: 46px 0; }
.footer-grid { display: grid; grid-template-columns: 1.4fr .6fr .6fr; gap: 28px; }
.site-footer p, .site-footer a { color: rgba(255,255,255,.72); }
.site-footer strong { display: block; margin-bottom: 10px; }
.site-footer a { display: block; margin: 8px 0; }
@media (max-width: 900px) {
  .top-strip { display: none; }
  .menu-button { display: inline-flex; }
  .menu { display: none; position: absolute; left: 16px; right: 16px; top: 75px; background: #fff; border: 1px solid var(--line); border-radius: var(--radius); padding: 10px; box-shadow: var(--shadow); }
  .menu.is-open { display: grid; }
  .hero { min-height: 680px; }
  .hero-content { padding-top: 90px; }
  .hero-stats, .feature-grid, .neighbourhood-grid, .status-grid, .split, .page-hero-grid, .content-grid, .tool-grid, .lead-grid, .source-grid, .footer-grid, .section-head, .finder-bar, .community-grid, .matrix-row, .ppc-grid, .triage-grid, .seller-tool-grid, .seller-score, .segment-row, .evidence-grid, .seller-ad-grid, .timeline, .pathfinder-grid { grid-template-columns: 1fr; }
  .hero-stats span { border-right: 0; border-bottom: 1px solid rgba(255,255,255,.2); }
  .lead-form, .calc { grid-template-columns: 1fr; }
  .checklist { position: static; }
}
@media (max-width: 560px) {
  .wrap, .nav { width: min(100% - 24px, var(--max)); }
  .hero { min-height: 640px; }
  h1 { font-size: 3.05rem; }
  h2 { font-size: 2.1rem; }
  .band, .split-band, .content-band, .tool-band, .lead-band, .source-band, .intel-band, .matrix-band, .ppc-band, .triage-band, .seller-tool-band, .seller-segment-band, .evidence-band, .calendar-band, .seller-ad-band, .pathfinder-band { padding: 58px 0; }
  .button { width: 100%; }
}`;
}

function script() {
  return `const menuButton = document.querySelector(".menu-button");
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
}`;
}

function downloads() {
  fs.writeFileSync(path.join(root, "downloads/calgary-duplex-buyer-checklist.txt"), `Calgary Duplex Buyer Checklist

- Define half duplex, full duplex, infill, or suite-income intent.
- Confirm budget, down payment, financing use, and lender treatment for rental income.
- Verify suite registry and permit questions where relevant.
- Compare active competition against recent comparable sales.
- Inspect shared wall, roof, mechanicals, basement, drainage, parking, and renovations.
- Review neighbourhood resale depth and tenant demand.
- Avoid relying on listing copy for legal, suite, zoning, financing, or insurance conclusions.
`);
  fs.writeFileSync(path.join(root, "downloads/calgary-duplex-seller-launch-plan.txt"), `Calgary Duplex Seller Launch Plan

- Clarify property subtype and buyer segments.
- Gather suite, permit, tenant, lease, renovation, and utility details.
- Prepare media for owner-occupier and investor buyers.
- Price against live competition and recent comparable sales.
- Build PPC tests for valuation, investor, suite-income, and neighbourhood demand.
- Route every lead by buyer segment and follow up with the right proof.
`);
}

function writeBaseFiles(files) {
  fs.writeFileSync(path.join(root, "assets/styles.css"), stylesheet());
  fs.writeFileSync(path.join(root, "assets/script.js"), script());
  fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`);
  fs.writeFileSync(path.join(root, "CNAME"), "calgaryduplexes.ca\n");
  fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.map((file) => `  <url><loc>${pageUrl(file)}</loc><lastmod>2026-06-11</lastmod><changefreq>${file === "index.html" ? "weekly" : "monthly"}</changefreq><priority>${file === "index.html" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`);
  fs.writeFileSync(path.join(root, "llms.txt"), `# CalgaryDuplexes.ca

CalgaryDuplexes.ca is a Calgary duplex search, valuation, investor analysis, and PPC testing site for REPYYC/Cody Tritter positioning.

The site does not publish private MLS data. It references a local Matrix export manifest with ${matrixStats.segments.toLocaleString("en-CA")} planned duplex export segments across ${matrixStats.communities} Calgary communities, with raw exports still empty as of ${matrixStats.generatedAt}.
`);
  fs.writeFileSync(path.join(root, "README.md"), `# CalgaryDuplexes.ca

A static, PPC-ready Calgary duplex authority site.

## What was found locally

- No existing \`calgaryduplexes.ca\` site was found.
- A Matrix export scaffold exists at \`../calgary-hoods-deepdive-main/data/matrix-exports/matrix-export-manifest.csv\`.
- That manifest includes ${matrixStats.segments.toLocaleString("en-CA")} duplex-related export segments across ${matrixStats.communities} Calgary communities:
  - Semi Detached (Half Duplex): sold, active, pending segments
  - Full Duplex: sold, active, pending segments
- Processed aggregate files currently contain headers only, so this build does not publish private listing, sold, or MLS-derived figures.

## Build commands

\`\`\`bash
npm install
npm run build
npm run check
npm run dev
\`\`\`

## PPC testing

The homepage supports query-param personalization:

- \`?intent=investor\`
- \`?intent=seller\`
- \`?intent=suite\`
- \`?intent=infill\`
- \`?intent=half\`
- \`?intent=full\`

Forms preserve \`utm_source\`, \`utm_medium\`, \`utm_campaign\`, \`utm_term\`, \`utm_content\`, \`gclid\`, \`msclkid\`, and \`fbclid\` into hidden fields.

## Launch checklist

1. Point \`calgaryduplexes.ca\` at the static host.
2. Connect the Netlify form or replace with the preferred CRM endpoint.
3. Add call tracking, consent-aware analytics, Google Ads conversion events, and Microsoft Ads tags.
4. Load Matrix raw exports, run the existing normalizer, and review aggregate-only output before publishing community stats.
5. Replace/extend assets if you want a dedicated CalgaryDuplexes.ca image set.
`);
}

function run() {
  ensureDir("assets");
  ensureDir("downloads");
  copyAsset("calgaryrealestateagent-scrape-20260513-131316/images/wp-content_uploads_2023_10_REP-YYC.png", "assets/repyyc-logo.png");
  copyAsset("calgaryrealestateagent-scrape-20260513-131316/images/wp-content_uploads_2023_10_real-brokerage-repyyc-1-980x561.png", "assets/repyyc-brokerage.png");
  copyAsset("calgary-hoods-deepdive-main/public/images/calgary-community-map.webp", "assets/calgary-map.webp");

  const files = ["index.html"];
  fs.writeFileSync(path.join(root, "index.html"), homePage());
  for (const page of intentPages) {
    const file = `${page.slug}.html`;
    files.push(file);
    fs.writeFileSync(path.join(root, file), articlePage(page));
  }
  const simplePages = [
    {
      file: "privacy-policy.html",
      title: "Privacy Policy",
      h1: "Privacy Policy",
      body: "CalgaryDuplexes.ca collects contact and campaign information submitted through forms so the team can respond to duplex search, valuation, investment, and neighbourhood requests. Do not submit sensitive financial, tenant, or confidential listing documents through public forms."
    },
    {
      file: "disclaimer.html",
      title: "Disclaimer",
      h1: "Real estate and data disclaimer",
      body: "This site provides general Calgary duplex education and lead routing. It is not legal, financing, tax, building-code, appraisal, insurance, or investment advice. Verify current listings, sold data, suite status, zoning, permits, financing, and insurance with qualified professionals."
    },
    {
      file: "thank-you.html",
      title: "Thank You",
      h1: "Your duplex request is in.",
      body: "Thanks. The next step is to match your request to the right Calgary duplex workflow: buyer shortlist, investment analysis, suite review, neighbourhood comparison, or seller valuation."
    }
  ];
  for (const page of simplePages) {
    files.push(page.file);
    fs.writeFileSync(path.join(root, page.file), simplePage(page));
  }
  downloads();
  writeBaseFiles(files);
  console.log(`Generated ${files.length} HTML files for CalgaryDuplexes.ca.`);
}

run();
