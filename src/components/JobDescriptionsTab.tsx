import React, { useState } from "react";
import { JobDescription } from "../types";
import { 
  FileText, 
  Search, 
  Filter, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Award, 
  BarChart3, 
  Briefcase, 
  Layers, 
  ShieldAlert, 
  Zap, 
  Plus,
  Coins
} from "lucide-react";

interface JobDescriptionsTabProps {
  jobs: JobDescription[];
  onOpenAiGenerator: () => void;
  onAddJob: (newJob: JobDescription) => void;
}

export const JobDescriptionsTab: React.FC<JobDescriptionsTabProps> = ({
  jobs,
  onOpenAiGenerator,
  onAddJob
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(jobs[0]?.id || null);

  // Departments list for filtering
  const departments = ["الكل", "شبكات الاتصالات", "تكنولوجيا المعلومات والCloud", "الأمن السيبراني", "إدارة المنتجات الرقمية", "البحث والتطوير والذكاء الاصطناعي"];
  const levels = ["الكل", "مبتدئ", "متوسط", "خبير", "قائد فريق", "مدير / مهندس معماري"];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.includes(searchTerm) ||
      job.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.purpose.includes(searchTerm) ||
      job.requiredSkills.some((s) => s.name.includes(searchTerm));

    const matchesDept = selectedDept === "الكل" || job.department === selectedDept;
    const matchesLevel = selectedLevel === "الكل" || job.level === selectedLevel;

    return matchesSearch && matchesDept && matchesLevel;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "مبتدئ":
        return "bg-emerald-950/80 text-emerald-300 border-emerald-800";
      case "متوسط":
        return "bg-blue-950/80 text-blue-300 border-blue-800";
      case "خبير":
        return "bg-indigo-950/80 text-indigo-300 border-indigo-800";
      case "قائد فريق":
        return "bg-purple-950/80 text-purple-300 border-purple-800";
      case "مدير / مهندس معماري":
        return "bg-amber-950/80 text-amber-300 border-amber-800";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
              <Briefcase className="w-4 h-4" />
              <span>دليل المسميات والمهارات المهنية الدقيقة</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              الوصف والتوصيف الوظيفي لشركة الاتصالات والتقنية
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              تحديد المسئوليات الشاملة، معايير الكفاءة الدقيقة، المهارات التقنية المطلوبة بروابط مستويات الإتقان، والشهادات العالمية المعتمدة لقطاع الاتصالات والشبكات الذكية.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAiGenerator}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-900/40 border border-cyan-400/30 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
              <span>إنشاء توصيف جديد بالـ AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث بمسمى الوظيفة، المهارة، أو الشهادة..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">القسم:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-slate-900 text-slate-200">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">المستوى:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-slate-900 text-slate-200">
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-2 rounded-xl">
            العدد: <span className="font-bold text-cyan-300">{filteredJobs.length}</span> وظيفة
          </div>
        </div>

      </div>

      {/* Job Cards Grid / List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">لا توجد وظائف تطابق البحث</h3>
            <p className="text-xs text-slate-500 mt-1">جرب تغيير كلمات البحث أو استخدام المولد الذكي لإضافة توصيف وظيفي جديد.</p>
            <button
              onClick={onOpenAiGenerator}
              className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl"
            >
              توليد بواسطة AI
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div
                key={job.id}
                className={`bg-slate-900/90 border transition-all duration-200 rounded-2xl overflow-hidden shadow-lg ${
                  isExpanded ? "border-cyan-500/50 ring-1 ring-cyan-500/30" : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Job Card Header */}
                <div
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-lg shrink-0 mt-0.5">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                          {job.title}
                        </h3>
                        <span className="text-xs text-slate-400 dir-ltr font-mono font-medium">
                          ({job.titleEn})
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLevelBadgeColor(job.level)}`}>
                          {job.level}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-slate-500" />
                          <span>{job.department}</span>
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <Coins className="w-3.5 h-3.5" />
                          <span>{job.salaryRange}</span>
                        </span>
                        <span className="flex items-center gap-1 text-indigo-300">
                          <Award className="w-3.5 h-3.5" />
                          <span>{job.requiredSkills.length} مهارات رئيسية</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                    <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                      {isExpanded ? "إغلاق التفاصيل" : "عرض التوصيف الكامل"}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </div>

                {/* Job Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/60 p-6 space-y-6">
                    
                    {/* Purpose */}
                    <div>
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        <span>الهدف الرئيسي والوصف العام للوظيفة</span>
                      </h4>
                      <p className="text-sm text-slate-200 bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                        {job.purpose}
                      </p>
                    </div>

                    {/* Key Responsibilities */}
                    <div>
                      <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>المهام والمسؤوليات التخصصية</span>
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {job.responsibilities.map((resp, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-md bg-blue-950 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-blue-800">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Required Skills Matrix */}
                    <div>
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4" />
                        <span>مصفوفة المهارات التقنية الدقيقة ونسبة الإتقان المطلوبة</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {job.requiredSkills.map((skill) => (
                          <div
                            key={skill.id}
                            className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-xl space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-200">{skill.name}</span>
                              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                                {skill.requiredLevel}% إتقان
                              </span>
                            </div>
                            
                            {/* Skill Level Progress Bar */}
                            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${skill.requiredLevel}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500">
                              <span>التصنيف: {skill.category}</span>
                              <span>الحد الأدنى المقبول</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications & KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      
                      {/* Certifications */}
                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                        <h5 className="text-xs font-bold text-amber-400 mb-2.5 flex items-center gap-1.5">
                          <Award className="w-4 h-4" />
                          <span>الشهادات الموصى بها</span>
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {job.certifications.map((cert, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-amber-950/60 border border-amber-800/60 text-amber-300 rounded-lg text-xs font-medium"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* KPIs */}
                      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
                        <h5 className="text-xs font-bold text-emerald-400 mb-2.5 flex items-center gap-1.5">
                          <BarChart3 className="w-4 h-4" />
                          <span>مؤشرات قياس الأداء (KPIs)</span>
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {job.kpis.map((kpi, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                              <span>{kpi}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
