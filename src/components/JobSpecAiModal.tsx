import React, { useState } from "react";
import { JobDescription } from "../types";
import { Sparkles, Layers, Briefcase, Plus, Check } from "lucide-react";

interface JobSpecAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: JobDescription) => void;
}

export const JobSpecAiModal: React.FC<JobSpecAiModalProps> = ({
  isOpen,
  onClose,
  onAddJob
}) => {
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("شبكات الاتصالات");
  const [levelInput, setLevelInput] = useState<"مبتدئ" | "متوسط" | "خبير" | "قائد فريق" | "مدير / مهندس معماري">("خبير");
  const [loading, setLoading] = useState(false);
  const [generatedJob, setGeneratedJob] = useState<JobDescription | null>(null);

  const departments = [
    "شبكات الاتصالات",
    "تكنولوجيا المعلومات والCloud",
    "الأمن السيبراني",
    "إدارة المنتجات الرقمية",
    "البحث والتطوير والذكاء الاصطناعي",
    "مراكز البيانات والأنظمة"
  ];

  const levels = ["مبتدئ", "متوسط", "خبير", "قائد فريق", "مدير / مهندس معماري"];

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!jobTitleInput.trim()) {
      alert("يرجى إدخال المسمى الوظيفي المطلوب توليده.");
      return;
    }

    setLoading(true);
    setGeneratedJob(null);

    try {
      const response = await fetch("/api/gemini/generate-job-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitleInput,
          department: departmentInput,
          level: levelInput
        })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const raw = resData.data;
        const formattedJob: JobDescription = {
          id: `job-${Date.now()}`,
          title: raw.title || jobTitleInput,
          titleEn: jobTitleInput,
          department: raw.department || departmentInput,
          level: raw.level || levelInput,
          purpose: raw.purpose || "",
          responsibilities: raw.responsibilities || [],
          requiredSkills: (raw.requiredSkills || []).map((sk: any, i: number) => ({
            id: `sk-${Date.now()}-${i}`,
            name: sk.name,
            category: sk.category || "تقنية",
            requiredLevel: sk.requiredLevel || 85
          })),
          certifications: raw.certifications || [],
          kpis: raw.kpis || [],
          salaryRange: raw.salaryRange || "18,000 - 28,000 ر.س"
        };

        setGeneratedJob(formattedJob);
      } else {
        alert("تعذر توليد التوصيف الوظيفي: " + resData.error);
      }
    } catch (err: any) {
      console.error("AI Job Spec Generation Error:", err);
      alert("حدث خطأ في الاتصال بالذكاء الاصطناعي");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!generatedJob) return;
    onAddJob(generatedJob);
    alert("تمت إضافة التوصيف الوظيفي الجديد لدليل الشركة بنجاح!");
    onClose();
    setGeneratedJob(null);
    setJobTitleInput("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
            <h3 className="text-base font-bold text-white">
              مولّد التوصيف والوصف الوظيفي الذكي لقطاع الاتصالات (AI)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">
            ✕
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 block mb-1 font-semibold">المسمى الوظيفي المستهدف:</label>
            <input
              type="text"
              value={jobTitleInput}
              onChange={(e) => setJobTitleInput(e.target.value)}
              placeholder="مثال: مهندس هندسة معمارية 6G، أخصائي أمن شبكات SD-WAN، أو مدير منتجات IoT"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1 font-semibold">القسم التابع:</label>
              <select
                value={departmentInput}
                onChange={(e) => setDepartmentInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">المستوى الوظيفي:</label>
              <select
                value={levelInput}
                onChange={(e) => setLevelInput(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
            <span>{loading ? "جاري ابتكار وصياغة التوصيف الوظيفي عبر Gemini..." : "إنشاء التوصيف الوظيفي بالذكاء الاصطناعي"}</span>
          </button>
        </div>

        {/* Generated Result Preview */}
        {generatedJob && (
          <div className="bg-slate-950 border border-cyan-500/40 p-4 rounded-xl space-y-3 text-xs max-h-72 overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-300 text-sm">{generatedJob.title}</span>
              <span className="text-emerald-400 font-bold">{generatedJob.salaryRange}</span>
            </div>

            <div>
              <span className="font-bold text-slate-400 block mb-1">الهدف الوظيفي:</span>
              <p className="text-slate-200 leading-relaxed">{generatedJob.purpose}</p>
            </div>

            <div>
              <span className="font-bold text-blue-400 block mb-1">المهام الأساسية:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                {generatedJob.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-indigo-400 block mb-1">المهارات التقنية ونسبة الإتقان:</span>
              <div className="grid grid-cols-2 gap-2">
                {generatedJob.requiredSkills.map((sk, i) => (
                  <div key={i} className="bg-slate-900 p-2 rounded border border-slate-800">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span>{sk.name}</span>
                      <span className="text-cyan-400">{sk.requiredLevel}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-amber-400 block mb-1">الشهادات الموصى بها:</span>
              <div className="flex flex-wrap gap-1">
                {generatedJob.certifications.map((c, i) => (
                  <span key={i} className="bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirmAdd}
            disabled={!generatedJob}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950 disabled:opacity-40"
          >
            حفظ وإضافة للدليل الموحد
          </button>
        </div>

      </div>
    </div>
  );
};
