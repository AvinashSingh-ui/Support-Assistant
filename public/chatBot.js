(function(){
    const api_Url="http://localhost:3000/api/chat";
    const scriptTag=document.currentScript;
    const ownerId=scriptTag.getAttribute("data-owner-id");

    if(!ownerId){
        console.error("Owner ID is required to initialize the chat bot.");
        return;
    }
   const button = document.createElement("div");
    button.innerHTML = "🗨️";
    Object.assign(button.style, {
        position:"fixed",
        bottom:"24px",
        right:"24px",
        width:"56px",
        height:"56px",
        borderRadius:"50%",
        backgroundColor:"#000",
        color:"#fff",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
        fontSize:"22px",
        boxShadow:"0 15px 40px rgba(0,0,0,0.35)",
        zIndex:999999
    })
    document.body.append(button);
    const box=document.createElement("div");
    Object.assign(box.style,{
        position:"fixed",
        bottom:"90px",
        right:"24px",
        width:"320px",
        height:"420px",
        backgroundColor:"#fff",
        borderRadius:"14px",
        boxShadow:"0 25px 60px rgba(0,0,0,0.2)",
        zIndex:999999,
        display:"none",
        flexDirection:"column",
        overflow:"hidden",
        fontFamily:"Inter,system-ui, sans-serif" 
    })
    box.innerHTML=`
        <div style=
        "background-color:#000;
        color:#fff;
        padding:12px 14px;
        font-size:14px;
        display:flex;
        align-items:center;
        justify-content:space-between;
         ">
            <span>Customer Support</span>
            <span style="cursor:pointer; color:#fff; font-size:16px; font-weight:500;" id="close-btn">X</span>
            </div>
        <div id="chat-messages"
        style="flex:1; padding:12px; display:flex; flex-direction:column; overflow-y:auto; background:"#f9f9f9";>
        </div>
        <div style="display:flex; padding:8px; border-top:1px solid #e5e7eb; gap:8px;">
        <input type="text" id="chat-input" style="flex:1; padding:8px 10px; border:1px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;" placeholder="Type your message..."/>
        <button id="chat-send" style="padding:6px 12px; background-color:#000; color:#fff; border:none; border-radius:8px; font-size:13px; cursor:pointer;">Send</button>
        </div>
            `
    document.body.appendChild(box);

    button.onclick=()=>{
        box.style.display=box.style.display==="none"?"flex":"none";
    }
    document.querySelector("#close-btn").onclick=()=>{
        box.style.display="none";
    }
    const input=document.querySelector("#chat-input");
    const sendBtn=document.querySelector("#chat-send");
    const messageArea=document.querySelector("#chat-messages");

    function addMessage(text,from){
    const bubble=document.createElement("div");
    bubble.innerHTML=text;
    Object.assign(bubble.style,{
    maxWidth:"78%",
    padding:"8px 12px",
    borderRadius:"12px",
    fontSize:"13px",
    lineheight:"1.4",
    marginBottom:"8px",
    alignSelf:from==="user"?"flex-end":"flex-start",
    backgroundColor:from==="user"?"#000":"#e5e7eb",
    color:from==="user"?"#fff":"#111",

    borderTopRightRadius:from==="user"?"4px":"14px",
    borderTopLeftRadius:from==="user"?"14px":"4px",

    })
    messageArea.appendChild(bubble);
    messageArea.scrollTop=messageArea.scrollHeight;
    }
    sendBtn.onclick=async()=>{
        const text=input.value.trim();
        if(!text) return;
        addMessage(text,"user");
        input.value="";
        const typing=document.createElement("div");
        typing.innerHTML="Typing...";
        Object.assign(typing.style,{  
            fontSize:"13px",
            marginBottom:"8px",
            alignSelf:"flex-start",
            color:"#6b7280",
        })
        messageArea.appendChild(typing);
        messageArea.scrollTop=messageArea.scrollHeight;
  try {
    const response=await fetch(api_Url,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            ownerId,message:text})
  } )
  const data=await response.json();
  messageArea.removeChild(typing);
  addMessage(data.answer ||"No response from AI","ai");
}catch (error) {
    messageArea.removeChild(typing);
    addMessage("Error: Could not get response from AI",error,"ai");
  }
}
})()
