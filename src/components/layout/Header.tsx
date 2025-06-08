
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-3xl font-headline font-semibold text-primary">
            ResumeFlow
          </h1>
        </div>
      </div>
    </header>
  );
}
