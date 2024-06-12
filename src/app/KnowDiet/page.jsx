import React from 'react'
import Link from 'next/link'
function KnowDiet() {
  return (
    <div>
      <Link href="/generalised"><button>Generalised</button></Link>
      <Link href="/Personalised"><button>Personalised</button></Link>
    </div>
  )
}

export default KnowDiet