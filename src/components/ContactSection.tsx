import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  MapPin,
  Copy,
  Check,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_ITEMS } from '../data/portfolioData';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '../config/emailjs';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activationNotice, setActivationNotice] = useState(false);
  const [sentViaFallback, setSentViaFallback] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      setSubmitStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setActivationNotice(false);
    setSentViaFallback(false);

    try {
      if (isEmailJSConfigured()) {
        // Send directly via EmailJS (https://www.emailjs.com/)
        const templateParams = {
          to_name: PERSONAL_INFO.name,
          to_email: PERSONAL_INFO.email,
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim() || 'General Inquiry',
          message: formData.message.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          reply_to: formData.email.trim(),
        };

        const result = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams,
          EMAILJS_CONFIG.publicKey
        );

        if (result.status === 200 || result.text === 'OK') {
          setSubmitStatus('success');
          setActivationNotice(false);
          setSentViaFallback(false);
          return;
        } else {
          throw new Error(`EmailJS returned status: ${result.status} (${result.text})`);
        }
      }

      // If EmailJS credentials are not yet set in .env / config, use FormSubmit fallback token
      const FORMSUBMIT_TOKEN = '6ee312f11078fab75b6229fb51c6d63a';
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Name": formData.name.trim(),
          "Email": formData.email.trim(),
          "Subject": formData.subject.trim() || 'General Inquiry',
          "Message": formData.message.trim(),
          _subject: `Portfolio Contact: ${formData.subject.trim() || 'General Inquiry'} - ${formData.name.trim()}`,
          _template: 'box',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setSubmitStatus('success');
        setActivationNotice(false);
        setSentViaFallback(false);
      } else if (data.message && (data.message.includes('Activation') || data.message.includes('Activate') || data.message.includes('confirm'))) {
        setSubmitStatus('success');
        setActivationNotice(true);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err: unknown) {
      const errObj = err as { message?: string; text?: string };
      console.warn('Real push encountered an issue, falling back to mail client:', err);
      setSubmitStatus('error');
      setSentViaFallback(true);
      const isConfigIssue = !isEmailJSConfigured();
      setErrorMessage(
        isConfigIssue
          ? 'EmailJS is ready! Please enter your Service ID, Template ID, and Public Key in .env or src/config/emailjs.ts to send with EmailJS.'
          : (errObj.message || errObj.text || 'Could not send email automatically. Opening mail app instead.')
      );

      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `Portfolio Contact: ${formData.subject.trim() || 'General Inquiry'} - ${formData.name.trim()}`
      )}&body=${encodeURIComponent(
        `Hi Shahnawaz,\n\n${formData.message}\n\nBest regards,\n\nName :- ${formData.name}\nEmail :- ${formData.email}\nSubject :- ${formData.subject || 'General Inquiry'}`
      )}`;
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.click();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSubmitStatus('idle');
    setActivationNotice(false);
    setSentViaFallback(false);
  };

  return (
    <section id="contact" className="relative pt-24 pb-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto z-10">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
        >
          Contact <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">Me</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal"
        >
          Have a project in mind, an opportunity, or want to say hello? Send a message and let&apos;s build something impactful together.
        </motion.p>
      </div>

      {/* Main Grid: Info Cards (Left) & Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Direct Contact & Social Links (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-5"
        >
          {/* Availability Status Card */}
          <div className="p-5 rounded-2xl bg-[#090D18]/90 border border-blue-500/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white/60 font-mono">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Current Status</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Hire
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
              Actively seeking full-time frontend developer roles, Next.js / React projects, and high-growth engineering teams.
            </p>
          </div>

          {/* Direct Email Card with Quick Copy */}
          <div className="p-5 rounded-2xl bg-[#090D18]/90 border border-blue-500/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] group hover:border-blue-400/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold">Direct Email</h4>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-semibold text-white group-hover:text-blue-400 transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copiedEmail && (
              <p className="mt-2 text-xs text-emerald-400 font-mono flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Email copied to clipboard!
              </p>
            )}
          </div>

          {/* Location & Timezone Card */}
          <div className="p-5 rounded-2xl bg-[#090D18]/90 border border-blue-500/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold">Location</h4>
                <p className="text-sm font-semibold text-white mt-0.5">Gujarat, India</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Indian Standard Time (IST, UTC+5:30)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-5 rounded-2xl bg-[#090D18]/90 border border-blue-500/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-3">Find Me On Social Platforms</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {SOCIAL_ITEMS.map((item) => {
                let Icon = Github;
                if (item.name === 'LinkedIn') Icon = Linkedin;
                if (item.name === 'Twitter') Icon = Twitter;
                if (item.name === 'Instagram') Icon = Instagram;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/5 hover:border-blue-500/40 text-white/80 hover:text-white text-xs font-medium transition-all group cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </motion.div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090D18]/90 border border-blue-500/30 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.7)] relative overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Send a Message</h3>
                <p className="text-xs text-white/60 mt-0.5">I typically respond within 24 hours.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
              </div>
            </div>

            {submitStatus === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Email Sent Successfully!</h4>

                {/* Submitted Data Summary Preview */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-lg mx-auto text-left text-xs space-y-2.5">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Recipient:</span>
                    <span className="text-blue-400 font-semibold font-mono">{PERSONAL_INFO.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Sender Name:</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Sender Email:</span>
                    <span className="text-white font-medium font-mono">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/50">Topic / Subject:</span>
                    <span className="text-white font-medium">{formData.subject || 'General Inquiry'}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-white/50 block mb-1">Message Content:</span>
                    <p className="text-white/80 bg-black/40 p-2.5 rounded-lg border border-white/5 whitespace-pre-wrap leading-relaxed">{formData.message}</p>
                  </div>
                </div>

                {activationNotice ? (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs max-w-lg mx-auto text-left space-y-2.5">
                    <p className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      One-Time Email Activation Link Sent
                    </p>
                    <p className="text-amber-200/90 leading-relaxed">
                      FormSubmit has sent a 1-click confirmation email to <strong className="text-amber-100 underline">{PERSONAL_INFO.email}</strong> containing an <strong>&quot;Activate Form&quot;</strong> button.
                    </p>
                    <div className="p-2.5 bg-black/40 rounded-lg border border-amber-500/20 text-[11px] text-amber-100/90 leading-relaxed">
                      👉 <strong>Action Required:</strong> Check your Gmail inbox now and click <strong>&quot;Activate Form&quot;</strong> just once. After you click it once, FormSubmit activates your email permanently, and all future messages will arrive directly with your clean form data and <strong>no links</strong>!
                    </div>
                    <div className="pt-1">
                      <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-medium transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Open Gmail to Activate
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                    Your message has been directly sent to <strong className="text-blue-400">{PERSONAL_INFO.email}</strong> with your email <strong className="text-white">({formData.email})</strong> configured for direct replies.
                  </p>
                )}

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                      `Portfolio Contact: ${formData.subject || 'General Inquiry'} - ${formData.name}`
                    )}&body=${encodeURIComponent(
                      `Hi Shahnawaz,\n\n${formData.message}\n\nBest regards,\n\nName :- ${formData.name}\nEmail :- ${formData.email}\nSubject :- ${formData.subject || 'General Inquiry'}`
                    )}`}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-colors"
                  >
                    Open in Gmail Client
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Error Banner */}
                {submitStatus === 'error' && errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-white/70 mb-1.5">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-blue-500 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-white/70 mb-1.5">
                      Your Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-blue-500 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Selector / Input */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-white/70 mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-blue-500 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    <option value="" className="bg-zinc-900 text-white">Select inquiry type (Optional)</option>
                    <option value="Full-time Opportunity" className="bg-zinc-900 text-white">Full-time Opportunity</option>
                    <option value="Freelance Web Project" className="bg-zinc-900 text-white">Freelance Web Project</option>
                    <option value="Next.js / React Consulting" className="bg-zinc-900 text-white">Next.js / React Consulting</option>
                    <option value="Open Source Collaboration" className="bg-zinc-900 text-white">Open Source Collaboration</option>
                    <option value="General Question" className="bg-zinc-900 text-white">General Question</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-white/70 mb-1.5">
                    Your Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, question, or opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-blue-500 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending to {PERSONAL_INFO.email}...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Real Email</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                        `Portfolio Contact: ${formData.subject || 'General Inquiry'}${formData.name ? ` - ${formData.name}` : ''}`
                      )}&body=${encodeURIComponent(
                        `Hi Shahnawaz,\n\n${formData.message || 'I would like to get in touch regarding opportunities.'}\n\nBest regards,\n\nName :- ${formData.name || 'Your Name'}\nEmail :- ${formData.email || 'your.email@example.com'}\nSubject :- ${formData.subject || 'General Inquiry'}`
                      )}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium border border-white/10 transition-colors"
                      title="Compose draft directly in your Gmail / Email App"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>Or Send via Mail App</span>
                    </a>
                  </div>

                  <span className="text-[11px] text-white/50 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>Delivers to: <strong className="text-white/80 font-normal">{PERSONAL_INFO.email}</strong></span>
                  </span>
                </div>
              </form>
            )}

          </div>
        </motion.div>

      </div>

    </section>
  );
};