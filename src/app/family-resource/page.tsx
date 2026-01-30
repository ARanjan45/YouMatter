"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import {
  Ribbon, Youtube, BookOpen, FileText, Loader2,
  Quote,
  // Icons for Family Resources Page
  HeartHandshake,
  MessageSquare,
  Users,
  Briefcase,
  Home,
  Baby,
  Smile
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


const FamilyResourcesPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const motivationalQuotes = [
    "A happy family is but an earlier heaven.",
    "The bond that links your true family is not one of blood, but of respect and joy in each other's life.",
    "Family is not an important thing. It's everything.",
    "The strength of a family, like the strength of an army, is in its loyalty to each other.",
    "Call it a clan, call it a network, call it a tribe, call it a family: whatever you call it, whoever you are, you need one."
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
        const familyVideos = await fetchYoutubeVideos("family mental health communication positive parenting family conflict");
        if (familyVideos.length === 0) {
          setVideoError("No videos found for this topic.");
        }
        setVideos(familyVideos);
      } catch (err) {
        setVideoError("Failed to load videos. Please try again later.");
        console.error("Failed to load family videos:", err);
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
        {/* Main Title and Intro - Updated for families */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-sky-400">
          Family Wellness & Support Resources
        </h1>
        <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
          Family life, in all its forms, is a source of immense joy and can also be a significant source of stress. From navigating the pressures of raising children to communicating with partners and extended family, these resources are designed to help you build a stronger, healthier family unit.
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

        {/* Types of Stress and Solutions - Updated for families */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-red-400">
            Building a Stronger Family
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Communication & Conflict */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <MessageSquare className="h-6 w-6 mr-2 text-sky-400" /> Communication & Conflict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Misunderstandings and disagreements are a normal part of family life. The key is not to avoid conflict, but to learn how to navigate it constructively.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Active Listening:</b> Give your full attention to others without preparing your own response.</li>
                    <li><b>Use "I" Statements:</b> Express your feelings and needs directly, rather than using accusatory "you" statements.</li>
                    <li><b>Family Meetings:</b> Set aside regular, low-pressure time to discuss issues and successes.</li>
                    <li><b>Validate Emotions:</b> Acknowledge the feelings of your family members, even if you don’t agree with them.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Parenting & Child Development */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Baby className="h-6 w-6 mr-2 text-pink-400" /> Parenting & Child Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> There is no one-size-fits-all approach to parenting. It’s a journey filled with uncertainty, and it's okay to seek guidance and support.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Positive Discipline:</b> Focus on teaching and guiding, rather than punishing.</li>
                    <li><b>Know the Stages:</b> Understand what is developmentally normal for your child's age.</li>
                    <li><b>Self-Care for Parents:</b> Remember that you cannot pour from an empty cup. Prioritize your own well-being.</li>
                    <li><b>Set Realistic Expectations:</b> Acknowledge that you and your children are not perfect.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Work-Life-Family Balance */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Briefcase className="h-6 w-6 mr-2 text-yellow-400" /> Work-Life-Family Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> The pressure to be a dedicated employee, an involved parent, and a supportive partner can feel overwhelming. It's a difficult balance to strike, and you're not alone in that struggle.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Set Boundaries:</b> Create clear separation between work hours and family time.</li>
                    <li><b>Share Responsibilities:</b> Communicate with your partner and children to delegate household tasks.</li>
                    <li><b>Schedule Family Time:</b> Treat family activities as important appointments that cannot be missed.</li>
                    <li><b>Learn to Say No:</b> It's okay to decline extra commitments that will strain your time and energy.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Major Life Transitions */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Home className="h-6 w-6 mr-2 text-emerald-400" /> Major Life Transitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Significant changes, whether exciting or difficult, can be stressful for every family member. It's valid to feel a mix of emotions and to seek support during these times.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Communicate Openly:</b> Talk to your family about the transition and listen to their concerns.</li>
                    <li><b>Maintain Routines:</b> Stick to as many normal routines as possible to provide a sense of stability.</li>
                    <li><b>Allow for Emotions:</b> Give everyone, including yourself, space to process and feel their emotions.</li>
                    <li><b>Celebrate Small Wins:</b> Acknowledge every step of the transition process, no matter how small.</li>
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

        {/* Suggested Books - Updated for families */}
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
                  <h4 className="font-semibold text-zinc-100">"The 5 Love Languages"</h4>
                  <p className="text-zinc-400 text-sm">by Gary Chapman</p>
                  <p className="text-sm">A guide to understanding how to express and receive love within a family.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"How to Talk So Kids Will Listen & Listen So Kids Will Talk"</h4>
                  <p className="text-zinc-400 text-sm">by Adele Faber and Elaine Mazlish</p>
                  <p className="text-sm">Practical communication strategies for building respectful relationships with children.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"The Whole-Brain Child: 12 Revolutionary Strategies to Nurture Your Child's Developing Mind"</h4>
                  <p className="text-zinc-400 text-sm">by Daniel J. Siegel and Tina Payne Bryson</p>
                  <p className="text-sm">Insights into how a child's brain develops and how to parent with that in mind.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"No Drama Discipline: The Whole-Brain Way to Calm the Chaos and Nurture Your Child's Developing Mind"</h4>
                  <p className="text-zinc-400 text-sm">by Daniel J. Siegel and Tina Payne Bryson</p>
                  <p className="text-sm">A guide to effective and compassionate discipline that avoids drama and promotes growth.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        <hr className="my-12 border-zinc-800" />

        {/* Articles & Text Resources - Updated for families */}
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
                  <a href="#" className="font-semibold text-sky-400 hover:underline">10 Tips for Healthier Family Communication</a>
                  <p className="text-zinc-400 text-sm">Simple steps to improve listening and speaking within your household.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">How to Co-Parent Effectively After Separation</a>
                  <p className="text-zinc-400 text-sm">Strategies for maintaining a cooperative relationship for the benefit of your children.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Building Resilience in Children and Teens</a>
                  <p className="text-zinc-400 text-sm">Learn how to help your kids cope with stress and bounce back from challenges.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Finding Balance: A Guide for Working Parents</a>
                  <p className="text-zinc-400 text-sm">Practical advice for managing professional and personal life without burnout.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">The Importance of Family Rituals and Traditions</a>
                  <p className="text-zinc-400 text-sm">How creating shared experiences can strengthen family bonds.</p>
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

export default FamilyResourcesPage;