import { MetricData, TrainingMetric, TranscriptSample, ModelType, HyperParam } from './types';

// Data derived from Table 3 and Table 4 of the PDF
export const MODEL_METRICS: MetricData[] = [
  { model: ModelType.LSTM, precision: 0.87, recall: 0.93, f1: 0.90, accuracy: 0.94 },
  { model: ModelType.BERT, precision: 0.70, recall: 0.68, f1: 0.67, accuracy: 0.68 }, // Paper findings: LSTM outperformed BERT
  { model: ModelType.CNN, precision: 0.68, recall: 0.65, f1: 0.65, accuracy: 0.66 },
  { model: ModelType.SVM, precision: 0.68, recall: 0.65, f1: 0.64, accuracy: 0.65 },
  { model: ModelType.RF, precision: 0.66, recall: 0.57, f1: 0.60, accuracy: 0.60 },
  { model: ModelType.NB, precision: 0.70, recall: 0.61, f1: 0.64, accuracy: 0.61 },
  { model: ModelType.XGBoost, precision: 0.67, recall: 0.59, f1: 0.61, accuracy: 0.61 },
];

// Simulated training progression based on Fig 12 & Fig 14
export const TRAINING_HISTORY: TrainingMetric[] = [
  { epoch: 1, loss: 1.1847, accuracy: 0.8321, val_loss: 0.4256, val_accuracy: 0.9000 },
  { epoch: 2, loss: 0.4323, accuracy: 0.8947, val_loss: 0.4093, val_accuracy: 0.9000 },
  { epoch: 3, loss: 0.3701, accuracy: 0.8947, val_loss: 0.3769, val_accuracy: 0.9000 },
  { epoch: 4, loss: 0.2687, accuracy: 0.8997, val_loss: 0.3354, val_accuracy: 0.9000 },
  { epoch: 5, loss: 0.2024, accuracy: 0.9098, val_loss: 0.3290, val_accuracy: 0.9000 },
  { epoch: 6, loss: 0.1756, accuracy: 0.9323, val_loss: 0.3225, val_accuracy: 0.9000 },
  { epoch: 7, loss: 0.1420, accuracy: 0.9524, val_loss: 0.3269, val_accuracy: 0.9000 },
  { epoch: 8, loss: 0.1253, accuracy: 0.9474, val_loss: 0.3591, val_accuracy: 0.9000 },
  { epoch: 9, loss: 0.1216, accuracy: 0.9524, val_loss: 0.2811, val_accuracy: 0.9000 },
  { epoch: 10, loss: 0.1050, accuracy: 0.9499, val_loss: 0.2867, val_accuracy: 0.9000 },
];

export const HYPERPARAMETERS: HyperParam[] = [
  { name: 'Learning Rate', value: '0.001 (Adam)', description: 'Step size at each iteration while moving toward a minimum of a loss function.', optimized: true },
  { name: 'Batch Size', value: 32, description: 'Number of training examples utilized in one iteration.', optimized: true },
  { name: 'Epochs', value: 10, description: 'Number of complete passes through the training dataset.', optimized: true },
  { name: 'Sequence Length', value: 1000, description: 'Max length of token sequence for LSTM padding.', optimized: true },
  { name: 'Activation', value: 'Tanh', description: 'Activation function for LSTM layers.', optimized: true },
  { name: 'Embedding Dim', value: 10000, description: 'Vocabulary size for word embeddings.', optimized: true },
];

export const SAMPLES: TranscriptSample[] = [
  {
    id: '1',
    specialty: 'Allergy / Immunology',
    text: "SUBJECTIVE: This 23-year-old white female presents with complaint of allergies. She used to have allergies when she lived in Seattle but she thinks they are worse here. In the past, she has tried Claritin, and Zyrtec. Both worked for short time but then seemed to lose effectiveness. She has used Allegra also. She used that last summer and she began using it again two weeks ago. It does not appear to be working very well. She has used over-the-counter sprays but no prescription nasal sprays. She does have asthma but does not require daily medication for this and does not think it is flaring up."
  },
  {
    id: '2',
    specialty: 'Bariatrics',
    text: "PAST MEDICAL HISTORY: He has difficulty climbing stairs, difficulty with airline seats, tying shoes, used to public seating, and lifting objects off the floor. He exercises three times a week at home and does cardio. He has difficulty walking two blocks or five flights of stairs. Difficulty with snoring. He has muscle and joint pains including knee pain, back pain, foot and ankle pain, and swelling. He has gastroesophageal reflux disease. PAST SURGICAL HISTORY: Includes reconstructive surgery on his right hand 13 years ago."
  },
  {
    id: '3',
    specialty: 'Cardiovascular / Pulmonary',
    text: "2-D M-MODE: 1. Left atrial enlargement with left atrial diameter of 4.7 cm. 2. Normal size right and left ventricle. 3. Normal LV systolic function with left ventricular ejection fraction of 51%. 4. Normal LV diastolic function. 5. No pericardial effusion. 6. Normal morphology of aortic valve, mitral valve, tricuspid valve, and pulmonary valve. 7. PA systolic pressure is 36 mmHg. DOPPLER: 1. Mild mitral and tricuspid regurgitation. 2. Trace aortic and pulmonary regurgitation."
  }
];