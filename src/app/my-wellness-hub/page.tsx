"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from 'next/link';
import {
  Ribbon,
  BookOpen,
  Users,
  Search,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send,
  Shield,
  Star,
  Smile, // For mood/feeling
  Meh,   // For mood/feeling
  Frown, // For mood/feeling
  Droplet, // For water intake
  Plus,
  Minus,
  Calendar, // For period tracker and date-based logs
  Activity,
  ArrowLeft, // General wellness icon
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import Chatbot from '@/src/app/chatbot/chatbot';

// --- Interfaces for Tracker Data ---
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface MoodEntry {
  id: string;
  mood: string;
  notes?: string | null;
  date: string; // ISO string
  userId: string;
}

interface WaterIntakeEntry {
  id: string;
  glassesCount: number;
  date: string; // ISO string
  userId: string;
}

interface PeriodTrackerEntry {
  id: string;
  severity: string; // e.g., "None", "Mild", "Moderate", "Severe"
  notes?: string | null;
  date: string; // ISO string
  userId: string;
}

interface DailyFeelingLogEntry {
  id: string;
  feelingEmoji: string;
  notes?: string | null;
  timestamp: string; // ISO string for exact time
  userId: string;
}

const WellnessHubPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  // Journal States
  const [journalEntryContent, setJournalEntryContent] = useState('');
  const [pastEntries, setPastEntries] = useState<JournalEntry[]>([]);
  const [isSavingJournal, setIsSavingJournal] = useState(false);
  const [journalError, setJournalError] = useState('');

  // Mood Tracker States (overall daily mood)
  const [currentMood, setCurrentMood] = useState<string>('');
  const [moodNotes, setMoodNotes] = useState<string>('');
  const [pastMoods, setPastMoods] = useState<MoodEntry[]>([]);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const [moodError, setMoodError] = useState('');

  // Water Intake States
  const [waterCount, setWaterCount] = useState<number>(0);
  const [pastWaterIntakes, setPastWaterIntakes] = useState<WaterIntakeEntry[]>([]);
  const [isSavingWater, setIsSavingWater] = useState(false);
  const [waterError, setWaterError] = useState('');

  // Period Tracker States
  const [periodSeverity, setPeriodSeverity] = useState<string>('');
  const [periodNotes, setPeriodNotes] = useState<string>('');
  const [pastPeriodEntries, setPastPeriodEntries] = useState<PeriodTrackerEntry[]>([]);
  const [isSavingPeriod, setIsSavingPeriod] = useState(false);
  const [periodError, setPeriodError] = useState('');

  // Daily Feeling Log States (multiple per day)
  const [currentFeelingEmoji, setCurrentFeelingEmoji] = useState<string>('');
  const [feelingLogNotes, setFeelingLogNotes] = useState<string>('');
  const [pastFeelingLogs, setPastFeelingLogs] = useState<DailyFeelingLogEntry[]>([]);
  const [isSavingFeelingLog, setIsSavingFeelingLog] = useState(false);
  const [feelingLogError, setFeelingLogError] = useState('');


  // General UI States
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [resourceQuery, setResourceQuery] = useState('');
  const [generatedResource, setGeneratedResource] = useState('');
  const [isLoadingResource, setIsLoadingResource] = useState(false);
  const [resourceError, setResourceError] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // --- Data Fetching Effects ---

  // Fetch Journal Entries
  useEffect(() => {
    const fetchJournalEntries = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const response = await fetch('/api/journal', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`Failed to fetch journal entries: ${response.statusText}`);
        const data: JournalEntry[] = await response.json();
        setPastEntries(data);
      } catch (error: any) {
        console.error("Error fetching journal entries:", error);
        setJournalError("Failed to load past journal entries.");
      }
    };
    fetchJournalEntries();
  }, [isLoaded, isSignedIn, user]);

  // Fetch Mood Entries
  useEffect(() => {
    const fetchMoodEntries = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const response = await fetch('/api/mood', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`Failed to fetch mood entries: ${response.statusText}`);
        const data: MoodEntry[] = await response.json();
        setPastMoods(data);
        const today = new Date().toLocaleDateString();
        const moodToday = data.find(m => new Date(m.date).toLocaleDateString() === today);
        if (moodToday) {
          setCurrentMood(moodToday.mood);
          setMoodNotes(moodToday.notes || '');
        }
      } catch (error: any) {
        console.error("Error fetching mood entries:", error);
        setMoodError("Failed to load past mood entries.");
      }
    };
    fetchMoodEntries();
  }, [isLoaded, isSignedIn, user]);

  // Fetch Water Intake Entries
  useEffect(() => {
    const fetchWaterIntakes = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const response = await fetch('/api/water', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`Failed to fetch water intakes: ${response.statusText}`);
        const data: WaterIntakeEntry[] = await response.json();
        setPastWaterIntakes(data);
        const today = new Date().toLocaleDateString();
        const waterToday = data.find(w => new Date(w.date).toLocaleDateString() === today);
        if (waterToday) {
          setWaterCount(waterToday.glassesCount);
        } else {
          setWaterCount(0); // Reset for a new day if no entry
        }
      } catch (error: any) {
        console.error("Error fetching water intakes:", error);
        setWaterError("Failed to load past water intakes.");
      }
    };
    fetchWaterIntakes();
  }, [isLoaded, isSignedIn, user]);

  // Fetch Period Entries
  useEffect(() => {
    const fetchPeriodEntries = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const response = await fetch('/api/period', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`Failed to fetch period entries: ${response.statusText}`);
        const data: PeriodTrackerEntry[] = await response.json();
        setPastPeriodEntries(data);
        const today = new Date().toLocaleDateString();
        const periodToday = data.find(p => new Date(p.date).toLocaleDateString() === today);
        if (periodToday) {
          setPeriodSeverity(periodToday.severity);
          setPeriodNotes(periodToday.notes || '');
        } else {
          setPeriodSeverity('');
          setPeriodNotes('');
        }
      } catch (error: any) {
        console.error("Error fetching period entries:", error);
        setPeriodError("Failed to load past period entries.");
      }
    };
    fetchPeriodEntries();
  }, [isLoaded, isSignedIn, user]);

  // Fetch Daily Feeling Logs
  useEffect(() => {
    const fetchFeelingLogs = async () => {
      if (!isLoaded || !isSignedIn || !user) return;
      try {
        const response = await fetch('/api/feeling', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!response.ok) throw new Error(`Failed to fetch feeling logs: ${response.statusText}`);
        const data: DailyFeelingLogEntry[] = await response.json();
        setPastFeelingLogs(data);
      } catch (error: any) {
        console.error("Error fetching feeling logs:", error);
        setFeelingLogError("Failed to load past feeling logs.");
      }
    };
    fetchFeelingLogs();
  }, [isLoaded, isSignedIn, user]);


  // --- Save Functions ---

  const saveJournalEntry = async () => {
    if (!journalEntryContent.trim()) {
      setJournalError("Journal entry cannot be empty.");
      return;
    }
    if (!isSignedIn || !user) {
      setJournalError("You must be logged in to save journal entries.");
      return;
    }

    setIsSavingJournal(true);
    setJournalError('');

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
          content: journalEntryContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save journal entry: ${response.statusText}`);
      }

      const newEntry: JournalEntry = await response.json();
      setPastEntries([newEntry, ...pastEntries]);
      setJournalEntryContent('');

      console.log("Journal entry saved successfully:", newEntry);
    } catch (error: any) {
      console.error("Error saving journal entry:", error);
      setJournalError(`Failed to save entry: ${error.message}`);
    } finally {
      setIsSavingJournal(false);
    }
  };

  const saveMoodEntry = async () => {
    if (!currentMood) {
      setMoodError("Please select your mood.");
      return;
    }
    if (!isSignedIn || !user) {
      setMoodError("You must be logged in to save your mood.");
      return;
    }

    setIsSavingMood(true);
    setMoodError('');

    try {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: currentMood,
          notes: moodNotes,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save mood entry: ${response.statusText}`);
      }

      const upsertedMood: MoodEntry = await response.json();
      setPastMoods(prevMoods => {
        const existingIndex = prevMoods.findIndex(m => new Date(m.date).toLocaleDateString() === new Date(upsertedMood.date).toLocaleDateString());
        if (existingIndex > -1) {
          const updatedMoods = [...prevMoods];
          updatedMoods[existingIndex] = upsertedMood;
          return updatedMoods;
        } else {
          return [upsertedMood, ...prevMoods].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      });
      console.log("Mood entry saved successfully:", upsertedMood);
    } catch (error: any) {
      console.error("Error saving mood entry:", error);
      setMoodError(`Failed to save mood: ${error.message}`);
    } finally {
      setIsSavingMood(false);
    }
  };

  const saveWaterIntake = async () => {
    if (waterCount < 0) {
      setWaterError("Water intake cannot be negative.");
      return;
    }
    if (!isSignedIn || !user) {
      setWaterError("You must be logged in to save water intake.");
      return;
    }

    setIsSavingWater(true);
    setWaterError('');

    try {
      const response = await fetch('/api/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          glassesCount: waterCount,
          date: new Date().toISOString(), // Log for today
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save water intake: ${response.statusText}`);
      }

      const upsertedWater: WaterIntakeEntry = await response.json();
      setPastWaterIntakes(prevIntakes => {
        const existingIndex = prevIntakes.findIndex(w => new Date(w.date).toLocaleDateString() === new Date(upsertedWater.date).toLocaleDateString());
        if (existingIndex > -1) {
          const updatedIntakes = [...prevIntakes];
          updatedIntakes[existingIndex] = upsertedWater;
          return updatedIntakes;
        } else {
          return [upsertedWater, ...prevIntakes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      });
      console.log("Water intake upserted successfully:", upsertedWater);
    } catch (error: any) {
      console.error("Error saving water intake:", error);
      setWaterError(`Failed to save water intake: ${error.message}`);
    } finally {
      setIsSavingWater(false);
    }
  };

  const savePeriodEntry = async () => {
    if (!periodSeverity) {
      setPeriodError("Please select cramp severity.");
      return;
    }
    if (!isSignedIn || !user) {
      setPeriodError("You must be logged in to save period data.");
      return;
    }

    setIsSavingPeriod(true);
    setPeriodError('');

    try {
      const response = await fetch('/api/period', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          severity: periodSeverity,
          notes: periodNotes,
          date: new Date().toISOString(), // Log for today
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save period entry: ${response.statusText}`);
      }

      const upsertedPeriod: PeriodTrackerEntry = await response.json();
      setPastPeriodEntries(prevEntries => {
        const existingIndex = prevEntries.findIndex(p => new Date(p.date).toLocaleDateString() === new Date(upsertedPeriod.date).toLocaleDateString());
        if (existingIndex > -1) {
          const updatedEntries = [...prevEntries];
          updatedEntries[existingIndex] = upsertedPeriod;
          return updatedEntries;
        } else {
          return [upsertedPeriod, ...prevEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      });
      console.log("Period entry upserted successfully:", upsertedPeriod);
    } catch (error: any) {
      console.error("Error saving period entry:", error);
      setPeriodError(`Failed to save period data: ${error.message}`);
    } finally {
      setIsSavingPeriod(false);
    }
  };

  const saveFeelingLog = async () => {
    if (!currentFeelingEmoji) {
      setFeelingLogError("Please select a feeling emoji.");
      return;
    }
    if (!isSignedIn || !user) {
      setFeelingLogError("You must be logged in to save your feeling.");
      return;
    }

    setIsSavingFeelingLog(true);
    setFeelingLogError('');

    try {
      const response = await fetch('/api/feeling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feelingEmoji: currentFeelingEmoji,
          notes: feelingLogNotes,
          timestamp: new Date().toISOString(), // Log with current timestamp
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save feeling log: ${response.statusText}`);
      }

      const newFeelingLog: DailyFeelingLogEntry = await response.json();
      setPastFeelingLogs(prevLogs => [newFeelingLog, ...prevLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      setCurrentFeelingEmoji('');
      setFeelingLogNotes('');
      console.log("Feeling log created successfully:", newFeelingLog);
    } catch (error: any) {
      console.error("Error saving feeling log:", error);
      setFeelingLogError(`Failed to save feeling: ${error.message}`);
    } finally {
      setIsSavingFeelingLog(false);
    }
  };

  // Function to fetch personalized resources using Gemini API with exponential backoff
  const fetchPersonalizedResource = async () => {
  if (!resourceQuery.trim()) {
    setResourceError("Please enter a query.");
    return;
  }

  setIsLoadingResource(true);
  setGeneratedResource("");
  setResourceError("");

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: resourceQuery,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Failed to generate resource";

      // 🔥 SAFELY extract error message
      if (typeof data?.error === "string") {
        errorMessage = data.error;
      } else if (typeof data?.error === "object" && data?.error !== null) {
        errorMessage =
          data?.error?.message ||
          JSON.stringify(data.error);
      }

      throw new Error(errorMessage);
    }

    // ✅ SUCCESS
    setGeneratedResource(data.text);
  } catch (error: any) {
    console.error("Error fetching personalized resource:", error);
    setResourceError(error.message || "Something went wrong");
  } finally {
    setIsLoadingResource(false);
  }
};





  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
        <p className="ml-2">Loading user data...</p>
      </div>
    );
  }

  // Helper for mood/feeling icons
  const getIconForMood = (mood: string) => {
    switch (mood) {
      case 'Happy': return <Smile className="h-5 w-5 text-emerald-400" />;
      case 'Neutral': return <Meh className="h-5 w-5 text-amber-400" />;
      case 'Sad': return <Frown className="h-5 w-5 text-red-400" />;
      case 'Anxious': return <Frown className="h-5 w-5 text-purple-400" />;
      case 'Energetic': return <Smile className="h-5 w-5 text-cyan-400" />;
      default: return <Star className="h-5 w-5 text-zinc-400" />;
    }
  };

  const getEmojiForFeeling = (emoji: string) => {
    return <span className="text-2xl leading-none">{emoji}</span>;
  }

  const getPeriodSeverityColor = (severity: string) => {
    switch (severity) {
      case 'None': return 'text-emerald-400';
      case 'Mild': return 'text-yellow-400';
      case 'Moderate': return 'text-amber-400';
      case 'Severe': return 'text-red-400';
      default: return 'text-zinc-400';
    }
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
            {/* User Button */}
            <div className="flex items-center space-x-2">
              <span className="text-zinc-300 text-sm hidden sm:block">
                Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split('@')[0] || 'User'}!
              </span>
              <UserButton afterSignOutUrl="/" /> {/* Clerk's UserButton */}
            </div>

          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className='mb-4 px-3'>
          <Link href="/">
          <Button className='cursor-pointer gap-1.5'>
            <ArrowLeft /> Back to Home
          </Button>
        
        </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-emerald-400">
          Your Personalized Wellness Hub
        </h1>

        {/* Journaling Option */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md"> 
            <CardHeader className="p-0 mb-3"> 
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold pb-2 border-b border-emerald-700/50"> 
                <BookOpen className="h-6 w-6 mr-2 text-emerald-400" /> 
                Daily Journal
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base"> 
                Reflect on your thoughts and feelings. Entries are saved to your profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0"> 
              <textarea
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-30 text-sm" 
                placeholder="What's on your mind today?"
                value={journalEntryContent}
                onChange={(e) => setJournalEntryContent(e.target.value)}
              ></textarea>
              
              <Button
                className="mt-4 w-full sm:w-auto px-6 py-2 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-md shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center" 
                onClick={saveJournalEntry}
                disabled={isSavingJournal || !journalEntryContent.trim()} 
              >
                {isSavingJournal ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <BookOpen className="h-4 w-4 mr-2" />
                )}
                {isSavingJournal ? 'Saving...' : 'Save Entry'}
              </Button>
              {journalError && (
                <p className="text-red-400 text-sm mt-2 text-center sm:text-left">{journalError}</p>
              )}
              {pastEntries.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-700/50"> 
                  <h3 className="text-xl font-bold text-zinc-200 mb-4">Your Past Entries:</h3> 
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar"> 
                    {pastEntries.map((entry) => (
                      <Card 
                        key={entry.id} 
                        className="bg-zinc-800 border border-zinc-700 rounded-md shadow-sm hover:shadow-md transition-shadow duration-150 p-4" 
                      >
                        <CardHeader className="p-0 pb-2 mb-2 border-b border-zinc-600/50">
                          <CardTitle className="text-lg font-semibold text-emerald-300"> 
                            {entry.title}
                          </CardTitle>
                          <CardDescription className="text-zinc-400 text-xs">
                            {new Date(entry.createdAt).toLocaleString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <p className="text-zinc-300 whitespace-pre-wrap leading-normal text-sm">{entry.content}</p> 
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Wellness Tracker Section: Refined */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Tracker Card */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold pb-2 border-b border-amber-700/50">
                <Star className="h-6 w-6 mr-2 text-amber-400" />
                Daily Mood Log
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base">
                Track your overall mood for the day.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="moodSelect" className="block text-zinc-300 text-sm font-medium mb-2">How are you feeling today?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Happy', 'Neutral', 'Sad', 'Anxious', 'Energetic'].map((moodOption) => (
                      <Button
                        key={moodOption}
                        variant={currentMood === moodOption ? 'default' : 'outline'}
                        className={`
                          ${currentMood === moodOption 
                            ? (moodOption === 'Happy' ? 'bg-emerald-600 hover:bg-emerald-700' 
                               : moodOption === 'Neutral' ? 'bg-amber-600 hover:bg-amber-700' 
                               : moodOption === 'Sad' ? 'bg-red-600 hover:bg-red-700'
                               : moodOption === 'Anxious' ? 'bg-purple-600 hover:bg-purple-700'
                               : moodOption === 'Energetic' ? 'bg-cyan-600 hover:bg-cyan-700'
                               : '')
                            : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                          }
                          px-4 py-2 rounded-md shadow-sm transition-colors flex items-center
                        `}
                        onClick={() => setCurrentMood(moodOption)}
                      >
                        {getIconForMood(moodOption)}
                        <span className="ml-2">{moodOption}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="moodNotes" className="block text-zinc-300 text-sm font-medium mb-2">Optional notes:</label>
                  <textarea
                    id="moodNotes"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500 min-h-20 text-sm"
                    placeholder="Briefly describe your mood or what affected it..."
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                  ></textarea>
                </div>

                <Button
                  className="mt-4 w-full sm:w-auto px-6 py-2 bg-linear-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold rounded-md shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  onClick={saveMoodEntry}
                  disabled={isSavingMood || !currentMood}
                >
                  {isSavingMood ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Star className="h-4 w-4 mr-2" />
                  )}
                  {isSavingMood ? 'Saving Mood...' : 'Log Mood'}
                </Button>
                {moodError && (
                  <p className="text-red-400 text-sm mt-2 text-center sm:text-left">{moodError}</p>
                )}
              </div>

              {pastMoods.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-700/50">
                  <h3 className="text-xl font-bold text-zinc-200 mb-4">Past Moods:</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar"> {/* Smaller max-height */}
                    {pastMoods.map((moodEntry) => (
                      <Card 
                        key={moodEntry.id} 
                        className="bg-zinc-800 border border-zinc-700 rounded-md shadow-sm p-4"
                      >
                        <CardHeader className="p-0 pb-2 mb-2 border-b border-zinc-600/50">
                          <CardTitle className="text-lg font-semibold text-amber-300 flex items-center">
                            {getIconForMood(moodEntry.mood)}
                            <span className="ml-2">{moodEntry.mood}</span>
                          </CardTitle>
                          <CardDescription className="text-zinc-400 text-xs">
                            {new Date(moodEntry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          {moodEntry.notes && (
                            <p className="text-zinc-300 whitespace-pre-wrap leading-normal text-sm">{moodEntry.notes}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Water Intake Card */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold pb-2 border-b border-blue-700/50">
                <Droplet className="h-6 w-6 mr-2 text-blue-400" />
                Daily Water Intake
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base">
                Track your hydration throughout the day. (8 glasses is recommended!)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col space-y-4 items-center">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12 w-12 rounded-full text-xl font-bold"
                    onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
                  >
                    <Minus className="h-6 w-6" />
                  </Button>
                  <div className="text-6xl font-extrabold text-blue-400 relative">
                    {waterCount}
                    <Droplet className="absolute bottom-0 right-0 h-8 w-8 text-blue-500 opacity-70" />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-12 w-12 rounded-full text-xl font-bold"
                    onClick={() => setWaterCount(waterCount + 1)}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
                <Button
                  className="mt-4 w-full sm:w-auto px-6 py-2 bg-linear-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold rounded-md shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  onClick={saveWaterIntake}
                  disabled={isSavingWater}
                >
                  {isSavingWater ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Droplet className="h-4 w-4 mr-2" />
                  )}
                  {isSavingWater ? 'Saving Intake...' : 'Log Water Intake'}
                </Button>
                {waterError && (
                  <p className="text-red-400 text-sm mt-2 text-center">{waterError}</p>
                )}
              </div>

              {pastWaterIntakes.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-700/50">
                  <h3 className="text-xl font-bold text-zinc-200 mb-4">Past Water Intakes:</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {pastWaterIntakes.map((entry) => (
                      <Card 
                        key={entry.id} 
                        className="bg-zinc-800 border border-zinc-700 rounded-md shadow-sm p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Droplet className="h-5 w-5 mr-2 text-blue-400" />
                          <span className="text-lg text-blue-300 font-semibold">{entry.glassesCount} Glasses</span>
                        </div>
                        <CardDescription className="text-zinc-400 text-xs">
                          {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </CardDescription>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Period Tracker Card (occupies full width below for better layout) */}
          <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold pb-2 border-b border-pink-700/50">
                <Calendar className="h-6 w-6 mr-2 text-pink-400" />
                Period Cramp Tracker
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base">
                Log the severity of your cramps for the day.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="periodSeveritySelect" className="block text-zinc-300 text-sm font-medium mb-2">Cramp Severity Today:</label>
                  <div className="flex flex-wrap gap-2">
                    {['None', 'Mild', 'Moderate', 'Severe'].map((severityOption) => (
                      <Button
                        key={severityOption}
                        variant={periodSeverity === severityOption ? 'default' : 'outline'}
                        className={`
                          ${periodSeverity === severityOption 
                            ? (severityOption === 'None' ? 'bg-emerald-600 hover:bg-emerald-700' 
                               : severityOption === 'Mild' ? 'bg-yellow-600 hover:bg-yellow-700' 
                               : severityOption === 'Moderate' ? 'bg-amber-600 hover:bg-amber-700'
                               : severityOption === 'Severe' ? 'bg-red-600 hover:bg-red-700'
                               : '')
                            : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                          }
                          px-4 py-2 rounded-md shadow-sm transition-colors flex items-center
                        `}
                        onClick={() => setPeriodSeverity(severityOption)}
                      >
                        {severityOption === 'None' && <span className="text-xl mr-2">😊</span>}
                        {severityOption === 'Mild' && <span className="text-xl mr-2">🙂</span>}
                        {severityOption === 'Moderate' && <span className="text-xl mr-2">😐</span>}
                        {severityOption === 'Severe' && <span className="text-xl mr-2">😫</span>}
                        {severityOption}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="periodNotes" className="block text-zinc-300 text-sm font-medium mb-2">Optional notes:</label>
                  <textarea
                    id="periodNotes"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-pink-500 min-h-20 text-sm"
                    placeholder="Any additional notes about your period today..."
                    value={periodNotes}
                    onChange={(e) => setPeriodNotes(e.target.value)}
                  ></textarea>
                </div>

                <Button
                  className="mt-4 w-full sm:w-auto px-6 py-2 bg-linear-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold rounded-md shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  onClick={savePeriodEntry}
                  disabled={isSavingPeriod || !periodSeverity}
                >
                  {isSavingPeriod ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Calendar className="h-4 w-4 mr-2" />
                  )}
                  {isSavingPeriod ? 'Saving Entry...' : 'Log Period Entry'}
                </Button>
                {periodError && (
                  <p className="text-red-400 text-sm mt-2 text-center sm:text-left">{periodError}</p>
                )}
              </div>

              {pastPeriodEntries.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-700/50">
                  <h3 className="text-xl font-bold text-zinc-200 mb-4">Past Period Entries:</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {pastPeriodEntries.map((entry) => (
                      <Card 
                        key={entry.id} 
                        className="bg-zinc-800 border border-zinc-700 rounded-md shadow-sm p-4"
                      >
                        <CardHeader className="p-0 pb-2 mb-2 border-b border-zinc-600/50">
                          <CardTitle className={`text-lg font-semibold flex items-center ${getPeriodSeverityColor(entry.severity)}`}>
                            {entry.severity === 'None' && <span className="text-xl mr-2">😊</span>}
                            {entry.severity === 'Mild' && <span className="text-xl mr-2">🙂</span>}
                            {entry.severity === 'Moderate' && <span className="text-xl mr-2">😐</span>}
                            {entry.severity === 'Severe' && <span className="text-xl mr-2">😫</span>}
                            {entry.severity}
                          </CardTitle>
                          <CardDescription className="text-zinc-400 text-xs">
                            {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          {entry.notes && (
                            <p className="text-zinc-300 whitespace-pre-wrap leading-normal text-sm">{entry.notes}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Feeling Log Card */}
          <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold pb-2 border-b border-purple-700/50">
                <Activity className="h-6 w-6 mr-2 text-purple-400" />
                Time-Based Feeling Log
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base">
                Log your feelings multiple times a day with an emoji.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="feelingEmojiSelect" className="block text-zinc-300 text-sm font-medium mb-2">What are you feeling right now?</label>
                  <div className="flex flex-wrap gap-2">
                    {['😀', '😊', '😐', '😔', '�', '😮', '😴', '🥳'].map((emojiOption) => (
                      <Button
                        key={emojiOption}
                        variant={currentFeelingEmoji === emojiOption ? 'default' : 'outline'}
                        className={`
                          ${currentFeelingEmoji === emojiOption ? 'bg-purple-600 hover:bg-purple-700' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
                          px-4 py-2 rounded-md shadow-sm transition-colors text-2xl
                        `}
                        onClick={() => setCurrentFeelingEmoji(emojiOption)}
                      >
                        {emojiOption}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="feelingLogNotes" className="block text-zinc-300 text-sm font-medium mb-2">Optional notes:</label>
                  <textarea
                    id="feelingLogNotes"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-20 text-sm"
                    placeholder="Add a brief note about this feeling..."
                    value={feelingLogNotes}
                    onChange={(e) => setFeelingLogNotes(e.target.value)}
                  ></textarea>
                </div>

                <Button
                  className="mt-4 w-full sm:w-auto px-6 py-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-md shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  onClick={saveFeelingLog}
                  disabled={isSavingFeelingLog || !currentFeelingEmoji}
                >
                  {isSavingFeelingLog ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Activity className="h-4 w-4 mr-2" />
                  )}
                  {isSavingFeelingLog ? 'Saving Feeling...' : 'Log Feeling'}
                </Button>
                {feelingLogError && (
                  <p className="text-red-400 text-sm mt-2 text-center sm:text-left">{feelingLogError}</p>
                )}
              </div>

              {pastFeelingLogs.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-700/50">
                  <h3 className="text-xl font-bold text-zinc-200 mb-4">Past Feeling Logs:</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {pastFeelingLogs.map((entry) => (
                      <Card 
                        key={entry.id} 
                        className="bg-zinc-800 border border-zinc-700 rounded-md shadow-sm p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          {getEmojiForFeeling(entry.feelingEmoji)}
                          {entry.notes && <span className="ml-3 text-zinc-300 text-sm truncate">{entry.notes}</span>}
                        </div>
                        <CardDescription className="text-zinc-400 text-xs text-right">
                          {new Date(entry.timestamp).toLocaleString()}
                        </CardDescription>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Peer Support Community */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold">
                <Users className="h-6 w-6 mr-2 text-cyan-400" />
                Peer Support Community
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base">
                Connect with others who understand.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-zinc-300 mb-4 text-sm">
                Our community offers a safe space to share experiences, offer support, and find encouragement.
                Join discussions, ask questions, and build connections.
              </p>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md shadow-md">
                <Link href="https://peer-connect-beryl.vercel.app/" passHref  target="_blank" rel="noopener noreferrer">
                  Join the Community
                </Link>
              </Button>
              <p>Let's connect with your peers and help each other win this battle</p>
            </CardContent>
          </Card>
        </section>

        {/* Personalized Resources from Web */}
        <section className="mb-12">
          <Card className="bg-zinc-900/50 border-zinc-800 p-4 rounded-lg shadow-md">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-zinc-100 flex items-center text-2xl font-bold">
                <Search className="h-6 w-6 mr-2 text-purple-400" />
                Personalized Resources
              </CardTitle>
              <CardDescription className="text-zinc-400 mt-1 text-base">
                Ask for tips, information, or guidance on any mental well-being topic.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  className="grow p-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm"
                  placeholder="e.g., 'coping with anxiety', 'mindfulness exercises', 'dealing with stress'"
                  value={resourceQuery}
                  onChange={(e) => setResourceQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      fetchPersonalizedResource();
                    }
                  }}
                />
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
                  onClick={fetchPersonalizedResource}
                  disabled={isLoadingResource}
                >
                  {isLoadingResource ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {resourceError && (
                <p className="text-red-400 text-sm mt-2">{resourceError}</p>
              )}
              {generatedResource && (
                <div className="mt-4 p-3 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-300 text-sm">
                  <h3 className="text-lg font-semibold text-zinc-200 mb-2">Your Resource:</h3>
                  <p className="whitespace-pre-wrap leading-normal">{generatedResource}</p>
                </div>
              )}
              <Button
                className="mt-4 bg-sky-600 hover:bg-sky-700 text-white flex items-center px-4 py-2 rounded-md shadow-md"
                onClick={() => setIsChatbotOpen(true)}
              >
                Didn't help? Ask ChatMenti <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

      </main>

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
                <span className="text-xs">HIPAA Compliant & Secure</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-zinc-200">Crisis Resources</h4>
              <div className="space-y-2 text-sm">
                <div className="text-zinc-400">988 - Crisis Lifeline</div>
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
      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
    </div>
  );
};

export default WellnessHubPage;
