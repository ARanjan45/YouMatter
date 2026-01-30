'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
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
  ArrowLeft,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Info,
  Lightbulb,
  Target,
  Clock,
  Activity,
  Zap
} from 'lucide-react';

const MentalHealthEducation = () => {
  const [expandedCondition, setExpandedCondition] = useState(null);
  const [activeTab, setActiveTab] = useState('conditions');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim() + ' mental health')}`;
      window.open(searchUrl, '_blank');
    }
  };

  const handlePopularSearch = (term: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${term} mental health`)}`;
    window.open(searchUrl, '_blank');
  };
  type ConditionID = 'anxiety' | 'depression' | 'bipolar' | 'ptsd' | 'ocd' | 'adhd';

  const toggleCondition = (condition: string) => {
    const [expandedCondition, setExpandedCondition] = useState<string | null>(null);
  };

  const mentalHealthConditions = [
    {
      id: 'anxiety',
      name: 'Anxiety Disorders',
      description: 'Persistent worry, fear, or panic that interferes with daily activities',
      prevalence: '31.1% of U.S. adults',
      icon: '😰',
      symptoms: [
        'Excessive worry or fear',
        'Rapid heartbeat or breathing',
        'Sweating or trembling',
        'Difficulty concentrating',
        'Sleep problems',
        'Avoiding certain situations'
      ],
      treatments: [
        'Cognitive Behavioral Therapy (CBT)',
        'Exposure therapy',
        'Anti-anxiety medications',
        'Relaxation techniques',
        'Mindfulness and meditation',
        'Regular exercise'
      ],
      types: ['Generalized Anxiety Disorder', 'Panic Disorder', 'Social Anxiety', 'Specific Phobias']
    },
    {
      id: 'depression',
      name: 'Depression',
      description: 'Persistent feelings of sadness, hopelessness, and loss of interest in activities',
      prevalence: '21.0% of U.S. adults',
      icon: '😔',
      symptoms: [
        'Persistent sad mood',
        'Loss of interest in activities',
        'Changes in appetite or weight',
        'Sleep disturbances',
        'Fatigue or loss of energy',
        'Feelings of worthlessness or guilt',
        'Difficulty concentrating',
        'Thoughts of death or suicide'
      ],
      treatments: [
        'Psychotherapy (talk therapy)',
        'Antidepressant medications',
        'Electroconvulsive therapy (ECT)',
        'Light therapy',
        'Exercise and lifestyle changes',
        'Support groups'
      ],
      types: ['Major Depressive Disorder', 'Persistent Depressive Disorder', 'Seasonal Affective Disorder']
    },
    {
      id: 'bipolar',
      name: 'Bipolar Disorder',
      description: 'Extreme mood swings between emotional highs (mania) and lows (depression)',
      prevalence: '2.8% of U.S. adults',
      icon: '🎭',
      symptoms: [
        'Manic episodes: elevated mood, increased energy, reduced need for sleep',
        'Depressive episodes: sad mood, low energy, hopelessness',
        'Rapid speech and racing thoughts',
        'Impulsive behavior',
        'Difficulty concentrating',
        'Changes in sleep patterns'
      ],
      treatments: [
        'Mood stabilizing medications',
        'Antipsychotic medications',
        'Psychotherapy',
        'Family therapy',
        'Lifestyle management',
        'Support groups'
      ],
      types: ['Bipolar I Disorder', 'Bipolar II Disorder', 'Cyclothymic Disorder']
    },
    {
      id: 'ptsd',
      name: 'PTSD',
      description: 'Develops after experiencing or witnessing a traumatic event',
      prevalence: '3.5% of U.S. adults',
      icon: '🛡️',
      symptoms: [
        'Intrusive memories or flashbacks',
        'Nightmares',
        'Avoidance of trauma reminders',
        'Negative changes in mood and thinking',
        'Hypervigilance',
        'Difficulty sleeping or concentrating'
      ],
      treatments: [
        'Trauma-focused psychotherapy',
        'EMDR (Eye Movement Desensitization)',
        'Cognitive Processing Therapy',
        'Prolonged Exposure therapy',
        'Medications (antidepressants)',
        'Group therapy'
      ],
      types: ['Acute PTSD', 'Chronic PTSD', 'Complex PTSD']
    },
    {
      id: 'ocd',
      name: 'OCD',
      description: 'Unwanted, intrusive thoughts (obsessions) and repetitive behaviors (compulsions)',
      prevalence: '1.2% of U.S. adults',
      icon: '🔄',
      symptoms: [
        'Obsessive thoughts or images',
        'Compulsive behaviors or rituals',
        'Fear of contamination',
        'Need for symmetry or order',
        'Unwanted aggressive thoughts',
        'Excessive checking or counting'
      ],
      treatments: [
        'Exposure and Response Prevention (ERP)',
        'Cognitive Behavioral Therapy',
        'SSRI medications',
        'Deep brain stimulation (severe cases)',
        'Support groups',
        'Family therapy'
      ],
      types: ['Contamination OCD', 'Checking OCD', 'Symmetry OCD', 'Intrusive Thoughts OCD']
    },
    {
      id: 'adhd',
      name: 'ADHD',
      description: 'Persistent patterns of inattention, hyperactivity, and impulsivity',
      prevalence: '4.4% of U.S. adults',
      icon: '⚡',
      symptoms: [
        'Difficulty paying attention',
        'Hyperactivity or restlessness',
        'Impulsive behavior',
        'Difficulty organizing tasks',
        'Forgetfulness',
        'Trouble following instructions'
      ],
      treatments: [
        'Stimulant medications',
        'Non-stimulant medications',
        'Behavioral therapy',
        'Cognitive behavioral therapy',
        'Life skills training',
        'Support groups'
      ],
      types: ['Predominantly Inattentive', 'Predominantly Hyperactive-Impulsive', 'Combined Presentation']
    }
  ];

  const warningSignsData = [
    {
      category: 'Emotional Signs',
      signs: ['Persistent sadness or anxiety', 'Extreme mood changes', 'Excessive fears or worries', 'Feelings of hopelessness']
    },
    {
      category: 'Behavioral Signs',
      signs: ['Withdrawal from activities', 'Substance abuse', 'Changes in eating or sleeping', 'Aggressive behavior']
    },
    {
      category: 'Physical Signs',
      signs: ['Unexplained aches and pains', 'Changes in energy levels', 'Sleep disturbances', 'Changes in appetite']
    },
    {
      category: 'Cognitive Signs',
      signs: ['Difficulty concentrating', 'Memory problems', 'Indecisiveness', 'Confusion or disorientation']
    }
  ];

  const mythsFactsData = [
    {
      myth: "Mental health problems are uncommon",
      fact: "1 in 4 people worldwide will experience a mental health condition at some point in their lives"
    },
    {
      myth: "Mental illness is a sign of weakness",
      fact: "Mental illness is a medical condition, just like diabetes or heart disease - it's not a character flaw"
    },
    {
      myth: "Therapy is only for serious mental illness",
      fact: "Therapy can benefit anyone looking to improve their mental well-being, cope with stress, or work through life challenges"
    },
    {
      myth: "Children don't experience mental health problems",
      fact: "50% of all mental health disorders begin by age 14, and 75% begin by age 24"
    },
    {
      myth: "Mental health medications change your personality",
      fact: "Properly prescribed medications help restore brain chemistry balance and can help people feel more like themselves"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
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

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-zinc-800 text-zinc-300">
              <BookOpen className="mr-2 h-4 w-4" />
              Mental Health Education Hub
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Understanding
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                {" "}Mental Health{" "}
              </span>
              Starts Here
            </h1>
            
            <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn about mental health conditions, recognize warning signs, and discover evidence-based treatments. 
              Knowledge is the first step toward better mental health.
            </p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant={activeTab === 'conditions' ? 'default' : 'outline'}
              onClick={() => setActiveTab('conditions')}
              className={activeTab === 'conditions' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
            >
              <Brain className="mr-2 h-4 w-4" />
              Mental Health Conditions
            </Button>
            <Button 
              variant={activeTab === 'warning-signs' ? 'default' : 'outline'}
              onClick={() => setActiveTab('warning-signs')}
              className={activeTab === 'warning-signs' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning Signs
            </Button>
            <Button 
              variant={activeTab === 'myths-facts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('myths-facts')}
              className={activeTab === 'myths-facts' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'}
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Myths vs Facts
            </Button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {activeTab === 'conditions' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Mental Health Conditions</h2>
                <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                  Learn about symptoms, prevalence, and treatment options for various mental health conditions.
                </p>
              </div>

              <div className="space-y-6">
                {mentalHealthConditions.map((condition) => (
                  <Card key={condition.id} className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="cursor-pointer" onClick={() => toggleCondition(condition.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{condition.icon}</div>
                          <div>
                            <CardTitle className="text-zinc-100 text-xl">{condition.name}</CardTitle>
                            <CardDescription className="text-zinc-400 mt-1">{condition.description}</CardDescription>
                            <Badge variant="outline" className="mt-2 border-emerald-600/50 text-emerald-400">
                              Affects {condition.prevalence}
                            </Badge>
                          </div>
                        </div>
                        {expandedCondition === condition.id ? 
                          <ChevronDown className="h-5 w-5 text-zinc-400" /> : 
                          <ChevronRight className="h-5 w-5 text-zinc-400" />
                        }
                      </div>
                    </CardHeader>
                    
                    {expandedCondition === condition.id && (
                      <CardContent className="border-t border-zinc-800 pt-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold text-zinc-200 mb-3 flex items-center">
                              <Target className="mr-2 h-4 w-4 text-red-400" />
                              Common Symptoms
                            </h4>
                            <ul className="space-y-2">
                              {condition.symptoms.map((symptom, index) => (
                                <li key={index} className="text-zinc-400 text-sm flex items-start">
                                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 shrink-0"></div>
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-zinc-200 mb-3 flex items-center">
                              <Heart className="mr-2 h-4 w-4 text-emerald-400" />
                              Treatment Options
                            </h4>
                            <ul className="space-y-2">
                              {condition.treatments.map((treatment, index) => (
                                <li key={index} className="text-zinc-400 text-sm flex items-start">
                                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-2 shrink-0"></div>
                                  {treatment}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-zinc-200 mb-3 flex items-center">
                              <Activity className="mr-2 h-4 w-4 text-cyan-400" />
                              Types & Subtypes
                            </h4>
                            <ul className="space-y-2">
                              {condition.types.map((type, index) => (
                                <li key={index} className="text-zinc-400 text-sm flex items-start">
                                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 shrink-0"></div>
                                  {type}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap gap-3">
                          <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                            <Info className="mr-2 h-4 w-4" />
                            Learn More
                          </Button>
                          <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                            <Users className="mr-2 h-4 w-4" />
                            Find Support Groups
                          </Button>
                          <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                            <Search className="mr-2 h-4 w-4" />
                            Find Professional Help
                          </Button>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'warning-signs' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Recognizing Warning Signs</h2>
                <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                  Early recognition of mental health warning signs can lead to better outcomes and faster recovery.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {warningSignsData.map((category, index) => (
                  <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-zinc-100 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5 text-amber-400" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.signs.map((sign, signIndex) => (
                          <li key={signIndex} className="text-zinc-400 flex items-start">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-3 shrink-0"></div>
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-linear-to-r from-red-950/50 to-orange-950/50 border-red-900/50">
                <CardHeader>
                  <CardTitle className="text-red-100 flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    When to Seek Immediate Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-200/80 mb-4">
                    If you or someone you know is experiencing any of these signs, seek professional help immediately:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Thoughts of suicide or self-harm',
                      'Plans or means to hurt oneself',
                      'Hearing voices or seeing things others don\'t',
                      'Severe confusion or inability to function',
                      'Substance abuse as a coping mechanism'
                    ].map((sign, index) => (
                      <li key={index} className="text-red-200/90 flex items-start">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 shrink-0"></div>
                        {sign}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="destructive" size="sm">
                      Call 988 - Crisis Lifeline
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-700 text-red-200 hover:bg-red-900/50">
                      Text HOME to 741741
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'myths-facts' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Mental Health Myths vs Facts</h2>
                <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                  Dispelling common misconceptions and sharing evidence-based facts about mental health.
                </p>
              </div>

              <div className="space-y-6">
                {mythsFactsData.map((item, index) => (
                  <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-red-600/20 rounded-full flex items-center justify-center">
                              <span className="text-red-400 text-sm font-bold">✕</span>
                            </div>
                            <h3 className="font-semibold text-red-300">MYTH</h3>
                          </div>
                          <p className="text-zinc-300 pl-8">{item.myth}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-emerald-600/20 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                            </div>
                            <h3 className="font-semibold text-emerald-300">FACT</h3>
                          </div>
                          <p className="text-zinc-300 pl-8">{item.fact}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-12 bg-linear-to-r from-emerald-950/50 to-cyan-950/50 border-emerald-900/50">
                <CardHeader>
                  <CardTitle className="text-emerald-100 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Mental health is just as important as physical health',
                      'Mental health conditions are medical conditions that can be treated',
                      'Seeking help is a sign of strength, not weakness',
                      'Recovery is possible with proper treatment and support',
                      'Everyone deserves compassionate, non-judgmental care'
                    ].map((takeaway, index) => (
                      <li key={index} className="text-emerald-200/90 flex items-start">
                        <Star className="w-4 h-4 text-emerald-400 mt-0.5 mr-3 shrink-0" />
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Search Section */}
      <section className="py-16 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure What You're Looking For?
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
               Search the web for specific mental health topics, conditions, or questions you might have.
            </p>
      
            <Card className="bg-zinc-900/50 border-zinc-800 max-w-2xl mx-auto">
              <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for mental health topics, symptoms, treatments..."
                      className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                </div>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3"
                  onClick={handleSearch}
                >
                <Search className="mr-2 h-4 w-4" />
                  Search Web
                </Button>
            </div>
          
          <div className="mt-6 pt-4 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                'anxiety symptoms',
                'depression treatment',
                'therapy near me',
                'panic attacks',
                'stress management',
                'bipolar disorder',
                'PTSD recovery',
                'sleep and mental health'
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handlePopularSearch(term)}
                  className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full text-zinc-300 text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <p className="text-zinc-500 text-xs">
              <Info className="inline w-3 h-3 mr-1" />
              Searches will open in a new tab and redirect to Google for comprehensive web results
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
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
                <span className="text-xs">Safe & Secure</span>
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
              <h4 className="font-semibold mb-4 text-zinc-200">Education</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Mental Health Conditions</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Warning Signs</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Treatment Options</a>
                <a href="#" className="text-zinc-400 hover:text-zinc-200 block">Myths vs Facts</a>
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

export default MentalHealthEducation;