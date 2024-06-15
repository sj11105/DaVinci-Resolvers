import React from 'react'
import Link from 'next/link'
function KnowDiet() {
  return (
    <div className="flex  gap-4  justify-center items-center h-[100vh]">
      
      <Link href="/Personalised" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200 inline-block">
         Personalised
       
      </Link>
    </div>
  )
}

export default KnowDiet