import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { TRAINING_HISTORY } from '../constants';
import { Activity, Brain, Database, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard icon={<Database className="w-6 h-6 text-blue-600" />} title="Dataset Size" value="4,998" subtext="Clinical Transcripts" />
        <StatsCard icon={<Brain className="w-6 h-6 text-purple-600" />} title="Best Model (LSTM)" value="94%" subtext="Accuracy on Test Set" />
        <StatsCard icon={<Activity className="w-6 h-6 text-green-600" />} title="F1-Score" value="0.90" subtext="LSTM Performance" />
        <StatsCard icon={<FileText className="w-6 h-6 text-orange-600" />} title="Classes" value="40+" subtext="Medical Specialties" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Training Progression (LSTM)</h3>
          <p className="text-sm text-slate-500 mb-6">Visualizing loss reduction over 10 epochs as described in the methodology.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TRAINING_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="epoch" label={{ value: 'Epochs', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} name="Training Loss" />
                <Line type="monotone" dataKey="val_loss" stroke="#ef4444" strokeWidth={2} name="Validation Loss" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Accuracy Improvement</h3>
          <p className="text-sm text-slate-500 mb-6">Validation accuracy convergence during the fine-tuning phase.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAINING_HISTORY}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="epoch" />
                <YAxis domain={[0.8, 1]} />
                <Tooltip />
                <Area type="monotone" dataKey="val_accuracy" stroke="#10b981" fillOpacity={1} fill="url(#colorAcc)" name="Val Accuracy" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Research Insight</h4>
        <p className="text-blue-800 text-sm leading-relaxed">
          "The LSTM, a type of RNN, outperformed the ML classifiers in performing text classification from complex medical transcriptions. 
          The accuracy achieved by LSTM is 0.94 with a precision of 0.87, and F1-score value is 0.90. 
          The metrics shows that LSTM, BERT models perform better to other ML classifiers and ensemblers."
        </p>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ icon: React.ReactNode; title: string; value: string; subtext: string }> = ({ icon, title, value, subtext }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
    <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
  </div>
);

export default Dashboard;