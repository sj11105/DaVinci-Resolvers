"use client"
import React from 'react';

const YouTubeVideo = ({ videoId }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-inherit ">
      <div className="w-3/4 mx-auto rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="600"
          src={`https://www.youtube.com/embed/${videoId}`}

          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeVideo;
