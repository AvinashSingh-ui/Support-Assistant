"use client"
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import React from 'react'

function EmbedClient({ownerId}:{ownerId:string}) {
    const navigate=useRouter();
    const [copied,setCopied]=React.useState(false);
    const embedCode=`<script 
    src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
     data-owner-id=${ownerId}>
</script>`

    const copyCode=()=>{
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

    }
  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
        <div className='sticky top-0 z-40 bg-white border-b border-zinc-200'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                <div className='text-lg font-semibold tracking-tight cursor-pointer'onClick={()=>navigate.push("/")}>Support-<span className='text-zinc-600 font-bold text-xl' >AI</span></div>
                <button className='px-4 py-2 rounded-lg border border-zinc-300 bg-black text-white text-sm hover:bg-zinc-100 hover:text-black cursor-pointer transition' onClick={()=>navigate.push("/dashboard")}>Go to Dashboard</button>
            </div>
        
        </div>
      <div className='flex justify-center px-4 py-14'>
        <motion.div
        initial={{y: 24, opacity:0}}
        animate={{y: 0, opacity:1}}
        transition={{duration:0.5}}
        className='w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10'>
            <h1 className="text-2xl font-semibold mb-2">Embed ChatAssistant</h1>
            <p>Copy and paste this code before <code>&lt;/body&gt;</code></p>
            <div className='relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mt-10'>
              <pre>{embedCode}</pre>
              <button className='absolute top-3 right-3 bg-white text-zinc-900 text-xs
              font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition' onClick={copyCode}>
                {copied ? "Copied!" : "Copy"}

              </button>
            </div>



            <ol className='list-decimal  list-inside space-y-3 text-sm text-zinc-700 mt-3'>
              <li>Copy the code above</li>
              <li>Paste it before the closing <code>&lt;/body&gt;</code> tag in your HTML</li>
              <li>Ensure the script is loaded correctly in your browser</li>
            </ol>

            <div className='mt-10'>
              <h1 className='text-2xl font-semibold mb-2'>Live Preview</h1>
              <p className='text-sm text-zinc-600 mb-6'>This is how the chatbot will appear on your website</p>
              <div className=' rounded-xl border border-zinc-300 bg-white shadow-md overflow-hidden'>
                <div className='flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b  border-zinc-200'>
                  <span className='w-2.5 h-2.5 bg-red-500 rounded-full'/>
                  <span className='w-2.5 h-2.5 bg-yellow-500 rounded-full'/>
                  <span className='w-2.5 h-2.5 bg-green-500 rounded-full'/>
                  <span className='text-xs text-zinc-400 ml-4'>Your-website.com</span>
                </div>
                <div className='relative h-64 sm:h-72 p-6 text-zinc-400 text-xs'>

                  Your Website goes here
                <div className='absolute bottom-24 right-6 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden'>
                  <div className='bg-black text-white text-xs px-3 py-2 flex justify-between items-center'>
                  <span>Customer Support</span>
                  <span>X</span>
                  </div>
                  <div className='p-3 bg-zinc-50 space-y-2'>
                  <div className='bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-lg w-fit'>Hi! How can I help you today?</div>
                  <div className='bg-black mt-4 text-white text-xs px-3 py-2 rounded-lg ml-auto w-fit'>I have a question about my order.</div>
                </div>
                </div>
                <motion.div
                animate={{y:[0, -10, 0]}}
                transition={{duration:3, repeat:Infinity}}
                className='absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl cursor-pointer'>
                  🗨️
                </motion.div>

              </div>

            </div>
            </div>

        </motion.div>
        </div>

    </div>
  )
}

export default EmbedClient
