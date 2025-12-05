import React from 'react';
import { HYPERPARAMETERS } from '../constants';
import { Settings, Sliders, CheckCircle } from 'lucide-react';

const HyperparameterTuning: React.FC = () => {
  return (
    <div className="p-6">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-slate-600" />
                Hyperparameter Tuning
            </h2>
            <p className="text-slate-500 mt-1">Configuration used to optimize the LSTM and BERT models described in the paper.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HYPERPARAMETERS.map((param, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sliders className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-800">{param.name}</h3>
                            {param.optimized && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {param.value}
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {param.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 bg-slate-100 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">Optimization Strategy: Grid Search & Random Search</h3>
            <p className="text-sm text-slate-600">
                The research methodology employed a combination of Grid Search and Random Search to fine-tune the hyperparameters. 
                The tuning process focused on maximizing the F1-score to handle potential class imbalances in the medical specialty dataset.
                Key adjustments included the learning rate for the Adam optimizer and the number of LSTM units to capture long-term dependencies in the clinical text.
            </p>
        </div>
    </div>
  );
};

export default HyperparameterTuning;