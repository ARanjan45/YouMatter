"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@//components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import {
  Ribbon, Youtube, BookOpen, FileText, Loader2, // Existing icons
  Briefcase, Heart, DollarSign, Users, Baby, Quote // New icons for adult stress types
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


const AdultResourcesPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0); // Track current quote index for automatic change

  const motivationalQuotes = [
    "The only way out is through. Keep going, you're building resilience.",
    "Your present circumstances don't determine where you can go; they merely determine where you start.",
    "It's not about being perfect, it's about being better than you were yesterday.",
    "Don't let the fear of striking out keep you from playing the game.",
    "Every day is a new beginning. Take a deep breath and start again."
  ];

  useEffect(() => {
    // Set an initial random quote
    const initialIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuoteIndex(initialIndex);
    setCurrentQuote(motivationalQuotes[initialIndex]);

    // Set up automatic quote change
    const interval = setInterval(() => {
      setQuoteIndex(prevIndex => (prevIndex + 1) % motivationalQuotes.length);
    }, 10000); // Change quote every 10 seconds (10000 milliseconds)

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount for interval setup

  // Update currentQuote whenever quoteIndex changes
  useEffect(() => {
    setCurrentQuote(motivationalQuotes[quoteIndex]);
  }, [quoteIndex]); // Dependency array: run when quoteIndex changes


  // Load videos
  useEffect(() => {
    const loadVideos = async () => {
      setIsLoadingVideos(true);
      setVideoError('');
      try {
        const adultVideos = await fetchYoutubeVideos("adult mental health coping strategies work life balance relationships");
        if (adultVideos.length === 0) {
          setVideoError("No videos found for this topic.");
        }
        setVideos(adultVideos);
      } catch (err) {
        setVideoError("Failed to load videos. Please try again later.");
        console.error("Failed to load adult videos:", err);
      } finally {
        setIsLoadingVideos(false);
      }
    };
    loadVideos();
  }, []); // Empty dependency array means this runs once on mount

  const handleNextQuote = () => {
    // This function can still be used for manual advancement if needed,
    // it will just advance to the next quote in the sequence.
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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-sky-400">
          Adult Mental Health Resources (Ages 18-64)
        </h1>
        <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
          Adulthood brings unique joys and challenges. It's common to navigate career pressures, relationship complexities, financial strains, and major life transitions. Your well-being matters at every stage. These resources are here to offer practical strategies, supportive insights, and validation for the diverse experiences of adulthood.
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

        {/* Types of Stress and Solutions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-red-400">
            Understanding and Managing Adult Stress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work & Career Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Briefcase className="h-6 w-6 mr-2 text-sky-400" /> Work & Career Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Balancing career demands, professional growth, and personal life can be incredibly taxing. It's common to feel overwhelmed or pressured by workplace expectations and the desire to succeed.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Set Boundaries:</b> Learn to disconnect from work, especially outside of working hours.</li>
                    <li><b>Prioritize & Delegate:</b> Focus on key tasks and don't be afraid to ask for help or delegate.</li>
                    <li><b>Regular Breaks:</b> Incorporate short breaks, even just stretching, into your workday.</li>
                    <li><b>Skill Development:</b> Invest in learning new skills to boost confidence and open new opportunities.</li>
                    <li><b>Self-Care Routine:</b> Ensure you have activities that help you unwind and recharge.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Relationship Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Users className="h-6 w-6 mr-2 text-emerald-400" /> Relationship Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Maintaining healthy relationships (partners, friends, family) requires continuous effort and can be a source of stress. It's normal for dynamics to shift and for conflicts to arise.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Active Listening:</b> Truly hear and understand others' perspectives without interruption.</li>
                    <li><b>Express Needs Clearly:</b> Communicate your needs and boundaries respectfully.</li>
                    <li><b>Quality Time:</b> Dedicate focused time to connect with loved ones.</li>
                    <li><b>Seek Compromise:</b> Be open to finding middle ground in disagreements.</li>
                    <li><b>Couples/Family Counseling:</b> Consider professional support for persistent relationship issues.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Financial Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <DollarSign className="h-6 w-6 mr-2 text-yellow-400" /> Financial Strain
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Financial worries are a significant source of stress for many adults. It's natural to feel anxious about money, especially with rising costs and life's demands.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Budgeting:</b> Create a realistic budget to track income and expenses.</li>
                    <li><b>Emergency Fund:</b> Aim to build savings for unexpected costs.</li>
                    <li><b>Debt Management:</b> Develop a plan to reduce debt.</li>
                    <li><b>Financial Literacy:</b> Educate yourself on investments, savings, and financial planning.</li>
                    <li><b>Seek Professional Advice:</b> Consider talking to a financial advisor for guidance.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Parenting Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Baby className="h-6 w-6 mr-2 text-pink-400" /> Parenting & Family Life
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Parenting is one of the most rewarding yet challenging roles. It's okay to feel overwhelmed, exhausted, or unsure at times. There's no manual, and every parent struggles.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Time for Yourself:</b> Prioritize self-care, even small moments.</li>
                    <li><b>Seek Support:</b> Connect with other parents, friends, or family.</li>
                    <li><b>Manage Expectations:</b> Understand that perfection isn't achievable; focus on being a "good enough" parent.</li>
                    <li><b>Communicate with Partner:</b> Share responsibilities and discuss stressors openly.</li>
                    <li><b>Parenting Resources:</b> Read books, attend workshops, or seek professional guidance.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>
            
            {/* Health & Well-being Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Heart className="h-6 w-6 mr-2 text-red-400" /> Health & Personal Well-being
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> As adults, managing physical health, mental health, and personal growth becomes increasingly complex. It's valid to feel stressed about health concerns, aging, or maintaining a healthy lifestyle amidst busy schedules.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Regular Check-ups:</b> Prioritize routine medical and mental health appointments.</li>
                    <li><b>Balanced Lifestyle:</b> Focus on consistent sleep, nutrition, and physical activity.</li>
                    <li><b>Stress Reduction:</b> Incorporate mindfulness, meditation, or hobbies into your daily routine.</li>
                    <li><b>Mind-Body Connection:</b> Recognize how physical health impacts mental state and vice-versa.</li>
                    <li><b>Seek Expert Advice:</b> Don't hesitate to consult doctors, therapists, or dietitians.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* End Types of Stress and Solutions */}
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

        {/* Suggested Books */}
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
                  <h4 className="font-semibold text-zinc-100">"The 7 Habits of Highly Effective People"</h4>
                  <p className="text-zinc-400 text-sm">by Stephen Covey</p>
                  <p className="text-sm">Classic guide to personal and professional effectiveness.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"Burnout: The Secret to Unlocking the Stress Cycle"</h4>
                  <p className="text-zinc-400 text-sm">by Emily Nagoski and Amelia Nagoski</p>
                  <p className="text-sm">Understanding and completing the stress response cycle for women.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"Attached: The New Science of Adult Attachment and How It Can Help YouFind--and Keep--Love"</h4>
                  <p className="text-zinc-400 text-sm">by Amir Levine and Rachel Heller</p>
                  <p className="text-sm">Insights into adult relationships and attachment styles.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"Your Money or Your Life"</h4>
                  <p className="text-zinc-400 text-sm">by Vicki Robin and Joe Dominguez</p>
                  <p className="text-sm">A guide to financial independence and conscious spending.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        <hr className="my-12 border-zinc-800" />

        {/* Articles & Text Resources */}
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
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Strategies for Managing Work-Life Balance</a>
                  <p className="text-zinc-400 text-sm">Tips to prevent burnout and maintain well-being amidst career demands.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Effective Communication in Adult Relationships</a>
                  <p className="text-zinc-400 text-sm">Guides on fostering healthy and strong personal connections.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Navigating Major Life Transitions as an Adult</a>
                  <p className="text-zinc-400 text-sm">Advice for coping with change, grief, and new phases of life.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Mindfulness Techniques for Busy Adults</a>
                  <p className="text-zinc-400 text-sm">Simple practices to integrate mindfulness into daily routines.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Understanding and Overcoming Imposter Syndrome</a>
                  <p className="text-zinc-400 text-sm">Insights into a common professional challenge and strategies to build confidence.</p>
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

export default AdultResourcesPage;
