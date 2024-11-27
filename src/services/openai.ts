import OpenAI from 'openai';
import { checkRateLimit } from './rateLimit';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface GradeResponse {
  marks: number;
}

function basicGrading(userAnswer: string, correctAnswer: string, maxMarks: number): GradeResponse {
  const userAnswerLower = userAnswer.toLowerCase().trim();
  const correctAnswerLower = correctAnswer.toLowerCase().trim();
  
  if (userAnswerLower === correctAnswerLower) {
    return { marks: maxMarks };
  }
  
  if (correctAnswerLower.includes('variance')) {
    let marks = 0;
    if (userAnswerLower.includes('variance')) marks += 1;
    if (userAnswerLower.includes('higher') || userAnswerLower.includes('greater') || 
        userAnswerLower.includes('larger') || userAnswerLower.includes('more')) {
      marks += 1;
    }
    return { marks };
  }
  
  const correctKeywords = correctAnswerLower.split(' ');
  const matchedKeywords = correctKeywords.filter(word => 
    word.length > 3 && userAnswerLower.includes(word)
  );
  
  return { 
    marks: Math.floor((matchedKeywords.length / correctKeywords.length) * maxMarks)
  };
}

export async function gradeAnswer(
  userAnswer: string, 
  correctAnswer: string,
  maxMarks: number,
  questionContext?: string
): Promise<GradeResponse> {
  // If OpenAI API key is not available or user is not authenticated, fall back to basic grading
  if (!import.meta.env.VITE_OPENAI_API_KEY || !userAnswer || !correctAnswer) {
    return basicGrading(userAnswer, correctAnswer, maxMarks);
  }

  try {
    // Check rate limit before proceeding
    const canProceed = await checkRateLimit();
    if (!canProceed) {
      throw new Error('Rate limit exceeded. Please try again in an hour.');
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a mathematics grading assistant. Grade the answer and return only the marks awarded based on the marking scheme."
        },
        {
          role: "user",
          content: `
Question: ${questionContext || 'No context provided'}
Student Answer: ${userAnswer}
Marking Scheme: ${correctAnswer}
Total marks available: ${maxMarks}

Return response in this JSON format:
{
  "marks": number (0-${maxMarks})
}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return { marks: result.marks || 0 };
  } catch (error) {
    if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
      throw error;
    }
    console.error('Falling back to basic grading due to API error:', error);
    return basicGrading(userAnswer, correctAnswer, maxMarks);
  }
}