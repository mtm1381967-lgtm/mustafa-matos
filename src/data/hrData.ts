import { JobDescription, Employee, TrainingCourse, CareerLadder } from "../types";

export const initialJobs: JobDescription[] = [
  {
    id: "job-5g-eng",
    title: "مهندس شبكات الاتصالات 5G",
    titleEn: "5G Telecom Network Engineer",
    department: "شبكات الاتصالات",
    level: "متوسط",
    purpose: "تخطيط وتصميم وتشغيل شبكات الجيل الخامس (5G RAN & Core) لضمان التغطية العالية والاعتمادية والجودة العالية للبيانات والخدمات الصوتية.",
    responsibilities: [
      "إدارة وبرمجة بروتوكولات شبكات 5G (gNodeB, AMF, UPF, SMF).",
      "تحليل جودة الخدمة (QoS) وتأخير الاستجابة (Latency) على مستوى شبكة Access و Core.",
      "مراقبة الأداء اليومي ومعالجة الاختناقات في أجهزة الإرسال والاستقبال Radio Access Network.",
      "تطبيق تقنيات Network Slicing المتقدمة لتخصيص السعات للشركات والمؤسسات.",
      "التنسيق مع فرق البنية التحتية لحساب الأحمال وتوسعة التغطية الميدانية."
    ],
    requiredSkills: [
      { id: "sk-5g-ran", name: "إدارة شبكات 5G RAN & Core", category: "تقنية", requiredLevel: 90 },
      { id: "sk-ip-routing", name: "بروتوكولات التوجيه IP Routing & BGP/MPLS", category: "تقنية", requiredLevel: 85 },
      { id: "sk-net-slicing", name: "تقنية تقطيع الشبكات Network Slicing", category: "تقنية", requiredLevel: 80 },
      { id: "sk-troubleshoot", name: "تحليل واستكشاف الأعطال RF & Optical", category: "تقنية", requiredLevel: 85 },
      { id: "sk-project-mgmt", name: "إدارة المشاريع الميدانية Agile", category: "إدارية", requiredLevel: 70 }
    ],
    certifications: ["Cisco CCNP Enterprise / Service Provider", "Huawei HCIE-5G", "TM Forum eTOM Framework"],
    kpis: [
      "نسبة استقرار جودة الخدمة Uptime (> 99.99%)",
      "متوسط زمن معالجة الأعطال MTTR (< 30 دقيقة)",
      "تحسين كفاءة استخدام الترددات بنسبة 15%"
    ],
    salaryRange: "16,000 - 24,000 ر.س"
  },
  {
    id: "job-cloud-devops",
    title: "مهندس الحوسبة السحابية و DevOps",
    titleEn: "Cloud & DevOps Solutions Engineer",
    department: "تكنولوجيا المعلومات والCloud",
    level: "خبير",
    purpose: "بناء وإدارة البنية التحتية السحابية الهجينة والخاصة بالشركة، ومكننة عمليات النشر والتشغيل للتطبيقات والأنظمة الموزعة.",
    responsibilities: [
      "تصميم وإدارة الحاويات والشبكات السحابية باستخدام Kubernetes (EKS/OpenShift).",
      "أتمتة خطوط الإمداد والتطوير (CI/CD pipelines) لبرمجيات وأنظمة الاتصالات.",
      "إدارة البنية التحتية كرموز برمجية (IaC) باستخدام Terraform & Ansible.",
      "مراقبة كفاءة الخوادم السحابية والاستجابة للكوارث وحجم استهلاك الموارد.",
      "تطبيق معايير الأمان السحابي (Cloud Security & Zero Trust)."
    ],
    requiredSkills: [
      { id: "sk-k8s", name: "إدارة Kubernetes & Docker Containers", category: "سحابية", requiredLevel: 90 },
      { id: "sk-iac", name: "إدارة البنية التحتية بالرموز Terraform / Ansible", category: "سحابية", requiredLevel: 85 },
      { id: "sk-cicd", name: "خطوط النشر الآلي CI/CD (GitHub Actions / GitLab)", category: "تقنية", requiredLevel: 88 },
      { id: "sk-aws-azure", name: "منصات AWS / Azure / OpenStack", category: "سحابية", requiredLevel: 85 },
      { id: "sk-linux", name: "أنظمة إدارة السيرفرات Linux Administration", category: "تقنية", requiredLevel: 90 }
    ],
    certifications: ["AWS Certified Solutions Architect", "Certified Kubernetes Administrator (CKA)", "HashiCorp Certified: Terraform Associate"],
    kpis: [
      "زمن نشر التحديثات والأنظمة البرمجية (Deployment Speed)",
      "نسبة توافر الأنظمة السحابية SLA Uptime (99.95%)",
      "تخفيض التكاليف التشغيلية السحابية بنسبة 20%"
    ],
    salaryRange: "20,000 - 32,000 ر.س"
  },
  {
    id: "job-cyber-sec",
    title: "أخصائي الأمن السيبراني للشبكات",
    titleEn: "Telecom Cybersecurity Specialist",
    department: "الأمن السيبراني",
    level: "خبير",
    purpose: "حماية الأنظمة والبنية التحتية الحيوية للشركة من التهديدات والاختراقات السيبرانية، وتطبيق الضوابط التنفيذية للهيئة الوطنية للأمن السيبراني.",
    responsibilities: [
      "إدارة أنظمة جدران الحماية المتقدمة (Palo Alto / Fortinet) وجدران شبكة الاتصالات SS7/Diameter Firewalls.",
      "إجراء اختبارات الاختراق الدورية وتقييم الثغرات الأسبوعي لمكونات الشبكة.",
      "الاستجابة الفورية للحوادث السيبرانية Incident Response وإدارتها مع مركز Operations (SOC).",
      "تطبيق ضوابط الأمن السيبراني الأساسية (ECC) والتأكد من مطابقتها.",
      "إجراء تدريبات التوعية السيبرانية للكوادر التقنية والتشغيلية."
    ],
    requiredSkills: [
      { id: "sk-net-sec", name: "حماية شبكات الاتصالات Firewalls & IPS", category: "أمنية", requiredLevel: 92 },
      { id: "sk-pentest", name: "اختبار الاختراق والتحليل الجنائي Penetration Testing", category: "أمنية", requiredLevel: 85 },
      { id: "sk-siem", name: "إدارة أنظمة التهديدات SIEM (Splunk / QRadar)", category: "أمنية", requiredLevel: 88 },
      { id: "sk-compliance", name: "الامتثال لمعايير NCA ECC & ISO 27001", category: "إدارية", requiredLevel: 80 },
      { id: "sk-5g-sec", name: "أمن شبكات 5G & Diameter Security", category: "أمنية", requiredLevel: 82 }
    ],
    certifications: ["Certified Information Systems Security Professional (CISSP)", "Certified Ethical Hacker (CEH)", "Palo Alto Networks Certified Network Security Engineer (PCNSE)"],
    kpis: [
      "زمن اكتشاف التهديد وحصره (MTTD < 15 دقيقة)",
      "نسبة إغلاق الثغرات الحرجة خلال 48 ساعة (100%)",
      "الامتثال الكامل لمعايير NCA"
    ],
    salaryRange: "22,000 - 35,000 ر.س"
  },
  {
    id: "job-fiber-optics",
    title: "مهندس ألياف بصرية وبنية تحتية",
    titleEn: "Optical Fiber & Infrastructure Engineer",
    department: "شبكات الاتصالات",
    level: "متوسط",
    purpose: "إشراف وتخطيط مسارات كوابل الألياف البصرية (FTTH / FTTX / Backbone) واختبار جودة الإشارات الضوئية والربط بين المحطات.",
    responsibilities: [
      "تخطيط مسارات الألياف البصرية الأرضية والعلوية باستخدام برامج GIS.",
      "قياس واختبار الفقد الضوئي باستخدام أجهزة OTDR و Optical Power Meters.",
      "متابعة أعمال الحفر والتمديد واللحام الضوئي (Fiber Splicing) الميدانية.",
      "صيانة خطوط الربط الرئيسي بين مقاسم الاتصالات ومراكز البيانات."
    ],
    requiredSkills: [
      { id: "sk-otdr", name: "قياس واختبارات الألياف OTDR & Fusion Splicing", category: "تقنية", requiredLevel: 90 },
      { id: "sk-gis", name: "تخطيط الشبكات بنظام GIS & AutoCAD", category: "تقنية", requiredLevel: 80 },
      { id: "sk-fttx", name: "معمارية FTTx & DWDM/CWDM Systems", category: "تقنية", requiredLevel: 85 },
      { id: "sk-field-ops", name: "إدارة فرق العمل الميدانية المقاولة", category: "إدارية", requiredLevel: 75 }
    ],
    certifications: ["Certified Fiber Optics Technician (CFOT)", "FOA Certified Premises Cabling Technician (CPCT)"],
    kpis: [
      "نسبة خسارة الإشارة الضوئية المسموحة (Splice Loss < 0.05 dB)",
      "سرعة إصلاح القطع الميداني للألياف (< 4 ساعات)",
      "دقة التوثيق والمواصفات الميدانية"
    ],
    salaryRange: "14,000 - 20,000 ر.س"
  },
  {
    id: "job-prod-mgr",
    title: "مدير منتجات الاتصالات والحلول الرقمية",
    titleEn: "Telecom Digital Product Manager",
    department: "إدارة المنتجات الرقمية",
    level: "قائد فريق",
    purpose: "قيادة تطوير وإطلاق خدمات ومنتجات الاتصالات الذكية للشركات والأفراد (IoT, B2B Cloud, Enterprise Connectivity) لتحقيق النمو والتنافسية.",
    responsibilities: [
      "دراسة احتياجات السوق وتحليل المنافسين لابتكار منتجات اتصالات جديدة.",
      "وضع خارطة طريق المنتج (Product Roadmap) بالتنسيق مع الفرق التقنية والتسويقية.",
      "تعريف المتطلبات الوظيفية واستراتيجيات تسعير الخدمات الرقمية.",
      "متابعة مؤشرات تجربة العميل واقتراح التحديثات المستمرة للخدمات."
    ],
    requiredSkills: [
      { id: "sk-prod-mgmt", name: "إدارة المنتجات الرقمية Agile Product Management", category: "إدارية", requiredLevel: 90 },
      { id: "sk-telecom-market", name: "فهم سوق الاتصالات والحلول B2B / IoT", category: "تقنية", requiredLevel: 85 },
      { id: "sk-data-analytics", name: "تحليل البيانات المالية وسلوك المستخدمين", category: "تقنية", requiredLevel: 80 },
      { id: "sk-leadership", name: "القيادة والتواصل والتفاوض", category: "قيادية", requiredLevel: 88 }
    ],
    certifications: ["Certified Scrum Product Owner (CSPO)", "Pragmatic Institute Certified Product Manager", "PMP"],
    kpis: [
      "نمو إيرادات المنتجات المبتكرة B2B بنسبة 25%",
      "معدل رضا العملاء NPS (> 65)",
      "الالتزام بجدول إطلاق المنتجات في الموعد المعتمد"
    ],
    salaryRange: "25,000 - 38,000 ر.س"
  },
  {
    id: "job-ai-analytics",
    title: "أخصائي ذكاء اصطناعي وتحليل شبكات",
    titleEn: "Telecom AI & Network Analytics Specialist",
    department: "البحث والتطوير والذكاء الاصطناعي",
    level: "خبير",
    purpose: "تطبيق نماذج تعلم الآلة والذكاء الاصطناعي للتنبؤ بالأعطال وتحسين حركة البيانات المترددة وزيادة كفاءة شبكات الاتصالات (Self-Organizing Networks).",
    responsibilities: [
      "بناء نماذج ذكاء اصطناعي لتوقع ضغط الشبكة والحمولات الزائدة الذكية.",
      "معالجة البيانات الضخمة (Big Data) القادمة من المقاسم وأبراج الاتصالات.",
      "تطوير خوارزميات التنبؤ بالأعطال الصيانة الوقائية Predictive Maintenance.",
      "دمج أدوات الذكاء الاصطناعي مع مراكز إدارة الشبكات NOC."
    ],
    requiredSkills: [
      { id: "sk-ml-python", name: "تعلم الآلة والذكاء الاصطناعي Python & PyTorch", category: "تقنية", requiredLevel: 92 },
      { id: "sk-bigdata", name: "تحليل البيانات الضخمة Spark / Hadoop / Kafka", category: "تقنية", requiredLevel: 85 },
      { id: "sk-son-telecom", name: "شبكات التنظيم الذاتي Telecom Self-Organizing Networks", category: "تقنية", requiredLevel: 80 },
      { id: "sk-viz", name: "تجهيز ولوحات استعراض البيانات PowerBI / Tableau", category: "تقنية", requiredLevel: 82 }
    ],
    certifications: ["AWS Certified Machine Learning - Specialty", "TensorFlow Developer Certificate", "Data Science Professional Certificate"],
    kpis: [
      "دقة التنبؤ بالأعطال قبل حدوثها (> 88%)",
      "تخفيض هدر سعات الحركة بنسبة 18%",
      "تحسين استهلاك الطاقة لأبراج الشبكة"
    ],
    salaryRange: "22,000 - 34,000 ر.س"
  }
];

export const initialEmployees: Employee[] = [
  {
    id: "emp-101",
    name: "سعود بن عبد الله العتيبي",
    code: "EMP-3041",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    email: "s.alotaibi@telecomtech.sa",
    phone: "+966 50 123 4567",
    jobId: "job-5g-eng",
    jobTitle: "مهندس شبكات الاتصالات 5G",
    department: "شبكات الاتصالات",
    level: "متوسط",
    hireDate: "2022-03-15",
    experienceYears: 4,
    skills: [
      { skillId: "sk-5g-ran", skillName: "إدارة شبكات 5G RAN & Core", currentLevel: 85 },
      { skillId: "sk-ip-routing", skillName: "بروتوكولات التوجيه IP Routing & BGP/MPLS", currentLevel: 78 },
      { skillId: "sk-net-slicing", skillName: "تقنية تقطيع الشبكات Network Slicing", currentLevel: 65 },
      { skillId: "sk-troubleshoot", skillName: "تحليل واستكشاف الأعطال RF & Optical", currentLevel: 88 },
      { skillId: "sk-project-mgmt", skillName: "إدارة المشاريع الميدانية Agile", currentLevel: 70 }
    ],
    targetJobId: "job-cloud-devops",
    targetJobTitle: "مهندس الحوسبة السحابية و DevOps",
    trainingEnrollments: [
      { courseId: "tr-cka", status: "قيد التدريب", progress: 65 },
      { courseId: "tr-aws-arch", status: "جديد", progress: 0 },
      { courseId: "tr-5g-advanced", status: "مكتمل", progress: 100, completionDate: "2025-11-20" }
    ],
    lastEvaluation: {
      id: "eval-2025-q4-101",
      employeeId: "emp-101",
      date: "2025-12-15",
      period: "التقييم السنوي 2025",
      overallRating: 4.4,
      kpiScores: [
        { kpiName: "استقرار جودة الخدمة Uptime", weight: 35, score: 98, target: 99.9 },
        { kpiName: "زمن معالجة الأعطال MTTR", weight: 35, score: 85, target: 90 },
        { kpiName: "إنجاز مشاريع توسعة التغطية", weight: 30, score: 92, target: 90 }
      ],
      skillScores: [
        { skillName: "إدارة شبكات 5G RAN & Core", requiredLevel: 90, evaluatedLevel: 85 },
        { skillName: "بروتوكولات التوجيه IP Routing", requiredLevel: 85, evaluatedLevel: 78 },
        { skillName: "تقنية تقطيع الشبكات Slicing", requiredLevel: 80, evaluatedLevel: 65 }
      ],
      managerFeedback: "سعود متميز جداً في معالجة الأعطال الميدانية للشبكة اللاسلكية. نحثه على تطوير مهارات الشبكات السحابية لتأهيله للمسار القيادي السحابي.",
      selfFeedback: "طوّرت مهاراتي في برمجيات 5G بشكل كبير هذا العام، وأسعى للانتقال إلى هندسة الشبكات السحابية وDevOps في العام القادم.",
      aiSummary: "أداء مرتفع جداً (4.4/5). أظهر الموظف كفاءة عالية في تشغيل شبكات 5G والتعامل مع الأعطال الحرج. يمتلك الموظف شغفاً للانتقال نحو الحوسبة السحابية وKubernetes وهو خيار واعد للترقية القادمة.",
      strengths: ["السرعة في تشخيص أعطال الإشارة والترددات", "الالتزام العالي بمعايير السلامة التشغيلية", "التعاون المثمر مع الفريق"],
      improvementAreas: ["تعميق معرفة Kubernetes و Cloud Native Architecture", "رفع مستوى أتمتة البنية التحتية بولايات Ansible"],
      skillGaps: ["فجوة بنسبة 20% في أتمتة Kubernetes", "فجوة بنسبة 15% في تقطيع الشبكة Advanced Slicing"],
      recommendedTraining: ["شهادة مدير كوبرنيتس المعتمد (CKA)", "معسكر مهندس المعمارية السحابية AWS"],
      careerAdvice: "المرشح جاهز بنسبة 72% للانتقال لوظيفة مهندس الحوسبة السحابية. يوصى بإكماله دورة CKA واستلام مشروع مصغر للشبكات السحابية خلال الـ 6 أشهر القادمة."
    }
  },
  {
    id: "emp-102",
    name: "م. لمى بنت فيصل الشمري",
    code: "EMP-4102",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    email: "l.alshammari@telecomtech.sa",
    phone: "+966 55 987 6543",
    jobId: "job-cyber-sec",
    jobTitle: "أخصائي الأمن السيبراني للشبكات",
    department: "الأمن السيبراني",
    level: "خبير",
    hireDate: "2021-01-10",
    experienceYears: 6,
    skills: [
      { skillId: "sk-net-sec", skillName: "حماية شبكات الاتصالات Firewalls & IPS", currentLevel: 95 },
      { skillId: "sk-pentest", skillName: "اختبار الاختراق والتحليل الجنائي Penetration Testing", currentLevel: 88 },
      { skillId: "sk-siem", skillName: "إدارة أنظمة التهديدات SIEM (Splunk / QRadar)", currentLevel: 90 },
      { skillId: "sk-compliance", skillName: "الامتثال لمعايير NCA ECC & ISO 27001", currentLevel: 85 },
      { skillId: "sk-5g-sec", skillName: "أمن شبكات 5G & Diameter Security", currentLevel: 80 }
    ],
    targetJobId: "job-cyber-sec-lead",
    targetJobTitle: "قائد فريق الأمن السيبراني والامتثال",
    trainingEnrollments: [
      { courseId: "tr-cissp", status: "مكتمل", progress: 100, completionDate: "2025-08-14" },
      { courseId: "tr-pmp", status: "قيد التدريب", progress: 40 }
    ],
    lastEvaluation: {
      id: "eval-2025-q4-102",
      employeeId: "emp-102",
      date: "2025-12-20",
      period: "التقييم السنوي 2025",
      overallRating: 4.8,
      kpiScores: [
        { kpiName: "زمن اكتشاف التهديد وحصره MTTD", weight: 40, score: 96, target: 90 },
        { kpiName: "إغلاق الثغرات الحرجة", weight: 30, score: 100, target: 100 },
        { kpiName: "الامتثال لضوابط NCA", weight: 30, score: 95, target: 95 }
      ],
      skillScores: [
        { skillName: "حماية شبكات الاتصالات Firewalls", requiredLevel: 92, evaluatedLevel: 95 },
        { skillName: "اختبار الاختراق Penetration Testing", requiredLevel: 85, evaluatedLevel: 88 },
        { skillName: "إدارة أنظمة التهديدات SIEM", requiredLevel: 88, evaluatedLevel: 90 }
      ],
      managerFeedback: "لمى من أنشط الكفاءات الوطنية في الأمن السيبراني، أدارت تصدي لعدة هجمات سيبرانية معقدة بكفاءة مبهرة وتمكّنت من الحصول على شهادة CISSP.",
      selfFeedback: "عملت على تطوير قدرات الاستجابة للحوادث السيبرانية بالشركة ورسخت ثقافة الأمان لدى كافة القطاعات التقنية.",
      aiSummary: "أداء أستثنائي (4.8/5). تمتلك كفاءة تقنية أمنية فائقة، محققة أعلى معدلات الامتثال الوطني للأمن السيبراني.",
      strengths: ["الخبرة الفائقة في تحليل الجرائم الرقمية والتهديدات", "القدرة على اتخاذ القرارات الحاسمة في أوقات الطوارئ", "الحصول على شهادات عالمية مرموقة (CISSP)"],
      improvementAreas: ["تطوير القدرات القيادية وإدارة الميزانيات التقديرية للقطاع"],
      skillGaps: ["حاجة طفيفة لتطوير مهارات القيادة والإدارة الإستراتيجية (PMP)"],
      recommendedTraining: ["دورة إدارة المشاريع الاحترافية PMP", "برنامج القيادة التنفيدية للذكاء الاصطناعي للأمن"],
      careerAdvice: "المرشحة مهيأة تماماً للترقية لوظيفة قائد فريق الأمن السيبراني. يوصى بإدراجها في برنامج القيادات الواعدة وتكليفها بإدارة فريق التشغيل الأمن السيبراني."
    }
  },
  {
    id: "emp-103",
    name: "مهند بن طارق الشهري",
    code: "EMP-2088",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    email: "m.alshehri@telecomtech.sa",
    phone: "+966 56 444 3322",
    jobId: "job-cloud-devops",
    jobTitle: "مهندس الحوسبة السحابية و DevOps",
    department: "تكنولوجيا المعلومات والCloud",
    level: "خبير",
    hireDate: "2020-06-01",
    experienceYears: 7,
    skills: [
      { skillId: "sk-k8s", skillName: "إدارة Kubernetes & Docker Containers", currentLevel: 92 },
      { skillId: "sk-iac", skillName: "إدارة البنية التحتية بالرموز Terraform / Ansible", currentLevel: 88 },
      { skillId: "sk-cicd", skillName: "خطوط النشر الآلي CI/CD", currentLevel: 90 },
      { skillId: "sk-aws-azure", skillName: "منصات AWS / Azure / OpenStack", currentLevel: 85 },
      { skillId: "sk-linux", skillName: "أنظمة إدارة السيرفرات Linux Administration", currentLevel: 94 }
    ],
    targetJobId: "job-ai-analytics",
    targetJobTitle: "أخصائي ذكاء اصطناعي وتحليل شبكات",
    trainingEnrollments: [
      { courseId: "tr-ai-ml", status: "قيد التدريب", progress: 50 },
      { courseId: "tr-bigdata", status: "جديد", progress: 0 }
    ],
    lastEvaluation: {
      id: "eval-2025-q4-103",
      employeeId: "emp-103",
      date: "2025-12-18",
      period: "التقييم السنوي 2025",
      overallRating: 4.6,
      kpiScores: [
        { kpiName: "زمن نشر الأنظمة البرمجية", weight: 35, score: 95, target: 90 },
        { kpiName: "توافر الأنظمة السحابية SLA", weight: 35, score: 99, target: 99.9 },
        { kpiName: "تخفيض التكاليف التشغيلية", weight: 30, score: 90, target: 85 }
      ],
      skillScores: [
        { skillName: "إدارة Kubernetes & Docker Containers", requiredLevel: 90, evaluatedLevel: 92 },
        { skillName: "إدارة البنية التحتية بالرموز Terraform", requiredLevel: 85, evaluatedLevel: 88 },
        { skillName: "خطوط النشر الآلي CI/CD", requiredLevel: 88, evaluatedLevel: 90 }
      ],
      managerFeedback: "مهند قائد تقني حقيقي في مجال الحوسبة السحابية. أتمت بناء البيئة السحابية للشركة بأمان وموثوقية عالية.",
      selfFeedback: "حققت أهداف الأتمتة السحابية بنجاح 100%، وأتطلع لدمج نماذج تعلم الآلة الذكية للعمليات السحابية MLOps.",
      aiSummary: "أداء ممتاز جداً (4.6/5). يظهر ريادة تقنية واضحة ورغبة طموحة لبناء حلول MLOps ودمج الذكاء الاصطناعي مع الأنظمة السحابية.",
      strengths: ["الاحترافية العالية في أتمتة البنية التحتية", "التمكن الكامل من تقنيات Kubernetes", "القدرة على حل المشاكل المعقدة بسرعة"],
      improvementAreas: ["تطوير المعرفة العلمية بخوارزميات تعلم الآلة وتحليل البيانات الضخمة"],
      skillGaps: ["فجوة في مكتبات التعلم العميق PyTorch & TensorFlow بنسبة 30%"],
      recommendedTraining: ["معسكر الذكاء الاصطناعي وتطبيقات MLOps", "دورة معالجة البيانات الضخمة PySpark"],
      careerAdvice: "ينصح بدعمه لإكمال شهادة MLOps ليصبح المعماري المسؤول عن منصات الذكاء الاصطناعي بالشركة."
    }
  },
  {
    id: "emp-104",
    name: "مهندسة ريم بنت عادل الحربي",
    code: "EMP-1092",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    email: "r.alharbi@telecomtech.sa",
    phone: "+966 54 321 0987",
    jobId: "job-fiber-optics",
    jobTitle: "مهندس ألياف بصرية وبنية تحتية",
    department: "شبكات الاتصالات",
    level: "متوسط",
    hireDate: "2023-02-01",
    experienceYears: 3,
    skills: [
      { skillId: "sk-otdr", skillName: "قياس واختبارات الألياف OTDR & Fusion Splicing", currentLevel: 85 },
      { skillId: "sk-gis", skillName: "تخطيط الشبكات بنظام GIS & AutoCAD", currentLevel: 75 },
      { skillId: "sk-fttx", skillName: "معمارية FTTx & DWDM/CWDM Systems", currentLevel: 80 },
      { skillId: "sk-field-ops", skillName: "إدارة فرق العمل الميدانية المقاولة", currentLevel: 70 }
    ],
    targetJobId: "job-5g-eng",
    targetJobTitle: "مهندس شبكات الاتصالات 5G",
    trainingEnrollments: [
      { courseId: "tr-cfot", status: "مكتمل", progress: 100, completionDate: "2024-10-10" },
      { courseId: "tr-5g-advanced", status: "قيد التدريب", progress: 30 }
    ],
    lastEvaluation: {
      id: "eval-2025-q4-104",
      employeeId: "emp-104",
      date: "2025-12-10",
      period: "التقييم السنوي 2025",
      overallRating: 4.1,
      kpiScores: [
        { kpiName: "نسبة خسارة الإشارة الضوئية", weight: 40, score: 92, target: 95 },
        { kpiName: "سرعة إصلاح القطع الميداني", weight: 35, score: 88, target: 90 },
        { kpiName: "دقة التوثيق والمواصفات", weight: 25, score: 90, target: 85 }
      ],
      skillScores: [
        { skillName: "قياس واختبارات الألياف OTDR", requiredLevel: 90, evaluatedLevel: 85 },
        { skillName: "تخطيط الشبكات بنظام GIS", requiredLevel: 80, evaluatedLevel: 75 },
        { skillName: "معمارية FTTx & DWDM Systems", requiredLevel: 85, evaluatedLevel: 80 }
      ],
      managerFeedback: "ريم موظفة جادة ومجتهدة في متابعة مشاريع الألياف البصرية الميدانية، لديها حب استطلاع لتوسيع معرفتها بالشبكات اللاسلكية.",
      selfFeedback: "أنجزت جميع خطط الصيانة الوقائية للألياف البصرية وأعمل حالياً على أخذ كورسات في الـ 5G للربط بين الطبقة الفิزيائية واللاسلكية.",
      aiSummary: "أداء جيد جداً (4.1/5). تمتلك أساساً هندسياً صلباً في البنية التحتية الضوئية وتسعى للربط بين الألياف وشبكات الجيل الخامس.",
      strengths: ["الدقة العالية في استخدام أجهزة الفحص الضوئي OTDR", "التواصل الميداني الفعال مع فرق الصيانة"],
      improvementAreas: ["تطوير المعرفة ببروتوكولات التوجيه IP Routing و BGP"],
      skillGaps: ["فجوة في بروتوكولات IP بنسبة 25% وفي شبكات 5G RAN بنسبة 35%"],
      recommendedTraining: ["دورة الشبكات الأساسية Cisco CCNA", "دورة أساسيات شبكات 5G"],
      careerAdvice: "لتسهيل الانتقال لوظيفة مهندس شبكات 5G، يفضل تركيز التدريب على Cisco CCNA والبروتوكولات السلكية/اللاسلكية خلال الـ 9 أشهر القادمة."
    }
  }
];

export const initialCourses: TrainingCourse[] = [
  {
    id: "tr-5g-advanced",
    title: "برنامج تقنيات ومعمارية شبكات 5G المتقدمة",
    provider: "Huawei ICT Academy / Ericsson Hub",
    targetSkills: ["إدارة شبكات 5G RAN & Core", "تقنية تقطيع الشبكات Network Slicing"],
    category: "شبكات الاتصالات",
    duration: "40 ساعة تدريبية (4 أسابيع)",
    level: "متقدم",
    certificationName: "HCIE-5G Certified Specialist",
    description: "دورة متخصصة تغطي هندسة معمارية 5G Standalone (SA) و Non-Standalone (NSA)، وتقنيات Beamforming و Massive MIMO و Network Slicing.",
    rating: 4.9,
    enrolledCount: 142
  },
  {
    id: "tr-cka",
    title: "معسكر إدارة الحاويات والشبكات السحابية CKA",
    provider: "Linux Foundation / Cloud Native",
    targetSkills: ["إدارة Kubernetes & Docker Containers", "أنظمة إدارة السيرفرات Linux Administration"],
    category: "تكنولوجيا المعلومات والCloud",
    duration: "60 ساعة (6 أسابيع)",
    level: "متوسط",
    certificationName: "Certified Kubernetes Administrator (CKA)",
    description: "تدريب عملي مكثف لبناء وإدارة وتأمين شبكات العقد الموزعة باستخدام Kubernetes ونشر التطبيقات السحابية الحرج.",
    rating: 4.8,
    enrolledCount: 210
  },
  {
    id: "tr-cissp",
    title: "البرنامج المتقدم لأمن المعلومات والشبكات CISSP",
    provider: "ISC2 & SANS Institute",
    targetSkills: ["حماية شبكات الاتصالات Firewalls & IPS", "الامتثال لمعايير NCA ECC & ISO 27001", "أمن شبكات 5G & Diameter Security"],
    category: "الأمن السيبراني",
    duration: "80 ساعة (8 أسابيع)",
    level: "متقدم",
    certificationName: "Certified Information Systems Security Professional (CISSP)",
    description: "أقوى برنامج عالمي متخصص في حماية الأصول الرقمية، إدارة المخاطر السيبرانية، وتطبيق معايير الامتثال الوطنية والدولية.",
    rating: 5.0,
    enrolledCount: 95
  },
  {
    id: "tr-aws-arch",
    title: "شهادة معمارية الحلول السحابية المتقدمة AWS Architect",
    provider: "Amazon Web Services (AWS)",
    targetSkills: ["منصات AWS / Azure / OpenStack", "إدارة البنية التحتية بالرموز Terraform / Ansible"],
    category: "تكنولوجيا المعلومات والCloud",
    duration: "45 ساعة (5 أسابيع)",
    level: "متوسط",
    certificationName: "AWS Certified Solutions Architect - Associate",
    description: "تصميم بنى تحتية سحابية عالية الاعتمادية وقابلة للتوسع بأقل التكاليف مع تطبيق قواعد الأمن المتقدمة VPC & IAM.",
    rating: 4.7,
    enrolledCount: 310
  },
  {
    id: "tr-cfot",
    title: "دورة فني الألياف البصرية المعتمد CFOT",
    provider: "The Fiber Optic Association (FOA)",
    targetSkills: ["قياس واختبارات الألياف OTDR & Fusion Splicing", "معمارية FTTx & DWDM/CWDM Systems"],
    category: "شبكات الاتصالات",
    duration: "30 ساعة (3 أسابيع)",
    level: "مبتدئ",
    certificationName: "Certified Fiber Optics Technician (CFOT)",
    description: "تدريب تطبيقي على تركيب وصيانة واختبار شبكات الألياف البصرية FTTH واستخدام أجهزة OTDR واللحام الضوئي.",
    rating: 4.6,
    enrolledCount: 88
  },
  {
    id: "tr-ai-ml",
    title: "دورة الذكاء الاصطناعي وتحليل شبكات الاتصالات",
    provider: "DeepLearning.AI / Telecom AI Institute",
    targetSkills: ["تعلم الآلة والذكاء الاصطناعي Python & PyTorch", "شبكات التنظيم الذاتي Telecom Self-Organizing Networks"],
    category: "البحث والتطوير والذكاء الاصطناعي",
    duration: "50 ساعة (5 أسابيع)",
    level: "متقدم",
    certificationName: "Telecom AI & Machine Learning Professional",
    description: "استخدام تقنيات الذكاء الاصطناعي للتنبؤ بالأعطال الصيانة الوقائية وتحسين استهلاك الطاقة والحمولات لأبراج الاتصالات.",
    rating: 4.9,
    enrolledCount: 125
  },
  {
    id: "tr-pmp",
    title: "إدارة المشاريع الاحترافية في الاتصالات PMP",
    provider: "Project Management Institute (PMI)",
    targetSkills: ["إدارة المشاريع الميدانية Agile", "القيادة والتواصل والتفاوض", "إدارة المنتجات الرقمية Agile Product Management"],
    category: "إدارية وقيادية",
    duration: "35 ساعة (4 أسابيع)",
    level: "متوسط",
    certificationName: "Project Management Professional (PMP)",
    description: "منهجية إدارة المشاريع الاحترافية وفق إصدار PMI الأحدث للتخطيط والتمويل والتنفيذ والمتابعة في قطاع الاتصالات والتقنية.",
    rating: 4.8,
    enrolledCount: 450
  }
];

export const initialCareerLadders: CareerLadder[] = [
  {
    department: "شبكات الاتصالات",
    steps: [
      { level: "مبتدئ", jobId: "job-noc-jr", title: "مهندس مراقبة جودة الشبكة NOC Junior", minExperienceYears: 1, keySkills: ["أساسيات الشبكات IP", "مراقبة الإنذارات Alarm Monitoring", "التواصل والدعم الفني"] },
      { level: "متوسط", jobId: "job-fiber-optics", title: "مهندس ألياف بصرية وبنية تحتية", minExperienceYears: 3, keySkills: ["اختبارات OTDR", "معمارية FTTx", "صيانة الألياف البصرية"] },
      { level: "خبير", jobId: "job-5g-eng", title: "مهندس شبكات الاتصالات 5G", minExperienceYears: 5, keySkills: ["إدارة شبكات 5G RAN & Core", "بروتوكولات BGP/MPLS", "تقطيع الشبكة Network Slicing"] },
      { level: "قائد فريق", jobId: "job-telecom-lead", title: "قائد فريق هندسة تشغيل الشبكات", minExperienceYears: 8, keySkills: ["قيادة الفرق التشغيلية", "إدارة حوادث الشبكة MTTR", "تخطيط الميزانيات التقديرية"] },
      { level: "مدير / مهندس معماري", jobId: "job-telecom-arch", title: "كبير المعماريين لشبكات الاتصالات Principal Telecom Architect", minExperienceYears: 12, keySkills: ["استراتيجية الشبكات الوطنية", "تكامل 5G & 6G Research", "الاتفاقيات الاستراتيجية للموردين"] }
    ]
  },
  {
    department: "تكنولوجيا المعلومات والCloud",
    steps: [
      { level: "مبتدئ", jobId: "job-sysadmin-jr", title: "أخصائي دعم نظم وسيرفرات Linux", minExperienceYears: 1, keySkills: ["إدارة نظام Linux", "أساسيات Shell Scripting", "الدعم الميداني"] },
      { level: "متوسط", jobId: "job-cloud-eng", title: "مهندس حوسبة سحابية جونيور Cloud Engineer", minExperienceYears: 3, keySkills: ["منصات AWS/Azure", "أتمتة Docker", "خطوط CI/CD"] },
      { level: "خبير", jobId: "job-cloud-devops", title: "مهندس الحوسبة السحابية و DevOps", minExperienceYears: 6, keySkills: ["إدارة Kubernetes CKA", "البنية ككود Terraform", "الأمان السحابي Zero Trust"] },
      { level: "قائد فريق", jobId: "job-cloud-lead", title: "قائد فرع التحول السحابي Cloud Ops Lead", minExperienceYears: 9, keySkills: ["قيادة فرق DevOps", "تحسين تكاليف Cloud FinOps", "معمارية الأنظمة الموزعة"] },
      { level: "مدير / مهندس معماري", jobId: "job-cto-arch", title: "رئيس معماري الحوسبة والحلول الرقمية Enterprise Architect", minExperienceYears: 13, keySkills: ["التحول الرقمي الشامل", "معمارية الميكروسيرفس Cloud-Native", "القيادة التنفيدية"] }
    ]
  },
  {
    department: "الأمن السيبراني",
    steps: [
      { level: "مبتدئ", jobId: "job-soc-analyst", title: "محلل مراقبة التهديدات SOC Analyst L1", minExperienceYears: 1, keySkills: ["تحليل تنبيهات SIEM", "أساسيات التشفير Firewall", "الاستجابة الأولى"] },
      { level: "متوسط", jobId: "job-cyber-eng-mid", title: "مهندس أمن سيبراني شبكي Security Engineer", minExperienceYears: 3, keySkills: ["اختبار الاختراق Penetration Testing", "إدارة جدران الحماية", "تقييم الثغرات Vulnerability"] },
      { level: "خبير", jobId: "job-cyber-sec", title: "أخصائي الأمن السيبراني للشبكات", minExperienceYears: 6, keySkills: ["حماية 5G & SS7 Security", "شهادة CISSP", "الامتثال لضوابط NCA ECC"] },
      { level: "قائد فريق", jobId: "job-cyber-sec-lead", title: "قائد فريق الأمن السيبراني والامتثال", minExperienceYears: 9, keySkills: ["إدارة مركز عمليات الأمن SOC", "قيادة الفرق السيبرانية", "إدارة الحوادث الحرجة"] },
      { level: "مدير / مهندس معماري", jobId: "job-ciso-spec", title: "مدير إدارة أمن المعلومات والرئيس التنفيذي CISO", minExperienceYears: 14, keySkills: ["استراتيجية الأمن السيبراني القومي", "إدارة المخاطر المؤسسية", "الامتثال التشريعي والدولي"] }
    ]
  }
];
