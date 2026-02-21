'use client'
import React, {useEffect, useRef, useState } from 'react'
import {AnimatePresence, motion} from 'motion/react'
import { features } from 'process'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'
function HomeClient({email}:{email:string}) {
    const [loading,setLoading]=useState(false);
    const handleLogin=()=>{
      setLoading(true);
        window.location.href='/api/auth/login'
    }
    const firstletter=email?.charAt(0).toUpperCase();
    const [open,setopen]=useState(false);
    const popupRef=useRef<HTMLDivElement>(null);
    useEffect(()=>{
      const handler=(e:MouseEvent)=>{
        if(popupRef.current && !popupRef.current.contains(e.target as Node)){
          setopen(false);
        }
      }
      document.addEventListener('mousedown', handler);
      return ()=>document.removeEventListener('mousedown', handler)
    },[])
    const features=[
        {
          title:"Play & Pug",
          desc:"Add the chat assistant to your site with a single script tag.",
        },
        {
          title:"Admin Controlled",
          desc:"You control exactly what the AI knows and Answers."
        },
        {
          title:"Always Online",
          desc:"Your Customers get instant support 24/7"
        }
    ]
    const handlelogout=async()=>{
      try {
        const result=await axios.get('api/auth/logout');
        window.location.href='/'
      } catch (error) {
        console.log(error);
      }
    }
    const navigate=useRouter();
  return (
    <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>
      <motion.div
      initial={{y: -50}}
        animate={{y: 0}}
            transition={{duration: 0.8}}
      className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        <div className='text-lg font-semibold tracking-tight'>Support-<span className='text-zinc-600 font-bold text-xl' >AI</span></div>
       {email?<div className='relative' ref={popupRef}><button className='w-10 h-10 px-5 py-5 rounded-full bg-[#333] text-white flex items-center justify-center font-semibold hover:scale-105 transition' onClick={()=>setopen(!open)}>{firstletter}</button>
       <AnimatePresence>
       {open &&(
        <motion.div 
        initial={{opacity: 0, y: -6}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -6}}
        transition={{duration: 0.2}}
        className='absolute right-0 mt-3 w-44 rounded-xl bg-white shadow-xl border border-zinc-200 overflow-hidden'>
          <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-200' onClick={()=>navigate.push('/dashboard')}>Dashboard</button>
          <button className='w-full text-left px-4 py-3 text-sm text-blue-700 hover:bg-zinc-100'onClick={handlelogout}>Logout</button>
        </motion.div>
        )
        }
        </AnimatePresence>
       </div> : <button
        className='px-5 py-2 rounded-full
        bg-black text-white text-md font-medium hover:bg-zinc-300 hover:text-black transition disabled:opacity-60 flex items-center' onClick={handleLogin} disabled={loading}>{loading ? "Loading..." : "Login"}</button>}
        </div>
      </motion.div>
      <section className='pt-36 pb-28 px-6'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
        <motion.div
        initial={{opacity: 0, y: 40}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.8}}
        >
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>AI-Powered Support<br/>
          Build for Modern Websites
          </h1>
          <p className='mt-4 text-lg text-zinc-600'>Add a powerful AI assistant to your websites in mintues.
            Let yours customers get instant answers to their questions, 24/7, without the need for human support agents.
          </p>
          <div className='mt-10 flex gap-4'>
            {email?<button className='px-7 py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-200 hover:text-black transition disabled:opacity-60' onClick={()=>navigate.push('/dashboard')}>Go to Dashboard</button> : <button className='px-7 py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-200 hover:text-black transition disabled:opacity-60' onClick={handleLogin}>Get Started</button>}
          <a href='#feature' className='px-7 py-3 bg-white text-black border border-zinc-300 rounded-xl font-medium hover:bg-zinc-200 transition disabled:opacity-60'>Learn More</a>
          </div>
        </motion.div>
        <motion.div 
        initial={{opacity:0,scale:0.95}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.7,delay:0.2}}
        className='relative'
        >
<div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
  <div className='text-sm text-zinc-500 mb-3'>Live chat Preview</div>
  <div className='space-y-3'>
    <div className='bg-zinc-100 rounded-lg px-4 py-2 text-sm ml-auto w-fit'>Do you offer Cash on Delivery Service?</div>
    <div className='bg-black text-white rounded-xl px-4 py-2 text-sm w-fit mt-5'>Yes,Cash on Delivery is Available</div>
  </div>

<motion.div
animate={{y:[0,-16,0]}}
transition={{repeat:Infinity,duration:2}}
className='absolute -bottom-6 -right-6 w-18 h-18 rounded-full bg-white text-black flex items-center justify-center shadow-xl'>
  <img src="/image.png" alt=" "/>
</motion.div>
</div>
        </motion.div>
        </div>
      </section>
      <section id='feature' className='bg-zinc-50 py-28 px-6 border-t border-zinc-200'>
        <div className='max-w-6xl mx-auto'>
          <motion.h2
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:false}}
          transition={{duration:0.8}}
          className='text-3xl font-semibold text-center'>
            Why Businesses Choose Support-<span className='font-bold text-zinc-500'>AI</span>
          </motion.h2>
          <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
          {features.map((f,index)=>(
            <motion.div
            key={index}
            initial={{opacity:0,y:40}}
            whileInView={{opacity:1,y:0}}
            transition={{delay:index * 0.1}}
            viewport={{once:false}}
            className='bg-white rounded-xl p-8 shadow-lg border border-zinc-200'  
            >
              <h1 className='text-xl font-medium'>{f.title}</h1>
              <p className='mt-3 text-zinc-600  text-sm'>{f.desc}</p>

            </motion.div>
          )

          )}
          </div>
        </div>
      </section>
      <footer className='py-6 text-center text-sm text-zinc-500'>
        &copy;{new Date().getFullYear()} Support-AI, All rights reserved.
      </footer>
    </div>
  )
}

export default HomeClient
