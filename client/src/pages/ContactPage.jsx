import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Send,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO, SITE_CONFIG } from '../data/seoData';
import Button from '../components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-forest-100 selection:text-forest-900">
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        canonical={PAGE_SEO.contact.canonical}
        keywords={PAGE_SEO.contact.keywords}
        breadcrumbs={breadcrumbs}
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
                Contact TripTally
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-semibold mb-4">
              <Mail className="w-3.5 h-3.5 text-terracotta-500" />
              <span>We’d Love to Hear from You</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 leading-tight mb-4">
              Get in Touch with the TripTally Team
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
              Have questions, feedback, feature suggestions, or travel creator partnership ideas? Reach out and our team will get back to you promptly.
            </p>
          </div>

        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Fast Help */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-ivory-50 border border-ivory-200 space-y-4">
                <h2 className="font-serif text-xl font-bold text-charcoal-900">
                  Direct Inquiries
                </h2>
                
                <div className="space-y-3 text-xs sm:text-sm text-charcoal-700">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-forest-700 mt-1 shrink-0" />
                    <div>
                      <span className="font-bold text-charcoal-900 block">Support &amp; Feedback</span>
                      <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-forest-700 hover:underline">
                        {SITE_CONFIG.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-forest-700 mt-1 shrink-0" />
                    <div>
                      <span className="font-bold text-charcoal-900 block">Community &amp; Updates</span>
                      <span className="text-charcoal-600">Twitter / X: @TripTallyApp</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Navigation Card */}
              <div className="p-6 rounded-3xl bg-forest-50 border border-forest-200 text-xs text-forest-900 space-y-3">
                <span className="font-bold uppercase tracking-wider text-[11px] text-forest-700 block">
                  Looking for Quick Answers?
                </span>
                <p className="leading-relaxed">
                  Check our feature guides and frequently asked questions for immediate answers about AI itineraries, expense splitting, and group invitations.
                </p>
                <div className="space-y-1.5 pt-2">
                  <Link to="/ai-itinerary-generator" className="block text-forest-800 font-semibold hover:underline">
                    → AI Itinerary Generator FAQs
                  </Link>
                  <Link to="/travel-expense-splitter" className="block text-forest-800 font-semibold hover:underline">
                    → Expense Splitting &amp; UPI FAQs
                  </Link>
                  <Link to="/destinations" className="block text-forest-800 font-semibold hover:underline">
                    → Curated Destination Itineraries
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-ivory-200 shadow-soft">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
                    Message Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mb-6">
                    Thank you for reaching out, {formData.name}. Our team has received your note and will reply to <strong>{formData.email}</strong> shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Siddharth Rao"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="siddharth@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                    >
                      <option value="General Inquiry">General Question</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Bug Report">Technical Issue / Bug Report</option>
                      <option value="Partnership">Travel Creator / Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts, questions, or ideas with us..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

