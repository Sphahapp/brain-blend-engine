import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AIServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const AIServiceCard: React.FC<AIServiceCardProps> = ({
  title,
  description,
  icon,
  isActive,
  onClick,
  children,
}) => {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-glow-primary cursor-pointer border-border/50",
        isActive && "border-ai-primary shadow-glow-primary"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg transition-all duration-300",
            isActive ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      {isActive && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
};