import React from 'react'
import Link from 'next/link'
function Services() {
  return (
    <>

    <h1 className='text-3xl font-bold ml-[550px] mt-[180px] absolute text-orange-500 font-serif'>Care During Pregnancy</h1>
    <div className=' '>
    <div id='services' className='mt-[300px] bg-orange-100 h-[1200px] rounded-full'>
      <img src="https://i.pinimg.com/originals/5f/68/b1/5f68b18a611acf00b429eca5b8236801.gif" alt="" srcset="" className='ml-[600px] w-[350px] ' />
     <div className='flex gap-10 mt-[50px] ml-[20px]  '>
     <div className="card lg:card-side bg-base-100 shadow-xl w-[500px] mt-[20px]">
  <figure><img src="https://i.pinimg.com/474x/bf/ef/97/bfef97712edce45e6299968f3d6072a8.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">Every bite counts—make it nutritious and beneficial for your baby!</h2>
    <p>Click the button to get best diet for you.</p>
    <div className="card-actions justify-end">
      <Link href="/KnowDiet" className="btn btn-primary">Know Now</Link>
    </div>
  </div>
</div>

<div className="card lg:card-side bg-base-100 shadow-xl w-[500px] mt-[20px]">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>

<div className="card lg:card-side bg-base-100 shadow-xl w-[500px] mt-[20px]">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    </div>
  
  <div className='flex gap-20 mt-[80px] ml-[20px]'>
     <div className="card lg:card-side bg-base-100 shadow-xl w-[500px]">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>

<div className="card lg:card-side bg-base-100 shadow-xl w-[500px]">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>

<div className="card lg:card-side bg-base-100 shadow-xl w-[500px]">
  <figure><img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    </div>
 </div>
    </div>
  
  </>

   
  )
}

export default Services