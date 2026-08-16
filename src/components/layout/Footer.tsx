import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const solutions = [
    { name: "Repeat Prescription", href: "/solutions/repeat-prescription" },
    { name: "Referral Automation", href: "/solutions/referral-automation" },
    { name: "Policy Updates", href: "/solutions/policy-updates" },
    { name: "Document Management", href: "/solutions/document-management" },
    { name: "Digital Assistant", href: "/solutions/digital-assistant" },
    { name: "Medical Coding", href: "/solutions/medical-coding" },
    { name: "Quality & Outcomes Framework", href: "/solutions/qoaf" },
    { name: "Prescription Automation", href: "/solutions/prescription-automation" },
    { name: "Invoicing Automation", href: "/solutions/invoicing-automation" },
  ];

  const company = [
    { name: "About Ovotech", href: "/about" },
    { name: "Leadership", href: "/leadership" },
    { name: "NHS Framework", href: "/nhs-framework" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Statement", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "User Agreement", href: "#" },
    { name: "PDPA Agreement", href: "#" },
  ];

  return (
    <footer className="bg-brand-dark text-slate-400 border-t border-white/5">
      {/* Main footer grid */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand block */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo-footer.png" 
                alt="OVO TECH" 
                className="h-15 w-auto object-contain select-none" 
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Healthcare AI and RPA for modern healthcare workflows. Transforming repetitive processes into streamlined, compliant automation platforms.
            </p>
          </div>

          {/* Solutions links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {solutions.slice(0, 5).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              {solutions.length > 5 && (
                <li>
                  <Link href="/solutions" className="text-brand-cyan hover:underline text-xs flex items-center gap-1 mt-2">
                    View all solutions &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact block */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <span className="block text-xs text-slate-500">Phone</span>
                <span className="text-white">0161 820 1123</span>
              </li>
              <li>
                <span className="block text-xs text-slate-500">Email</span>
                <span className="text-white hover:text-brand-cyan transition-colors">
                  ovotech.services@nhs.net
                </span>
              </li>
              <li>
                <span className="block text-xs text-slate-500">Location</span>
                <span className="text-white">Tameside Business Park<br />Manchester, UK, M34 3QS</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-brand-dark">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {currentYear} Ovotech Services. All rights reserved. Registered in the UK.
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {legal.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-white transition-colors">
                {item.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
