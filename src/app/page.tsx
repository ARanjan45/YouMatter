"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import {
  Ribbon,
  Brain,
  Users,
  Search,
  Phone,
  BookOpen,
  Book,
  Heart,
  Shield,
  MessageCircle,
  ArrowRight,
  Star,
  CheckCircle,
  LogIn,
  LogOut,
  EyeOffIcon,
  LucideScanEye,
  XIcon
} from 'lucide-react';
import { useUser, SignOutButton } from '@clerk/nextjs';

const crisishelp = "9152987821";

const MentalHealthLanding = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showVideo, setShowVideo] = useState(false);

  // Define the single video details here
  const featuredVideo = {
    title: "App Features Overview",
    youtubeId: "Nr9xfqtQ3dg"
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ribbon className="h-8 w-8 text-sky-400" />
            <span className="font-bold text-xl">YouMatter</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#feature" className="text-zinc-400 hover:text-zinc-100 transition-colors">Features</a>
            <a href="#wellness-hub" className="text-zinc-400 hover:text-zinc-100 transition-colors">Wellness Hub</a>
            <a href="#support" className="text-zinc-400 hover:text-zinc-100 transition-colors">Support</a>
            <a href="#about" className="text-zinc-400 hover:text-zinc-100 transition-colors">About</a>
            <Button
              variant="destructive"
              size="sm"
              className="animate-pulse"
              onClick={() => window.location.href = `tel:${crisishelp}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              Need Help?
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-zinc-800 text-zinc-300">
              Mental Health Support for Everyone
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              You're Not
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {" "}Alone{" "}
              </span>
              in This Journey
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional mental health support and resources designed for every age group.
              Take the first step toward wellness with our comprehensive, accessible platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/self-help" passHref>
                <Button size="lg" className="bg-sky-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg">
                  Find Resources Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/support" passHref>
                <Button variant="outline" size="lg" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 px-8 py-6 text-lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Support
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-zinc-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>All Ages Welcome</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
        </div>
      </section>

      {/* Crisis Banner */}
      <section className="bg-red-950/50 border-y border-red-900/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-red-100">Need immediate help?</h3>
              <p className="text-red-200/80">Crisis support is available 24/7</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="destructive" size="sm" onClick={() => window.location.href = `tel:${crisishelp}`}>
                Call {crisishelp}
              </Button>
              <Button variant="outline" size="sm" className="border-red-700 text-red-200 hover:bg-red-900/50">
                Text HOME to 741741
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div id="feature" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              We provide resources, tools, and support systems designed to meet you wherever you are in your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Link href="/education" passHref className="block">
              <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600/30 transition-colors">
                    <Brain className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-zinc-100">Mental Health Education</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Learn about conditions, symptoms, and treatments of various mental illness.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/support" passHref className="block">
              <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600/30 transition-colors">
                    <Phone className="h-6 w-6 text-red-400" />
                  </div>
                  <CardTitle className="text-zinc-100">24/7 Crisis Support</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Immediate access to crisis hotlines, text support, and emergency resources.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/self-help" passHref className="block">
              <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-600/30 transition-colors">
                    <BookOpen className="h-6 w-6 text-amber-400" />
                  </div>
                  <CardTitle className="text-zinc-100">Self-Help Resources</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Interactive tools, coping strategies, and wellness activities for all age groups.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Personalized Wellness Hub Section (for a new page) */}
      <section id="wellness-hub" className="py-20 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Cultivating Your Mental Garden
          </h2>
          {/* Conditional rendering based on Clerk authentication status */}
          {!isLoaded ? (
            // Show a loading state while Clerk is initializing
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">Loading authentication...</p>
          ) : isSignedIn ? (
            // User is signed in
            <div>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'}! Your personalized wellness hub is waiting.
              </p>
              <Link href="/my-wellness-hub" passHref>
                <Button size="lg" className="bg-sky-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg mr-4">
                  <Star className="mr-2 h-5 w-5" />
                  Go to My Hub
                </Button>
              </Link>
              {/* Corrected SignOutButton usage */}
              <SignOutButton>
                <Button
                  size="lg"
                  className="bg-zinc-600 hover:bg-zinc-700 text-white px-8 py-6 text-lg ml-4"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </SignOutButton>
            </div>
          ) : (
            // User is not signed in
            <div>
              <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
                Access your daily journal and connect with a peer support community by creating a free account. Your personalized wellness hub awaits!
              </p>
              {/* Updated Link href to match Clerk's routing structure */}
              <Link href="/sign-up" passHref>
                <Button size="lg" className="bg-sky-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg mr-4">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign Up
                </Button>
              </Link>
              <Link href="/sign-in" passHref>
                <Button size="lg" className="bg-sky-600 hover:bg-cyan-700 text-white px-8 py-6 text-lg ml-4">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Age Groups Section */}
      <section id="support" className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Support for Every Life Stage
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Tailored mental health resources that understand the unique challenges of each age group.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="bg-zinc-900/60 border-zinc-700 text-center hover:border-emerald-600/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4">🧑‍🎓</div>
                <CardTitle className="text-zinc-100">Teens (13-17)</CardTitle>
                <CardDescription className="text-zinc-400">
                  School stress, identity, relationships, and transition support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/teen-resource" passHref>
                  <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                    Explore Teen Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/60 border-zinc-700 text-center hover:border-cyan-600/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4">👨‍💼</div>
                <CardTitle className="text-zinc-100">Adults (18-64)</CardTitle>
                <CardDescription className="text-zinc-400">
                  Work stress, relationships, life transitions, and family challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/adult-resource" passHref>
                  <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                    Explore Adult Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/60 border-zinc-700 text-center hover:border-purple-600/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4">👴</div>
                <CardTitle className="text-zinc-100">Seniors (65+)</CardTitle>
                <CardDescription className="text-zinc-400">
                  Health changes, grief, isolation, and aging-related concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/senior-resource" passHref>
                  <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                    Explore Senior Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/60 border-zinc-700 text-center hover:border-pink-600/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <CardTitle className="text-zinc-100">Families</CardTitle>
                <CardDescription className="text-zinc-400">
                  Supporting loved ones and navigating mental health as a family unit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/family-resource" passHref>
                  <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                    Explore Family Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials/Stats Section */}
      <section className="py-20" id="about">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">10K+</div>
              <div className="text-zinc-300 font-medium mb-2">People Helped</div>
              <div className="text-zinc-500 text-sm">Individuals connected to mental health resources</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-zinc-300 font-medium mb-2">Support Available</div>
              <div className="text-zinc-500 text-sm">Round-the-clock crisis intervention and support</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-zinc-300 font-medium mb-2">Resources</div>
              <div className="text-zinc-500 text-sm">Comprehensive mental health tools and information</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Wanna Know How YouMatter Is A Life Changer?
          </h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Your mental health journey starts with a single step. Let us help you find the right resources and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Embedded video thumbnail that opens a dialog */}
            <Card
              className="relative w-full max-w-3xl mx-auto h-auto bg-emerald-900/20 hover:bg-emerald-900/30 border-emerald-700/30 hover:border-emerald-600/50 transition-all duration-300 cursor-pointer group overflow-hidden rounded-lg"
              onClick={() => setShowVideo(true)}
            >
              <CardContent className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                  <Image
                    src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg opacity-0 group-hover:opacity-100">
                    <div className="bg-emerald-600 hover:bg-emerald-500 rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-[700px] w-full p-0 overflow-hidden bg-zinc-900 border-zinc-700">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            {/* Close button with a new color */}
            <button
              onClick={handleVideoClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-emerald-600/50 text-white hover:bg-emerald-600/80 transition-colors"
            >
              <XIcon className="h-6 w-6" />
            </button>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1`}
              title={featuredVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer id="about" className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Ribbon className="h-6 w-6 text-sky-400" />
                <span className="font-bold text-lg">YouMatter</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4">
                Comprehensive mental health support for individuals and families of all ages.
              </p>
              <div className="flex items-center space-x-2 text-zinc-500">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Safe & Secure</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-zinc-200">Crisis Resources</h4>
              <div className="space-y-2 text-sm">
                <div className="text-zinc-400">Call {crisishelp} - Crisis Lifeline</div>
                <div className="text-zinc-400">Text HOME to 741741</div>
                <div className="text-zinc-400">911 - Emergency</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-zinc-200">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#feature" className="text-zinc-400 hover:text-zinc-200 block">Features</a>
                <a href="#wellness-hub" className="text-zinc-400 hover:text-zinc-200 block">Wellness Hub</a>
                <a href="#support" className="text-zinc-400 hover:text-zinc-200 block">Support</a>
                <a href="#about" className="text-zinc-400 hover:text-zinc-200 block">About Us</a>
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

export default MentalHealthLanding;