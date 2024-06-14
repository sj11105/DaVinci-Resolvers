import React from 'react'
import Image from 'next/image'
function Features() {
  return (
    <div>
      <h1 className='text-5xl mt-[150px] ml-[70px] md:ml-[600px] text-orange-300 text-bold '>Features</h1>
      <div className='mt-[100px]'>
        <ul className='flex-row md:flex'>
          <li><div className=' w-[300px] md:w-[500px]  ml-[30px] md:ml-[50px] mt-[50px]'>
          Congratulations on your pregnancy! We are thrilled to accompany you on this incredible journey to parenthood. At[website name], we understand that every pregnancy is unique and filled with moments of joy, anticipation, and sometimes uncertainty. Our mission is to provide you with the support, information, and community you need to navigate this beautiful chapter of your life.

Whether you're looking for expert advice, health and wellness tips, you'll find it here. Explore our wide range of resources, from personalized diet and to informative articles and machine learning designed to help you detect your posture experience as smooth and enjoyable as possible.

We're here to help you every step of the way. Welcome to our community
            </div></li>
          <li><div>
          <Image src="/images/second.avif" width={400} height={400}  className=' -ml-[20px] md:ml-[300px] mt-[60px] rounded-lg'>

</Image></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Features