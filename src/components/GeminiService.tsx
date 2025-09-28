import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface GeminiServiceProps {
  apiKey: string;
}

export const GeminiService: React.FC<GeminiServiceProps> = ({ apiKey }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || !apiKey) return;

    setLoading(true);
    try {
      // This would normally call your backend proxy
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResponse(`Generated response for: "${prompt}"\n\nThis is a simulated response. In the full implementation, this would connect to Google Gemini API through your backend proxy server.`);
    } catch (error) {
      setResponse('Error generating response. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="gemini-prompt">Enter your prompt</Label>
        <Textarea
          id="gemini-prompt"
          placeholder="e.g., Create a Python function for bubble sort..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={!prompt.trim() || !apiKey || loading}
        variant="ai"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with Gemini
          </>
        )}
      </Button>

      {!apiKey && (
        <p className="text-destructive text-sm">Please configure your Gemini API key in settings.</p>
      )}

      {response && (
        <Card>
          <CardContent className="pt-6">
            <Label className="text-sm font-medium">Response</Label>
            <div className="mt-2 p-4 bg-muted rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{response}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};