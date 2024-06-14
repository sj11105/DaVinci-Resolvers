import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <div className="mt-[20px]">
      <div className="mt-[30px]">
        <ul className="flex gap-60"><li>
          logo
        </li>
        <li><div>
        <h1 className="font-bold text-lg text-orange-300">Services</h1>
          <ul className="flex-row gap-6">
            
            <li>Personalised diet</li>
            <li>Daily Routine</li>
            <li>Exercise</li>
            
            </ul></div>
            </li>
            <li>
            <div className="">
        <h1 className="font-bold text-lg text-orange-300">Company</h1>
          <ul className="flex-row gap-6">
            
            
            
            <li>Terms and Conditions</li>
            
            </ul></div>
            </li>
            <li>
            <div className="">
        <h1 className="font-bold text-lg text-orange-300">Get in Touch</h1>
          <ul className="flex gap-6">
            
            <li><IoLogoGithub /></li>
            <li><RiTwitterXFill /></li>
            <li><FaLinkedin /></li>
            
            </ul></div>
            </li>
            </ul>
            </div></div>

  
  )
}

export default Footer