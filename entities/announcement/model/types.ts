export interface Announcement {
  id: string;
  date: string;
  title: string;
  category: 'General' | 'Alert' | 'Service Update' | 'Holiday';
  priority: 'high' | 'medium' | 'low';
  excerpt: string;
}

