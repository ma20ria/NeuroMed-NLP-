import React, { useState } from 'react';
import { analyzeTranscript } from '../services/geminiService';
import { AnalysisResult, TranscriptSample } from '../types';
import { SAMPLES } from '../constants';
import { Loader2, Zap, BarChart2, Tag, RefreshCw } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const TranscriptAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const data = await analyzeTranscript(inputText);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSample = (sample: TranscriptSample) => {
    setInputText(sample.text);
    setResult(null);
  };

  const sentimentData = result ? [
    { name: 'Positive', value: result.sentiment.label === 'Positive' ? 1 : 0, color: '#10b981' },
    { name: 'Neutral', value: result.sentiment.label === 'Neutral' ? 1 : 0, color: '#94a3b8' },
    { name: 'Negative', value: result.sentiment.label === 'Negative' ? 1 : 0, color: '#ef4444' },
  ] : [];

  return (
    <div className="p-6 h-full flex flex-col lg:flex-row gap-6">
      {/* Input Section */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Transcript Input</h2>
            <div className="flex gap-2">
              {SAMPLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadSample(s)}
                  className="text-xs px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                >
                  Sample {s.id}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none font-mono text-sm text-slate-700"
            placeholder="Paste clinical transcript here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !inputText}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              Analyze Transcript
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
        {!result ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <BarChart2 className="w-12 h-12 mb-2 opacity-50" />
            <p>Run analysis to view insights</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Classification */}
            <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Classification</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">{result.specialty}</h2>
                  <p className="text-sm text-slate-500 mt-1">{result.explanation}</p>
                </div>
                <div className="text-right">
                  <span className="block text-3xl font-bold text-blue-600">{(result.confidence * 100).toFixed(0)}%</span>
                  <span className="text-xs text-slate-400">Confidence</span>
                </div>
              </div>
            </div>

            {/* Sentiment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sentiment Profile</h3>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sentimentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={30}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {sentimentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${
                      result.sentiment.label === 'Positive' ? 'text-green-600' : 
                      result.sentiment.label === 'Negative' ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      {result.sentiment.label}
                    </p>
                    <p className="text-sm text-slate-400">Emotion: {result.sentiment.emotion}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Model Interpretabiltiy</h3>
                <div className="space-y-2">
                   {result.shapValues.slice(0, 3).map((shap, i) => (
                     <div key={i} className="flex justify-between items-center text-sm">
                       <span className="text-slate-700 font-medium">"{shap.feature}"</span>
                       <div className="flex items-center space-x-2">
                         <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-purple-500" style={{ width: `${shap.impact * 100}%`}}></div>
                         </div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Extracted Keywords (MYB)</h3>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    <Tag className="w-3 h-3 mr-1.5 text-slate-400" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
                <button onClick={handleAnalyze} className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center w-full">
                    <RefreshCw className="w-3 h-3 mr-1"/> Re-run Analysis
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptAnalyzer;