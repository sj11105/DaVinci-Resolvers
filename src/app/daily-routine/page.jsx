"use client"
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import Video from '../components/Video';
const DailyRoutine = () => {
    const [isRotated , setIsRotated] = useState(false)
    
    const handleToggle = () =>{
        setIsRotated(!isRotated)
    }
    const URL = "https://www.youtube.com/watch?v=TxwBvq7K3Jg"

  return (
    <div>
        <h1 className='mt-4 text-center text-xl font-extrabold '>Daily Routine For Pregnant Lady</h1>
        <div className='mt-4 mx-auto flex w-4/5 justify-between  p-2 items-center bg-white'>

        <p className='text-red-600  ml-4 text-lg '>
            Plan for 0 - 3 month
            </p>
        <button type="button" className='black_btn'>
            <Image 
                src="/logos/dropdown-svgrepo-com.svg"
                width={40}
                height={40}
                className={isRotated ? 'rotate-180' : 'rotate-0'}
                onClick={handleToggle}
            ></Image>
        </button>
        
        </div>
        
       
        
    </div>
    
  )
}

export default DailyRoutine;