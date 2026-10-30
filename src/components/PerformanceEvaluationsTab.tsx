import React, { useState } from "react";
import { Employee, JobDescription, PerformanceEvaluation, KpiScore } from "../types";
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  UserCheck, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Plus, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Zap,
  Target
} from "lucide-react";

interface PerformanceEvaluationsTabProps {
  employees: Employee[];
  jobs: JobDescription[];
  onSaveEvaluation: (employeeId: string, evalData: PerformanceEvaluation) => void;
}

export const PerformanceEvaluationsTab: React.FC<PerformanceEvaluationsTabProps> = ({
  employees,
  jobs,
  onSaveEvaluation
}) => {
  const [selectedEmpId, setSelectedEmpId] = useState<string>(employees[0]?.id || "");
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState<boolean>(false);
  const [expandedEvalId, setExpandedEvalId] = useState<string | null>(employees[0]?.lastEvaluation?.id || null);

  // Form State for new Evaluation
  const [evalPeriod, setEvalPeriod] = useState<string>("التقييم السنوي 2026");
  const [managerFeedbackInput, setManagerFeedbackInput] = useState<string>("");
  const [selfFeedbackInput, setSelfFeedbackInput] = useState<string>("");
  const [kpiInputs, setKpiInputs] = useState<KpiScore[]>([
    { kpiName: "جودة واستقرار الخدمة SLA Uptime", weight: 40, score: 95, target: 99.9 },
    { kpiName: "سرعة معالجة الأعطال MTTR", weight: 35, score: 88, target: 90 },
    { kpiName: "إنجاز المشاريع التشغيلية في الموعد", weight: 25, score: 90, target: 90 }
  ]);
  const [generatingAi, setGeneratingAi] = useState<boolean>(false);
  const [generatedAiResult, setGeneratedAiResult] = useState<any | null>(null);

  const selectedEmployee = employees.find((e) => e.id === selectedEmpId) || employees[0];
  const employeeJob = jobs.find((j) => j.id === selectedEmployee?.jobId);

  // Handle calling Gemini AI for Performance Evaluation
  const handleGenerateAiEvaluation = async () => {
    if (!selectedEmployee) return;
    setGeneratingAi(true);

    try {
      const response = await fetch("/api/gemini/evaluate-performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName: selectedEmployee.name,
          jobTitle: selectedEmployee.jobTitle,
          department: selectedEmployee.department,
          kpis: kpiInputs,
          skills: selectedEmployee.skills,
          managerFeedback: managerFeedbackInput,
          selfFeedback: selfFeedbackInput
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setGeneratedAiResult(resData.data);
      } else {
        alert("فشل توليد التقييم الذكي: " + resData.error);
      }
    } catch (error: any) {
      console.error("AI Evaluation error:", error);
      alert("حدث خطأ في الاتصال بالذكاء الاصطناعي");
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleSaveEvaluation = () => {
    if (!selectedEmployee || !generatedAiResult) {
      alert("يرجى توليد التقييم بواسطة الـ AI أولاً قبل الحفظ.");
      return;
    }

    const newEval: PerformanceEvaluation = {
      id: `eval-${Date.now()}`,
      employeeId: selectedEmployee.id,
      date: new Date().toISOString().split("T")[0],
      period: evalPeriod,
      overallRating: generatedAiResult.overallRating || 4.5,
      kpiScores: kpiInputs,
      skillScores: selectedEmployee.skills.map((s) => ({
        skillName: s.skillName,
        requiredLevel: 85,
        evaluatedLevel: s.currentLevel
      })),
      managerFeedback: managerFeedbackInput,
      selfFeedback: selfFeedbackInput,
      aiSummary: generatedAiResult.summary,
      strengths: generatedAiResult.strengths,
      improvementAreas: generatedAiResult.improvementAreas,
      skillGaps: generatedAiResult.skillGaps,
      recommendedTraining: generatedAiResult.recommendedTraining,
      careerAdvice: generatedAiResult.careerAdvice
    };

    onSaveEvaluation(selectedEmployee.id, newEval);
    alert("تم حفظ التقييم بنجاح ونشره بملف الموظف!");
    setIsEvaluationModalOpen(false);
    setGeneratedAiResult(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs mb-1">
              <Award className="w-4 h-4" />
              <span>نظام تقييم الأداء الذكي والمهارات التخصصية</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              تقييم أداء الموظفين وربط المهارات بالمتطلبات المهنية
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              تحليل شامل لمؤشرات KPIs، التقييم الذاتي، ومحظات المدراء، مع توليد فوري للتقرير الذكي وتوصيات التدريب والترقية عبر الذكاء الاصطناعي (Gemini).
            </p>
          </div>

          <button
            onClick={() => setIsEvaluationModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-950 transition-all border border-purple-400/30"
          >
            <Sparkles className="w-4 h-4 text-purple-200 animate-spin" />
            <span>إجراء تقييم أداء جديد (AI)</span>
          </button>
        </div>
      </div>

      {/* Existing Evaluations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          <span>تقارير وسجلات تقييم الأداء السابقة</span>
        </h3>

        {employees.map((emp) => {
          const evalItem = emp.lastEvaluation;
          if (!evalItem) return null;
          const isExpanded = expandedEvalId === evalItem.id;

          return (
            <div
              key={evalItem.id}
              className={`bg-slate-900/90 border transition-all duration-200 rounded-2xl overflow-hidden shadow-lg ${
                isExpanded ? "border-purple-500/50 ring-1 ring-purple-500/30" : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Header */}
              <div
                onClick={() => setExpandedEvalId(isExpanded ? null : evalItem.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/30"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={emp.avatar}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{emp.name}</h4>
                      <span className="text-xs text-slate-400 font-medium">({emp.jobTitle})</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-purple-300 border border-purple-800">
                        {evalItem.period}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span>تاريخ التقييم: {evalItem.date}</span>
                      <span>القسم: {emp.department}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between md:justify-end">
                  {/* Rating Score Badge */}
                  <div className="flex items-center gap-2 bg-purple-950/80 border border-purple-800 px-3.5 py-1.5 rounded-xl">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-black text-purple-200">{evalItem.overallRating}</span>
                    <span className="text-xs text-purple-400">/ 5.0</span>
                  </div>

                  <span className="text-xs font-semibold text-purple-400 flex items-center gap-1">
                    {isExpanded ? "إغلاق التقرير" : "عرض التقرير الذكي الكامل"}
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </div>
              </div>

              {/* Expanded Report Content */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-slate-950/80 p-6 space-y-6">
                  
                  {/* AI Executive Summary */}
                  {evalItem.aiSummary && (
                    <div className="bg-gradient-to-r from-slate-900 to-purple-950/60 p-4 rounded-xl border border-purple-800/50 space-y-2">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>الملخص التنفيذي للتقييم الذكي (AI Executive Summary)</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {evalItem.aiSummary}
                      </p>
                    </div>
                  )}

                  {/* KPIs Breakdown */}
                  <div>
                    <h5 className="text-xs font-bold text-cyan-400 mb-2 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4" />
                      <span>تحليل مؤشرات قياس الأداء الرئيسية (KPIs)</span>
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {evalItem.kpiScores?.map((kpi, idx) => (
                        <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300">{kpi.kpiName}</span>
                            <span className="text-cyan-400 font-bold">{kpi.score}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${kpi.score}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500">
                            <span>الوزن: {kpi.weight}%</span>
                            <span>المستهدف: {kpi.target}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Improvement Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>نقاط القوة والانجازات البارزة</span>
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {evalItem.strengths?.map((str, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skill Gaps & Improvements */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>مجالات التحسين والفجوات المهارية المرصودة</span>
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {evalItem.skillGaps?.map((gap, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recommended Training & Career Advice */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h5 className="font-bold text-blue-400 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>التوصيات التدريبية لإغلاق الفجوات</span>
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {evalItem.recommendedTraining?.map((tr, i) => (
                          <span key={i} className="bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded-lg">
                            {tr}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h5 className="font-bold text-indigo-400 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        <span>توصية المسار الوظيفي والترقية</span>
                      </h5>
                      <p className="text-slate-300 leading-relaxed">
                        {evalItem.careerAdvice}
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Conduct New Smart Evaluation */}
      {isEvaluationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                <h3 className="text-base font-bold text-white">إجراء تقييم أداء وتطابق مهارات جديد (AI)</h3>
              </div>
              <button
                onClick={() => setIsEvaluationModalOpen(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              
              {/* Select Employee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">الموظف المراد تقييمه:</label>
                  <select
                    value={selectedEmpId}
                    onChange={(e) => {
                      setSelectedEmpId(e.target.value);
                      setGeneratedAiResult(null);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200"
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} — {emp.jobTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">فترة التقييم:</label>
                  <input
                    type="text"
                    value={evalPeriod}
                    onChange={(e) => setEvalPeriod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200"
                  />
                </div>
              </div>

              {/* KPIs input sliders */}
              <div>
                <label className="text-xs font-bold text-cyan-400 block mb-2">قياس مؤشرات الأداء الرئيسية (KPIs):</label>
                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {kpiInputs.map((kpi, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                      <span className="text-slate-300 truncate w-1/2">{kpi.kpiName}</span>
                      <div className="flex items-center gap-2 w-1/2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={kpi.score}
                          onChange={(e) => {
                            const updated = [...kpiInputs];
                            updated[idx].score = Number(e.target.value);
                            setKpiInputs(updated);
                          }}
                          className="w-full cursor-pointer accent-cyan-500"
                        />
                        <span className="font-bold text-cyan-300 w-10 text-left">{kpi.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedbacks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">ملاحظات المدير المباشر:</label>
                  <textarea
                    rows={2}
                    value={managerFeedbackInput}
                    onChange={(e) => setManagerFeedbackInput(e.target.value)}
                    placeholder="اكتب انطباع المباشر عن الالتزام والجودة..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">التقييم الذاتي للموظف:</label>
                  <textarea
                    rows={2}
                    value={selfFeedbackInput}
                    onChange={(e) => setSelfFeedbackInput(e.target.value)}
                    placeholder="ملاحظات الموظف عن إنجازاته وتطلعاته..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  ></textarea>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateAiEvaluation}
                disabled={generatingAi}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-purple-200 animate-spin" />
                <span>{generatingAi ? "جاري التقييم والتحليل الذكي عبر Gemini..." : "توليد تقرير الأداء الشامل بواسطة الـ AI"}</span>
              </button>

              {/* AI Generated Result Preview */}
              {generatedAiResult && (
                <div className="bg-slate-950 border border-purple-500/50 p-4 rounded-xl space-y-3 animate-fadeIn text-xs">
                  <div className="flex items-center justify-between border-b border-purple-900 pb-2">
                    <span className="font-bold text-purple-300">نتيجة التقييم المولد ذكياً:</span>
                    <span className="font-black text-amber-400 text-sm">{generatedAiResult.overallRating} / 5.0 ({generatedAiResult.ratingCategory})</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{generatedAiResult.summary}</p>
                  <div>
                    <span className="text-emerald-400 font-bold block mb-1">نقاط القوة:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {generatedAiResult.strengths?.map((s: string, i: number) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsEvaluationModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveEvaluation}
                disabled={!generatedAiResult}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-950 disabled:opacity-40"
              >
                حفظ ونشر التقييم
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
