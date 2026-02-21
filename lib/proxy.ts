import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./getSession";


export async function proxy(req:NextRequest){
    const session=await getSession();
   console.log(session);
}

