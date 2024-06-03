import React from 'react'

function Navbar() {
  return (
    <div> 
      <div className="navbar bg-violet-100 text-black">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Logo</a>
  </div>
  <div className='flex-1'>
    <ul className='flex gap-4'>
      <li className='mt-4'>Home</li>
      <li className='mt-4'>About Us</li>
      <li><div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="btn m-1">Services</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div></li>
      <li className='mt-4'>Contact Us</li>
    </ul>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="user" src="" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>



    </div>
  )
}

export default Navbar;