// src/types/history.ts
export interface EraPeriod {
    key: string;
    name: string;
    startYear: number;
    endYear: number;
  }
  
  export interface Era {
    id: number;
    name: string;
    slug: string;
    startYear: number;
    endYear: number;
    summary: string;
    periods: EraPeriod[];
  }
  
  export interface SourceRef {
    type: 'book' | 'article' | 'paper' | 'other';
    title: string;
    detail?: string;
  }
  
  export interface Event {
    id: number;
    title: string;
    slug: string;
    timeLabel: string; // "626 年" / "1914–1918 年"
    startYear: number;
    endYear?: number;
    eraSlug: string;
    eraName: string;
    region?: string[];
    types: string[];
    summary: string;
    background: string;
    process: string;
    result: string;
    influence: {
      shortTerm: string;
      longTerm: string;
    };
    sources: SourceRef[];
  }
  