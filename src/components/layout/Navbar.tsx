"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight, Phone, Mail, Search } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on path changes or clicks outside
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const aboutLinks = [
    { name: "About Ovotech", href: "/about" },
    { name: "Leadership", href: "/leadership" },
    { name: "NHS Framework", href: "/nhs-framework" },
    { name: "FAQ", href: "/faq" },
  ];

  const resources = [
    { name: "Product Demo", href: "/demo" },
    { name: "Healthcare Automation", href: "/solutions" },
  ];

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/80 backdrop-blur-md">
      {/* Top Utility Bar */}
      <div className="bg-brand-navy text-slate-200 text-[10px] sm:text-xs py-2 shadow-inner border-b border-white/5 select-none hidden md:block">
        <Container>
          <div className="flex justify-between items-center h-5">
            {/* Left Side: Contact Information */}
            <div className="flex items-center space-x-5">
              <a href="tel:01618201123" className="flex items-center hover:text-white hover:underline transition-all">
                <Phone className="h-3.5 w-3.5 text-brand-cyan mr-1.5" />
                <span>0161 820 1123</span>
              </a>
              <a href="mailto:ovotech.services@nhs.net" className="flex items-center hover:text-white hover:underline transition-all">
                <Mail className="h-3.5 w-3.5 text-brand-cyan mr-1.5" />
                <span>ovotech.services@nhs.net</span>
              </a>
            </div>

            {/* Right Side: Utility Navigation */}
            <div className="flex items-center space-x-4 font-semibold text-slate-300">
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/nhs-framework" className="hover:text-white transition-colors">
                NHS Framework
              </Link>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => window.location.href = '/solutions'}
                className="hover:text-white transition-colors flex items-center"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="OVO TECH" 
                className="h-15 w-auto object-contain select-none" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            <Link
              href="/"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/' ? 'text-brand-blue' : 'text-slate-600 hover:text-brand-blue'
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('solutions')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDropdown === 'solutions' || pathname.startsWith('/solutions')
                    ? 'text-brand-blue'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute left-0 mt-2 w-80 rounded-xl border border-brand-border bg-white p-2 shadow-lg ring-1 ring-black/5">
                  <div className="grid gap-1">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-all"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-cyan" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('about')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDropdown === 'about' || ['/about', '/leadership', '/nhs-framework', '/faq'].includes(pathname)
                    ? 'text-brand-blue'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                About
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-brand-border bg-white p-2 shadow-lg ring-1 ring-black/5">
                  <div className="grid gap-1">
                    {aboutLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-all"
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resources')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDropdown === 'resources' || pathname === '/demo'
                    ? 'text-brand-blue'
                    : 'text-slate-600 hover:text-brand-blue'
                }`}
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-brand-border bg-white p-2 shadow-lg ring-1 ring-black/5">
                  <div className="grid gap-1">
                    {resources.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition-all"
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/support"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/support' ? 'text-brand-blue' : 'text-slate-600 hover:text-brand-blue'
              }`}
            >
              Support
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/contact' ? 'text-brand-blue' : 'text-slate-600 hover:text-brand-blue'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center">
            <Button href="/demo" variant="primary" size="sm">
              Request a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-brand-navy focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/' ? 'bg-slate-55 text-brand-blue' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* Solutions header */}
            <div className="py-2 px-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Solutions
              </div>
              <div className="grid gap-1 pl-2">
                {solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-1.5 text-sm text-slate-600 hover:text-brand-navy"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* About header */}
            <div className="py-2 px-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                About
              </div>
              <div className="grid gap-1 pl-2">
                {aboutLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-1.5 text-sm text-slate-600 hover:text-brand-navy"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/support"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/support' ? 'bg-slate-50 text-brand-blue' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Support
            </Link>

            <Link
              href="/contact"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/contact' ? 'bg-slate-50 text-brand-blue' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 border-t border-brand-border">
            <Button href="/demo" variant="primary" size="md" className="w-full text-center">
              Request a Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
