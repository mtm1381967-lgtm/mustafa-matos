import React, { useState } from "react";
import { TrainingCourse, Employee, JobDescription } from "../types";
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  UserPlus, 
  BookOpen, 
  Search, 
  Sparkles, 
  Layers, 
  Plus, 
  Check, 
  BarChart3,
  Star
} from "lucide-react";

interface TrainingDevelopmentTabProps {
  courses: TrainingCourse[];
  employees: Employee[];
  jobs: JobDescription[];
  onEnrollEmployee: (employeeId: string, courseId: string) => void;
  onAddCourse?: (course: TrainingCourse) => void;
}

export const TrainingDevelopmentTab: React.FC<TrainingDevelopmentTabProps> = ({
  courses,
  employees,
  jobs,
  onEnrollEmployee
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [assigningCourse, setAssigningCourse] = useState<TrainingCourse | null>(null);
  const [selectedEmpToAssign, setSelectedEmpToAssign] = useState<string>(employees[0]?.id || "");

  const categories = ["الكل", "شبكات الاتصالات", "تكنولوجيا المعلومات والCloud", "الأمن السيبراني", "البحث والتطوير والذكاء الاصطناعي", "إدارية وقيادية"];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.includes(searchTerm) ||
      c.certificationName.includes(searchTerm) ||
      c.provider.includes(searchTerm);
    const matchesCat = selectedCategory === "الكل" || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleConfirmEnrollment = () => {
    if (!assigningCourse || !selectedEmpToAssign) return;
    onEnrollEmployee(selectedEmpToAssign, assigningCourse.id);
    alert(`تم تسجيل الموظف في دورة: ${assigningCourse.title}`);
    setAssigningCourse(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>منظومة التدريب والتطوير لقطاع الاتصالات والتقنية</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              برامج التطوير المهني وإتاحة الشهادات المعتمدة
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              مسارات تعليمية متخصصة لربط الدورات الفنية بشهادات Cisco, AWS, TM Forum, CISSP, FOA وإغلاق الفجوات المهارية للموظفين.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث بالدورة، المورد، أو الشهادة..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Training Courses Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                  {course.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {course.title}
                </h3>
                <span className="text-xs text-slate-400 font-medium block mt-1">
                  المُزوّد: {course.provider}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              {/* Certification Box */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-amber-300 truncate">{course.certificationName}</span>
              </div>

              {/* Target Skills */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 block">تستهدف مهارات:</span>
                <div className="flex flex-wrap gap-1">
                  {course.targetSkills.map((sk, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{course.duration}</span>
                </span>
              </div>

              <button
                onClick={() => setAssigningCourse(course)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-950 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>تعيين لموظف</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Employee Active Training Tracker */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>متابعة إنجاز الدورات والشهادات الحالية للموظفين</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <th className="p-3">الموظف</th>
                <th className="p-3">الوظيفة الحالية</th>
                <th className="p-3">الدورة التدريبية / الشهادة</th>
                <th className="p-3">حالة التدريب</th>
                <th className="p-3">نسبة الإنجاز</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {employees.flatMap((emp) =>
                emp.trainingEnrollments.map((enr, idx) => {
                  const crs = courses.find((c) => c.id === enr.courseId);
                  return (
                    <tr key={`${emp.id}-${idx}`} className="hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-white flex items-center gap-2">
                        <img src={emp.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                        <span>{emp.name}</span>
                      </td>
                      <td className="p-3 text-slate-400">{emp.jobTitle}</td>
                      <td className="p-3 font-medium text-cyan-300">
                        {crs ? crs.title : enr.courseId}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
                            enr.status === "مكتمل"
                              ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                              : enr.status === "قيد التدريب"
                              ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {enr.status}
                        </span>
                      </td>
                      <td className="p-3 w-40">
                        <div className="flex items-center gap-2">
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              style={{ width: `${enr.progress}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-slate-300 w-8">{enr.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Assign Course to Employee */}
      {assigningCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                <span>تعيين برنامج تدريبي لموظف</span>
              </h3>
              <button
                onClick={() => setAssigningCourse(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-400 block">الدورة المختارة:</span>
              <span className="font-bold text-cyan-300 block text-sm">{assigningCourse.title}</span>
              <span className="text-amber-400 text-[11px] block">{assigningCourse.certificationName}</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                اختر الموظف المراد تسجيله:
              </label>
              <select
                value={selectedEmpToAssign}
                onChange={(e) => setSelectedEmpToAssign(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setAssigningCourse(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={handleConfirmEnrollment}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-950"
              >
                تأكيد التسجيل
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
