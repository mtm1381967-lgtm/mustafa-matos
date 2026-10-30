import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini Client server-side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Performance Evaluation Endpoint
app.post("/api/gemini/evaluate-performance", async (req, res) => {
  try {
    const { employeeName, jobTitle, department, kpis, skills, managerFeedback, selfFeedback } = req.body;

    const ai = getGeminiClient();

    const prompt = `
أنت خبير تنفيذي ورئيس قسم الموارد البشرية في شركة كبرى للاتصالات والتكنولوجيا الحديثة (Telecom & Tech Industry).
قم بتحليل بيانات الأداء والمهارات التالية للموظف وتقديم تقييم أداء ذكي وشامل باللغة العربية احترافية ودقيقة جداً:

بيانات الموظف:
- الاسم: ${employeeName || "غير محدد"}
- المسمى الوظيفي الحالي: ${jobTitle || "غير محدد"}
- القسم: ${department || "غير محدد"}

مؤشرات الأداء (KPIs):
${JSON.stringify(kpis || [], null, 2)}

مستوى المهارات الحالية مقارنة بالمتطلبات الوظيفية (Skills Matrix):
${JSON.stringify(skills || [], null, 2)}

ملاحظات المدير المباشر:
${managerFeedback || "لا يوجد"}

ملاحظات التقييم الذاتي للموظف:
${selfFeedback || "لا يوجد"}

يرجى إرجاع النتيجة بصيغة JSON مطابقة للشكل التالي باللغة العربية:
{
  "summary": "ملخص شامل وموجز لأداء الموظف خلال الفترة",
  "overallRating": 4.5,
  "ratingCategory": "ممتاز / مرتفع جداً / مرضٍ / يحتاج تحسين",
  "strengths": ["نقطة قوة 1", "نقطة قوة 2", "نقطة قوة 3"],
  "improvementAreas": ["مجال تحسين 1", "مجال تحسين 2"],
  "skillGaps": ["فجوة مهارية 1 مع شرح بسيط", "فجوة مهارية 2"],
  "recommendedTraining": ["اسم الدورة/البرنامج التدريبي الموصى به 1", "دورة 2"],
  "careerAdvice": "توصية المسار الوظيفي والخطوة القادمة للترقية أو التطوير"
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            overallRating: { type: Type.NUMBER },
            ratingCategory: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
            skillGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedTraining: { type: Type.ARRAY, items: { type: Type.STRING } },
            careerAdvice: { type: Type.STRING },
          },
          required: ["summary", "overallRating", "strengths", "improvementAreas", "skillGaps", "recommendedTraining", "careerAdvice"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in evaluate-performance:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate evaluation" });
  }
});

// AI Job Description Generator Endpoint
app.post("/api/gemini/generate-job-description", async (req, res) => {
  try {
    const { title, department, level } = req.body;

    const ai = getGeminiClient();

    const prompt = `
أنت استشاري موارد بشرية متخصص في قطاع الاتصالات وتقنية المعلومات (Telecom, 5G, Cloud, Cybersecurity, AI, Data Centers).
قم بإنشاء توصيف وظيفي متكامل باللغة العربية للمسمى الوظيفي التالي:
- المسمى الوظيفي: ${title}
- القسم: ${department}
- المستوى الوظيفي: ${level || "متوسط"}

يرجى الإجابة بتنسيق JSON دقيق كالتالي:
{
  "title": "${title}",
  "department": "${department}",
  "level": "${level}",
  "purpose": "الهدف الرئيسي للوظيفة في شركة الاتصالات والتقنية",
  "responsibilities": ["مسؤولية 1", "مسؤولية 2", "مسؤولية 3", "مسؤولية 4", "مسؤولية 5"],
  "requiredSkills": [
    { "name": "اسم المهارة التقنية 1", "category": "تقنية", "requiredLevel": 85 },
    { "name": "اسم المهارة التقنية 2", "category": "تقنية", "requiredLevel": 90 },
    { "name": "مهارة شخصية/إدارية", "category": "إدارية", "requiredLevel": 75 }
  ],
  "certifications": ["شهادة مهنية موصى بها 1 (مثل CCNA/AWS/CISSP/TM Forum)", "شهادة 2"],
  "kpis": ["مؤشر قياس أداء 1", "مؤشر قياس أداء 2", "مؤشر قياس أداء 3"],
  "salaryRange": "نطاق الرواتب المتوقع بالريال (مثال: 18,000 - 25,000 ر.س)"
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            department: { type: Type.STRING },
            level: { type: Type.STRING },
            purpose: { type: Type.STRING },
            responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
            requiredSkills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  requiredLevel: { type: Type.NUMBER },
                },
                required: ["name", "category", "requiredLevel"],
              },
            },
            certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
            kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
            salaryRange: { type: Type.STRING },
          },
          required: ["title", "department", "level", "purpose", "responsibilities", "requiredSkills", "certifications", "kpis", "salaryRange"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in generate-job-description:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate job description" });
  }
});

// AI Career Path Advisor Endpoint
app.post("/api/gemini/career-advice", async (req, res) => {
  try {
    const { employeeName, currentRole, targetRole, currentSkills, skillGaps } = req.body;

    const ai = getGeminiClient();

    const prompt = `
أنت خبير وتخطي مسارات مهنية في قطاع الاتصالات والتكنولوجيا.
قدم استشارة ومخطط مسار وظيفي باللغة العربية للعبور من الوظيفة الحالية للوظيفة المستهدفة:

- الموظف: ${employeeName || "الموظف"}
- الوظيفة الحالية: ${currentRole}
- الوظيفة المستهدفة للترقية/الانتقال: ${targetRole}
- المهارات الحالية: ${JSON.stringify(currentSkills || [])}
- الفجوات المهارية المرصودة: ${JSON.stringify(skillGaps || [])}

أخرج النتيجة بصيغة JSON كالتالي:
{
  "readinessScore": 72,
  "summary": "تقييم جاهزية الانتقال والمدة الزمني المقترحة",
  "timeframeMonths": "6 إلى 12 شهر",
  "milestones": [
    { "phase": "المرحلة الأولى (أول 3 أشهر)", "objective": "إتقان المهارات الأساسية ناقصة الخبير", "action": "إتمام شهادة سحابية والعمل على مشروع تطبيقي" },
    { "phase": "المرحلة الثانية (3-6 أشهر)", "objective": "قيادة مشاريع صغيرة في التخصص الجديد", "action": "القيادة الميدانية وإدارة شبكة الاتصالات" }
  ],
  "recommendedCertifications": ["شهادة 1", "شهادة 2"],
  "adviceSummary": "نصائح توجيهية ذهبية للموظف لضمان الترقية والتميز"
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            readinessScore: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            timeframeMonths: { type: Type.STRING },
            milestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  objective: { type: Type.STRING },
                  action: { type: Type.STRING },
                },
                required: ["phase", "objective", "action"],
              },
            },
            recommendedCertifications: { type: Type.ARRAY, items: { type: Type.STRING } },
            adviceSummary: { type: Type.STRING },
          },
          required: ["readinessScore", "summary", "timeframeMonths", "milestones", "recommendedCertifications", "adviceSummary"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error in career-advice:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate career advice" });
  }
});

// Vite middleware / Production static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TelecomTech HR Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
