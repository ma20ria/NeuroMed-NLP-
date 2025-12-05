export enum ModelType {
  LSTM = 'LSTM',
  BERT = 'BERT',
  CNN = 'CNN',
  SVM = 'SVM',
  RF = 'Random Forest',
  NB = 'Naïve Bayes',
  XGBoost = 'XGBoost'
}

export interface MetricData {
  model: ModelType;
  precision: number;
  recall: number;
  f1: number;
  accuracy: number;
}

export interface TrainingMetric {
  epoch: number;
  loss: number;
  accuracy: number;
  val_loss: number;
  val_accuracy: number;
}

export interface AnalysisResult {
  specialty: string;
  confidence: number;
  sentiment: {
    score: number; // -1 to 1
    label: 'Positive' | 'Negative' | 'Neutral';
    emotion: string;
  };
  keywords: string[];
  explanation: string;
  shapValues: { feature: string; impact: number }[]; // Simulated SHAP
}

export interface TranscriptSample {
  id: string;
  specialty: string;
  text: string;
}

export interface HyperParam {
  name: string;
  value: string | number;
  description: string;
  optimized: boolean;
}