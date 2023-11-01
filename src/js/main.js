// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import the required libraries
import axios from 'axios';

const playlistId = 'UULF7sYov0r8wtPZLO_9P4LODg';

async function fetchYouTubeVideos() {
  try {
    
    const YouTubeAPIKey = import.meta.env.VITE_YOUTUBE_API_KEY; // Replace with your YouTube Data API key
    if (typeof YouTubeAPIKey === 'undefined') {
        console.log('Undefined');
    }

    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=15&playlistId=${playlistId}&key=${YouTubeAPIKey}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

function createVideoElement(video, index) {
  const videoLink = document.createElement('a');
  videoLink.id = `video${index}link`;
  videoLink.href = `https://youtube.com/watch?v=${video.snippet.resourceId.videoId}`;

  const videoImage = document.createElement('img');
  videoImage.id = `video${index}`;
  videoImage.src = video.snippet.thumbnails.medium.url;
  videoImage.alt = '';
  videoImage.className = 'w-100 img-fluid rounded mx-auto d-block';

  videoLink.appendChild(videoImage);
  return videoLink;
}

function renderVideos(videos) {
  const videoContainer = document.getElementById('videoRow');
  videoContainer.innerHTML = '';

  if (videos.length > 0) {
    const firstVideoSrc = `https://www.youtube-nocookie.com/embed?listType=playlist&list=${playlistId}`;
    const videoHeader = document.getElementById('videoHeader');
    videoHeader.setAttribute('src', firstVideoSrc);

    for (let i = 1; i < videos.length; i++) {
      const videoElement = createVideoElement(videos[i], i - 1);
      const videoColumn = document.createElement('div');
      videoColumn.className = 'col-md-2 p-2 video-img';
      videoColumn.appendChild(videoElement);
      videoContainer.appendChild(videoColumn);
    }
  }
}

async function initialize() {
  const videos = await fetchYouTubeVideos();
  renderVideos(videos);
}

// Export any functions or values that need to be used in other modules
initialize();
