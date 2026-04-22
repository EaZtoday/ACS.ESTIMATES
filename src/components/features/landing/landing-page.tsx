"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Calendar, 
  Calculator, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Star,
  Menu,
  X,
  User
} from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Card, CardContent } from "@/components/ui/primitives/card";

interface LandingPageProps {
  user: any;
}

export function LandingPage({ user }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Alexander&apos;s <span className="text-teal-600">Cleaning</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium hover:text-teal-600 transition-colors">Services</Link>
            <Link href="#about" className="text-sm font-medium hover:text-teal-600 transition-colors">About</Link>
            <Link href="/acs-estimates" className="text-sm font-medium hover:text-teal-600 transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> Calculator
            </Link>
            {user ? (
              <Button asChild variant="default" className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
                <Link href="/dashboard">
                  <User className="w-4 h-4" /> Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild variant="ghost" className="text-sm font-medium">
                <Link href="/auth/login">Log in</Link>
              </Button>
            )}
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
              <Link href="/book">Book Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-b bg-white px-4 py-6 flex flex-col gap-4"
          >
            <Link href="#services" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="#about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/acs-estimates" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Price Calculator</Link>
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/auth/login">Log in</Link>
                </Button>
              )}
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                className="flex-1 text-center lg:text-left"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6">
                  <Star className="w-4 h-4 fill-teal-500 text-teal-500" />
                  <span>Serving Scranton & NEPA since 2024</span>
                </motion.div>
                <motion.h1 
                  variants={fadeIn}
                  className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
                >
                  Scranton&apos;s Choice for <br />
                  <span className="text-teal-600 underline decoration-teal-200 underline-offset-8 italic">Crystal Clear</span> Windows
                </motion.h1>
                <motion.p 
                  variants={fadeIn}
                  className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Professional, family-owned window cleaning that treats your home like our own. 
                  Get your free instant estimate today and see the difference.
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white h-14 px-8 text-lg rounded-xl shadow-lg shadow-teal-600/20 group">
                    <Link href="/book" className="flex items-center gap-2">
                      Get an Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-slate-200 hover:bg-slate-50">
                    <Link href="/acs-estimates" className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" /> Pricing Tool
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div variants={fadeIn} className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-semibold uppercase tracking-wider text-xs">Fully Insured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold uppercase tracking-wider text-xs">5-Star Rated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold uppercase tracking-wider text-xs">NEPA Local</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex-1 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                   <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative group">
                      {/* Background placeholder pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-slate-900 opacity-90"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="text-white text-center p-8">
                            <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-2xl font-bold mb-2">Quality You Can See Through</h3>
                            <p className="text-teal-100 opacity-80">Serving residential and commercial properties.</p>
                         </div>
                      </div>
                      
                      {/* Floating overlay card */}
                      <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium">Job Completed</p>
                            <p className="text-sm font-bold">Scranton, PA</p>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why NEPA Chooses Alexander&apos;s</h2>
              <p className="text-lg text-slate-600">We&apos;re not just another window cleaning company. We&apos;re your neighbors, dedicated to excellence.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-6 h-6 text-teal-600" />,
                  title: "Streak-Free Finish",
                  description: "Our multi-step cleaning process ensures every pane is crystal clear with no residues left behind."
                },
                {
                  icon: <Calendar className="w-6 h-6 text-teal-600" />,
                  title: "Easy Online Booking",
                  description: "No more waiting for callbacks. See our real-time availability and book your appointment in seconds."
                },
                {
                  icon: <Calculator className="w-6 h-6 text-teal-600" />,
                  title: "Instant Estimates",
                  description: "Our proprietary pricing engine gives you an accurate quote instantly based on your home size."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
                  title: "Safety First",
                  description: "We use professional-grade equipment and are fully insured to protect your property and our team."
                },
                {
                  icon: <User className="w-6 h-6 text-teal-600" />,
                  title: "Family Owned",
                  description: "As a local family business, we take immense pride in our work and our community relationships."
                },
                {
                  icon: <Star className="w-6 h-6 text-teal-600" />,
                  title: "Satisfaction Guaranteed",
                  description: "If you're not 100% happy with your windows, we'll come back and fix it for free. No questions asked."
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/10 skew-x-12 transform origin-top translate-x-20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready for a Clearer View?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Join hundreds of happy customers in the Scranton area. 
              Book your appointment today or get an instant price estimate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white h-16 px-10 text-xl rounded-xl w-full sm:w-auto">
                <Link href="/book">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 text-white h-16 px-10 text-xl rounded-xl w-full sm:w-auto">
                <Link href="/acs-estimates">Price Calculator</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>Questions? Call (570) 614-9595</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-600" />
                <span>Serving all of Lackawanna & Luzerne Counties</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Alexander&apos;s <span className="text-teal-600">Cleaning</span>
              </span>
            </div>
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Alexander&apos;s Cleaning Service. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/auth/login" className="text-sm text-slate-400 hover:text-slate-600">Admin Login</Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-slate-600">Privacy Policy</Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-slate-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
