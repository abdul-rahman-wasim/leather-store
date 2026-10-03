export type Category = "shoes" | "canine" | "jackets";
export type Currency = "USD" | "GBP";

export const IMG = "https://lh3.googleusercontent.com/aida-public/";

export const LOGO_SRC = `${IMG}AB6AXuB_qNej77SyKxQkRyf_Ktk8M3bYzpAO_X23AYZyPoDPP2A2Y7HPskLHfvqVaipp4vTUeIGJ3oXAU8spBuq7DPwmmmH529DeiT-NVaS27FweZuY2Us6z7We1znBXgCU1JwogF5XbEl5XnRHwMjRNVdyjoXWWUGhBRyY2ZFoRDJgyz9zf-s-yY6Xs4zRc8b4wPsQQoQgi1ms4AYSwDu9FdLQDqRXPhuFZCEG7QCK2WkGsYA2BjCQA4QVL`;
export const AVATAR_SRC = `${IMG}AB6AXuDTwFZ3pO1wL2ukWAxIYLyVjlCSyvfoD5y2oJ7Hh51eDQr_SM98WM_ucs47i4CZEWhoIn0snAWBVOcgofT-Z-SOEOT-SEBGKigPZYJAkug2qrLsAdKAw7_NxyskOvbyq8d7Rze2soo1nfnVRPph2g3OIcg3_GSWd5ZPLw9kVB81BlQMpSR22iw46X-Ydqzkfb4F8TVlUwrcW1_K7Z7gE_KAkls6cG8jvK0GidcZVCvpwJ4tXz2-V_j5`;

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
  badge?: { label: string; className: string };
  stock?: { label: string; icon?: string };
  commission?: boolean;
  href?: string;
  addedOrder: number;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  shoes: "Leather Footwear",
  canine: "Canine Harnesses",
  jackets: "Jackets & Outerwear",
};

export const PRODUCTS: Product[] = [
  {
    id: "kensington-derby",
    category: "shoes",
    collection: "Footwear Atelier",
    tag: "Goodyear Welted",
    name: "The Kensington Derby Shoe",
    description:
      "Tuscan calfskin conditioned with chestnut oil, stacked hide heel, and oil-treated water-resistant leather sole.",
    priceUsd: 420,
    priceGbp: 340,
    image: `${IMG}AB6AXuCscKxzmbI4ZrvTcGQwybFBj9HjUzMQsoaUbOhqczD9OPHlXfQjgVf_3fypP7iJ8ag0_7vFLwa7I6XsbM1pAMBlKY-TLHVJ8jXs2gLOOpbzzfYsJ7mPNBXFIFM9IZIzXk2k6JHEwH93dTMCSj0mHG8JtIhiEkK9CJu4f5i7F4JXVTUmqNBTLP8se4imweROR_zwqoAneKpamf0hUJfwbf0W13tT1_EkLs9pqVK_LElRTjWG3TKAHHIu`,
    imageAlt: "Hand-welted Kensington Derby shoes in chestnut cognac Tuscan calfskin on a limestone pedestal",
    material: "Tuscan Calfskin",
    swatches: ["#8E431E", "#3B251E", "#1C1A19"],
    stock: { label: "In Stock • UK & US" },
    addedOrder: 3,
  },
  {
    id: "highlands-harness",
    category: "canine",
    collection: "Canine Collection",
    tag: "Padded Chest",
    name: "The Highlands Ergonomic Harness",
    description:
      "English bridle hide anatomically shaped to avoid shoulder pressure. Solid sand-cast antique brass D-ring.",
    priceUsd: 165,
    priceGbp: 135,
    image: `${IMG}AB6AXuCXkYiPtyRSZSXVNGOE7xwNvPmonfTi5ISINM9Cz9vUa0XCezmv1inMS9z-R26IyeizG7pm_q1iMky9Q9mmdgm1RObYlxI6enjoyH5RUBw-GT83xpowU_gpLgcW7jXwux1BcTQFa7OTg-GMA6j_QNm5MMwnYR_gNDcsM8iGGCXilIZyjZh2BwION7_DXtXsX6ak7VrcfDBeB6wax6xEZfawDgqo9iC4iEswiaWIChjnvcU0meOhZDWW`,
    imageAlt: "Highlands Ergonomic Canine Harness in chestnut bridle leather with antique brass hardware on Scottish tweed",
    material: "Tuscan Saddle Hide",
    swatches: ["#8E431E", "#3B251E", "#5E583A"],
    badge: { label: "Atelier Best Seller", className: "bg-primary text-on-primary" },
    stock: { label: "Custom Deboss Available" },
    href: `/products/${HARNESS_SLUG}`,
    addedOrder: 8,
  },
  {
    id: "atelier-aviator",
    category: "jackets",
    collection: "Bespoke Tailoring",
    tag: "Mayfair Cut",
    name: "The Atelier Aviator Leather Jacket",
    description:
      "Supple lambskin shearling collar, heavy-gauge two-way zippers, lined in Scottish brushed tartan flannel.",
    priceUsd: 980,
    priceGbp: 795,
    image: `${IMG}AB6AXuDw9B1DYr1zv0O3qlgoImwCyHAL8JHpAcaFcO17foVcxznMWSP9tCexImRW0pggNbXU_FseJBmerclqMGXVGsBEsKFNZW3VdjRvvFWVuphgqJmhO3YMbWIllcVa3zeQI6ongVeJCmHJtRzOozp1TVB-G9XrX6Jx3oWLPBoZ3aSxSCNgHl-OPF-0ObzijPLTW-tUWU6tuB7MP8r0UApr42dLoB_uVDF68v-XmKtW3E_whoFVBDX_0K4A`,
    imageAlt: "Atelier Aviator jacket in espresso cowhide with cream shearling collar and antique brass hardware",
    material: "Espresso Cowhide",
    swatches: ["#3B251E", "#1C1A19"],
    badge: { label: "Made To Order • 14 Days", className: "bg-tertiary text-on-tertiary" },
    commission: true,
    addedOrder: 6,
  },
  {
    id: "mayfair-loafer",
    category: "shoes",
    collection: "Footwear Atelier",
    tag: "Hand-Burnished",
    name: "The Mayfair Penny Loafer",
    description:
      "Burnished espresso French calfskin with leather channel soles and brass heel nails for enduring resilience.",
    priceUsd: 395,
    priceGbp: 320,
    image: `${IMG}AB6AXuBVhl-nl_5c3tFT9AF6WzIOVhEBgNFvOdbjxSJMltR9iTOu6vP8vtg9vmjH7hAnWatDkIvb1oCnfxhATNMKr884OQmMlf-GZ6f2UG9U2wXr_4oltDr8RbjMJcCoF5sTOg97yrFTRMMPdlNzES02umXOYBci2wsbFdr7wCvjduVR7puCePlokDoHcHhfEL_BigOttGe5-QT6OG4vccbp_WtyFYKqUP_XOMQKyk9CJAlbNpyQChHPITzF`,
    imageAlt: "Mayfair Penny Loafers in burnished espresso leather on an oak parquet floor",
    material: "French Calfskin",
    swatches: ["#3B251E", "#8E431E"],
    stock: { label: "Ready For Dispatch" },
    addedOrder: 2,
  },
  {
    id: "edinburgh-field-set",
    category: "canine",
    collection: "Canine Collection",
    tag: "Includes Lead",
    name: "Edinburgh Field Harness & Leash",
    description:
      "Heavy gauge waxed harness matched with a 6ft tracking lead. Personalized with complimentary hot-foil brass debossing.",
    priceUsd: 195,
    priceGbp: 160,
    image: `${IMG}AB6AXuDOAeIAzbBXmp5WmhhvdfzrdEOPYjVdgmaHicQqlRik7lPiKO1nuiz0gY9RVv2Fr4q7crgI8CKCpB41AtqzHGhFRu9nAvhdzmeXTrlDcJ7vRql3i0lY9uT15EQo4RXu8lwSKjhxkrq6yGXOTEKf9u_8kZ-4El0FKJZdrkPez_gm4NPLAJQXzYeCHqMsfurmfkmC4lT9i3-gmUrt09ZEt3_r27JZXzYN36J1Yoa00GCNPxpjuEYY_uZq`,
    imageAlt: "Edinburgh Field harness and matching six-foot lead in chestnut cognac leather on a dark wood table",
    material: "Waxed Bridle Leather",
    swatches: ["#8E431E", "#5E583A"],
    stock: { label: "Full Ensemble", icon: "workspace_premium" },
    addedOrder: 7,
  },
  {
    id: "heritage-moto",
    category: "jackets",
    collection: "Bespoke Tailoring",
    tag: "1.4mm Cowhide",
    name: "The Heritage Moto Leather Jacket",
    description: "Diamond quilted articulated shoulders, reinforced kidney panel, and zippered gusset sleeves.",
    priceUsd: 890,
    priceGbp: 720,
    image: `${IMG}AB6AXuCW0wBuAM5e4hXtcjeg52khrw9L1Cv_0H0lMPv0X_KIXwJ5CkF_XdRLd4UrKSfrKSjXxLb3jtHIEhG6E8yrY_p90RZOaDw1NWpYo0qKDOir9oAOIAvR7-rgv1koNkSnQbqrY8jPI_8mNn6prbRGXPvL8MQIiW0AbWXdrzX-_C4iyOl8_w-QYaO1YJC7Nr1d8-DVKXXMOtBRBjRNDmMUlL6omV6vrk4FjuzIesItUefzoM7Eydfzlsc1`,
    imageAlt: "Heritage Moto jacket in oiled midnight black cowhide with quilted shoulders and brass asymmetric zip",
    material: "Oiled Cowhide",
    swatches: ["#1C1A19", "#3B251E"],
    badge: { label: "Limited Batch • 8 Left", className: "bg-secondary text-on-secondary" },
    commission: true,
    addedOrder: 5,
  },
  {
    id: "balmoral-oxford",
    category: "shoes",
    collection: "Footwear Atelier",
    tag: "Museum Calf",
    name: "The Balmoral Oxford Shoe",
    description:
      "Closed-lacing silhouette crafted from marbled museum calf leather with beveled fiddleback waist sole.",
    priceUsd: 450,
    priceGbp: 365,
    image: `${IMG}AB6AXuCymMsIn49G2EgV9k-NBxgA6AOm_VG7D4SyQ_Cfja097csR5z3cnXhUp9Z6n82-62x3jDDZLWbRlcSQl01FQpGASohCvVTZKinuWxF7izktPYJYUYFPHQpbYxMjUX_H7n1EIpoR5oEmQxu0YUzz4Uleh63yBW9-FA61DnrFpE8zWBzhIUvPdCMDOJzw0qjYtSufO5uKmCjFx9jlNYDuX2wE61SyXE2Kyx9T0zgD80GGesIEay-lRTlA`,
    imageAlt: "Balmoral Oxford shoe in hand-buffed museum calf with brogue perforations in a classic study",
    material: "Museum Calf",
    swatches: ["#8E431E", "#1C1A19"],
    stock: { label: "Ready For Dispatch" },
    addedOrder: 4,
  },
  {
    id: "city-minimalist",
    category: "canine",
    collection: "Canine Collection",
    tag: "Featherweight",
    name: "The City Minimalist Harness",
    description:
      "Streamlined silhouette for urban promenades with neoprene-backed leather padding and quick-release hardware.",
    priceUsd: 140,
    priceGbp: 110,
    image: `${IMG}AB6AXuA86ul4TctVM8KJEI6POmcqXr-M1Almb26foSJMFn3wychq6ZpL1qrNuEmKWYNmoMQX2A2feChcf6grQixW9LzhAOaWBXNuNmtROTWN_s2q9mo0c0tGG3KMmN7_IzyIV5MoxRbZP7OAEkYAp_PqOvCnayKeXhqvvAJDIoQHsC64ZTWPQehdhbIihJwPmj_au0B56VsQ3zXVUxxoge8s18ORZbo5qUreD8AJVcXx-Uv35ksBQ-Em8evv`,
    imageAlt: "City Minimalist dog harness in olive tan leather with polished nickel hardware on natural linen",
    material: "Olive Tan Leather",
    swatches: ["#5E583A", "#1C1A19"],
    stock: { label: "In Stock" },
    addedOrder: 1,
  },
];

export type Teaser = {
  id: string;
  stage: string;
  overlayTitle: string;
  collection: string;
  tag: string;
  name: string;
  description: string;
  batch: string;
  estimate: string;
  image: string;
  imageAlt: string;
};

export const TEASERS: Teaser[] = [
  {
    id: "glen-coe-duffle",
    stage: "Autumn Release",
    overlayTitle: "The Glen Coe Weekender Duffle",
    collection: "Travel & Field",
    tag: "Wear-Testing Stage",
    name: "The Glen Coe Duffle",
    description:
      "Built from thick 2.2mm pull-up leather, lined with waxed cotton canvas. Includes brass padlock and monogram tag.",
    batch: "Target Batch: 30 Units",
    estimate: "Est. $720 / £580",
    image: `${IMG}AB6AXuDIxBtvH9EkGPSR0WEtduKz9lXjzjibZm7u19F7byIZGw3p8JtcQalybfTw895e8gy9y6ESAJR6nu1ZULhBMIVlChDy6kJHg3SGidN8rfAqND0Agp8PA_NbG0Pk7tf3JFKYb6psjt2u_kaNjQiP36AbPZqZcEWRVQ78PNZAKdq2GDMvBlcrLEx2XjGxjL7xlQyCpgQCatcUTmJnU0uL_B3Ch2dqrfhmLYGwpWFQFANeVRpweoXcFDWt`,
    imageAlt: "Glen Coe Weekender Duffle in heavy leather with cast brass hardware",
  },
  {
    id: "bridle-belts",
    stage: "Finishing Phase",
    overlayTitle: "Hand-Burnished Bridle Belts",
    collection: "Atelier Accessories",
    tag: "Burnishing Bench",
    name: "Hand-Burnished Bridle Belts",
    description:
      "Cut from heavy English oak-bark tanned bridle butts, hand-beveled and burnished with natural organic beeswax.",
    batch: "Target Batch: 50 Units",
    estimate: "Est. $180 / £145",
    image: `${IMG}AB6AXuDp4tCO_dd74PzibM3KKCZ0DV9k2NZRJ4DKoZUZbh6AF-OcPiWevFsdACAQ-6thdnd9sv_sbuOl_Dbj8X6u2TOtTJwSAFKGOGBhOtbw5hS1QxohnMML0ja0EglrcC3xDs9IFc19fskJnBytelB5VvNv4Bc8kMd6undec4IVNTXBLDiFBQwImI1O2ANNzOA_kl-HAE9a8ZZnc6c1xo-YN3jGPiY7z-TSvPLtb0nWXe1zsSi7G96faqPs`,
    imageAlt: "Rolled leather belts with sand-cast brass buckles on an antique workbench",
  },
  {
    id: "valet-folio",
    stage: "Prototyping",
    overlayTitle: "The Artisan Valet & Tech Folio",
    collection: "Office & Everyday",
    tag: "Pattern Finalization",
    name: "The Artisan Valet & Tech Folio",
    description:
      'Engineered to house 14" tablets, fountain pens, and passports with alcantara microfiber protective lining.',
    batch: "Target Batch: 40 Units",
    estimate: "Est. $260 / £210",
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
  badge?: { label: string; tone: "primary" | "tertiary" };
  details: CartDetail[];
  editLabel?: { label: string; icon: string };
  addOn?: { title: string; blurb: string };
};

export type CartItem = CartItemInput & { key: string; qty: number };

export const BALM: CartItemInput = {
  productId: "highlands-balm",
  name: "Highlands Leather Protection Balm & Beeswax Bar",
  collection: "Atelier Add-On",
  image: `${IMG}AB6AXuA7ZymDtFca5ePXiJ3HDzNNPY65GVT_9jZr8QtcrmTvlIU84i5SoJgzkKmccWX-Jio2BSvRZolH8I7aJ7miBYXIFOToTyG0ke1TM8OHBM5RD4XFAz1jBvmJU26EjbFtApakkP9zvT_yQQisP5ggCEDnk__pMDpSkvLhjZcy6BPgsQ-rtvGU2mFxDDei_PBHenv4Gu-JRXWBnWN_aBXJW7lVYiYYeiJVLWzZ3eXLRSPRX-obFwsJqF1I`,
  imageAlt: "Tin of organic leather balm and beeswax conditioning bar on linen with Scottish heather",
  priceUsd: 24,
  priceGbp: 20,
  material: "Conditioning Balm",
  details: [],
  addOn: {
    title: "Complementary Pairing",
    blurb: "Formulated with natural lanolin and cold-pressed jojoba for Scottish wet climates.",
  },
};

export const RECOMMENDED: (CartItemInput & { caption: string })[] = [
  {
    productId: "brass-shoehorn",
    name: "Solid Cast Brass Shoehorn",
    caption: "With saddle lanyard",
    collection: "Atelier Accessories",
    image: `${IMG}AB6AXuDH9_Gv3_qzICQrBopZSFz6OZDfzRg026QMN42qRcPwjSx_c0_W0JwCgJt-7s6rNd0haLATvSBCLQdE4imSxtpfG2IovXZX0hqxtS55s-Rw1cGww6Mj_qdLrvcE4-bsQGcD0LEaL7CeQA8MXwGnJi6gJSK5vpzwyMqELdHO3FP5P0ystazI1WQb0pHPoBOmxUKHCL16RNFSjRbRXyvb6zkiNi9XBKp3tVkdiYiu2CcAAPm2xj5Pwim8`,
    imageAlt: "Brass shoehorn with debossed leather lanyard",
    priceUsd: 38,
    priceGbp: 30,
    material: "Sand-Cast Brass",
    details: [{ label: "Lanyard", value: "Saddle Leather" }],
  },
  {
    productId: "highland-lead",
    name: "The Highland 6ft Walking Lead",
    caption: "Matching Cognac Tan",
    collection: "The Canine Collection",
    image: `${IMG}AB6AXuB-Lvdhph_U9B6gJv7r7bbTBGlK3LWTP2yxl1M2curqAMqCLoMHMCeZOxz2gdKF-2lAGPe2uV3_RoWYd45ZMOpIDV9sEXB5MTQYpcVeLIgkzlgZ81xl18I3JPaO5QNA1UDJJM52mLdBxwPGns_mpHzb1BQ3jzdJnhcmV-wn4YFR8n247Sa-7OdDWrH1bOI7fMUqtEjMkcXJM_kMYHw8l6H6ZEB67ZyUNc-qrUzttITJXypkTS5XEt8B`,
    imageAlt: "Vegetable tanned bridle leather dog lead with antique brass clasp",
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
    image: `${IMG}AB6AXuBp1z6WpnL0XxNmeCsKiOw_PGlIj9NJaGcOqHzAKPOmxpJdpEevovI0F9CrwzYzf5hyTPX4zLsbxho1ffzsARUmq6Y1IGFG3k-M0J87vg3S8sPM7I6Y55JCW2vpZhiLkhRT6vrTodQfPSg7BuiKhVeWMsdz_N2Xo334sMq3UWRlPrHeL44-ccm8Xkp0aXsbrK4DC8C1_SbuF2hPcjMP7V30MDUfvn6WbYR0QaasJ9oPfhSS1E-J9opM`,
    imageAlt: "Cognac tan leather canine harness with brass hardware and gold foil monogram BARNABY",
    priceUsd: 165,
    priceGbp: 135,
    material: "Tuscan Saddle Hide",
    badge: { label: "Personalized", tone: "primary" },
    details: [
      { label: "Color", value: "Cognac Tan" },
      { label: "Size", value: 'Medium (Girth 22"-28")' },
      { label: "Hardware", value: "Burnished Solid Brass" },
      { label: "Debossing", value: "(Gold Foil)", highlight: '"BARNABY"' },
    ],
    editLabel: { label: "Edit Monogram", icon: "edit_note" },
  },
  {
    key: "seed-derby",
    qty: 1,
    productId: "kensington-derby",
    name: "The Kensington Derby Shoe",
    collection: "Artisanal Footwear",
    image: `${IMG}AB6AXuBZ170T-IQT3gsYKW8Y863cIyfC-Yao8TFO1kcbrwh6bCr9F0phhBfX2uMQ0cX1YxHBlJG_ghBckJ33MsgQUdg4QTYAayKWTqTSmyY3FdSyHH83V-BpPP1bA1hbGnQH_c_fjj1EEUebPgJUJP8JB_zSNt1BwwXEwa11t3FmQQaNl0gprfHaKuC9Cnk7KPU9Qe6D41qv7rNA0kG6WoCbVl9ZUO49bs7XInzZ2b7CD_tm8I8d2Tb9O93j`,
    imageAlt: "Chestnut brown leather derby shoes on an aged oak table",
    priceUsd: 420,
    priceGbp: 340,
    material: "Tuscan Calfskin",
    badge: { label: "Goodyear Welted", tone: "tertiary" },
    details: [
      { label: "Color", value: "Hand-Burnished Chestnut" },
      { label: "Size", value: "43 EU / 10 US / 9.5 UK" },
      { label: "Sole", value: "Leather Channel Welt" },
      { label: "Last", value: "British Almond Toe No. 04" },
    ],
    editLabel: { label: "Adjust Fit Last", icon: "tune" },
  },
  { ...BALM, key: "seed-balm", qty: 1 },
];
