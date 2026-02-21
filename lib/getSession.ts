import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession(){
    const session=await cookies();
    const accessToken=session.get("access_token")?.value;
    if(!accessToken){
        return null;
    }
    try{
        const result:any=await scalekit.validateToken(accessToken);
        const user=await scalekit.user.getUser(result.sub);
        return user;
    }
    catch(error){
        console.log("Error validating token:", error);
    }
}