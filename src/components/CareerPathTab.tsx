import React, { useState } from "react";
import { Employee, JobDescription, CareerLadder } from "../types";
import { 
  TrendingUp, 
  User, 
  Target, 
  Sparkles, 
  Award, 
  BarChart2, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  AlertCircle, 
  BookOpen, 
  Compass, 
  Zap,
  Layers
} from "lucide-react";

interface CareerPathTabProps {
  employees: Employee[];
  jobs: JobDescription[];
  careerLadders: CareerLadder[];
  onAssignTraining?: (employeeId: string, courseId: string) => void;
}

export const CareerPathTab: React.FC<CareerPathTabProps> = ({
  employees,
  jobs,
  careerLadders
}) => {
  const [selectedEmpId, setSelectedEmpId] = useState<string>(employees[0]?.id || "");
  const [selectedTargetJobId, setSelectedTargetJobId] = useState<string>(
    jobs.find((j) => j.id !== employees[0]?.jobId)?.id || jobs[1]?.id || ""
  );
  const [activeDepartment, setActiveDepartment] = useState<string>("شبكات الاتصالات");
  const [aiAdvice, setAiAdvice] = useState<any | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const selectedEmployee = employees.find((e) => e.id === selectedEmpId) || employees[0];
  const currentJob = jobs.find((j) => j.id === selectedEmployee?.jobId);
  const targetJob = jobs.find((j) => j.id === selectedTargetJobId) || jobs[1];

  // Calculate Skill Gap Match Matrix
  const getSkillMatch = () => {
    if (!targetJob || !selectedEmployee) return { score: 0, gaps: [], matches: [] };

    let totalScore = 0;
    const gaps: { name: string; current: number; required: number; diff: number }[] = [];
    const matches: { name: string; current: number; required: number }[] = [];

    targetJob.requiredSkills.forEach((reqSkill) => {
      const empSkill = selectedEmployee.skills.find(
        (s) => s.skillName.toLowerCase() === reqSkill.name.toLowerCase() || s.skillId === reqSkill.id
      );
      const currentVal = empSkill ? empSkill.currentLevel : 40; // Default baseline if not explicitly listed
      const diff = reqSkill.requiredLevel - currentVal;

      if (diff > 0) {
        gaps.push({
          name: reqSkill.name,
          current: currentVal,
          required: reqSkill.requiredLevel,
          diff
        });
      } else {
        matches.push({
          name: reqSkill.name,
          current: currentVal,
          required: reqSkill.requiredLevel
        });
      }

      const ratio = Math.min(1, currentVal / reqSkill.requiredLevel);
      totalScore += ratio;
    });

    const readinessScore = targetJob.requiredSkills.length > 0
      ? Math.round((totalScore / targetJob.requiredSkills.length) * 100)
      : 70;

    return { readinessScore, gaps, matches };
  };

  const { readinessScore, gaps, matches } = getSkillMatch();

  // Call Gemini AI Endpoint for Career Path Advice
  const handleGenerateAiCareerAdvice = async () => {
    if (!selectedEmployee || !targetJob) return;
    setLoadingAi(true);
    setAiAdvice(null);

    try {
      const response = await fetch("/api/gemini/career-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName: selectedEmployee.name,
          currentRole: selectedEmployee.jobTitle,
          targetRole: targetJob.title,
          currentSkills: selectedEmployee.skills,
          skillGaps: gaps
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setAiAdvice(resData.data);
      } else {
        alert("تعذر توليد خطة المسار الوظيفي بالذكاء الاصطناعي: " + resData.error);
      }
    } catch (err: any) {
      console.error("AI Career Advice Error:", err);
      alert("حدث خطأ في الاتصال بخدمة الذكاء الاصطناعي");
    } finally {
      setLoadingAi(false);
    }
  };

  const activeLadder = careerLadders.find((l) => l.department === activeDepartment) || careerLadders[0];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
              <Compass className="w-4 h-4" />
              <span>تخطيط وتطوير المسارات الوظيفية المتقدمة</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              تخطيط المسار المهني وجاهزية الترقية للموظفين
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              ربط كفاءات الموظفين بالمتطلبات المتقدمة للوظائف المستهدفة، تحليل الفجوات المهارية، واستشراف مستويات الجاهزية مع خطط الترقية الموجهة بواسطة AI.
            </p>
          </div>
        </div>
      </div>

      {/* Career Ladder View by Department */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>سلم المسارات الوظيفية (Career Ladders) حسب القطاع</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              تدرج المستويات الوظيفية من المبتدئ حتى كبير المعماريين
            </p>
          </div>

          {/* Department selector tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {careerLadders.map((ladder) => (
              <button
                key={ladder.department}
                onClick={() => setActiveDepartment(ladder.department)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeDepartment === ladder.department
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {ladder.department}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Ladder Steps */}
        <div className="relative pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {activeLadder.steps.map((step, idx) => (
              <div
                key={step.jobId}
                className="bg-slate-950 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl relative flex flex-col justify-between space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-md">
                    {step.level}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-100 leading-snug">
                    {step.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>خبرة أدنى: {step.minExperienceYears} سنوات</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-900">
                  <span className="text-[10px] text-slate-500 block">المهارات المفتاحية:</span>
                  <div className="flex flex-wrap gap-1">
                    {step.keySkills.map((sk, i) => (
                      <span key={i} className="text-[9px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Career Transition Planner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <span>مخطط الانتقال المهني وتقييم الفجوات المهارية لموظف</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              اختر الموظف والوظيفة المستهدفة لقياس مدى الموائمة والفجوات بدقة
            </p>
          </div>

          <button
            onClick={handleGenerateAiCareerAdvice}
            disabled={loadingAi}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-950 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
            <span>{loadingAi ? "جاري التخطيط الذكي..." : "توليد استشارة مسار AI"}</span>
          </button>
        </div>

        {/* Selection Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          
          {/* Employee Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>الموظف الحالي:</span>
            </label>
            <select
              value={selectedEmpId}
              onChange={(e) => {
                setSelectedEmpId(e.target.value);
                setAiAdvice(null);
              }}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-cyan-500"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.jobTitle} ({emp.department})
                </option>
              ))}
            </select>
          </div>

          {/* Target Job Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>الوظيفة المستهدفة للترقية / الانتقال:</span>
            </label>
            <select
              value={selectedTargetJobId}
              onChange={(e) => {
                setSelectedTargetJobId(e.target.value);
                setAiAdvice(null);
              }}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-indigo-500"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} — {job.department} ({job.level})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Selected Transition Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Transition Readiness Meter */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-xs text-slate-400 font-semibold">مؤشر جاهزية الترقية الانتقالية</span>
            
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="10"
                  className={readinessScore >= 80 ? "text-emerald-400" : readinessScore >= 65 ? "text-cyan-400" : "text-amber-400"}
                  strokeDasharray={326}
                  strokeDashoffset={326 - (326 * readinessScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white">{readinessScore}%</span>
                <span className="text-[10px] text-slate-400">نسبة التطابق</span>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-200">
              من: <span className="text-cyan-400">{selectedEmployee.jobTitle}</span>
              <br />
              إلى: <span className="text-indigo-400">{targetJob.title}</span>
            </div>
          </div>

          {/* Right: Skill Gap Comparison Matrix */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>مصفوفة مطابقة المهارات الحالية بالمتطلبات المهنية الدقيقة</span>
            </h4>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {targetJob.requiredSkills.map((req) => {
                const empSkill = selectedEmployee.skills.find(
                  (s) => s.skillName.toLowerCase() === req.name.toLowerCase() || s.skillId === req.id
                );
                const currentVal = empSkill ? empSkill.currentLevel : 40;
                const isGap = req.requiredLevel > currentVal;

                return (
                  <div key={req.id} className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{req.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">الحالي: {currentVal}%</span>
                        <span className="text-cyan-400 font-bold">المطلوب: {req.requiredLevel}%</span>
                        {isGap ? (
                          <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 text-[10px] rounded font-bold">
                            فجوة -{req.requiredLevel - currentVal}%
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] rounded font-bold">
                            متطابق ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
                      {/* Current Level */}
                      <div
                        className="h-full bg-cyan-500 rounded-full absolute top-0 right-0 z-10"
                        style={{ width: `${currentVal}%` }}
                      ></div>
                      {/* Required Target Level marker */}
                      <div
                        className="h-full bg-slate-700 rounded-full absolute top-0 right-0 opacity-40"
                        style={{ width: `${req.requiredLevel}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* AI Career Advice Output Box */}
        {aiAdvice && (
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 border border-indigo-500/40 rounded-xl p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-indigo-900/60 pb-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>خطة المسار الوظيفي المولد بالذكاء الاصطناعي (Gemini AI)</span>
              </div>
              <span className="text-xs bg-indigo-900/80 text-indigo-200 px-2.5 py-1 rounded-md border border-indigo-700">
                المدة المتوقعة: {aiAdvice.timeframeMonths}
              </span>
            </div>

            <p className="text-xs text-slate-200 bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
              {aiAdvice.summary}
            </p>

            {/* Milestones */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-cyan-400">مراحل التنفيذ والانتقال (Roadmap Milestones):</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aiAdvice.milestones?.map((m: any, idx: number) => (
                  <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                    <span className="text-indigo-400 font-bold block">{m.phase}</span>
                    <span className="text-slate-300 block font-medium">{m.objective}</span>
                    <span className="text-slate-400 block text-[11px]">{m.action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">الشهادات الموصى بإكمالها:</span>
                <div className="flex flex-wrap gap-1.5">
                  {aiAdvice.recommendedCertifications?.map((c: string, i: number) => (
                    <span key={i} className="bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">نصائح القائد للتفوق:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {aiAdvice.adviceSummary}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
