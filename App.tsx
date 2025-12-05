import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TranscriptAnalyzer from './components/TranscriptAnalyzer';
import ModelComparison from './components/ModelComparison';
import HyperparameterTuning from './components/HyperparameterTuning';
import { LayoutDashboard, Microscope, BarChart3, Sliders, Menu, X, Activity } from 'lucide-react';

enum Tab {
  DASHBOARD = 'dashboard',
  ANALYZER = 'analyzer',
  COMPARISON = 'comparison',
  TUNING = 'tuning'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD: return <Dashboard />;
      case Tab.ANALYZER: return <TranscriptAnalyzer />;
      case Tab.COMPARISON: return <ModelComparison />;
      case Tab.TUNING: return <HyperparameterTuning />;
      default: return <Dashboard />;
    }
  };

  const NavItem: React.FC<{ tab: Tab; icon: React.ReactNode; label: string }> = ({ tab, icon, label }) => (
    <button
      onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === tab 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">NeuroMed NLP</h1>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <NavItem tab={Tab.DASHBOARD} icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
          <NavItem tab={Tab.ANALYZER} icon={<Microscope className="w-5 h-5" />} label="Transcript Analyzer" />
          <NavItem tab={Tab.COMPARISON} icon={<BarChart3 className="w-5 h-5" />} label="Model Metrics" />
          <NavItem tab={Tab.TUNING} icon={<Sliders className="w-5 h-5" />} label="Hyperparameters" />
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
            <div className="text-xs text-slate-500">
                <p>Based on Research:</p>
                <p className="mt-1 italic opacity-70">"NLP-based clinical text classification..." (2025)</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h1 className="font-bold text-slate-800">NeuroMed NLP</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;