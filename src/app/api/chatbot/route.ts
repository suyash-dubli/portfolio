import { NextRequest, NextResponse } from 'next/server';
//import OpenAI from 'openai'; 

// Simulated resume data
const resumeData = {
  name: "Suyash Dubli",
  skills: ["TypeScript", "React", "Next.js", "Node.js", "Python"],
  experience: [
    "Developed full-stack web applications",
    "Implemented responsive and interactive UI components",
    "Worked on optimizing web application performance"
  ],
  education: "Computer Science Engineering",
  contact: "Available upon request"
};

export async function POST(request: NextRequest) {
  try {
    // Validate request
    const contentType = request.headers.get('content-type');
    if (contentType !== 'application/json') {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json' }, 
        { status: 400 }
      );
    }

    // Parse the incoming request body
    const body = await request.json();
    const { question } = body;

    // Validate input
    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing question' }, 
        { status: 400 }
      );
    }

    //     const completion = await openai.chat.completions.create({
    //       model: "gpt-3.5-turbo",
    //       messages: [
    //         { role: "system", content: "You are a helpful assistant that answers questions about my resume." },
    //         { role: "user", content: question }
    //       ],
    //       max_tokens:150
    //     });

    //     const answer = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    //     return NextResponse.json({ answer });

    // Simple AI-like response generation
    const lowercaseQuestion = question.toLowerCase();
    let answer = "Sorry folks, dont have that information as of now.";

    if (lowercaseQuestion.includes("skills")) {
      answer = `My skills include: ${resumeData.skills.join(", ")}`;
    } else if (lowercaseQuestion.includes("experience")) {
      answer = `Some of my key experiences: ${resumeData.experience.join(". ")}`;
    } else if (lowercaseQuestion.includes("education")) {
      answer = `Education: ${resumeData.education}`;
    } else if (lowercaseQuestion.includes("contact")) {
      answer = "Contact information is available upon request.";
    } else if (lowercaseQuestion.includes("name")) {
      answer = `My name is ${resumeData.name}`;
    }

    // Return the response
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({ 
      error: 'Failed to process your request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}