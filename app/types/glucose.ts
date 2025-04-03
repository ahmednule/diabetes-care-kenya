export interface GlucoseReading {
    id: string;
    value: number;
    unit: string;
    status: 'very-low' | 'low' | 'normal' | 'high' | 'very-high';
    label?: string | null;
    timestamp: string;
    userId: string;
  }
  
  export interface ReadingsResponse {
    readings: GlucoseReading[];
    totalPages: number;
    currentPage: number;
  }