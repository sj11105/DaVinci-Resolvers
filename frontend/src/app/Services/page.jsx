import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa";
import Navbar from '../components/Navbar';
function Services() {
  return (
    <>
      <Navbar />
      <h1 className='text-3xl font-bold ml-[550px] mt-[180px] absolute text-orange-500 font-serif'>Care During Pregnancy</h1>

      <div id='services' className='mt-[300px] bg-orange-100 h-[1500px] rounded-tr-full w-[100vw] -ml-[50px]'>

        <img src="https://i.pinimg.com/originals/5f/68/b1/5f68b18a611acf00b429eca5b8236801.gif" alt="" srcset="" className='ml-[600px] w-[350px] ' />
        <div className='mt-[90px] ml-[300px] border-black'>
          <h1 className="text-2xl font-bold">Know Your Diet</h1>
          <p className='mt-4 w-[550px] text-justify'><span className="font-bold text-center">Every bite counts—make it nutritious and beneficial for your baby.</span><br></br>
            This feature provides personalised insights into essential nutrients, balanced meal planning, and food safety tips  based on your reports  to ensure both maternal health and fetal development.
          </p>
          <Link href="/KnowDiet"><button className='bg-black rounded-xl text-white p-6 ml-[470px] mt-6'><FaArrowRight className="text-white" /></button></Link>

        </div>
        <div className='mt-[90px] ml-[620px]'>
          <h1 className="text-2xl font-bold">Know Your Daily Routine</h1>
          <p className='mt-4 w-[650px] text-justify'><span className="font-bold text-center">Every bite counts—make it nutritious and beneficial for your baby.</span><br></br>
            This feature includes tips on creating a consistent sleep schedule, incorporating safe and effective exercises, managing stress, and maintaining proper hydration. With guidance on balancing work, rest, and self-care, "Daily Routine" ensures expecting mothers can navigate each day with confidence and well-being, promoting a smoother and more enjoyable pregnancy experience.
          </p>
          <Link href="/daily-routine"><button className='bg-black rounded-xl text-white p-6 ml-[470px] mt-6 '><FaArrowRight className="text-white" /></button></Link>

        </div>
        <div className='mt-[90px] ml-[300px]'>
          <h1 className="text-2xl font-bold">Know Your Daily Routine</h1>
          <p className='mt-4 w-[800px] text-justify'><span className="font-bold text-center">Every bite counts—make it nutritious and beneficial for your baby.</span><br></br>

            "Exercise" provides expert recommendations for safe and beneficial physical activities during pregnancy. This feature covers a range of exercises, including prenatal yoga, gentle stretching, and low-impact cardio, all designed to support the changing body and promote overall health. With the help of machine learning model we guide them on their postures so that it does not effect the growth of baby.
          </p>
          <Link href="/KnowDiet"><button className='bg-black rounded-xl text-white p-6 mt-6 ml-[600px]'><FaArrowRight className="text-white" /></button></Link>

        </div>

      </div>


    </>

  )
}

export default Services;