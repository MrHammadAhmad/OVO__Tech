"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Activity,
  ShieldCheck,
  Clock,
  TrendingUp,
  Award,
  FileText,
  Check,
  Phone,
  Mail,
  Users,
  HelpCircle,
  Star,
  Sparkles,
  Rocket,
  Brain,
  Cloud,
  Stethoscope
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FadeIn } from '@/components/ui/FadeIn';
import { Typewriter } from '@/components/ui/Typewriter';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { SurgeriesGrid } from '@/components/sections/SurgeriesGrid';
import { WorkProcess } from '@/components/sections/WorkProcess';
import { CTASection } from '@/components/sections/CTASection';

function TransparentDoctorImage() {
  const [processedSrc, setProcessedSrc] = useState<string>('/heroimg.png');

  useEffect(() => {
    const img = new window.Image();
    img.src = '/heroimg.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Sample background color at top-left corner
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Flood fill queue starting from corners
      const visited = new Uint8Array(width * height);
      const queue: number[] = [];

      // Helper to check if pixel color is close to background color
      const isBackground = (x: number, y: number) => {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Calculate Euclidean distance in RGB color space
        const diff = Math.sqrt(
          Math.pow(r - bgR, 2) +
          Math.pow(g - bgG, 2) +
          Math.pow(b - bgB, 2)
        );
        return diff < 45; // Match with safe tolerance threshold
      };

      // Add corners to queue
      const add = (x: number, y: number) => {
        const idx = y * width + x;
        if (!visited[idx] && isBackground(x, y)) {
          visited[idx] = 1;
          queue.push(idx);
        }
      };

      // Add all boundary pixels
      for (let x = 0; x < width; x++) {
        add(x, 0);
        add(x, height - 1);
      }
      for (let y = 0; y < height; y++) {
        add(0, y);
        add(width - 1, y);
      }

      // BFS to find all connected background pixels
      let head = 0;
      while (head < queue.length) {
        const idx = queue[head++];
        const x = idx % width;
        const y = Math.floor(idx / width);

        // Make this background pixel fully transparent
        data[idx * 4 + 3] = 0;

        // Check 4 neighbors
        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1]
        ];

        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nidx = ny * width + nx;
            if (!visited[nidx] && isBackground(nx, ny)) {
              visited[nidx] = 1;
              queue.push(nidx);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, []);

  return (
    <img
      src={processedSrc}
      alt="Healthcare Professional"
      className="w-full h-auto object-contain max-h-full select-none"
    />
  );
}

export default function HomePage() {
  const [heroForm, setHeroForm] = useState({ name: '', email: '', phone: '' });
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroForm.name || !heroForm.email || !heroForm.phone) return;
    setHeroStatus('loading');
    setTimeout(() => {
      setHeroStatus('success');
      setHeroForm({ name: '', email: '', phone: '' });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroForm({
      ...heroForm,
      [e.target.name]: e.target.value
    });
  };

  const stats = [
    { number: "15", label: "Years of Experience" },
    { number: "20+", label: "GP Practices" },
    { number: "9", label: "Developed Softwares" },
    { number: "3", label: "Countries Worldwide" },
    { number: "5", label: "Industry Awards" }
  ];

  const quickSolutions = [
    {
      num: "01",
      name: "Repeat Prescription",
      desc: "Automates the repeat prescription process for patients, preserving clinical validation.",
      href: "/solutions/repeat-prescription"
    },
    {
      num: "02",
      name: "Referral Automation",
      desc: "RPA-driven routing that eliminates up to 50% of manual referral work.",
      href: "/solutions/referral-automation"
    },
    {
      num: "03",
      name: "Policy Updates",
      desc: "Automatically monitors national policy changes and syncs them to your team.",
      href: "/solutions/policy-updates"
    },
    {
      num: "04",
      name: "Document Management",
      desc: "Powerful routing engine to capture, extract, and categorize GP records.",
      href: "/solutions/document-management"
    }
  ];

  const keyFeatures = [
    {
      title: "Clinical Safety First",
      desc: "Fully aligned with NHS standards, ensuring every automation includes clinician-in-the-loop validation.",
      icon: ShieldCheck
    },
    {
      title: "24/7 Operations",
      desc: "Process incoming document streams, GP letters, and prescriptions through the night to clear morning queues.",
      icon: Clock
    },
    {
      title: "Maximized Outcomes",
      desc: "Proactively track and alert unmet Quality & Outcomes Framework (QOF) targets before the end of reporting cycles.",
      icon: TrendingUp
    },
    {
      title: "Direct Integrations",
      desc: "Works natively alongside standard clinic registers, letters, and regional referral networks.",
      icon: Activity
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-0 pb-0 lg:pt-0 lg:pb-0 bg-[#f8fafc] border-b border-brand-border overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Hero Copy (Left) */}
            <FadeIn direction="right" className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold tracking-widest text-[#02ACEA] uppercase block">
                MEDICAL AUTOMATION SERVICES
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                <span className="text-[#0F1E36] block mb-2">The Healthcare AI & RPA Provider for</span>
                <span className="block h-[1.2em]">
                  <Typewriter words={["NHS Healthcare", "Private Clinics", "Medical Practices", "Hospitals"]} />
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                Ovotech is the UK&apos;s premier healthcare automation and RPA provider – deploying the best practices in medical billing, repeat prescriptions, and coding for physicians looking to outsource clinical and operational workloads to an expert automated platform.
              </p>

              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                Our certified medical coders and AI systems help healthcare organizations recover clinical hours, clear processing queues, and resolve document workflow bottlenecks.
              </p>

              {/* Consultation Booking Form */}
              {heroStatus === 'success' ? (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-xs text-emerald-800 flex items-center gap-2 max-w-lg">
                  <CheckCircle className="h-5 w-5 text-[#00a8cc]" />
                  <span>Success! Your consultation request has been received. We will call you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleHeroSubmit} className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={heroForm.name}
                      onChange={handleInputChange}
                      className="border border-[#02ACEA] rounded-xl px-4 py-3.5 text-xs w-full bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#02ACEA]"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={heroForm.email}
                      onChange={handleInputChange}
                      className="border border-[#02ACEA] rounded-xl px-4 py-3.5 text-xs w-full bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#02ACEA]"
                    />
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="Phone Number"
                      value={heroForm.phone}
                      onChange={handleInputChange}
                      className="border border-[#02ACEA] rounded-xl px-4 py-3.5 text-xs w-full bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#02ACEA]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={heroStatus === 'loading'}
                      className="bg-[#02ACEA] text-white font-bold rounded-xl text-xs px-8 py-3.5 uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.04] hover:shadow-[0_0_24px_rgba(2,172,234,0.45)] hover:ring-2 hover:ring-offset-2 hover:ring-[#02ACEA]/60 focus:ring-[#02ACEA] disabled:opacity-50 cursor-pointer"
                    >
                      {heroStatus === 'loading' ? 'Booking...' : 'BOOK A FREE CONSULTATION'}
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>

            {/* Hero Visual Mockup (Right) */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-5 relative flex items-end justify-center self-end">
              <div className="relative w-96 h-96 sm:w-[460px] sm:h-[460px] md:w-[500px] md:h-[500px] lg:w-[500px] lg:h-[500px] xl:w-[620px] xl:h-[620px]">
                {/* Spinning Geometric Background Backdrop */}
                <div className="absolute inset-0 z-0 animate-[spin_24s_linear_infinite] pointer-events-none flex items-center justify-center">
                  <div className="absolute inset-0 -rotate-45">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-[6px] border-[#02ACEA] bg-white shadow-sm" />
                  </div>
                  <div className="absolute inset-0 rotate-[135deg]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-[6px] border-[#02ACEA] bg-white shadow-sm" />
                  </div>
                  <div className="absolute inset-0 rotate-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[2px] border-slate-300/60" />
                  </div>
                  <div className="absolute inset-0 -rotate-[60deg]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-[2px] border-slate-300/60" />
                  </div>
                </div>

                {/* SVG Static Circle Backdrop */}
                <div className="absolute inset-0 z-0 select-none opacity-20 pointer-events-none">
                  <svg className="w-full h-full filter drop-shadow-[0_8px_32px_rgba(16,32,57,0.3)]" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="85" fill="#02ACEA" />
                  </svg>
                </div>

                {/* Friendly male doctor image standing on top */}
                <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none">
                  <TransparentDoctorImage />
                </div>

                {/* Floating Outline Icons matching reference (no white boxes) */}
                <div className="absolute top-[34%] left-[8%] z-20 animate-float-slow opacity-85 pointer-events-none">
                  <Rocket className="h-10 w-10 text-[#0F1E36]" strokeWidth={1.5} />
                </div>
                <div className="absolute top-[34%] right-[8%] z-20 animate-float-medium opacity-85 pointer-events-none">
                  <Brain className="h-10 w-10 text-[#0F1E36]" strokeWidth={1.5} />
                </div>
                <div className="absolute top-[18%] left-[16%] z-20 animate-float-fast opacity-85 pointer-events-none">
                  <Cloud className="h-10 w-10 text-[#0F1E36]" strokeWidth={1.5} />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Hero Statistics Ribbon Bar */}
      <div className="bg-[#02ACEA] py-5 border-t border-b border-white/5 shadow-md">
        <Container>
          <div className="flex flex-row justify-start md:justify-around items-center gap-8 md:gap-4 text-white font-semibold overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 md:px-0 py-2 md:py-0">
            {/* Stat 1 */}
            <div className="flex items-center space-x-3 group cursor-default shrink-0 snap-center">
              <Clock className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm md:text-base tracking-wide text-white">15 Years of Experience</span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/30 rounded-full shrink-0" />

            {/* Stat 2 */}
            <div className="flex items-center space-x-3 group cursor-default shrink-0 snap-center">
              <ShieldCheck className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm md:text-base tracking-wide text-white">20+ GP Practices</span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/30 rounded-full shrink-0" />

            {/* Stat 3 */}
            <div className="flex items-center space-x-3 group cursor-default shrink-0 snap-center">
              <Award className="h-5 w-5 text-white fill-white/20 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm md:text-base tracking-wide text-white">5 Industry Awards</span>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. PARTNERS SECTION */}
      <PartnerLogos />

      {/* 3. CORE SOLUTIONS OVERVIEW */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
              WORKFLOW SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
              Streamline & automate your workflows manually
            </h2>
            <p className="text-sm text-slate-500">
              Transform clinical and operational administration into automated pipelines. Choose from our key services built specifically for NHS frameworks.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickSolutions.map((sol, i) => (
              <FadeIn key={sol.name} delay={i * 0.1}>
                <Card
                onClick={() => window.location.href = sol.href}
                className="group flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:bg-gradient-to-b hover:from-[#0F1E36] hover:to-[#02ACEA] hover:border-transparent hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white/60 transition-colors">{sol.num}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan group-hover:bg-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy group-hover:text-white transition-colors">
                    {sol.name}
                  </h3>
                  <p className="text-xs text-slate-500 group-hover:text-slate-200 leading-relaxed transition-colors">
                    {sol.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-semibold text-brand-blue group-hover:text-white transition-colors">
                  Learn more <ArrowRight className="ml-1 h-3.5 w-3.5 text-brand-blue group-hover:text-white transition-colors" />
                </div>
              </Card>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/solutions" variant="outline" size="md">
              View All 9 Solutions
            </Button>
          </div>
        </Container>
      </section>

      {/* Surgeries & NHS Partners Grid */}
      <SurgeriesGrid />

      {/* 4. DEEP NAVY PLATFORM WORKFLOW */}
      <section className="bg-brand-navy text-white py-20 lg:py-28 relative overflow-hidden rounded-[32px] sm:rounded-[48px] mx-4 sm:mx-6 lg:mx-8 my-10 shadow-2xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Dark Section Content */}
            <FadeIn direction="right" className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-brand-cyan uppercase">
                HEALTHCARE RPA PLATFORM
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                An intelligent platform for your entire medical workflow
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Clear clinical backlogs and relieve administrative teams by automating complex tasks in patient record routing, repeat prescribing, and policy compliance verification.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  "Clinician-led rules validation ensures absolute patient safety",
                  "Directly routes documents into GP, Docman, and clinic folders",
                  "Simultaneous processing of multiple clinical sites in parallel",
                  "Advanced data dashboards and activity logging built-in"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                    <Check className="h-5 w-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button href="/demo" variant="accent" size="md">
                  Request a Demo
                </Button>
                <Button href="/solutions" variant="outline-white" size="md">
                  Explore Solutions
                </Button>
              </div>
            </FadeIn>

            {/* Dark Section Mockup UI */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-6">
              <div className="bg-[#080d16] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                    <span className="text-xs font-bold text-white tracking-wider">DOCMAN ROUTING METRICS</span>
                  </div>
                  <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 px-2.5 py-0.5 rounded-full font-semibold">
                    ACTIVE MONITORING
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-bold text-white">124</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-1">INCOMING</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-bold text-brand-cyan">96</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-1">PROCESSED</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-2xl font-bold text-amber-400">18</p>
                    <p className="text-[10px] text-slate-400 uppercase mt-1">PENDING REVIEW</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-white">Latest Routing Streams</p>
                  <div className="text-[11px] font-mono space-y-1.5 text-slate-400">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-300">Letter_49392.pdf</span>
                      <span className="text-brand-cyan">→ Extracted & Saved (Accuracy: 100%)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-300">Referral_8849.pdf</span>
                      <span className="text-brand-cyan">→ Routed to Admin Staff</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Presc_90192.json</span>
                      <span className="text-amber-400">→ Pending Clinician Approval</span>
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>

          </div>
        </Container>
      </section>

      {/* 5. STATISTICS SECTION */}
      <section className="py-16 bg-slate-50 border-b border-brand-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {stats.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.1}>
              <div
                className="bg-white border border-brand-border p-6 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.02)]"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy mb-1">
                  {item.number}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FEATURE GRID SECTION */}
      <section className="py-20 bg-white">
        <Container>
          <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
              WHY OVOTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
              Security, compliance and clinical safety first
            </h2>
            <p className="text-sm text-slate-500">
              Ovotech ensures clinical governance is maintained throughout every step.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <FadeIn key={feat.title} delay={i * 0.1}>
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-4 text-center md:text-left flex flex-col h-full">
                  <div className="inline-flex p-3 bg-brand-blue/10 rounded-xl text-brand-blue mx-auto md:mx-0 self-center md:self-start">
                    <Icon className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    {feat.desc}
                  </p>
                </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Work Process Section */}
      <WorkProcess />

      {/* 7. SUPPORT SECTION */}
      <section className="py-20 bg-slate-50 border-t border-b border-brand-border">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Support Copy */}
            <FadeIn direction="right" className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
                DEDICATED TEAMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy">
                Support when you need it
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                We bridge the gap between high-performance software engineering and clinical validation, ensuring your operations never experience downtime.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Phone className="h-5 w-5 text-brand-cyan" />
                  <span>0161 820 1123</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <Mail className="h-5 w-5 text-brand-cyan" />
                  <span>ovotech.services@nhs.net</span>
                </div>
              </div>

              <div className="pt-2">
                <Button href="/support" variant="primary" size="md">
                  Contact Support
                </Button>
              </div>
            </FadeIn>

            {/* Support Cards */}
            <FadeIn direction="left" delay={0.2} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card hoverEffect={false} className="space-y-4 border-slate-200">
                <div className="p-2.5 bg-brand-blue/10 text-brand-blue w-fit rounded-lg">
                  <Users className="h-6 w-6 text-brand-cyan" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">Technical Support</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Professional Software Developers standing by to assist with software customization, integrations, and server dashboard configurations.
                </p>
              </Card>

              <Card hoverEffect={false} className="space-y-4 border-slate-200">
                <div className="p-2.5 bg-brand-blue/10 text-brand-blue w-fit rounded-lg">
                  <Activity className="h-6 w-6 text-brand-cyan" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">Healthcare Support</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Consultant Medical Professionals who review rules templates, clinical guidelines, and coordinate clinical safety compliance assessments.
                </p>
              </Card>
            </FadeIn>

          </div>
        </Container>
      </section>

      {/* 8. CTA / TRANSFORMATION */}
      <CTASection />

    </div>
  );
}
