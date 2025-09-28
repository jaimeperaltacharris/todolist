export interface Task {
  id?: number;
  name: string;
  description?: string;
  category_id: number;
  completed?: boolean;
  created_at?: string;
  is_active?: boolean;
}