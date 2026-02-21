import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { Konkhmer_Sleokchher } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {message,ownerId}=await req.json();
        if(!message || !ownerId){
            return NextResponse.json({error:"Message and OwnerId is required"}, {status:400})
        }
        await connectDb();
        const setting=await Settings.findOne({ownerId});
        if(!setting){
            return NextResponse.json({error:"ChatBot not configured for this owner yet."}, {status:404})
        }
        const KNOWLEDGE=`
        business name- ${setting.businessName || "not provided"}
        supportEmail- ${setting.supportEmail || "not provided"}
        knowledge- ${setting.knowledge ||" not provided"}
        `;
        const prompt=`You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.



--------------------
BUSINESS INFORMATION
--------------------
${KNOWLEDGE}

--------------------
CUSTOMER QUESTION
--------------------
${message}

--------------------
ANSWER
--------------------
`;
const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
 const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  const res=NextResponse.json({answer:response.text}, {status:200})
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
     
    }catch (error) {
        const res=NextResponse.json({error:"Something went wrong,Chat error :${error}"}, {status:500})
         res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
    }
}
export const OPTIONS=async ()=>{
    return NextResponse.json(null,{
        status:201,
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"POST, OPTIONS",
            "Access-Control-Allow-Headers":"Content-Type"
        }
    })
}
