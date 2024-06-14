import React from 'react'
import Link from 'next/link' 
function Services() {
  return (
    <>

      <h1 className='text-3xl font-bold ml-[550px] mt-[180px] absolute text-orange-500 font-serif'>Care During Pregnancy</h1>

      <div id='services' className='mt-[300px] bg-orange-100 h-[1000px] rounded-tr-full w-[100vw]'>

        <img src="https://i.pinimg.com/originals/5f/68/b1/5f68b18a611acf00b429eca5b8236801.gif" alt="" srcset="" className='ml-[600px] w-[350px] ' />
        <div className='mt-[90px] ml-[20px]'>
          <Link href="/KnowDiet">
            <button className='bg-black rounded-xl text-white p-4'>
              Know Your Diet
            </button>
          </Link>
          <p className='mt-4'>"Every bite counts—make it nutritious and beneficial for your baby."</p>
        </div>
        <div className='mt-[90px] ml-[20px]'>

        {/* Adding daily routine plan */}
          <Link href="/daily-routine">
            <button className='bg-black rounded-xl text-white p-4'>
              Get Your Daily plan
            </button>
        
          </Link>
          <p className='mt-4'>"Every bite counts—make it nutritious and beneficial for your baby."</p>
        </div>
        <div className='mt-[90px] ml-[20px]'>
          <Link href="/KnowDiet">
            <button className='bg-black rounded-xl text-white p-4'>
              Exercise
            </button>
          </Link>
          <p className='mt-4'>"Every bite counts—make it nutritious and beneficial for your baby."</p>
        </div>

      </div>


    </>

  )
}

export default Services;