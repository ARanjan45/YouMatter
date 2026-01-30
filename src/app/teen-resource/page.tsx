"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { 
  Ribbon, Youtube, BookOpen, FileText, Loader2, // Existing icons
  GraduationCap, Users, Home, Lightbulb, Heart, Quote
} from 'lucide-react'; // New icons for stress types and quotes

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


const TeenResourcesPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0); // Track current quote index for automatic change

  const motivationalQuotes = [
    "Your feelings are valid. Take a deep breath. You're stronger than you think.",
    "Growth often comes after challenges. Every step forward, no matter how small, counts.",
    "It's okay to ask for help. You don't have to carry everything alone.",
    "Embrace who you are. Your uniqueness is your superpower.",
    "The most important conversations you'll have are with yourself. Be kind."
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
        const teenVideos = await fetchYoutubeVideos("teen mental health comprehensive guide coping strategies");
        if (teenVideos.length === 0) {
          setVideoError("No videos found for this topic.");
        }
        setVideos(teenVideos);
      } catch (err) {
        setVideoError("Failed to load videos. Please try again later.");
        console.error("Failed to load teen videos:", err);
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
        <h1 className="text-4x1 md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-sky-400">
          Teen Mental Health Resources (Ages 13-17)
        </h1>
        <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
          Being a teen comes with unique pressures and experiences. It's okay not to be okay, and these resources are here to offer support, coping strategies, and understanding for the wide range of emotions and challenges you might face, from academic stress and social pressures to identity exploration and emotional well-being. You are not alone.
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
            Understanding and Managing Teen Stress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <GraduationCap className="h-6 w-6 mr-2 text-sky-400" /> Academic Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> It's completely normal to feel overwhelmed by school, grades, and future plans. The pressure to succeed can be intense. Your worth isn't defined by your grades.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Time Management: </b>Break down big tasks into smaller, manageable steps. Use a planner.</li>
                    <li><b>Prioritize:</b> Identify what's most important and focus there first.</li>
                    <li><b>Breaks:</b> Step away from studying for short, regular breaks to clear your mind.</li>
                    <li><b>Talk to Teachers/Counselors:</b> They are there to support you and can offer extensions or strategies.</li>
                    <li><b>Healthy Habits:</b> Ensure you're getting enough sleep, good nutrition, and exercise.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Social Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Users className="h-6 w-6 mr-2 text-emerald-400" /> Social Pressures & Friendships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Friendships can be complicated, and social media often creates unrealistic expectations. Feeling left out or pressured is a tough experience, and many teens go through it. Being authentic is more valuable than fitting in.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Limit Social Media:</b>  Take breaks from apps that make you feel bad.</li>
                    <li><b>Seek True Friends:</b>  Focus on relationships where you feel accepted and valued.</li>
                    <li><b>Say No:</b>  Learn to set boundaries and decline things you're uncomfortable with.</li>
                    <li><b>Get Involved:</b> Join clubs or activities where you can meet like-minded people.</li>
                    <li><b>Practice Self-Compassion:</b>  Be as kind to yourself as you would be to a friend.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Family Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
              <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Home className="h-6 w-6 mr-2 text-red-400" /> Family Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Family dynamics can be challenging, especially during your teenage years. It's okay to feel stressed or confused by changes at home or parental expectations. Your feelings are valid, even if family members don't always understand them.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Open Communication:</b> Try to express your feelings calmly, using "I feel" statements.</li>
                    <li><b>Find a Safe Adult:</b> Talk to another trusted family member, a counselor, or a teacher.</li>
                    <li><b>Healthy Boundaries:</b> Learn to set personal limits while still showing respect.</li>
                    <li><b>Focus on What You Can Control:</b> You can't change others, but you can control your reactions.</li>
                    <li><b>Seek Professional Guidance:</b> If family conflict is severe, consider family counseling if possible.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Identity & Future Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Lightbulb className="h-6 w-6 mr-2 text-purple-400" /> Identity & Future Uncertainty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Figuring out who you are and what you want to do with your life is a huge, sometimes overwhelming, journey. It's okay not to have all the answers right now. This is a time of discovery, not definitive decisions.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Explore Interests:</b> Try new hobbies, classes, or volunteer opportunities.</li>
                    <li><b>Talk to Mentors:</b> Seek advice from adults you admire (teachers, coaches, family friends).</li>
                    <li><b>Journaling:</b> Write down your thoughts, values, and aspirations.</li>
                    <li><b>Small Steps:</b> Focus on short-term goals rather than the entire future at once.</li>
                    <li><b>Self-Reflection:</b> Understand your strengths, weaknesses, and what truly makes you happy.</li>
                  </ul>
                </p>
              </CardContent>
            </Card>

            {/* Emotional Well-being Stress */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center text-2xl">
                  <Heart className="h-6 w-6 mr-2 text-pink-400" /> Emotional Overwhelm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 mb-3">
                  <b>Validation:</b> Hormonal changes, life events, and pressures can lead to intense mood swings, irritability, or feelings of sadness and anger. It's valid to feel this way, and learning to manage these emotions is a key part of growing up.
                </p>
                <p className="text-zinc-300 mb-3">
                  <b>Solutions:</b>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li><b>Practice Mindfulness:</b> Pay attention to your feelings without judgment.</li>
                    <li><b>Healthy Outlets:</b> Find constructive ways to express emotions (e.g., exercise, art, music, talking).</li>
                    <li><b>Identify Triggers:</b> Try to understand what makes you feel a certain way.</li>
                    <li><b>Relaxation Techniques:</b> Deep breathing, meditation, or progressive muscle relaxation.</li>
                    <li><b>Reach Out:</b> Talk to a trusted friend, family member, or mental health professional.</li>
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
                  <h4 className="font-semibold text-zinc-100">"The Teen's Guide to Social Skills: Unwritten Rules, Body Language, and More"</h4>
                  <p className="text-zinc-400 text-sm">by Rachel Eddins, M.Ed., LPC-S</p>
                  <p className="text-sm">Helps navigate social anxieties and build confidence in various situations.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"Untangled: Guiding Teenage Girls Through the Seven Transitions into Adulthood"</h4>
                  <p className="text-zinc-400 text-sm">by Lisa Damour, PhD</p>
                  <p className="text-sm">Offers insights for teens and parents on key developmental phases.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"The 7 Habits of Highly Effective Teens"</h4>
                  <p className="text-zinc-400 text-sm">by Sean Covey</p>
                  <p className="text-sm">Adaptation of the classic, focusing on self-improvement, friendship, and success.</p>
                </li>
                <li>
                  <h4 className="font-semibold text-zinc-100">"Beyond the Blues: A Guide to Understanding and Managing Depression in Teens"</h4>
                  <p className="text-zinc-400 text-sm">by Lisa M. Schab, LCSW</p>
                  <p className="text-sm">Provides practical tools for teens to cope with depression and improve mood.</p>
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
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Dealing with Academic Pressure and Stress</a>
                  <p className="text-zinc-400 text-sm">Strategies to manage school-related anxiety and maintain balance.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Navigating Friendships and Peer Pressure</a>
                  <p className="text-zinc-400 text-sm">Tips for building healthy relationships and standing up for yourself.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Understanding Body Image and Self-Esteem</a>
                  <p className="text-zinc-400 text-sm">Guidance on developing a positive self-image and embracing individuality.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">Coping with Family Changes and Challenges</a>
                  <p className="text-zinc-400 text-sm">Support for adapting to family transitions like divorce or relocation.</p>
                </li>
                <li>
                  <a href="#" className="font-semibold text-sky-400 hover:underline">When to Seek Help: Recognizing Signs of Mental Health Struggles</a>
                  <p className="text-zinc-400 text-sm">Information on identifying mental health concerns and where to find professional support.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer (copied for consistency) */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© 2025 YouMatter. Your path to well-being.</p>
        </div>
      </footer>
    </div>
  );
};

export default TeenResourcesPage;
