import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { MODEL_METRICS } from '../constants';

const ModelComparison: React.FC = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
         <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">Model Performance Comparison</h2>
            <p className="text-slate-500">Comparative analysis of accuracy, precision, and F1-score across implemented classifiers.</p>
         </div>

         <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MODEL_METRICS}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="model" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#64748b'}} axisLine={false} tickLine={false} domain={[0.5, 1]} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f1f5f9'}}
                />
                <Legend />
                <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy" radius={[4, 4, 0, 0]} />
                <Bar dataKey="f1" fill="#8b5cf6" name="F1-Score" radius={[4, 4, 0, 0]} />
                <Bar dataKey="precision" fill="#10b981" name="Precision" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-semibold text-slate-800 mb-4">LSTM Profile (Best Performer)</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                        { subject: 'Precision', A: 0.87, fullMark: 1 },
                        { subject: 'Recall', A: 0.93, fullMark: 1 },
                        { subject: 'F1', A: 0.90, fullMark: 1 },
                        { subject: 'Accuracy', A: 0.94, fullMark: 1 },
                    ]}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#cbd5e1"/>
                    <Radar name="LSTM" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                    <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-semibold text-slate-800 mb-4">Comparison Insight</h3>
             <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span>
                        <strong>LSTM Dominance:</strong> The Long Short-Term Memory (LSTM) model achieved the highest accuracy (94%) and recall (93%), proving superior for handling the sequential nature of medical narratives.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-purple-500 rounded-full flex-shrink-0"></span>
                    <span>
                        <strong>Transformer Performance:</strong> While typically powerful, BERT achieved 68% accuracy in this specific configuration, suggesting the domain-specific fine-tuning or dataset structure favored RNNs here.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-2 bg-slate-400 rounded-full flex-shrink-0"></span>
                    <span>
                        <strong>Traditional ML:</strong> SVM and Naïve Bayes provided a strong baseline (~65%) but lacked the contextual understanding required for complex transcript classification.
                    </span>
                </li>
             </ul>
          </div>
      </div>
    </div>
  );
};

export default ModelComparison;