"use client"

import React ,{useState , useEffect} from 'react'
import ReactPlayer from 'react-player';


const Video = ({url}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null; // Or a loading placeholder
    }
   
  return (
    <div className="flex  items-center h-screen bg-gray-100">
      <div className="w-4/5 mx-auto">
      <ReactPlayer url={url} width="100%" height="100%" controls />
      </div>
    </div>
  )
}

export default Video;