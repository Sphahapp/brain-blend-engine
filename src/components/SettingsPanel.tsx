import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Settings } from 'lucide-react';

interface APIKeys {
  gemini: string;
  huggingface: string;
  sambanova: string;
}

interface SettingsPanelProps {
  apiKeys: APIKeys;
  onSaveKeys: (keys: APIKeys) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ apiKeys, onSaveKeys }) => {
  const [keys, setKeys] = useState<APIKeys>(apiKeys);
  const [showKeys, setShowKeys] = useState<Record<keyof APIKeys, boolean>>({
    gemini: false,
    huggingface: false,
    sambanova: false,
  });

  const handleSave = () => {
    onSaveKeys(keys);
  };

  const toggleVisibility = (key: keyof APIKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Settings className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle>API Settings</CardTitle>
            <CardDescription>Configure your AI service API keys</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-key">Google Gemini API Key</Label>
            <div className="relative">
              <Input
                id="gemini-key"
                type={showKeys.gemini ? "text" : "password"}
                placeholder="Enter your Gemini API key..."
                value={keys.gemini}
                onChange={(e) => setKeys(prev => ({ ...prev, gemini: e.target.value }))}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleVisibility('gemini')}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showKeys.gemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="huggingface-key">Hugging Face API Key</Label>
            <div className="relative">
              <Input
                id="huggingface-key"
                type={showKeys.huggingface ? "text" : "password"}
                placeholder="Enter your Hugging Face API key..."
                value={keys.huggingface}
                onChange={(e) => setKeys(prev => ({ ...prev, huggingface: e.target.value }))}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleVisibility('huggingface')}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showKeys.huggingface ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sambanova-key">SambaNova API Key</Label>
            <div className="relative">
              <Input
                id="sambanova-key"
                type={showKeys.sambanova ? "text" : "password"}
                placeholder="Enter your SambaNova API key..."
                value={keys.sambanova}
                onChange={(e) => setKeys(prev => ({ ...prev, sambanova: e.target.value }))}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleVisibility('sambanova')}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showKeys.sambanova ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} variant="ai" className="w-full">
          Save API Keys
        </Button>
      </CardContent>
    </Card>
  );
};