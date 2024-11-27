export interface Choice {
  id: string;
  text: string;
}

export interface Part {
  id: string;
  question: string;
  marks: number;
  solution: string;
  explanation: string;
}

export interface Problem {
  id: number;
  title: string;
  tags: readonly string[];
  type?: 'multiple-choice' | 'written';
  equation?: string;
  pdfUrl?: string;
  choices?: Choice[];
  solution: string;
  explanation: string;
  videoUrl: string;
  solved: boolean;
  marks?: number;
  parts?: Part[];
}

export interface TestAnswer {
  answer: string;
  marks?: number;
  partMarks?: Record<string, number>;
}