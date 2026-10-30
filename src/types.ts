export interface RequiredSkill {
  id: string;
  name: string;
  category: "تقنية" | "إدارية" | "أمنية" | "قيادية" | "سحابية";
  requiredLevel: number; // 0 to 100
}

export interface JobDescription {
  id: string;
  title: string;
  titleEn: string;
  department: string;
  level: "مبتدئ" | "متوسط" | "خبير" | "قائد فريق" | "مدير / مهندس معماري";
  purpose: string;
  responsibilities: string[];
  requiredSkills: RequiredSkill[];
  certifications: string[];
  kpis: string[];
  salaryRange: string;
}

export interface EmployeeSkill {
  skillId: string;
  skillName: string;
  currentLevel: number; // 0 to 100
}

export interface TrainingEnrollment {
  courseId: string;
  status: "جديد" | "قيد التدريب" | "مكتمل";
  progress: number; // 0 - 100
  completionDate?: string;
}

export interface KpiScore {
  kpiName: string;
  weight: number; // e.g. 25 (%)
  score: number; // 0 to 100 or 1 to 5
  target: number;
}

export interface PerformanceEvaluation {
  id: string;
  employeeId: string;
  date: string;
  period: string;
  overallRating: number; // e.g., 4.2 out of 5
  kpiScores: KpiScore[];
  skillScores: { skillName: string; requiredLevel: number; evaluatedLevel: number }[];
  managerFeedback: string;
  selfFeedback: string;
  aiSummary?: string;
  strengths?: string[];
  improvementAreas?: string[];
  skillGaps?: string[];
  recommendedTraining?: string[];
  careerAdvice?: string;
}

export interface Employee {
  id: string;
  name: string;
  code: string;
  avatar: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  department: string;
  level: string;
  hireDate: string;
  experienceYears: number;
  skills: EmployeeSkill[];
  targetJobId?: string;
  targetJobTitle?: string;
  trainingEnrollments: TrainingEnrollment[];
  lastEvaluation?: PerformanceEvaluation;
}

export interface TrainingCourse {
  id: string;
  title: string;
  provider: string;
  targetSkills: string[];
  category: string;
  duration: string;
  level: "مبتدئ" | "متوسط" | "متقدم";
  certificationName: string;
  description: string;
  rating: number;
  enrolledCount: number;
}

export interface CareerLadderStep {
  level: string;
  jobId: string;
  title: string;
  minExperienceYears: number;
  keySkills: string[];
}

export interface CareerLadder {
  department: string;
  steps: CareerLadderStep[];
}
