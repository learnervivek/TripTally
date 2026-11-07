import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Split,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  Receipt,
  Smartphone,
  PieChart,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Layers,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, getFAQSchema, getSoftwareApplicationSchema } from '../data/seoData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

const sampleCalculation = {
  totalSpend: 16000,
  perPerson: 4000,
  expenses: [
    { payer: 'Arjun', item: 'Tempo Traveller & Fuel', amount: 8000 },
    { payer: 'Priya', item: 'Riverside Cottage Stay', amount: 5000 },
    { payer: 'Rohan', item: 'Cafe Dinners & Snacks', amount: 3000 },
    { payer: 'Sneha', item: 'Entry & Rafting Tickets', amount: 0 },
  ],
  transfers: [
    { from: 'Sneha', to: 'Arjun', amount: 4000 },
    { from: 'Rohan', to: 'Priya', amount: 1000 },
  ],
};

const splitterFaqs = [
  {
    question: 'How does the TripTally debt simplification algorithm work?',
    answer:
      'In a group trip, everyone pays for different items (cabs, hotels, meals, activities). If every person tried settling each bill individually, a group of 5 would need up to 10 separate transfers! TripTally computes everyone’s net balance (total paid minus fair share) and uses a greedy graph simplification algorithm to settle the entire group with the fewest possible direct payments.',
  },
  {
    question: 'Can we settle group balances through UPI apps like PhonePe and Google Pay?',
    answer:
      'Yes! TripTally natively supports Indian Rupees (₹). Once net balances are calculated, members can make direct UPI transfers through GPay, PhonePe, Paytm, or BHIM and mark them as settled in the trip ledger.',
  },
  {
    question: 'Can expenses be split unequally or by percentage?',
    answer:
      'Yes. TripTally supports both equal splits (where costs are divided equally among all or selected members) and custom splits (where you specify exact amounts or shares per person).',
  },
  {
    question: 'Can we upload bills and receipt photos?',
    answer:
      'Yes, you can attach bill photos, tax invoices, and fuel slips to any logged expense so the entire group has complete visibility and proof of spend.',
  },
];

export default function TravelExpenseSplitterPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Travel Expense Splitter', url: '/travel-expense-splitter' },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.travelExpenseSplitter.title}
        description={PAGE_SEO.travelExpenseSplitter.description}
        canonical={PAGE_SEO.travelExpenseSplitter.canonical}
        keywords={PAGE_SEO.travelExpenseSplitter.keywords}
        breadcrumbs={breadcrumbs}
        schema={[getSoftwareApplicationSchema(), getFAQSchema(splitterFaqs)]}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-ivory-200/80 bg-gradient-to-b from-ivory-100/60 to-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-charcoal-500">
              <li>
                <Link to="/" className="hover:text-forest-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-charcoal-800" aria-current="page">
                Travel Expense Splitter
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Split className="w-3.5 h-3.5 text-terracotta-500" />
              <span>100% in Indian Rupees (₹)</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              Travel Expense Splitter &amp; UPI Settle Up for Group Trips
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed mb-8">
              No more awkward post-trip spreadsheets or messy WhatsApp calculation screenshots. Log bills in rupees, split equally or custom, and let TripTally calculate the exact minimum UPI transfers needed to square up.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Start Splitting Expenses
              </Button>
              <Link
                to="/travel-budget-planner"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-ivory-300 bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-medium transition-colors"
              >
                <PieChart className="w-4 h-4 text-forest-600" />
                <span>Explore Budget Calculator</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Algorithm Demonstration */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-700 block mb-1">
              Mathematical Debt Simplification
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
              How TripTally Solves Complex Group IOUs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              See how 4 friends spending ₹16,000 on a weekend trip settle up with only 2 quick UPI transfers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Raw Expenses Logged */}
            <div className="lg:col-span-6 bg-ivory-50 p-6 rounded-2xl border border-ivory-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-ivory-200">
                <h3 className="font-serif text-base font-bold text-charcoal-900">
                  Logged Expenses
                </h3>
                <span className="text-xs font-bold text-forest-800 font-mono">
                  Total: {formatINR(sampleCalculation.totalSpend)}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {sampleCalculation.expenses.map((e) => (
                  <div
                    key={e.item}
                    className="flex items-center justify-between text-xs p-3 rounded-xl bg-white border border-ivory-200"
                  >
                    <div>
                      <strong className="text-charcoal-900 block">{e.item}</strong>
                      <span className="text-charcoal-500">Paid by {e.payer}</span>
                    </div>
                    <span className="font-mono font-bold text-charcoal-900">
                      {formatINR(e.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs text-forest-800">
                Fair Share per Member: <strong>{formatINR(sampleCalculation.perPerson)}</strong>
              </div>
            </div>

            {/* Right: Net Settlement Transfers */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border-2 border-forest-600/30 shadow-soft">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-ivory-200">
                <div className="flex items-center gap-2">
                  <Badge variant="forest">Optimized Settlement</Badge>
                </div>
                <span className="text-xs text-charcoal-500 font-medium">
                  Only 2 Direct Payments
                </span>
              </div>

              <p className="text-xs text-charcoal-600 mb-6 leading-relaxed">
                Instead of 6 confusing cross-payments, TripTally collapses the balances so everyone is square with zero leftover debt:
              </p>

              <div className="space-y-4 mb-6">
                {sampleCalculation.transfers.map((t, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-ivory-100/70 border border-ivory-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-forest-600 text-ivory-50 flex items-center justify-center font-bold text-xs">
                        ₹
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-charcoal-900">{t.from}</span>
                        <span className="text-charcoal-500"> pays </span>
                        <span className="font-bold text-charcoal-900">{t.to}</span>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-forest-700">
                      {formatINR(t.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-charcoal-500 pt-2 border-t border-ivory-200">
                <Smartphone className="w-4 h-4 text-forest-600" />
                <span>Compatible with GPay, PhonePe, Paytm &amp; UPI</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-ivory-50 border-b border-ivory-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                Receipts &amp; Categories
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Categorize every transaction under Lodging, Transport, Food, Activities, or Miscellaneous, and attach invoice photos for proof.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                <Split className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                Equal or Custom Splits
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Split equally among all members, select only specific companions, or input exact custom rupee amounts for each person.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-ivory-200 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                Audit Trail &amp; Transparency
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                All edits, additions, and settlements are time-stamped in the trip activity stream so everyone stays confident in the ledger.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-b border-ivory-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-2">
              Expense Splitting FAQs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Everything you need to know about tallying and settling group costs.
            </p>
          </div>

          <div className="space-y-3">
            {splitterFaqs.map((faq, idx) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-ivory-200/90 overflow-hidden bg-ivory-50/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif text-sm font-bold text-charcoal-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-forest-700 shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-xs text-charcoal-600 leading-relaxed border-t border-ivory-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-900 text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-3">
            Never Fight Over Group Bills Again
          </h2>
          <p className="text-sm text-forest-200 mb-6">
            Log bills as you travel and settle up with 1-click UPI transfers. Free for friends and families.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => navigate(isAuthenticated ? '/trips' : '/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Expense Ledger
          </Button>
        </div>
      </section>
    </div>
  );
}

