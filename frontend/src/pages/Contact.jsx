import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Headphones,
  Globe,
  Building
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      detail: "Available 24/7",
      action: "Start Chat",
      color: "blue"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      detail: "Response within 24 hours",
      action: "Send Email",
      color: "green"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      detail: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      color: "purple"
    }
  ];

  const offices = [
    {
      city: "Qatar",
      country: "Qatar",
      address: "29, 4th Floor Tower 4, The Gate, Doha - Qatar PO Box 10805",
      phone: "+974 3354 7440",
      email: "qatar@c2hr.net"
    },
    {
      city: "Malaysia",
      country: "Malaysia",
      address: "NO.23-3 Block C, Jalan Atmosphere 5, The Atmosphere Business Centre, 433000 Seri Kembangan, Selangor",
      phone: "+60 109152811",
      email: "info@c2hr.net"
    },
    {
      city: "India",
      country: "India",
      address: "Mayflower Signature, 923b, 7th Floor, Avinashi Road, Peelamedu, (Opp PSG Tech), Coimbatore - 641 004",
      phone: "+91 80564 48883",
      email: "info@c2hr.net"
    }
  ];

  const faqs = [
    {
      question: "How quickly can I get started?",
      answer: "You can create an account and start posting jobs or searching for opportunities immediately. Our team will reach out within 24 hours for personalized onboarding."
    },
    {
      question: "What are your pricing plans?",
      answer: "We offer flexible pricing starting from free basic access to enterprise solutions. Contact our sales team for a customized quote based on your needs."
    },
    {
      question: "Do you support international hiring?",
      answer: "Yes, C2HR supports hiring across 195+ countries with localized features, multi-language support, and compliance with international labor laws."
    },
    {
      question: "How does your AI matching work?",
      answer: "Our AI analyzes candidate profiles, job requirements, and historical hiring data to provide personalized matches with 95% accuracy in finding suitable candidates."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get in Touch
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                We're Here to Help
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Have questions about C2HR? Need support or want to learn more?
              Our team is ready to assist you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the best way to connect with our team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="card-premium p-8 text-center animate-slide-up hover:shadow-xl transition-shadow cursor-pointer group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-${method.color}-100 dark:bg-${method.color}-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <div className={`text-${method.color}-600`}>
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">{method.detail}</p>
                <button className={`btn-${method.color} w-full`}>
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="card-premium p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-premium p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-premium"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-premium"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input-premium"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="input-premium"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales</option>
                        <option value="partnership">Partnership</option>
                        <option value="billing">Billing</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-premium"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-premium"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full group overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-lg">Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                            <Send className="w-6 h-6" />
                          </div>
                          <span className="text-lg">Send Message</span>
                        </>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@c2hr.net</p>
                    <p className="text-gray-600 dark:text-gray-400">qatar@c2hr.net</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+974 33446689</p>
                    <p className="text-gray-600 dark:text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                    <p className="text-gray-600 dark:text-gray-400">Email: Within 24 hours</p>
                    <p className="text-gray-600 dark:text-gray-400">Phone: Immediate (business hours)</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-sm font-bold">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <span className="text-sm font-bold">t</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <span className="text-sm font-bold">i</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors">
                    <span className="text-sm font-bold">y</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Global Offices
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Visit us at one of our offices around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="card-premium p-6 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{office.city}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{office.country}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{office.address}</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {office.phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 inline mr-1" />
                    {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-premium p-6 animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;