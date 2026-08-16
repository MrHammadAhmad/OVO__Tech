import React from 'react';
import { Container } from '../ui/Container';
import { FadeIn } from '../ui/FadeIn';
import { Search, Wrench, Rocket, TrendingUp } from 'lucide-react';

export function WorkProcess() {
  const steps = [
    {
      num: "01",
      title: "Understand",
      desc: "We start by deeply understanding your business — your goals, pain points, team structure, and growth targets. No guesswork, just clarity.",
      icon: Search
    },
    {
      num: "02",
      title: "Build",
      desc: "We design the right combination of people, processes, and technology tailored specifically to your needs and scale.",
      icon: Wrench
    },
    {
      num: "03",
      title: "Implement",
      desc: "We work alongside your team to deploy solutions seamlessly — minimising disruption and maximising speed to value.",
      icon: Rocket
    },
    {
      num: "04",
      title: "Scale",
      desc: "As your business grows, our solutions grow with you. We continuously optimise to keep you ahead of the curve.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="bg-brand-navy text-white py-20 lg:py-24 relative overflow-hidden rounded-[32px] sm:rounded-[48px] mx-4 sm:mx-6 lg:mx-8 my-10 shadow-2xl">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            How Can We Work With You
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            From flexible staffing to full-scale technology builds, here&apos;s how we engage with your business at every stage.
          </p>
        </FadeIn>

        {/* Process Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (01 & 02) */}
          <div className="lg:col-span-4 space-y-6">
            {steps.slice(0, 2).map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.num} delay={i * 0.1} direction="right">
                <div 
                  key={step.num}
                  className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:bg-white/[0.07] hover:border-brand-cyan/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-md">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-cyan/80 block">{step.num} —</span>
                      <h3 className="text-lg font-bold text-white leading-none mt-0.5">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Middle Column (Doctor Graphic) */}
          <FadeIn delay={0.2} className="lg:col-span-4 flex justify-center items-center relative py-8">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[380px] lg:h-[380px] xl:w-[440px] xl:h-[440px] flex items-center justify-center">
              
              {/* Purple Angled Stripe Pattern Behind Circle */}
              <div className="absolute w-[120%] h-[40%] bg-gradient-to-r from-[#0F1E36]/40 to-[#02ACEA]/40 rotate-[-30deg] blur-sm rounded-full -z-10" />

              {/* Floating Yellow dots/circles */}
              <div className="absolute top-[8%] right-[8%] w-10 h-10 rounded-full bg-amber-500 shadow-lg animate-[pulse_3s_infinite]" />
              <div className="absolute top-[26%] right-[0%] w-12 h-12 rounded-full bg-yellow-400/80 shadow-md animate-bounce" />

              {/* Light Blue outline diamonds */}
              <div className="absolute bottom-[10%] left-[2%] w-10 h-10 border-2 border-brand-cyan/40 rotate-[45deg] rounded-sm" />
              <div className="absolute bottom-[28%] left-[8%] w-12 h-12 border border-indigo-400/30 rotate-[15deg] rounded-md" />

              {/* White/Blue circular avatar container */}
              <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-[330px] lg:h-[330px] xl:w-[380px] xl:h-[380px] rounded-full p-2.5 bg-gradient-to-tr from-brand-blue/30 via-white/10 to-brand-cyan/30 shadow-[0_12px_45px_rgba(0,0,0,0.35)]">
                <div className="w-full h-full rounded-full bg-[#1b2536] overflow-hidden border-4 border-white flex items-center justify-center">
                  <img 
                    src="/Img1.png" 
                    alt="Work Process Specialist" 
                    className="w-full h-full object-cover object-center scale-100 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

            </div>
          </FadeIn>

          {/* Right Column (03 & 04) */}
          <div className="lg:col-span-4 space-y-6">
            {steps.slice(2, 4).map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.num}
                  className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:bg-white/[0.07] hover:border-brand-cyan/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-md">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-cyan/80 block">{step.num} —</span>
                      <h3 className="text-lg font-bold text-white leading-none mt-0.5">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
