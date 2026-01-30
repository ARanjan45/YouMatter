"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from 'next/link';
import {
  Ribbon, Youtube, BookOpen, FileText, Loader2, // Existing icons
  Briefcase, Heart, DollarSign, Users, Baby, Quote, // New icons for adult stress types
  // New icons for senior page
  HeartHandshake,  // For social connection
  GraduationCap, // For lifelong learning
  TreePine, // For nature/hobbies
  Handshake, // For community
  Syringe, // For health
  Bot, // A suitable replacement for Gemini
  Smile, // For happiness
  CalendarDays, // For routines
  Sprout, // For growth
  PawPrint // For pets
} from 'lucide-react';

// Re-using the Video interface and fetchYoutubeVideos function for self-containment
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

const fetchYoutubeVideos = async (query: string): Promise<Video[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

  try {
    const response = await fetch(YOUTUBE_API_URL);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
};


const SeniorResourcesPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const motivationalQuotes = [
    "Age is a matter of mind over matter. If you don’t mind, it doesn’t matter.",
    "The best way to predict the future is to create it. It’s never too late to start something new.",
    "To be seventy years young is sometimes more cheerful and hopeful than to be forty years old.",
    "Aging is not lost youth but a new stage of opportunity and strength.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail."
  ];

  useEffect(() => {
    const initialIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuoteIndex(initialIndex);
    setCurrentQuote(motivationalQuotes[initialIndex]);

    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % motivationalQuotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentQuote(motivationalQuotes[quoteIndex]);
  }, [quoteIndex]);


  useEffect(() => {
    const loadVideos = async () => {
      setIsLoadingVideos(true);
      setVideoError('');
      try {
        // Updated query for senior citizens
        const seniorVideos = await fetchYoutubeVideos("mental health for seniors aging gracefully retirement tips staying active");
        if (seniorVideos.length === 0) {
          setVideoError("No videos found for this topic.");
        }
        setVideos(seniorVideos);
      } catch (err) {
        setVideoError("Failed to load videos. Please try again later.");
        console.error("Failed to load senior videos:", err);
      } finally {
        setIsLoadingVideos(false);
      }
    };
    loadVideos();
  }, []);

  const handleNextQuote = () => {
    setQuoteIndex(prevIndex => (prevIndex + 1) % motivationalQuotes.length);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-backdrop-filter:bg-zinc-950/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ribbon className="h-8 w-8 text-sky-400" />
            <span className="font-bold text-xl">YouMatter</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Home
            </Link>
            <Link href="/wellness-hub" className="text-zinc-400 hover:text-zinc-100 transition-colors">
              Wellness Hub
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Main Title and Intro - Updated for seniors */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-sky-400">
          Senior Mental Health Resources (Ages 65+)
        </h1>
        <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
          The golden years are a time for reflection, new experiences, and continued growth. It's also a period of significant change, including retirement, health shifts, and evolving relationships. Your well-being is vital at every stage of life. These resources are curated to offer support, wisdom, and practical guidance for living a rich and fulfilling life.
        </p>

        {/* Dynamic Quote Section */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center text-2xl">
                <Quote className="h-6 w-6 mr-2 text-amber-400" /> Daily Inspiration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl italic text-zinc-300 mb-4">"{currentQuote}"</p>
            </CardContent>
          </Card>
        </section>

        {/* Types of Stress and Solutions - Updated for seniors */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-red-400">
            Navigating the Challenges of Later Life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Health & Personal Well-being Stress - Reordered to be first */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Syringe className="h-6 w-6 mr-2 text-red-400" /> Health & Wellness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Health concerns can become more prominent with age, and it's natural to feel anxious about managing physical and mental changes. It's a sign of strength to proactively care for yourself.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Routine Check-ups:</b> Stay on top of regular medical appointments and screenings.</li>
                    <li><b>Stay Active:</b> Incorporate gentle exercises like walking, swimming, or yoga into your daily routine.</li>
                    <li><b>Brain Health:</b> Engage in mentally stimulating activities like puzzles, reading, or learning new skills.</li>
                    <li><b>Good Sleep:</b> Prioritize consistent sleep patterns for physical and mental restoration.</li>
                    <li><b>Nutrition:</b> Focus on a balanced diet rich in whole foods to support your body's needs.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Social Connection Stress - New category */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <HeartHandshake className="h-6 w-6 mr-2 text-emerald-400" /> Social Connection & Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> It's common to experience loneliness or a loss of identity after retirement or a change in living situation. Finding new ways to connect and contribute is a vital part of healthy aging.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Community Involvement:</b> Join local clubs, senior centers, or community groups.</li>
                    <li><b>Reconnect:</b> Actively reach out to friends and family, using technology like video calls to bridge distances.</li>
                    <li><b>Volunteer:</b> Find a cause you care about and donate your time and wisdom.</li>
                    <li><b>New Hobbies:</b> Explore new interests like gardening, painting, or learning an instrument.</li>
                    <li><b>Intergenerational Connections:</b> Spend time with grandchildren or mentor younger people.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Financial Stress - Updated for fixed income */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <DollarSign className="h-6 w-6 mr-2 text-yellow-400" /> Financial Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Managing finances on a fixed income and planning for long-term care can be a source of worry. It is a prudent and responsible concern to address.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Create a Budget:</b> Review your monthly income and expenses to ensure financial stability.</li>
                    <li><b>Consult a Professional:</b> Speak with a financial advisor specializing in retirement planning.</li>
                    <li><b>Understand Benefits:</b> Make sure you are aware of and utilizing all available government or private benefits.</li>
                    <li><b>Review Documents:</b> Keep your will, power of attorney, and other legal documents up-to-date.</li>
                    <li><b>Estate Planning:</b> Consider discussing your wishes with family to alleviate future stress for everyone.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Lifelong Learning & Joy - New category */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Sprout className="h-6 w-6 mr-2 text-pink-400" /> Finding Joy & Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Life doesn't stop at 65. The desire for continued personal growth and happiness is a natural and wonderful part of the human experience.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Learn Something New:</b> Take a class, attend a workshop, or learn a new language or skill.</li>
                    <li><b>Embrace Technology:</b> Learn to use apps and devices to connect with others and access information.</li>
                    <li><b>Travel & Explore:</b> Discover new places, whether it's a nearby park or a faraway city.</li>
                    <li><b>Practice Gratitude:</b> Take time each day to reflect on the good things in your life.</li>
                    <li><b>Document Your Story:</b> Consider writing a memoir, journaling, or creating a family history to share your life experiences.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <hr className="my-12 border-zinc-800" />

        {/* Video Resources */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center text-2xl">
                <Youtube className="h-6 w-6 mr-2 text-red-500" /> Video Guides & Talks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingVideos ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
                  <p className="ml-2 text-zinc-400">Loading videos...</p>
                </div>
              ) : videoError ? (
                <p className="text-red-400 text-center">{videoError}</p>
              ) : videos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/480x270/334155/E2E8F0?text=No+Image`; }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-zinc-100 group-hover:text-sky-400 line-clamp-2 mb-2">{video.title}</h3>
                        <p className="text-zinc-400 text-sm flex items-center">
                          <Youtube className="h-4 w-4 mr-1 text-red-500" /> Watch on YouTube
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 text-center">No videos found for this topic at the moment. Please check back later!</p>
              )}
            </CardContent>
          </Card>
        </section>
        <hr className="my-12 border-zinc-800" />

        {/* Suggested Books - Updated for seniors */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center text-2xl">
                <BookOpen className="h-6 w-6 mr-2 text-purple-400" /> Recommended Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-zinc-300">
                <li>
                  <h4 className="font-semibold text-zinc-100">"The 100-Year Life: Living and Working in an Age of Longevity"</h4>
                  <p className="text-zinc-400 text-sm">by Lynda Gratton and Andrew Scott</p>
                  <p className="text-sm">A look at how longer lives will change the way we live, work, and learn.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"Being Mortal: Medicine and What Matters in the End"</h4>
                  <p className="text-zinc-400 text-sm">by Atul Gawande</p>
                  <p className="text-sm">A powerful exploration of aging, dying, and how modern medicine can better serve us.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"The Joy of Later Life: Creating a Happy and Fulfilling Future"</h4>
                  <p className="text-zinc-400 text-sm">by Penny Smith</p>
                  <p className="text-sm">Practical and inspiring advice for living a vibrant life after 65.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"The Healthy Mind, Healthy Body: A Guide to Optimal Aging"</h4>
                  <p className="text-zinc-400 text-sm">by Dr. Andrew Weil</p>
                  <p className="text-sm">Holistic strategies for physical, mental, and spiritual well-being in later life.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        <hr className="my-12 border-zinc-800" />

        {/* Articles & Text Resources - Updated for seniors */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center text-2xl">
                <FileText className="h-6 w-6 mr-2 text-emerald-400" /> Articles & Readings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-zinc-300">
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Tips for Staying Mentally Sharp as You Age</a>
                  <p className="text-zinc-400 text-sm">Techniques to improve cognitive function and memory.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Finding New Purpose in Retirement</a>
                  <p className="text-zinc-400 text-sm">A guide to transitioning from a career to a fulfilling new chapter.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Managing Grief and Loss in Later Life</a>
                  <p className="text-zinc-400 text-sm">Coping strategies for dealing with the loss of loved ones or independence.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Maintaining Healthy Relationships with Adult Children</a>
                  <p className="text-zinc-400 text-sm">Advice for navigating changing family dynamics and boundaries.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Exercising for Longevity: A Senior's Guide</a>
                  <p className="text-zinc-400 text-sm">Safe and effective physical activities to support health and mobility.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer (copied for consistency) */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© Developed with love by Aprajita</p>
        </div>
      </footer>
    </div>
  );
};

export default SeniorResourcesPage;