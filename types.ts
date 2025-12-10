export interface Mantra {
  id: number;
  title: string;
  category: string;
  transliteration?: string; // Optional transliteration
}

export interface CategoryGroup {
  name: string;
  mantras: Mantra[];
}
