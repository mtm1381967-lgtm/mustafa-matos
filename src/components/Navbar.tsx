import React from "react";
import { 
  FileText, 
  TrendingUp, 
  GraduationCap, 
  Award, 
  Users, 
  Sparkles, 
  Wifi, 
  Cpu, 
  Layers
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: {
    totalJobs: number;
    totalEmployees: number;
    totalCourses: number;
    totalEvaluations: number;
  };
  onOpenAiJobGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stats,
  onOpenAiJobGenerator
}) => {
  const tabs = [
    { id: "jobs", label: "الوصف الوظيفي والمهارات", icon: FileText, badge: stats.totalJobs },
    { id: "career", label: "تخطيط المسار الوظيفي", icon: TrendingUp },
    { id: "training", label: "التدريب والتطوير", icon: GraduationCap, badge: stats.totalCourses },
    { id: "performance", label: "تقييم الأداء الذكي", icon: Award, badge: stats.totalEvaluations },
    { id: "employees", label: "دليل الموظفين", icon: Users, badge: stats.totalEmployees },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-xl tracking-wider border border-cyan-400/30">
              <Wifi className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  تليكوم تيك HR
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 rounded-full flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> 5G & Tech AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                منظومة إدارة الموارد البشرية والمسارات والتقييم الذكي لشركات الاتصالات والتقنية
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAiJobGenerator}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg text-xs font-medium shadow-md shadow-cyan-900/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-spin" />
            توصيف AI
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenAiJobGenerator}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-900/30 border border-cyan-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
            <span>مولّد الوصف الوظيفي بالـ AI</span>
          </button>
        </div>

      </div>
    </header>
  );
};
