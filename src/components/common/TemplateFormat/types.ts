export interface Score {
  label: string;
  value: number | string;
}

export interface Question {
  id: string;
  question: string;
  answer?: number;
}

export interface Format1 {
  intro?: string;
  scores?: Array<Score>;
  questions?: Array<Question>;
  description?: string;
  totalScore?: number;
}

export interface Format2 {
  questions?: any;
  optionsQuestions?: any;
}

export interface TemplateDataFormat1 {
  templateData: Format1;
}

export interface TemplateDataFormat2 {
  templateData: Format2;
}

export interface TemplateFormat {
  data: Format1 | Format2;
  validationSchema?: any;
  onResponse?: (value) => void
}
