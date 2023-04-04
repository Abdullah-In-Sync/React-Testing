export interface Score {
  label: string;
  value: number | string;
}

export interface Question {
  question: string;
}

export interface Format1 {
  intro?: string;
  scores?: Array<Score>;
  questions?: Array<Question>;
  description?: string;
}

export interface TemplateData {
  templateData: Format1;
}

export interface TemplateFormat {
  data: Format1;
  validationSchema?: any;
}
