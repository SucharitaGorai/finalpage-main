import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './YouTubeVideos.css'; 

const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const apiKey = 'AIzaSyC_cymNLRLSkSVq--aybjDsIjn6mTgPFSU';
      
     
      const publishedAfter = new Date();
      publishedAfter.setDate(publishedAfter.getDate() - 1);
      const isoDate = publishedAfter.toISOString();

      const searchQuery = `
        disaster OR flood OR earthquake OR volcano eruption OR earthquake OR quake OR 
        flood OR flooding OR "flash flood" OR hurricane OR typhoon OR cyclone OR 
        wildfire OR "forest fire" OR "bushfire" OR tornado OR "twister" OR 
        "cyclone" OR NationalWeatherService OR #earthquake OR #flood #disaster OR 
        @RedCross earthquake OR flood OR rescueteam
      `;

      const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: searchQuery.trim(),
          type: 'video',
          maxResults: 200, 
          regionCode: 'IN', 
          publishedAfter: isoDate, 
          key: apiKey
        }
      });
      setVideos(res.data.items);
    };

    fetchVideos();
  }, []);

  const navigateHome = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <h2 className="header">Disaster-Related Search Results (Last 24 Hours)</h2>
      <div className="buttonContainer">
        <button onClick={navigateHome} className="button">
          Return To Dashboard
        </button>
      </div>
      <div className="videoContainer">
        {videos.map(video => (
          <div key={video.id.videoId} className="videoCard">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="thumbnail" />
            <h3 className="title">{video.snippet.title}</h3>
            <p className="description">{video.snippet.description}</p>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer" className="link">
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;