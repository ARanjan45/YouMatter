"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, BookOpen, MessageCircle, ArrowLeft, Heart, Users, Briefcase, Frown, Sparkles, Sun, Smile, CloudRain, Clock, Ghost } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

// --- DATA: Quiz Definitions ---
const quizzes = [
  {
    id: 'anxiety',
    title: 'Anxiety',
    icon: <CloudRain className="h-6 w-6 text-sky-400" />,
    description: 'Understand and manage feelings of worry and unease.',
    questions: [
      { id: 1, text: 'Feeling nervous, anxious, or on edge?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Not being able to stop or control worrying?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Worrying too much about different things?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Trouble relaxing?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Being so restless that it is hard to sit still?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'depression',
    title: 'Depression',
    icon: <Frown className="h-6 w-6 text-purple-400" />,
    description: 'Assess feelings of sadness and loss of interest in activities.',
    questions: [
      { id: 1, text: 'Little interest or pleasure in doing things?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Feeling down, depressed, or hopeless?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Feeling tired or having little energy?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Poor appetite or overeating?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'burnout',
    title: 'Burnout',
    icon: <Briefcase className="h-6 w-6 text-amber-400" />,
    description: 'Evaluate feelings of exhaustion and work-related stress.',
    questions: [
      { id: 1, text: 'Feeling exhausted and drained?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Feeling cynical or detached from your work?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Having difficulty concentrating at work?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Feeling like you have little control over your work?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Feeling less effective and productive?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'stress',
    title: 'Stress',
    icon: <Users className="h-6 w-6 text-red-400" />,
    description: 'Get an understanding of your current stress levels.',
    questions: [
      { id: 1, text: 'Feeling overwhelmed by your responsibilities?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Having difficulty sleeping due to worries?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Experiencing physical symptoms of stress (e.g., headaches, muscle tension)?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Finding it hard to relax or calm down?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Feeling irritable or easily frustrated?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'grief',
    title: 'Grief',
    icon: <Ghost className="h-6 w-6 text-gray-400" />,
    description: 'A quiz to help you navigate feelings of loss.',
    questions: [
      { id: 1, text: 'Experiencing intense sadness or yearning for a lost loved one?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Feeling emotionally numb or detached?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Having difficulty accepting the reality of the loss?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Finding it difficult to function or carry on with life?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Feeling a sense of emptiness or loneliness?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'loneliness',
    title: 'Loneliness',
    icon: <Users className="h-6 w-6 text-blue-400" />,
    description: 'Explore feelings of social isolation and disconnection.',
    questions: [
      { id: 1, text: 'Feeling isolated from others?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Lacking companionship or a sense of belonging?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Feeling like no one understands you?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Struggling to connect with people?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Having a fear of being alone?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'self-esteem',
    title: 'Low Self-Esteem',
    icon: <Sparkles className="h-6 w-6 text-pink-400" />,
    description: 'Assess feelings of self-worth and confidence.',
    questions: [
      { id: 1, text: 'Feeling worthless or a burden to others?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Being overly critical of yourself?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Feeling like you are not good enough?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Having difficulty accepting compliments?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Feeling inadequate compared to others?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'anger',
    title: 'Anger Issues',
    icon: <Heart className="h-6 w-6 text-orange-400" />,
    description: 'A brief check-in on feelings of anger and frustration.',
    questions: [
      { id: 1, text: 'Feeling easily irritated or quick to get angry?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Having outbursts of temper you later regret?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Feeling resentful or bitter towards others?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Having trouble controlling your temper?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Losing your temper over minor things?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'insomnia',
    title: 'Insomnia',
    icon: <Clock className="h-6 w-6 text-indigo-400" />,
    description: 'Evaluate your sleep patterns and quality.',
    questions: [
      { id: 1, text: 'Difficulty falling asleep?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Waking up frequently during the night?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Waking up earlier than you wanted to?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Feeling tired or sleepy during the day?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Feeling dissatisfied with your sleep?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
  {
    id: 'positivity',
    title: 'Daily Positivity',
    icon: <Sun className="h-6 w-6 text-yellow-400" />,
    description: 'A check-in on your daily mood and outlook.',
    questions: [
      { id: 1, text: 'Feeling hopeful about the future?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 2, text: 'Experiencing feelings of gratitude?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 3, text: 'Feeling a sense of purpose?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 4, text: 'Finding joy in small things?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
      { id: 5, text: 'Feeling connected to your friends and family?', options: [{ score: 0, text: 'Not at all' }, { score: 1, text: 'Several days' }, { score: 2, text: 'More than half the days' }, { score: 3, text: 'Nearly every day' }] },
    ],
  },
];

// Mock API key for demonstration (in real app, this would be from environment)
const API_KEY = 'demo-key';

const SelfHelpQuizPage = () => {
  const [view, setView] = useState<'selection' | 'quiz' | 'report'>('selection');
  const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
        setSelectedQuiz(quiz);
        setAnswers({});
        setReport(null);
        setError(null);
        setView('quiz');
    }
  };

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers({ ...answers, [questionId]: score });
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + score, 0);
  };

  // Mock report generation function for demo purposes
  const generateMockReport = (quiz: any, score: number): string => {
    const maxScore = quiz.questions.length * 3;
    const percentage = Math.round((score / maxScore) * 100);
    
    let severity = 'minimal';
    let interpretation = '';
    let recommendations = '';
    
    if (percentage <= 25) {
      severity = 'minimal';
      interpretation = 'Your responses suggest you may be experiencing minimal symptoms related to ' + quiz.title.toLowerCase() + '.';
      recommendations = `
        • Continue maintaining your current healthy habits
        • Practice regular self-care and stress management
        • Stay connected with supportive friends and family
        • Engage in activities you enjoy
        • Maintain a balanced lifestyle with adequate sleep and exercise
      `;
    } else if (percentage <= 50) {
      severity = 'mild';
      interpretation = 'Your responses indicate you may be experiencing mild symptoms related to ' + quiz.title.toLowerCase() + '.';
      recommendations = `
        • Consider implementing stress-reduction techniques like meditation or deep breathing
        • Establish a regular sleep schedule and exercise routine
        • Talk to trusted friends or family members about how you're feeling
        • Consider journaling to process your thoughts and emotions
        • If symptoms persist, consider speaking with a counselor or therapist
      `;
    } else if (percentage <= 75) {
      severity = 'moderate';
      interpretation = 'Your responses suggest you may be experiencing moderate symptoms related to ' + quiz.title.toLowerCase() + '.';
      recommendations = `
        • It may be helpful to speak with a mental health professional
        • Practice mindfulness and relaxation techniques regularly
        • Maintain social connections and don't isolate yourself
        • Focus on basic self-care: regular meals, sleep, and gentle exercise
        • Consider support groups or peer support networks
        • Keep a mood diary to track patterns and triggers
      `;
    } else {
      severity = 'severe';
      interpretation = 'Your responses indicate you may be experiencing significant symptoms related to ' + quiz.title.toLowerCase() + '.';
      recommendations = `
        • We strongly encourage you to reach out to a mental health professional
        • Contact your primary care doctor for a referral if needed
        • Consider calling a crisis helpline if you're in immediate distress
        • Lean on your support system - friends, family, or support groups
        • Focus on basic daily functioning and self-care
        • Remember that seeking help is a sign of strength, not weakness
      `;
    }

    return `
## Your ${quiz.title} Assessment Results

**Your Score:** ${score} out of ${maxScore} (${percentage}%)

### What This Means

${interpretation} This assessment is designed to give you insight into your recent experiences, but it's important to remember that only a qualified mental health professional can provide a proper evaluation.

### Recommendations for Well-being

${recommendations}

### Important Reminders

• This assessment is not a diagnostic tool and cannot replace professional medical advice
• Everyone's experience is unique, and these results should be considered alongside your personal circumstances
• If you're experiencing persistent distress or thoughts of self-harm, please reach out to a mental health professional immediately
• Recovery and healing are possible with the right support and resources

### Crisis Resources

If you're in immediate distress:
• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• Or contact your local emergency services: 911

Remember, you don't have to go through this alone. Support is available, and taking steps to understand your mental health is an important part of self-care.
    `;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const isQuizComplete = Object.keys(answers).length === (selectedQuiz?.questions.length ?? 0);

    if (!isQuizComplete) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setReport(null);

    // Check if API key is available and not the demo key
    if (!API_KEY || API_KEY === 'demo-key') {
      // Use mock report generation
      setTimeout(() => {
        const mockReport = generateMockReport(selectedQuiz, score);
        setReport(mockReport);
        setView('report');
        setIsLoading(false);
      }, 2000); // Simulate API delay
      return;
    }

    // Updated prompt with better structure
    const prompt = `
      You are a supportive mental health education assistant. Based on a self-assessment quiz about "${selectedQuiz?.title}", provide helpful insights and resources.

      Quiz Results:
      - Topic: ${selectedQuiz?.title}
      - Score: ${score} out of ${selectedQuiz?.questions.length * 3}
      - Questions answered: ${selectedQuiz?.questions.length}

      Please provide a comprehensive response with:

      ## Assessment Overview
      A brief, supportive interpretation of the score without diagnosing.

      ## What These Results Might Indicate
      General insights about what this score range typically suggests.

      ## Self-Care Recommendations
      - Practical, actionable steps for self-care
      - Lifestyle modifications that might help
      - Coping strategies and techniques
      - Resources for further support

      ## Important Disclaimer
      Clear statement that this is educational only and professional help should be sought for persistent concerns.

      Keep the tone warm, non-judgmental, and encouraging. Focus on hope and practical steps forward.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ text: prompt }] 
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Full API Response:', data);

      // Check for safety filter blocking
      if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === 'SAFETY') {
        throw new Error('Content was blocked by safety filters. Please try again with different responses.');
      }

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        console.error('No generated text found in response:', data);
        throw new Error('No content was generated. This may be due to safety filters.');
      }

      setReport(generatedText);
      setView('report');
    } catch (err: any) {
      console.error('Report generation failed:', err);
      setError(`Failed to generate report: ${err.message}. Using fallback report.`);
      
      // Fallback to mock report
      const mockReport = generateMockReport(selectedQuiz, score);
      setReport(mockReport);
      setView('report');
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuizSelection = () => (
    <>
      <header className="w-full max-w-7xl flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-sky-400">
          Self-Help Quizzes
        </h1>
        <p className="mt-4 text-zinc-400 max-w-xl">
          Choose a quiz below to get a personalized assessment and resources. Your privacy is important to us; all results are anonymous.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            onClick={() => handleSelectQuiz(quiz.id)}
            className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-colors cursor-pointer group"
          >
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="w-12 h-12 bg-zinc-800/50 rounded-lg flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                {quiz.icon}
              </div>
              <div>
                <CardTitle className="text-zinc-100">{quiz.title}</CardTitle>
                <p className="text-sm text-zinc-400 mt-1">{quiz.description}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );

  const renderQuiz = () => (
    <Card className="bg-zinc-900/50 border-zinc-800 max-w-4xl w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-zinc-100 flex items-center justify-center">
          <BookOpen className="h-8 w-8 mr-3 text-purple-400" />
          {selectedQuiz?.title} Self-Assessment
        </CardTitle>
        <p className="text-zinc-400 mt-2">{selectedQuiz?.description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {selectedQuiz?.questions.map((q: any) => (
            <div key={q.id}>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">{q.text}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {q.options.map((option: any) => (
                  <Button
                    key={option.text}
                    variant={answers[q.id] === option.score ? 'default' : 'outline'}
                    className={`
                      text-center transition-all duration-200 p-4 h-auto
                      ${answers[q.id] === option.score 
                        ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-500' 
                        : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100'
                      }
                    `}
                    onClick={() => handleAnswer(q.id, option.score)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-8 mb-6">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>Progress</span>
            <span>{Object.keys(answers).length} / {selectedQuiz?.questions.length}</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div 
              className="bg-sky-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.keys(answers).length / (selectedQuiz?.questions.length || 1)) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mt-6">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        )}
        
        <div className="text-center mt-8 space-y-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || Object.keys(answers).length < (selectedQuiz?.questions.length ?? 0)}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 disabled:text-zinc-400 text-white px-8 py-3 text-lg w-full max-w-md transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Generating Report...
              </>
            ) : (
              <>
                <MessageCircle className="h-5 w-5 mr-2" />
                Get My Report
              </>
            )}
          </Button>
          <Button 
            onClick={() => setView('selection')} 
            variant="link" 
            className="text-zinc-400 hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back to Quizzes
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderReport = () => {
    // Convert markdown-style formatting to HTML for better display
    const formatReport = (text: string) => {
      let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-zinc-200 mt-6 mb-3">$1</h3>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-zinc-100 mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-zinc-100 mt-8 mb-6">$1</h1>')
        .replace(/^\• (.*$)/gm, '<li class="mb-2">$1</li>')
        .replace(/\n\n/g, '</p><p class="mb-4 text-zinc-300 leading-relaxed">');

      // Handle list items more carefully without the 's' flag
      const lines = formatted.split('\n');
      let inList = false;
      const processedLines: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isListItem = line.trim().startsWith('<li');
        
        if (isListItem && !inList) {
          processedLines.push('<ul class="list-disc list-inside space-y-2 ml-4 text-zinc-300">');
          processedLines.push(line);
          inList = true;
        } else if (isListItem && inList) {
          processedLines.push(line);
        } else if (!isListItem && inList) {
          processedLines.push('</ul>');
          processedLines.push(line);
          inList = false;
        } else {
          processedLines.push(line);
        }
      }

      if (inList) {
        processedLines.push('</ul>');
      }

      return processedLines
        .join('\n')
        .replace(/^(?!<[h|u|l])(.*$)/gm, '<p class="mb-4 text-zinc-300 leading-relaxed">$1</p>')
        .replace(/<p class="mb-4 text-zinc-300 leading-relaxed"><\/p>/g, ''); // Remove empty paragraphs
    };

    return (
      <Card className="bg-zinc-900/50 border-zinc-800 max-w-4xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-zinc-100 flex items-center justify-center">
            <Brain className="h-8 w-8 mr-3 text-sky-400" />
            Your Personalized Report
          </CardTitle>
          <p className="text-zinc-400 mt-2">
            Insights and recommendations based on your {selectedQuiz?.title} assessment
          </p>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-125 pr-4">
            <div className="space-y-4">
              {report && (
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatReport(report) }}
                />
              )}
            </div>
          </ScrollArea>
          
          <div className="mt-8 p-6 bg-zinc-800/30 border border-zinc-700 rounded-lg">
            <h3 className="text-lg font-semibold text-zinc-200 mb-3 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-400" />
              Important Disclaimer
            </h3>
            <div className="text-sm text-zinc-400 space-y-2">
              <p>
                This assessment is for educational and informational purposes only and is not a substitute 
                for professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                If you are experiencing persistent distress, thoughts of self-harm, or any mental health 
                emergency, please contact a qualified mental health professional immediately or call your 
                local emergency services.
              </p>
              <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded">
                <p className="text-red-300 font-medium">
                  🆘 Crisis Resources: National Suicide Prevention Lifeline: 988 | Crisis Text Line: Text HOME to 741741
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 space-x-4">
            <Button 
              onClick={() => {
                setView('selection');
                setSelectedQuiz(null);
                setAnswers({});
                setReport(null);
                setError(null);
              }} 
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2"
            >
              Take Another Quiz
            </Button>
            <Button 
              onClick={() => setView('selection')} 
              variant="outline" 
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center py-12 px-4">
      {view === 'selection' && renderQuizSelection()}
      {view === 'quiz' && selectedQuiz && renderQuiz()}
      {view === 'report' && report && renderReport()}
      
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-zinc-800 p-2 rounded text-xs text-zinc-400">
          API Key: {API_KEY ? 'Configured' : 'Demo Mode'}
        </div>
      )}
    </div>
  );
};

export default SelfHelpQuizPage;