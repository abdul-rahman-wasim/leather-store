export type Category = "shoes" | "canine" | "jackets";
export type Currency = "USD" | "GBP";

export const IMG = "https://lh3.googleusercontent.com/aida-public/";

export const LOGO_SRC = "/vale-rawat-logo.svg";

export const BRAND = "Vale & Rawat";

/** Islamabad export office contact points */
export const TRADE_DESK = {
  phone: "+92 (51) 844-7900",
  tel: "tel:+92518447900",
  whatsapp: "https://wa.me/92518447900",
  email: "export@valerawat.com",
  address: "Plot 144, Sector I-9/2, Industrial Estate, Islamabad, 44000, Pakistan",
};

export const LOOKBOOK_MESSAGE = `2026 Contract Lookbook requested — the export desk will email the PDF from ${TRADE_DESK.email}`;

export type ContractArticle = {
  code: string;
  name: string;
  division: string;
  description: string;
  moq: number;
  unit: string;
  image: string;
  imageAlt: string;
  specs: [label: string, value: string][];
  sample: string;
};

/** OEM / private-label contract lines offered to trade buyers */
export const CONTRACT_ARTICLES: ContractArticle[] = [
  {
    code: "VR-101",
    name: "Goodyear Welted Boots & Derbys",
    division: "Footwear Division",
    description:
      "Hand-lasted French calf uppers, 360° Goodyear storm welt, channel-carved oak bark soles, and natural granulated cork footbed filler.",
    moq: 25,
    unit: "Pairs",
    image: `${IMG}AB6AXuDLnRgKa78yn3UhiBN2nC4wNczlcaa0QL-EWObgFm063tfJYalJjOYT_kqVwEu36kIjQBn4ubILeV3JrNSo0QOywvoCCmLEVZ4W1OCczKw15EHit08yZwPcG35VDwA8i7oPu1J29dNbnMNElLHq_Fi4urYT909CRGG5lbSZKi5nkcQYxLkp9ffDFO70C4HRfnXbIYLiaYGORGhaZa3rnRXDo3FMUCvGlxAU6LFsoHw0dzmZe3xIW5sP`,
    imageAlt: "Cognac leather oxford and Chelsea boot with visible Goodyear welt stitching on an oak floor",
    specs: [
      ["Sample Lead Time", "12–14 Business Days"],
      ["Production Lead Time", "35–45 Days (Batch)"],
      ["Private Branding", "Embossed Sockliner & Custom Last"],
    ],
    sample: "Footwear Hides",
  },
  {
    code: "VR-204",
    name: "Canine Ergonomic Y-Harness",
    division: "K-9 & Tack",
    description:
      "Heavyweight Sedgwick-tanned English bridle leather, padded lambskin sternum guard, and solid sand-cast English brass hardware rated to 450 kg pull.",
    moq: 50,
    unit: "Units",
    image: `${IMG}AB6AXuCjp1yyAQjqG3l7TZRzmYwTLZVEg-5SWzq3MAZY2LtilfhkF6_v6NdhreY6OQhUQJmmq2pVn10Rt1foSnqRi5VTTwVUNhUK_YBFj8Oljg__ifOY4o67Z3uZtYO-O3vcuiHlaezYek120YlrgiWduZr8-iaIqNElrWqnQ4NZL0rMrUKadZsTOPXpuV6B38Tv0m86VJcDAm1lwl4SK7zbfzyXJ2GQaLeJcc0r2U7DpN9yFE6DP6U9xxVj`,
    imageAlt: "Sporting dog wearing a saddle cognac bridle leather harness with brass hardware",
    specs: [
      ["Sample Lead Time", "7 Business Days"],
      ["Production Lead Time", "25–30 Days"],
      ["Private Branding", "Brass Buckle Casting & Blind Stamp"],
    ],
    sample: "Bridle Leather & Hardware",
  },
  {
    code: "VR-308",
    name: "Outerwear Aviator & Café Racer",
    division: "Garments",
    description:
      "0.9–1.1mm washed lambskin or calf hides, antiqued Swiss Riri zippers, heavy-gauge waxed nylon stitching, and custom silk/cupro jacquard lining.",
    moq: 15,
    unit: "Pieces",
    image: `${IMG}AB6AXuAC1oPjK--7I65-R9WRfIsDTlBGNE7oE9uiWd2lYE_vpG-0z-kxZraDWjjIQIUV9qbfPAjNARhF86piistia2oJkI4MVqYQD2ZW8qRe4GfghwiZtMGN1-58yq1rNnP054bsHMAXbF-orQJsXXP3T1o6RvpfV00_agHVJIroTJAXxXhVBHrl94CliHJvKwSqvYoTSsdBbv08YFNHVHFd1YwiEK9O1ljyh3FdkwHNqE3hTVZJFVFff2wo`,
    imageAlt: "Umber lambskin aviator jacket with shearling collar on a mahogany valet stand",
    specs: [
      ["Sample Lead Time", "10–12 Business Days"],
      ["Production Lead Time", "30–40 Days"],
      ["Private Branding", "Woven Neck Label, Custom Pullers"],
    ],
    sample: "Lambskin & Lining Swatches",
  },
  {
    code: "VR-412",
    name: "Belts & Horology Watch Straps",
    division: "Small Goods",
    description:
      "Vegetable-tanned full-grain bridle leather, hand-creased French edges, beeswax edge burnishing, and surgical stainless or sand-cast buckles.",
    moq: 100,
    unit: "Pcs",
    image: `${IMG}AB6AXuCPqud05xo_1r-K7k8iioP2elcu4egTfFCy73_Z1Fx1SG5y71sndnhBt1RVDJTbE--ISAoV4mg1D_KmZy95gEBqwgEGsfB3x_OXKmxcMlIfgs4iAxATHrGjghnQhadmJS2GzqNJAV-DjMeKJYEWumuItM9DnkfTCmALmHpTaGYXedSXCjrNVFjVWQB2SKITSlNB2xjc8Q7R8Xgf-I7deH4HV-6iNGeM0uX783pAZfxpdt8HaL91WPLa`,
    imageAlt: "Bridle leather watch straps and dress belts with brass buckles on a jeweler's cloth",
    specs: [
      ["Sample Lead Time", "5 Business Days"],
      ["Production Lead Time", "20–25 Days"],
      ["Private Branding", "Hot Foil / Blind Deboss / Custom Buckle"],
    ],
    sample: "Bridle Leather Straps",
  },
  {
    code: "VR-515",
    name: "Waxed Canvas & Saddle Duffles",
    division: "Luggage",
    description:
      "24oz Scottish dry-finish waxed canvas reinforced with 3.5mm Tuscan vegetable hide, hand-peened solid copper saddlery rivets, and heavy YKK Excella zippers.",
    moq: 30,
    unit: "Pcs",
    image: `${IMG}AB6AXuCcbpIgSNPdJOCvwYZDKEOwc7JK_UJ6TicKbeHMX3mLn2kmCgmIx42qfmTIF5astq48hY1lvHZi1YO8U5KK96zioxDslY7pDUqSPiz1AziJ_jsmR_Ink0GxHT8Q07CztaOYw7yRV2Pbgb1_2Prnpy9wp2XO91xN7qvjHuOJUjFU8wV8CVBZeewLNb54wm6CluZllSJvZ3SnOXqbnlMHtKrczKhZCzJcYX9YuLukgIx1J6OGgG8an9vz`,
    imageAlt: "Vegetable-tanned leather duffle bag with brass buckles against a vintage steamer trunk",
    specs: [
      ["Sample Lead Time", "8 Business Days"],
      ["Production Lead Time", "30–35 Days"],
      ["Private Branding", "Luggage Tag Deboss & Rivet Logo"],
    ],
    sample: "Waxed Canvas & Hides",
  },
  {
    code: "VR-620",
    name: "Sand-Cast Brass Saddlery Hardware",
    division: "Foundry",
    description:
      "Pure molten brass hand-poured in fine sand molds. Zero zinc pot-metal alloys. Available in high-buff foundry polish, antique bronze patina, or matte nickel plate.",
    moq: 200,
    unit: "Pcs",
    image: `${IMG}AB6AXuBqEboT7u1wVD02K1gporw9B1xu4ZhqPweWezoYPvYcScHTGaug0ENznwzbxgCFdnofObPqYeHrzNxOxvyK9MqcgELlPRW5nnUGIw8uL_oMGxMsKqy0JUK-lfsb077gBqta3PhyxrRZsFdQQVPA8cR9V12i_HBG-rl6YAGcC3y-K6BjEU_-AzZmgWqvvBrkmE4u3LuiORiUgDEoEnlE_GLAeAWDvYWgr1-kHUFrH1bI3jLpfV-w3EF5`,
    imageAlt: "Foundry craftsman pouring molten brass into sand casting molds for saddlery buckles",
    specs: [
      ["Sample Mold Tooling", "7 Business Days"],
      ["Production Lead Time", "18–22 Days"],
      ["Private Tooling", "Custom CNC 3D Logo Engraving"],
    ],
    sample: "Solid Brass Castings",
  },
];

export const HARNESS_SLUG = "highlands-ergonomic-harness";

export function formatPrice(usd: number, gbp: number, currency: Currency) {
  const value = currency === "USD" ? usd : gbp;
  const symbol = currency === "USD" ? "$" : "£";
  return `${symbol}${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export type Product = {
  id: string;
  category: Category;
  collection: string;
  tag: string;
  name: string;
  description: string;
  priceUsd: number;
  priceGbp: number;
  image: string;
  imageAlt: string;
  material: string;
  swatches: string[];
  stock: string;
  commission?: boolean;
  href?: string;
  addedOrder: number;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  shoes: "Footwear",
  canine: "Canine Field",
  jackets: "Outerwear",
};

export const PRODUCTS: Product[] = [
  {
    id: "kensington-derby",
    category: "shoes",
    collection: "Footwear",
    tag: "Goodyear Welted",
    name: "The Kensington Derby",
    description: "Tuscan calfskin conditioned with chestnut oil and oil-treated water-resistant sole.",
    priceUsd: 420,
    priceGbp: 340,
    image: `${IMG}AB6AXuCscKxzmbI4ZrvTcGQwybFBj9HjUzMQsoaUbOhqczD9OPHlXfQjgVf_3fypP7iJ8ag0_7vFLwa7I6XsbM1pAMBlKY-TLHVJ8jXs2gLOOpbzzfYsJ7mPNBXFIFM9IZIzXk2k6JHEwH93dTMCSj0mHG8JtIhiEkK9CJu4f5i7F4JXVTUmqNBTLP8se4imweROR_zwqoAneKpamf0hUJfwbf0W13tT1_EkLs9pqVK_LElRTjWG3TKAHHIu`,
    imageAlt: "Hand-welted Kensington Derby shoes in chestnut cognac Tuscan calfskin on a limestone pedestal",
    stock: "In Stock • London",
    material: "Tuscan Calfskin",
    swatches: ["#8E431E", "#3B251E", "#1C1A19"],
    addedOrder: 3,
  },
  {
    id: "highlands-harness",
    category: "canine",
    collection: "Canine Field",
    tag: "Bridle Hide",
    name: "The Highlands Harness",
    description: "English bridle hide anatomically shaped to avoid chest pressure with solid sand-cast brass.",
    priceUsd: 165,
    priceGbp: 135,
    image: `${IMG}AB6AXuCXkYiPtyRSZSXVNGOE7xwNvPmonfTi5ISINM9Cz9vUa0XCezmv1inMS9z-R26IyeizG7pm_q1iMky9Q9mmdgm1RObYlxI6enjoyH5RUBw-GT83xpowU_gpLgcW7jXwux1BcTQFa7OTg-GMA6j_QNm5MMwnYR_gNDcsM8iGGCXilIZyjZh2BwION7_DXtXsX6ak7VrcfDBeB6wax6xEZfawDgqo9iC4iEswiaWIChjnvcU0meOhZDWW`,
    imageAlt: "Highlands Ergonomic Canine Harness in chestnut bridle leather with antique brass hardware on Scottish tweed",
    stock: "Bespoke Debossing",
    material: "Tuscan Saddle Hide",
    swatches: ["#8E431E", "#3B251E", "#5E583A"],
    href: `/products/${HARNESS_SLUG}`,
    addedOrder: 8,
  },
  {
    id: "atelier-aviator",
    category: "jackets",
    collection: "Outerwear",
    tag: "Shearling Collar",
    name: "The Aviator Jacket",
    description: "Lambskin shearling collar, heavy antique brass zips, lined in Scottish brushed tartan flannel.",
    priceUsd: 980,
    priceGbp: 795,
    image: `${IMG}AB6AXuDw9B1DYr1zv0O3qlgoImwCyHAL8JHpAcaFcO17foVcxznMWSP9tCexImRW0pggNbXU_FseJBmerclqMGXVGsBEsKFNZW3VdjRvvFWVuphgqJmhO3YMbWIllcVa3zeQI6ongVeJCmHJtRzOozp1TVB-G9XrX6Jx3oWLPBoZ3aSxSCNgHl-OPF-0ObzijPLTW-tUWU6tuB7MP8r0UApr42dLoB_uVDF68v-XmKtW3E_whoFVBDX_0K4A`,
    imageAlt: "Atelier Aviator jacket in espresso cowhide with cream shearling collar and antique brass hardware",
    stock: "Made to Order • 14 Days",
    material: "Espresso Cowhide",
    swatches: ["#3B251E", "#1C1A19"],
    commission: true,
    addedOrder: 6,
  },
  {
    id: "mayfair-loafer",
    category: "shoes",
    collection: "Footwear",
    tag: "French Calfskin",
    name: "The Mayfair Penny Loafer",
    description: "Burnished espresso French calf with channel soles and brass heel nails for lasting wear.",
    priceUsd: 395,
    priceGbp: 320,
    image: `${IMG}AB6AXuBVhl-nl_5c3tFT9AF6WzIOVhEBgNFvOdbjxSJMltR9iTOu6vP8vtg9vmjH7hAnWatDkIvb1oCnfxhATNMKr884OQmMlf-GZ6f2UG9U2wXr_4oltDr8RbjMJcCoF5sTOg97yrFTRMMPdlNzES02umXOYBci2wsbFdr7wCvjduVR7puCePlokDoHcHhfEL_BigOttGe5-QT6OG4vccbp_WtyFYKqUP_XOMQKyk9CJAlbNpyQChHPITzF`,
    imageAlt: "Mayfair Penny Loafers in burnished espresso leather on an oak parquet floor",
    stock: "In Stock",
    material: "French Calfskin",
    swatches: ["#3B251E", "#8E431E"],
    addedOrder: 2,
  },
  {
    id: "edinburgh-field-set",
    category: "canine",
    collection: "Canine Field",
    tag: "Includes Lead",
    name: "Edinburgh Field Set",
    description: "Waxed saddle harness paired with matching 6ft lead and debossed brass hardware.",
    priceUsd: 195,
    priceGbp: 160,
    image: `${IMG}AB6AXuDOAeIAzbBXmp5WmhhvdfzrdEOPYjVdgmaHicQqlRik7lPiKO1nuiz0gY9RVv2Fr4q7crgI8CKCpB41AtqzHGhFRu9nAvhdzmeXTrlDcJ7vRql3i0lY9uT15EQo4RXu8lwSKjhxkrq6yGXOTEKf9u_8kZ-4El0FKJZdrkPez_gm4NPLAJQXzYeCHqMsfurmfkmC4lT9i3-gmUrt09ZEt3_r27JZXzYN36J1Yoa00GCNPxpjuEYY_uZq`,
    imageAlt: "Edinburgh Field harness and matching six-foot lead in chestnut cognac leather on a dark wood table",
    stock: "Complete Set",
    material: "Waxed Bridle Leather",
    swatches: ["#8E431E", "#5E583A"],
    addedOrder: 7,
  },
  {
    id: "heritage-moto",
    category: "jackets",
    collection: "Outerwear",
    tag: "1.4mm Cowhide",
    name: "The Heritage Moto Jacket",
    description: "Diamond quilted articulated shoulders, reinforced kidney panel, and zippered gussets.",
    priceUsd: 890,
    priceGbp: 720,
    image: `${IMG}AB6AXuCW0wBuAM5e4hXtcjeg52khrw9L1Cv_0H0lMPv0X_KIXwJ5CkF_XdRLd4UrKSfrKSjXxLb3jtHIEhG6E8yrY_p90RZOaDw1NWpYo0qKDOir9oAOIAvR7-rgv1koNkSnQbqrY8jPI_8mNn6prbRGXPvL8MQIiW0AbWXdrzX-_C4iyOl8_w-QYaO1YJC7Nr1d8-DVKXXMOtBRBjRNDmMUlL6omV6vrk4FjuzIesItUefzoM7Eydfzlsc1`,
    imageAlt: "Heritage Moto jacket in oiled midnight black cowhide with quilted shoulders and brass asymmetric zip",
    stock: "Limited Batch",
    material: "Oiled Cowhide",
    swatches: ["#1C1A19", "#3B251E"],
    commission: true,
    addedOrder: 5,
  },
  {
    id: "balmoral-oxford",
    category: "shoes",
    collection: "Footwear",
    tag: "Museum Calf",
    name: "The Balmoral Oxford",
    description: "Marbled museum calfskin with closed lacing and beveled fiddleback waist sole.",
    priceUsd: 450,
    priceGbp: 365,
    image: `${IMG}AB6AXuCymMsIn49G2EgV9k-NBxgA6AOm_VG7D4SyQ_Cfja097csR5z3cnXhUp9Z6n82-62x3jDDZLWbRlcSQl01FQpGASohCvVTZKinuWxF7izktPYJYUYFPHQpbYxMjUX_H7n1EIpoR5oEmQxu0YUzz4Uleh63yBW9-FA61DnrFpE8zWBzhIUvPdCMDOJzw0qjYtSufO5uKmCjFx9jlNYDuX2wE61SyXE2Kyx9T0zgD80GGesIEay-lRTlA`,
    imageAlt: "Balmoral Oxford shoe in hand-buffed museum calf with brogue perforations in a classic study",
    stock: "In Stock",
    material: "Museum Calf",
    swatches: ["#8E431E", "#1C1A19"],
    addedOrder: 4,
  },
  {
    id: "city-minimalist",
    category: "canine",
    collection: "Canine Field",
    tag: "Lightweight",
    name: "The City Minimalist Harness",
    description: "Clean streamlined cut with soft leather lining and quick-release hardware.",
    priceUsd: 140,
    priceGbp: 110,
    image: `${IMG}AB6AXuA86ul4TctVM8KJEI6POmcqXr-M1Almb26foSJMFn3wychq6ZpL1qrNuEmKWYNmoMQX2A2feChcf6grQixW9LzhAOaWBXNuNmtROTWN_s2q9mo0c0tGG3KMmN7_IzyIV5MoxRbZP7OAEkYAp_PqOvCnayKeXhqvvAJDIoQHsC64ZTWPQehdhbIihJwPmj_au0B56VsQ3zXVUxxoge8s18ORZbo5qUreD8AJVcXx-Uv35ksBQ-Em8evv`,
    imageAlt: "City Minimalist dog harness in olive tan leather with polished nickel hardware on natural linen",
    stock: "Ready for Dispatch",
    material: "Olive Tan Leather",
    swatches: ["#5E583A", "#1C1A19"],
    addedOrder: 1,
  },
];

export type Teaser = {
  id: string;
  stage: string;
  collection: string;
  tag: string;
  name: string;
  description: string;
  estUsd: number;
  estGbp: number;
  status: string;
  image: string;
  imageAlt: string;
};

export const TEASERS: Teaser[] = [
  {
    id: "glen-coe-duffle",
    stage: "Autumn Batch • 30 Units",
    collection: "Travel & Field",
    tag: "2.2mm Pull-Up",
    name: "The Glen Coe Duffle",
    description: "Waxed Scottish cotton lining with solid brass padlock and monogram tag.",
    estUsd: 720,
    estGbp: 580,
    status: "Bench Finalization",
    image: `${IMG}AB6AXuDIxBtvH9EkGPSR0WEtduKz9lXjzjibZm7u19F7byIZGw3p8JtcQalybfTw895e8gy9y6ESAJR6nu1ZULhBMIVlChDy6kJHg3SGidN8rfAqND0Agp8PA_NbG0Pk7tf3JFKYb6psjt2u_kaNjQiP36AbPZqZcEWRVQ78PNZAKdq2GDMvBlcrLEx2XjGxjL7xlQyCpgQCatcUTmJnU0uL_B3Ch2dqrfhmLYGwpWFQFANeVRpweoXcFDWt`,
    imageAlt: "Glen Coe Weekender Duffle in heavy leather with cast brass hardware",
  },
  {
    id: "bridle-belts",
    stage: "Burnishing Phase",
    collection: "Accessories",
    tag: "English Oak Bark",
    name: "Oak-Bark Bridle Belts",
    description: "Hand-beveled edges burnished with organic beeswax and sand-cast brass hardware.",
    estUsd: 180,
    estGbp: 145,
    status: "50 Available",
    image: `${IMG}AB6AXuDp4tCO_dd74PzibM3KKCZ0DV9k2NZRJ4DKoZUZbh6AF-OcPiWevFsdACAQ-6thdnd9sv_sbuOl_Dbj8X6u2TOtTJwSAFKGOGBhOtbw5hS1QxohnMML0ja0EglrcC3xDs9IFc19fskJnBytelB5VvNv4Bc8kMd6undec4IVNTXBLDiFBQwImI1O2ANNzOA_kl-HAE9a8ZZnc6c1xo-YN3jGPiY7z-TSvPLtb0nWXe1zsSi7G96faqPs`,
    imageAlt: "Rolled leather belts with sand-cast brass buckles on an antique workbench",
  },
  {
    id: "valet-folio",
    stage: "Pattern Stage",
    collection: "Everyday Goods",
    tag: "Alcantara Lining",
    name: "The Valet & Tech Folio",
    description: 'Holds up to 14" tablets, fountain pens, and passports with microfiber protection.',
    estUsd: 260,
    estGbp: 210,
    status: "40 Available",
    image: `${IMG}AB6AXuCNQYq7IFe41Oj_nNRmUyjqMF9aTqV6bGL9lleBj6PH5N_vwMDWyQxHAvZHXTi0MdR-2U502QLVkJd1fe3x7ElnFOxwppmp-XJlxuipgb5isHZd7VfJ0ZZhNBrsuViLWlINAIWYAVWSIHYQaSAOHQm2EyTwzWcekZcQ_pfK4d0UWum7qj1yHQ3YuZKlpT6k_YzpBTKF4Cw-IXixYx_1sdlf1PFrQ4jOiWuANZRYS4Aq6E21pnVK1Btk`,
    imageAlt: "Zip-around leather tech folio and matching valet tray on an oak desk",
  },
];

export type CartDetail = { label: string; value: string; highlight?: string };

export type CartItemInput = {
  productId: string;
  name: string;
  collection: string;
  image: string;
  imageAlt: string;
  priceUsd: number;
  priceGbp: number;
  material: string;
  details: CartDetail[];
  blurb?: string;
  editLabel?: { label: string; icon: string };
};

export type CartItem = CartItemInput & { key: string; qty: number };

export const BALM: CartItemInput = {
  productId: "highlands-balm",
  name: "Highlands Leather Protection Balm & Beeswax Bar",
  collection: "Edinburgh Apothecary Pairing",
  image: `${IMG}AB6AXuBpnQumKhAhjRGUeO2wuqdFv1G3jXJnTjSmNnxieJJgWhHkd4A5tGmhJJ9oIulevA5mgCN52Lcj0s8pVfxs33ZhnTYCJSiwqRn1lX0YZDM4N4JK7X-a3DAJqF2RBLsx0YXMWmP9PSaaEwdxADhRCJFGQR_zLii802yqwTSMLYmnV-w9R2jMxqlmS-xDA0p26-MZHtPZG5H6_9T1HICOipsisJa4HLJn7l_yDiBcygvtwwCoCAglZbfn`,
  imageAlt: "Glass jar of organic Scottish beeswax and lanolin leather protection balm with a wooden spatula",
  priceUsd: 24,
  priceGbp: 20,
  material: "Conditioning Balm",
  details: [],
  blurb: "Organic Scottish beeswax, cold-pressed neatsfoot oil, and highland pine resin. 120ml poured stoneware vessel.",
};

export const RECOMMENDED: CartItemInput[] = [
  {
    productId: "brass-shoehorn",
    name: "Solid Cast Brass Shoehorn",
    collection: "Atelier Accessories",
    image: `${IMG}AB6AXuDqEDjyALtar-TeTGH5Sf1tC-x2GRxxDq-a-BuOykBJVv7a4t8tlj6xC4ZyZL2aafPU-9yk9VNQaO3JruUslZz9VnchfHXryJnwVpxxxM002lAMUHmYAFu49trFL5m53fiBiKyiYebXpSejRwUVFfC7cz7hZZGHAFhqs4kprVHa6JUnkouxR8HbqCHL_JtxpvwTxMtc8XNlhHV-JhkpiFKFdVV3ouMoiHUaeoukQycWIj7s6JSksRkU`,
    imageAlt: "Solid hand-cast heavy brass shoehorn engraved with London and Edinburgh hallmarks",
    priceUsd: 38,
    priceGbp: 30,
    material: "Sand-Cast Brass",
    details: [{ label: "Lanyard", value: "Saddle Leather" }],
  },
  {
    productId: "highland-lead",
    name: "Highland 6ft Walking Lead",
    collection: "The Canine Collection",
    image: `${IMG}AB6AXuAxk5A36q2fRdvzT5L-HTMjn2oYQvsa31vqc2PSK75TM_ZiW2KzBXp1YvtZAWL7axXC2U5wowSjgll4QL9UYWOSSHe4NsBUZka8fVHW3b_v23YZjotRJcyOEw9iEelwqmjUwi4_y7XSKhWVS4NQqBRWQ6Wxz6hWD8mYzJgr7MrK24fBryvwroogaSHsWqfbxJHmuakJh7RVYl_E5EkikGDTaVeKUZ_uhY4nTJVYXYjUnwML4BukfnGH`,
    imageAlt: "Braided bridle leather six-foot dog walking lead with heavy brass trigger clasp coiled on stone",
    priceUsd: 78,
    priceGbp: 62,
    material: "Bridle Leather",
    details: [
      { label: "Color", value: "Cognac Tan" },
      { label: "Length", value: "6ft" },
    ],
  },
];

export const SEED_CART: CartItem[] = [
  {
    key: "seed-harness",
    qty: 1,
    productId: "highlands-harness",
    name: "The Highlands Ergonomic Canine Leather Harness",
    collection: "The Canine Collection",
    image: `${IMG}AB6AXuBdXU0oslp1QbLd8nZI5LA_8qJwPkdLk0UM4nHllE873Ej7DSn6UiFzq29xQYNX8060YLhhwkcavT5CrKX2tr5GdB0EUAJX2OS7s6RDLN_KH_JIBntqS4-soZZcU8bHAycE8YIpNnQqnl4nmQ9feLwO_uLqWwccB8zr2AL4LHhf7B24LbynPn8PRb792dphvSs7-JSsD6wodoOgOaQDqAqlZB05WHHzI9t0QtMxiIKU3huUEDvCuJDI`,
    imageAlt: "Cognac tan hand-stitched bridle leather dog harness with brass hardware on a travertine workbench",
    priceUsd: 165,
    priceGbp: 135,
    material: "Tuscan Saddle Hide",
    details: [
      { label: "Harness Shade", value: "Cognac Tan" },
      { label: "Dimension", value: "Medium (20-28 in)" },
      { label: "Hardware", value: "Brushed Solid Brass" },
      { label: "Blind Deboss", value: "", highlight: "BARNABY" },
    ],
    editLabel: { label: "Edit Monogram", icon: "edit" },
  },
  {
    key: "seed-derby",
    qty: 1,
    productId: "kensington-derby",
    name: "The Kensington Derby Shoe",
    collection: "Mayfair Footwear Edition",
    image: `${IMG}AB6AXuBrkPgu9lwwZsv5ia8QOYth2exUpj8CKX3wqN7tpglE48PZopRAJTym_T2rQFLbLFIAphbMuH3JkYeV_5Z694qDjuGKsbYMX6xEIIscX0JgpHJt-JUdDgDzr5O1T54uMYj6TlJLxjGwY69VY_bkqXrOUUO7sYH6HmWMXpT4J_Ai8BeSLelTehGZi14M2hN2EI9i5gQTgF-hs4vItbwTo4S5v6_klniRcRJwxU4FiX4mgW81s1pe-kch`,
    imageAlt: "Hand-burnished deep chestnut derby shoes in vegetable tanned calfskin on an alabaster and oak plinth",
    priceUsd: 420,
    priceGbp: 340,
    material: "Tuscan Calfskin",
    details: [
      { label: "Hide Burnish", value: "Chestnut Calfskin" },
      { label: "Bespoke Size", value: "43 EU / 10 US" },
      { label: "Welting", value: "Hand-Channeled Goodyear" },
      { label: "Shoe Trees", value: "Solid Aromatic Cedar" },
    ],
  },
  { ...BALM, key: "seed-balm", qty: 1 },
];
