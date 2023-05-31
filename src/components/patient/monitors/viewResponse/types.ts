export interface emojisData {
  emoji_url?: string;
  emoji_caption?: string;
  color?: string;
  position?: number;
}

export interface chartData {
  labels?: Array<string>;
  datasets?: {
    label?: string;
    data?: Array<any>;
    backgroundColor?: Array<any> | string;
    borderColor?: Array<any> | string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}
