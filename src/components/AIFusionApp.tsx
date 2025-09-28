import React, { useState, useEffect } from 'react';
import { Settings, Brain, Volume2, Image, Sparkles } from 'lucide-react';
import { AIServiceCard } from './AIServiceCard';
import { SettingsPanel } from './SettingsPanel';
import { GeminiService } from './GeminiService';
import { HuggingFaceService } from './HuggingFaceService';
import { SambaNovaService } from './SambaNovaService';
import { Button } from '@/components/ui/button';

interface APIKeys {
  gemini: string;
  huggingface: string;
  sambanova: string;
}

type ActiveTab = 'settings' | 'gemini' | 'huggingface' | 'sambanova';

export const AIFusionApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('settings');
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    gemini: '',
    huggingface: '',
    sambanova: '',
  });

  // Load API keys from localStorage on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('ai-fusion-keys');
    if (savedKeys) {
      try {
        setApiKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Error loading saved API keys:', error);
      }
    }
  }, []);

  const handleSaveKeys = (keys: APIKeys) => {
    setApiKeys(keys);
    localStorage.setItem('ai-fusion-keys', JSON.stringify(keys));
    // Show success message
    console.log('API keys saved successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsPanel apiKeys={apiKeys} onSaveKeys={handleSaveKeys} />;
      case 'gemini':
        return <GeminiService apiKey={apiKeys.gemini} />;
      case 'huggingface':
        return <HuggingFaceService apiKey={apiKeys.huggingface} />;
      case 'sambanova':
        return <SambaNovaService apiKey={apiKeys.sambanova} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary animate-pulse-glow">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI Fusion
                </h1>
                <p className="text-sm text-muted-foreground">
                  Multiple AI Services, One Interface
                </p>
              </div>
            </div>
            <Button
              variant={activeTab === 'settings' ? 'ai' : 'outline'}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'settings' ? (
          renderContent()
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Service Selection Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold mb-4">AI Services</h2>
              
              <AIServiceCard
                title="Google Gemini"
                description="Advanced text generation and analysis"
                icon={<Brain className="w-5 h-5" />}
                isActive={activeTab === 'gemini'}
                onClick={() => setActiveTab('gemini')}
              >
                <div className="text-sm text-muted-foreground">
                  Generate creative content, code, and detailed responses
                </div>
              </AIServiceCard>

              <AIServiceCard
                title="Hugging Face"
                description="Text-to-speech conversion"
                icon={<Volume2 className="w-5 h-5" />}
                isActive={activeTab === 'huggingface'}
                onClick={() => setActiveTab('huggingface')}
              >
                <div className="text-sm text-muted-foreground">
                  Convert text to natural-sounding speech audio
                </div>
              </AIServiceCard>

              <AIServiceCard
                title="SambaNova"
                description="Image analysis and understanding"
                icon={<Image className="w-5 h-5" />}
                isActive={activeTab === 'sambanova'}
                onClick={() => setActiveTab('sambanova')}
              >
                <div className="text-sm text-muted-foreground">
                  Analyze images and answer questions about them
                </div>
              </AIServiceCard>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-lg">
                {renderContent()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};