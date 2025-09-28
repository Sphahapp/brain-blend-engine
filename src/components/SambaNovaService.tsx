import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Upload, Image } from 'lucide-react';

interface SambaNovaServiceProps {
  apiKey: string;
}

export const SambaNovaService: React.FC<SambaNovaServiceProps> = ({ apiKey }) => {
  const [question, setQuestion] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!question.trim() || !selectedFile || !apiKey) return;

    setLoading(true);
    try {
      // This would normally call your backend proxy
      // For now, we'll simulate the response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResponse(`Analysis of "${selectedFile.name}":\n\nQuestion: ${question}\n\nThis is a simulated response. In the full implementation, this would analyze the uploaded image using SambaNova's vision models through your backend proxy server.`);
    } catch (error) {
      setResponse('Error analyzing image. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image-upload">Upload an image</Label>
        <div className="flex items-center gap-4">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="w-4 h-4" />
              {selectedFile.name}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-question">Question about the image</Label>
        <Input
          id="image-question"
          placeholder="What would you like to know about this image?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <Button
        onClick={handleAnalyzeImage}
        disabled={!question.trim() || !selectedFile || !apiKey || loading}
        variant="ai"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing Image...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Analyze Image
          </>
        )}
      </Button>

      {!apiKey && (
        <p className="text-destructive text-sm">Please configure your SambaNova API key in settings.</p>
      )}

      {response && (
        <Card>
          <CardContent className="pt-6">
            <Label className="text-sm font-medium">Analysis Result</Label>
            <div className="mt-2 p-4 bg-muted rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{response}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};