import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <FileText className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-headline font-semibold text-primary">
          ResumeFlow
        </h1>
      </div>
    </header>
  );
}
