export interface Issue {
  id: number;
  name: string;
  description?: string;
  score: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface IssuesStatistics {
  date: string;
  name: string;
  total_count: number;
  total_score: number;
}
