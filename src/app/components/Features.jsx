import React from 'react'
import Image from 'next/image'
function Features() {
  return (
    <div>
      <h1 className='text-5xl mt-[150px] ml-[600px] text-orange-300 text-bold '>Features</h1>
      <div className='mt-[100px]'>
        <ul className='flex'>
          <li><div className='w-[500px] ml-[50px] mt-[50px]'>
          Congratulations on your pregnancy! We are thrilled to accompany you on this incredible journey to parenthood. At[website name], we understand that every pregnancy is unique and filled with moments of joy, anticipation, and sometimes uncertainty. Our mission is to provide you with the support, information, and community you need to navigate this beautiful chapter of your life.

Whether you're looking for expert advice, health and wellness tips, or just a place to connect with other expectant parents, you'll find it here. Explore our wide range of resources, from personalized pregnancy trackers and due date calculators to informative articles and interactive tools designed to make your experience as smooth and enjoyable as possible.

We're here to help you every step of the way. Welcome to our community
            </div></li>
          <li><div>
          <Image src="/second.avif" width={400} height={400}  className='ml-[300px] mt-[60px] rounded-lg'>

</Image></div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Features