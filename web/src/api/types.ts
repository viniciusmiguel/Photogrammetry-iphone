export type ScanMode = 'space' | 'object';
export type ScanStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface RawStats {
  anchor_count: number;
  keyframe_count: number;
  point_count: number;
  face_count: number;
}

export interface Scan {
  id: string;
  mode: ScanMode;
  status: ScanStatus;
  created_at: string;
  error?: string;
  raw_stats?: RawStats;
}

export interface ScanDetail extends Scan {
  raw_files: string[];
  processed_files: string[];
}

export interface SSEEvent {
  type: 'progress' | 'log' | 'completed' | 'failed';
  data?: unknown;
}

export interface HealthResponse {
  status: 'ok';
}
