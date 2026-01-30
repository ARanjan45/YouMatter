"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Info, Heart, ArrowLeft, Lightbulb, Mail, Shield, Brain } from 'lucide-react';

const MentalHealthHelplines = () => {
  const userPhoneNumber = "+91 8102198960";

  const generalHelplines = [
    { name: "Tele-MANAS", number: "14416 / 1800-891-4416", description: "Government of India initiative, 24/7 mental health support in 20+ languages.", availability: "24/7" },
    { name: "Vandrevala Foundation", number: "+91 99996 66555", description: "Free 24/7 mental health counselling and crisis intervention.", availability: "24/7" },
    { name: "NIMHANS Helpline", number: "080-46110007", description: "National Institute of Mental Health and Neurosciences, provides medical advice, counseling, and rehabilitation.", availability: "24/7" },
    { name: "iCALL (TISS)", number: "022-25521111", description: "Tata Institute of Social Sciences helpline, provides psychosocial support.", availability: "Mon-Sat: 10 AM - 8 PM" },
    { name: "Mann Talks", number: "+91 86861 39139", description: "Counselling support.", availability: "9 AM - 8 PM, 7 days a week" },
    { name: "Arpita Foundation", number: "+91 80 23655557 / +91 80 23656667", description: "Non-profit providing professional guidance and counselling.", availability: "7 AM - 9 PM, 7 days a week" },
  ];

  const crisisHelplines = [
    { name: "988 - Crisis Lifeline (India)", number: "988", description: "National crisis and suicide prevention lifeline.", availability: "24/7" },
    { name: "KIRAN Mental Health Rehabilitation Helpline", number: "1800-599-0019", description: "24/7 toll-free mental health rehabilitation helpline in 13 languages.", availability: "24/7" },
    { name: "Jeevan Aastha Helpline", number: "1800-233-3330", description: "Suicide prevention and mental health counseling helpline.", availability: "24/7" },
    { name: "Aasra", number: "+91 98204 66726", description: "Crisis intervention center for the lonely, distressed, and suicidal.", availability: "24/7" },
    { name: "One Life", number: "78930-78930", description: "Suicide Prevention & Crisis support.", availability: "5 AM - 12 AM, 7 days a week" },
    { name: "Connecting Trust", number: "+91 99220 04305", description: "Assistance with mental health concerns, crisis intervention.", availability: "12 PM - 8 PM, 7 days a week" },
    { name: "Fortis Stress Helpline", number: "+91 83768 04102", description: "24/7 multilingual stress helpline.", availability: "24/7" },
    { name: "Lifeline Foundation (Kolkata)", number: "+91 90880 30303", description: "Psychosocial support.", availability: "10 AM - 10 PM, 7 days a week" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-backdrop-filter:bg-zinc-950/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-emerald-400" />
            <span className="font-bold text-xl">YouMatter</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" onClick={() => window.history.back()} className="text-zinc-400 hover:text-zinc-100 transition-colors flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section for Helplines */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Immediate Mental Health Support
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find essential helpline numbers for mental health support across India. You are not alone.
          </p>
        </div>
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-500/10 blur-3xl"></div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
        </div>
      </section>

      {/* Your Personal Support Number */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Personal Support Line</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              This is our dedicated support number. Share it with those who need to reach us directly for support.
            </p>
          </div>
          <div className="flex justify-center">
            <Card className="bg-zinc-900/60 border-zinc-700 text-center p-6 rounded-xl shadow-lg w-full max-w-md">
              <CardHeader className="pb-4">
                <div className="text-5xl mb-4 text-emerald-400 flex justify-center">
                  <Heart className="h-12 w-12" />
                </div>
                <CardTitle className="text-zinc-100 text-3xl">Our Number</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-emerald-300 mb-4">{userPhoneNumber}</p>
                <Button
                  onClick={() => window.location.href = `tel:${userPhoneNumber.replace(/\s/g, '')}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg rounded-full"
                >
                  <Phone className="mr-2 h-5 w-5" /> Call Us
                </Button>
                <p className="text-zinc-500 text-sm mt-4">
                  (Note: This is Our personal number for direct support.)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Before You Call Guidance */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-zinc-900/60 border-zinc-700 p-8 rounded-xl max-w-3xl mx-auto">
            <CardHeader className="pb-4">
              <div className="text-4xl mb-4 flex justify-center text-blue-400">
                <Lightbulb className="h-10 w-10" />
              </div>
              <CardTitle className="text-zinc-100 text-2xl">Before You Call</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400 text-md text-left space-y-4">
              <p>
                Reaching out for support is a brave step. Here's what you can expect and how to prepare for your call:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <span className="font-semibold text-zinc-300">Confidentiality:</span> Your conversations are private and confidential. Helplines are committed to protecting your privacy.
                </li>
                <li>
                  <span className="font-semibold text-zinc-300">What to Expect:</span> You'll speak with a trained professional or volunteer who will listen without judgment and offer support, resources, or guidance.
                </li>
                <li>
                  <span className="font-semibold text-zinc-300">Preparing for the Call:</span> Find a quiet space where you feel comfortable speaking openly. It can be helpful to have a few notes ready about what you're feeling or what you'd like to discuss, but it's not necessary.
                </li>
                <li>
                  <span className="font-semibold text-zinc-300">Emergency Situations:</span> If you are in immediate danger or believe someone else is, please call your local emergency services (like 112 in India) immediately. Helplines are for support, not typically for direct emergency intervention.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* General Mental Health Helplines Section */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              General Mental Health Helplines
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Connect with professionals and volunteers for general mental health support and guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {generalHelplines.map((helpline, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600/30 transition-colors">
                    <Phone className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-zinc-100">{helpline.name}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    {helpline.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                  <div className="text-zinc-300 font-semibold text-lg">{helpline.number}</div>
                  <div className="text-zinc-500 text-sm">Availability: {helpline.availability}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-emerald-600 text-emerald-300 hover:bg-emerald-900/50"
                    onClick={() => window.location.href = `tel:${helpline.number.replace(/\s/g, '').replace(/\//g, '')}`}
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis and Suicide Prevention Helplines Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Crisis & Suicide Prevention Helplines
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              If you or someone you know is in immediate danger, please reach out to these crisis lines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {crisisHelplines.map((helpline, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600/30 transition-colors">
                    <MessageCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <CardTitle className="text-zinc-100">{helpline.name}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    {helpline.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                  <div className="text-zinc-300 font-semibold text-lg">{helpline.number}</div>
                  <div className="text-zinc-500 text-sm">Availability: {helpline.availability}</div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4 px-6 py-3 text-lg rounded-full"
                    onClick={() => window.location.href = `tel:${helpline.number.replace(/\s/g, '').replace(/\//g, '')}`}
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Suggest a Helpline Section */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-zinc-900/60 border-zinc-700 p-8 rounded-xl max-w-3xl mx-auto">
            <CardHeader className="pb-4">
              <div className="text-4xl mb-4 flex justify-center text-purple-400">
                <Mail className="h-10 w-10" />
              </div>
              <CardTitle className="text-zinc-100 text-2xl">Suggest a Helpline</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400 text-md">
              <p className="mb-4">
                Know of a valuable mental health helpline that isn't listed here? We'd love to hear about it! Your suggestions help us keep our resources comprehensive and up-to-date for everyone.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&to=beliefinaprajita@gmail.com&su=New Helpline Suggestion&body=Helpline Name:%0D%0AContact Number:%0D%0ADescription:%0D%0AAvailability:"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-600 text-purple-300 hover:bg-purple-900/50"
                >
                  <Mail className="mr-2 h-5 w-5" /> Suggest Now
                </Button>
              </a>
              <p className="text-zinc-500 text-sm mt-4">
                (Clicking "Suggest Now" will open your email client.)
              </p>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-zinc-900/60 border-zinc-700 p-8 rounded-xl max-w-3xl mx-auto">
            <CardHeader className="pb-4">
              <div className="text-4xl mb-4 flex justify-center text-yellow-400">
                <Info className="h-10 w-10" />
              </div>
              <CardTitle className="text-zinc-100 text-2xl">Important Note</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-400 text-md">
              <p>
                This page provides a list of mental health helplines in India. While we strive to keep this information accurate and up-to-date,
                availability and services may vary. Always verify the details with the respective organizations.
              </p>
              <p className="mt-4">
                If you are in immediate danger, please contact your local emergency services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-emerald-400" />
                <span className="font-bold text-lg">YouMatter</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                Comprehensive mental health support for individuals and families of all ages.
              </p>
              <div className="flex items-center space-x-2 text-zinc-500">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Confidential & Secure</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-zinc-200">Crisis Resources</h4>
              <div className="space-y-2 text-sm">
                <div className="text-zinc-400">988 - Crisis Lifeline</div>
                <div className="text-zinc-400">Text HOME to 741741</div>
                <div className="text-zinc-400">112 - Emergency (India)</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-zinc-200">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" onClick={() => window.history.back()} className="text-zinc-400 hover:text-zinc-200 block">Back to Home</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Support Groups</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Professional Help</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">About Us</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-zinc-200">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Privacy Policy</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Terms of Service</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Medical Disclaimer</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Accessibility</a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
            <p>© Developed with love by Aprajita</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthHelplines;
