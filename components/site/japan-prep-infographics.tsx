import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type VisaStep = {
  title: string;
  jp: string;
  duration: string;
  detail: string;
};

const VISA_STEPS: VisaStep[] = [
  {
    title: "Program or sponsor confirmation",
    jp: "ukeire-saki kettei",
    duration: "2-8 weeks",
    detail: "Secure acceptance from a school or sponsor organization before visa steps begin.",
  },
  {
    title: "Certificate of Eligibility",
    jp: "zairyu shikaku nintei shomeisho (COE)",
    duration: "4-12 weeks",
    detail: "Your sponsor applies in Japan. This is the core document for visa processing.",
  },
  {
    title: "Visa application",
    jp: "shiso shinsei",
    duration: "5-10 business days",
    detail: "Submit passport, COE, application forms, and supporting documents to the embassy.",
  },
  {
    title: "Arrival and resident registration",
    jp: "nyukoku and jumin toroku",
    duration: "First 14 days",
    detail: "Receive residence card, register address at city office, and begin local enrollment steps.",
  },
];

export function VisaPermitTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visa and Permit Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="grid gap-3 md:grid-cols-4" aria-label="Visa timeline from acceptance to resident registration">
          {VISA_STEPS.map((step, index) => (
            <li key={step.title} className="relative rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-700">Step {index + 1}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{step.title}</p>
              <p className="text-xs text-slate-600">{step.jp}</p>
              <p className="mt-1 text-xs text-slate-500">{step.duration}</p>
              <p className="mt-2 text-xs text-slate-600">{step.detail}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}


export function HousingComparisonChart() {
  const rows = [
    { type: "Homestay", jp: "homusutei", cost: "Medium", independence: "Low", practice: "High" },
    { type: "Dormitory", jp: "ryo", cost: "Low-Medium", independence: "Medium", practice: "Medium" },
    { type: "Apartment", jp: "apato", cost: "High initial", independence: "High", practice: "Variable" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Housing Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm" aria-label="Comparison of housing options in Japan">
            <thead className="bg-slate-50">
              <tr>
                <th className="border border-slate-200 px-3 py-2">Option</th>
                <th className="border border-slate-200 px-3 py-2">Cost Profile</th>
                <th className="border border-slate-200 px-3 py-2">Independence</th>
                <th className="border border-slate-200 px-3 py-2">Language Practice</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.type}>
                  <td className="border border-slate-200 px-3 py-2">
                    <span className="font-semibold text-slate-900">{row.type}</span>
                    <span className="ml-2 text-xs text-slate-500">{row.jp}</span>
                  </td>
                  <td className="border border-slate-200 px-3 py-2">{row.cost}</td>
                  <td className="border border-slate-200 px-3 py-2">{row.independence}</td>
                  <td className="border border-slate-200 px-3 py-2">{row.practice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function CostOfLivingBreakdown() {
  const data = [
    { label: "Housing", value: 38 },
    { label: "Food", value: 20 },
    { label: "Transport", value: 11 },
    { label: "Utilities", value: 9 },
    { label: "Insurance/Pension", value: 12 },
    { label: "Other", value: 10 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Cost Pattern (Illustrative)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ul className="space-y-2" aria-label="Bar chart showing typical monthly expense percentages">
          {data.map((item) => (
            <li key={item.label}>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-brand-700 transition-all duration-300" style={{ width: `${item.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function WasteSortingInfographic() {
  const items = [
    { en: "Burnables", jp: "moeru gomi", ex: "Food scraps, paper tissues" },
    { en: "Non-burnables", jp: "moenai gomi", ex: "Small metal or ceramic items" },
    { en: "Plastics", jp: "purasuchikku", ex: "Packaging with plastic mark" },
    { en: "Cans/Bottles", jp: "kan and bin", ex: "Rinsed cans and glass bottles" },
    { en: "Paper", jp: "koshi", ex: "Cardboard, newspapers, cartons" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waste Sorting Basics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 md:grid-cols-2" aria-label="Waste categories in Japanese municipalities">
          {items.map((item) => (
            <li key={item.en} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">{item.en}</p>
              <p className="text-xs text-brand-700">{item.jp}</p>
              <p className="mt-1 text-xs text-slate-600">{item.ex}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
