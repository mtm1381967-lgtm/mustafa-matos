import React, { useState } from "react";
import { Employee, JobDescription, TrainingCourse } from "../types";
import { 
  Users, 
  Search, 
  UserPlus, 
  Briefcase, 
  Award, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  BarChart2, 
  BookOpen, 
  TrendingUp,
  X,
  Plus
} from "lucide-react";

interface EmployeesDirectoryTabProps {
  employees: Employee[];
  jobs: JobDescription[];
  courses: TrainingCourse[];
  onAddEmployee: (employee: Employee) => void;
  onUpdateEmployeeSkills: (employeeId: string, updatedSkills: any[]) => void;
}

export const EmployeesDirectoryTab: React.FC<EmployeesDirectoryTabProps> = ({
  employees,
  jobs,
  courses,
  onAddEmployee
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("الكل");
  const [inspectingEmployee, setInspectingEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form State
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState(`EMP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("+966 50 000 0000");
  const [newJobId, setNewJobId] = useState(jobs[0]?.id || "");
  const [newExperience, setNewExperience] = useState(3);

  const departments = ["الكل", "شبكات الاتصالات", "تكنولوجيا المعلومات والCloud", "الأمن السيبراني", "إدارة المنتجات الرقمية", "البحث والتطوير والذكاء الاصطناعي"];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.includes(searchTerm) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.jobTitle.includes(searchTerm);
    const matchesDept = selectedDept === "الكل" || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateEmployee = () => {
    if (!newName) {
      alert("يرجى إدخال اسم الموظف.");
      return;
    }

    const selectedJob = jobs.find((j) => j.id === newJobId) || jobs[0];

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      name: newName,
      code: newCode,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      email: newEmail || `${newName.split(" ")[0].toLowerCase()}@telecomtech.sa`,
      phone: newPhone,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      department: selectedJob.department,
      level: selectedJob.level,
      hireDate: new Date().toISOString().split("T")[0],
      experienceYears: newExperience,
      skills: selectedJob.requiredSkills.map((sk) => ({
        skillId: sk.id,
        skillName: sk.name,
        currentLevel: Math.floor(Math.random() * 30) + 60 // 60-90% baseline
      })),
      targetJobTitle: "قائد فريق تشغيل الشبكات",
      trainingEnrollments: []
    };

    onAddEmployee(newEmp);
    alert("تمت إضافة الموظف الجديد بنجاح!");
    setIsAddModalOpen(false);
    setNewName("");
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
              <Users className="w-4 h-4" />
              <span>السجل الموحد للكوادر والكفاءات التقنية</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              دليل موظفي شركة الاتصالات والتقنية
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              إدارة الملفات الشخصية، متابعة سجلات الأداء، استعراض كفاءات المهارات الحالية، والدورات التدريبية النشطة لكل موظف.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 border border-cyan-400/30 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة موظف جديد</span>
          </button>
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
            placeholder="ابحث بالاسم، الكود، أو المسمى..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{emp.name}</h3>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.2 rounded-md">
                      {emp.code}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>{emp.jobTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  <span>{emp.department} • خبرة {emp.experienceYears} سنوات</span>
                </div>
              </div>

              {/* Skills summary tags */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-500 block">أبرز الكفاءات:</span>
                <div className="flex flex-wrap gap-1">
                  {emp.skills.slice(0, 3).map((sk, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {sk.skillName}: {sk.currentLevel}%
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                {emp.lastEvaluation ? `التقييم: ${emp.lastEvaluation.overallRating} ⭐` : "جديد"}
              </span>

              <button
                onClick={() => setInspectingEmployee(emp)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl font-semibold transition-colors"
              >
                عرض الملف الموحد
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Employee Profile Modal */}
      {inspectingEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={inspectingEmployee.avatar}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{inspectingEmployee.name}</h3>
                    <span className="text-xs text-cyan-400 font-mono bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                      {inspectingEmployee.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{inspectingEmployee.jobTitle} • {inspectingEmployee.department}</p>
                </div>
              </div>

              <button
                onClick={() => setInspectingEmployee(null)}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Contact & Meta info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">{inspectingEmployee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{inspectingEmployee.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>تاريخ التعيين: {inspectingEmployee.hireDate}</span>
              </div>
            </div>

            {/* Skill Levels Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" />
                <span>مستوى المهارات والكفاءات الفنية المعتمدة</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {inspectingEmployee.skills.map((sk, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-200">{sk.skillName}</span>
                      <span className="text-cyan-400 font-bold">{sk.currentLevel}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${sk.currentLevel}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Role & Evaluation */}
            {inspectingEmployee.lastEvaluation && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-purple-300">
                  <span>أحدث تقييم أداء ({inspectingEmployee.lastEvaluation.period}):</span>
                  <span>النتيجة: {inspectingEmployee.lastEvaluation.overallRating} / 5.0 ⭐</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {inspectingEmployee.lastEvaluation.aiSummary}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setInspectingEmployee(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Employee */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                <span>إضافة موظف جديد لشركة الاتصالات</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">اسم الموظف الثلاثي:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثل: عبد العزيز بن سلطان المالكي"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">الوظيفة المنسوبة:</label>
                <select
                  value={newJobId}
                  onChange={(e) => setNewJobId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                >
                  {jobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">البريد الإلكتروني:</label>
                  <input
                    type="text"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="a.almalki@telecomtech.sa"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">سنوات الخبرة:</label>
                  <input
                    type="number"
                    value={newExperience}
                    onChange={(e) => setNewExperience(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={handleCreateEmployee}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-md shadow-cyan-950"
              >
                حفظ وإضافة الموظف
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
