
import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  cardContentClassName?: string;
}

export default function SectionCard({ title, icon, children, className, cardContentClassName }: SectionCardProps) {
  return (
    <Card className={cn("shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="flex items-center font-headline text-xl text-primary">
          {icon && <span className="mr-2 h-5 w-5 flex items-center justify-center">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cardContentClassName}>
        {children}
      </CardContent>
    </Card>
  );
}
