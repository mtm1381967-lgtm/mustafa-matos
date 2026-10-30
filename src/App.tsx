import React, { useState } from "react";
import { 
  initialJobs, 
  initialEmployees, 
  initialCourses, 
  initialCareerLadders 
} from "./data/hrData";
import { JobDescription, Employee, TrainingCourse, PerformanceEvaluation } from "./types";
import { Navbar } from "./components/Navbar";
import { JobDescriptionsTab } from "./components/JobDescriptionsTab";
import { CareerPathTab } from "./components/CareerPathTab";
import { TrainingDevelopmentTab } from "./components/TrainingDevelopmentTab";
import { PerformanceEvaluationsTab } from "./components/PerformanceEvaluationsTab";
import { EmployeesDirectoryTab } from "./components/EmployeesDirectoryTab";
import { JobSpecAiModal } from "./components/JobSpecAiModal";

export default function App() {
  const [jobs, setJobs] = useState<JobDescription[]>(initialJobs);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [courses, setCourses] = useState<TrainingCourse[]>(initialCourses);
  const [careerLadders] = useState(initialCareerLadders);
  
  const [activeTab, setActiveTab] = useState<string>("jobs");
  const [isAiJobModalOpen, setIsAiJobModalOpen] = useState<boolean>(false);

  // Handlers for state updates
  const handleAddJob = (newJob: JobDescription) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const handleEnrollEmployee = (employeeId: string, courseId: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== employeeId) return emp;
        const exists = emp.trainingEnrollments.some((e) => e.courseId === courseId);
        if (exists) return emp;

        return {
          ...emp,
          trainingEnrollments: [
            ...emp.trainingEnrollments,
            { courseId, status: "جديد", progress: 0 }
          ]
        };
      })
    );
  };

  const handleSaveEvaluation = (employeeId: string, evalData: PerformanceEvaluation) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== employeeId) return emp;
        return {
          ...emp,
          lastEvaluation: evalData
        };
      })
    );
  };

  // Stats summary for Navbar badges
  const stats = {
    totalJobs: jobs.length,
    totalEmployees: employees.length,
    totalCourses: courses.length,
    totalEvaluations: employees.filter((e) => !!e.lastEvaluation).length
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif] dir-rtl">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        onOpenAiJobGenerator={() => setIsAiJobModalOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Tab 1: Job Descriptions & Specifications */}
        {activeTab === "jobs" && (
          <JobDescriptionsTab
            jobs={jobs}
            onOpenAiGenerator={() => setIsAiJobModalOpen(true)}
            onAddJob={handleAddJob}
          />
        )}

        {/* Tab 2: Career Path & Growth Planning */}
        {activeTab === "career" && (
          <CareerPathTab
            employees={employees}
            jobs={jobs}
            careerLadders={careerLadders}
            onAssignTraining={handleEnrollEmployee}
          />
        )}

        {/* Tab 3: Training & Development */}
        {activeTab === "training" && (
          <TrainingDevelopmentTab
            courses={courses}
            employees={employees}
            jobs={jobs}
            onEnrollEmployee={handleEnrollEmployee}
          />
        )}

        {/* Tab 4: Smart Performance Evaluation & Skills */}
        {activeTab === "performance" && (
          <PerformanceEvaluationsTab
            employees={employees}
            jobs={jobs}
            onSaveEvaluation={handleSaveEvaluation}
          />
        )}

        {/* Tab 5: Employees Directory */}
        {activeTab === "employees" && (
          <EmployeesDirectoryTab
            employees={employees}
            jobs={jobs}
            courses={courses}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployeeSkills={() => {}}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            تليكوم تيك HR — نظام إدارة الموارد البشرية والمسارات والتقييم الذكي لشركة الاتصالات والتقنية
          </div>
          <div className="text-slate-600 font-mono">
            v2.5 • Powered by Gemini 3.6 Flash AI
          </div>
        </div>
      </footer>

      {/* AI Job Description Generator Modal */}
      <JobSpecAiModal
        isOpen={isAiJobModalOpen}
        onClose={() => setIsAiJobModalOpen(false)}
        onAddJob={handleAddJob}
      />

    </div>
  );
}
