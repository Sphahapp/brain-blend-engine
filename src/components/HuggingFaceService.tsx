import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Volume2 } from 'lucide-react';

interface HuggingFaceServiceProps {
  apiKey: string;
}

export const HuggingFaceService: React.FC<HuggingFaceServiceProps> = ({ apiKey }) => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateSpeech = async () => {
    if (!text.trim() || !apiKey) return;

    setLoading(true);
    try {
      // This would normally call your backend proxy
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAudioUrl('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'); // Placeholder audio
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tts-text">Text to convert to speech</Label>
        <Input
          id="tts-text"
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Button
        onClick={handleGenerateSpeech}
        disabled={!text.trim() || !apiKey || loading}
        variant="ai"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Speech...
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 mr-2" />
            Generate Speech
          </>
        )}
      </Button>

      {!apiKey && (
        <p className="text-destructive text-sm">Please configure your Hugging Face API key in settings.</p>
      )}

      {audioUrl && (
        <Card>
          <CardContent className="pt-6">
            <Label className="text-sm font-medium">Generated Audio</Label>
            <div className="mt-2">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-sm text-muted-foreground mt-2">
                Audio generated successfully! (This is a placeholder - real implementation would generate actual speech)
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};