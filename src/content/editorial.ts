import type { FaqItem, ProcessStep } from "@/lib/schema";

/**
 * Editorial copy.
 *
 * Voice rules from `docs/01-brand-strategy.md`: lead with the useful answer,
 * short sentences, concrete nouns, explain consequences instead of repeating
 * slogans, first person when Sharif speaks, second person when the visitor is
 * given a next step.
 *
 * Everything here is process explanation. Nothing here states a market
 * condition, a rate, a timeline guarantee, a valuation, or an outcome — those
 * would be claims, and claims need a source.
 */

export const buyerProcess: ProcessStep[] = [
  {
    index: 1,
    title: "Start with the math",
    body: "Before you look at a single listing, you need a real number — not a pre-qualification text message. What you can borrow, what you can put down, and what the monthly number looks like once taxes and insurance are in it. Everything after this step is easier when this step is honest.",
  },
  {
    index: 2,
    title: "Decide who represents you",
    body: "The agent showing you a house works for the seller unless someone works for you. Understand what representation means, what it costs, and what it is supposed to do for you, before you are emotionally attached to a property.",
  },
  {
    index: 3,
    title: "See enough to calibrate",
    body: "You cannot judge one house against nothing. A short, deliberate run of showings tells you what your range actually produces, which is usually different from what you pictured. That calibration is what stops a panic offer later.",
  },
  {
    index: 4,
    title: "Write the offer as a strategy, not a number",
    body: "Price is one term. Deposit, contingencies, inspection scope, mortgage commitment dates, and closing timing all move the odds. In a competitive situation the structure of the offer often matters as much as the top-line figure.",
  },
  {
    index: 5,
    title: "Hold the deal together",
    body: "Between accepted offer and closing there is inspection, appraisal, title, and financing — and any of them can wobble. This is the part clients remember. It is also the part where the work is invisible if it is done well.",
  },
];

export const sellerProcess: ProcessStep[] = [
  {
    index: 1,
    title: "Price it against reality",
    body: "The list price is a marketing decision, not an opinion about what the property is worth to you. Overpricing costs the most in the first two weeks, when attention is highest and you only get it once.",
  },
  {
    index: 2,
    title: "Prepare before it is seen",
    body: "What needs doing, what does not, and what is not worth the money. Not every repair returns what it costs. The goal is to remove reasons for a buyer to hesitate, not to renovate for someone else's taste.",
  },
  {
    index: 3,
    title: "Make the property impossible to scroll past",
    body: "This is the part most listings skip. A property film shot with intent does a different job than twelve photographs — it puts a buyer inside the layout before they have decided whether to book a showing.",
  },
  {
    index: 4,
    title: "Control the showings",
    body: "Who is coming through, when, and what happens with the feedback. A schedule that concentrates attention works better than one that spreads it thin over a month.",
  },
  {
    index: 5,
    title: "Negotiate the whole offer",
    body: "The best offer is not automatically the highest one. Financing type, contingencies, deposit size, and timing all affect whether an offer actually closes at that number.",
  },
  {
    index: 6,
    title: "Sequence the next move",
    body: "If you are buying as well as selling, the order matters more than either transaction on its own. That coordination is the difference between a clean move and being caught between two closings.",
  },
];

export const sellerFaq: FaqItem[] = [
  {
    question: "What should I ask an agent before I sign anything?",
    answer: [
      "Ask how they arrived at the price, and what happens if the market disagrees in the first two weeks.",
      "Ask what marketing they actually produce themselves versus what they order from a vendor. Ask to see it.",
      "Ask who you will be speaking to during the transaction — them, or a team member you have not met.",
    ],
  },
  {
    question: "How much should I do to the property before listing?",
    answer: [
      "Less than most people expect, and different things than most people expect. The work that pays is usually the work that removes doubt: making it clean, making it show its layout, and fixing the thing a buyer will notice first.",
      "A full renovation before a sale is rarely worth what it costs, because you are decorating for a person you have not met.",
    ],
  },
  {
    question: "When is the right time to list?",
    answer: [
      "The honest answer is that it depends on your situation more than on a season. If you have to buy something else immediately, the sequencing matters more than the calendar.",
      "Anyone who tells you there is one correct month without asking about your next move is selling you a slogan.",
    ],
  },
  {
    question: "What actually happens with showings?",
    answer: [
      "You should know who is coming through, when, and what came back from each one. Feedback that never reaches you is feedback that cannot change anything.",
    ],
  },
  {
    question: "How do offers get compared?",
    answer: [
      "Price, financing type, deposit, contingencies, inspection scope, and closing timing. A cash offer slightly below a financed one can be the stronger offer, depending on what you need.",
      "The question is never only how much. It is how much, how certain, and how soon.",
    ],
  },
  {
    question: "What if I am selling and buying at the same time?",
    answer: [
      "Then the two transactions are one transaction. The order of accepted offers, contingencies, and closing dates has to be planned before either is in motion.",
      "There is a documented Brooklyn transaction on this site where the next house had an accepted offer before the current property was listed. That is what the coordination is for.",
    ],
  },
];

export const buyerFaq: FaqItem[] = [
  {
    question: "How much do I actually need up front?",
    answer: [
      "More than the down payment. Closing costs, inspection, appraisal, and moving all land in the same window.",
      "The number worth planning around is cash-to-close, not the deposit percentage. Your lender produces that figure — this site does not, and no page here is a mortgage qualification or a promise about rates.",
    ],
  },
  {
    question: "Should I buy or keep renting?",
    answer: [
      "It depends on how long you plan to stay, what you have in cash, what the monthly cost difference actually is, and how much flexibility is worth to you.",
      "Anyone who answers that question without asking you anything is not answering your question.",
    ],
  },
  {
    question: "Is the first mortgage rate I am quoted the rate I get?",
    answer: [
      "Not necessarily. It is a starting point. Getting a second opinion on a quote costs you an afternoon and can change what you pay for the next thirty years.",
    ],
  },
  {
    question: "What happens in a bidding war?",
    answer: [
      "The offer stops being only a number. Deposit size, contingency structure, inspection scope, and timing all move your position.",
      "There is a documented Staten Island transaction on this site where a buyer nearly lost the property in a competing-offer situation and closed at $1,299,999.",
    ],
  },
];

/** Home page decision rail — the four fast entry points from `docs/02`. */
export const decisionRail = [
  {
    index: "01",
    label: "What $500K buys",
    body: "See the property type, location, and tradeoffs a real budget produces.",
    href: "/buy/budget/",
    action: "See what a budget buys",
  },
  {
    index: "02",
    label: "Buy or rent",
    body: "Timing, cash, monthly cost, and flexibility — before the slogan.",
    href: "/buy/buy-vs-rent/",
    action: "Compare my situation",
  },
  {
    index: "03",
    label: "First home",
    body: "Five moves between deciding you want a home and closing on one.",
    href: "/buy/first-home/",
    action: "Start part one",
  },
  {
    index: "04",
    label: "Selling questions",
    body: "The questions worth asking before you sign a listing agreement.",
    href: "/sell/",
    action: "Get a seller plan",
  },
] as const;

/** The four routes offered by the closing conversion section. */
export const intentRoutes = [
  { label: "I'm buying", href: "/buy/", body: "Start with the range, not the listings." },
  { label: "I'm selling", href: "/sell/", body: "Start with the price and the preparation." },
  {
    label: "I'm doing both",
    href: "/sell/#sell-and-buy",
    body: "Then it is one transaction, not two.",
  },
  {
    label: "I'm still deciding",
    href: "/videos/",
    body: "Watch first. Nobody will chase you.",
  },
] as const;

/** About page — operating philosophy, not biography (`docs/02`). */
export const philosophy = [
  {
    title: "Say the useful thing first",
    body: "You do not need a relationship before you get a straight answer. If the answer is that you should wait, that is the answer.",
  },
  {
    title: "Education before pressure",
    body: "Everything on this site is watchable and readable without speaking to anyone. That is deliberate. A client who understands the decision makes a better one, and makes it faster.",
  },
  {
    title: "Control the process",
    body: "Most deals do not fall apart at the offer. They fall apart between the accepted offer and the closing, quietly, while nobody is watching the financing or the title work.",
  },
  {
    title: "Stay in it when it gets difficult",
    body: "The review that matters most on this site is not the biggest number. It is the seller who had already been through two agents, describing someone who came over and went through boxes of paperwork with them.",
  },
] as const;

/**
 * Financial disclaimer shown on every page that discusses money.
 * Required by `docs/09`: do not imply mortgage approval, appraisal, investment
 * return, legal advice, or tax advice.
 */
export const financialDisclaimer =
  "This is general educational information about the buying and selling process. It is not mortgage, lending, appraisal, investment, legal, or tax advice, and it is not an offer of credit or a prediction of what any property will sell for. Figures depend on your own circumstances — confirm them with a licensed lender, attorney, or tax professional.";

/**
 * Property-content disclaimer. Prevents any past film or closed sale from being
 * read as a current listing.
 */
export const propertyDisclaimer =
  "Properties shown are documented past work or marketing films. Nothing on this site is an offer to sell, a representation that a property is currently available, or a licensed listing search service.";
