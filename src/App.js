import logo from './logo.svg';
import './App.css';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const server = 'https://jsonplaceholder.typicode.com/photos';

function App() {  
  const [albums, setAlbums] = useState([]);  
  const [currentAlbumId, setCurrentAlbumId] = useState(1);  
  const [pictures, setPictures] = useState([]);
  const [pictureIndex, setPictureIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingPicturesCount = 5;

  //if PictureItem was not exported as default component
  const PictureItem = React.lazy(() => import('./PictureItem').then(module => ({default: module.PictureItem})));

  //load albums when component loads
  const fetchAlbums = useCallback(async () => {
    try {
      const response = await axios(server);
      if (response && response.data && response.data.length > 0) {
        const albumsTemp = response.data.reduce((acc, picture) => {
          if (!acc[picture.albumId]) acc[picture.albumId] = [];
          acc[picture.albumId].push(picture.id);
          return acc;
        }, {}); 
        setAlbums(albumsTemp);
      } else return;
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, []);

  //load pictures for currentAlbumId
  const fetchPictures = useCallback(async() => {
    if (loading) return;
    setLoading(true);
    try {  
      if (albums[currentAlbumId] && pictureIndex < albums[currentAlbumId].length) {
        const response = await axios(
          server + '?albumId=' + currentAlbumId + 
          '&_start=' + pictureIndex + 
          '&_limit=' + loadingPicturesCount);
        if (response && response.data && response.data.length > 0) {
          setPictures(prevPictures => [...prevPictures, ...response.data]);  
          setPictureIndex(prevIndex => prevIndex + response.data.length);
        }
      }
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }    
  }, [albums, pictureIndex]);

  useEffect(() => {
    fetchPictures();
  }, [albums, currentAlbumId]);

  //handle change currentAlbumId
  const handleAlbumChange = (albumId) => {
    setCurrentAlbumId(albumId);
    setPictures([]);
    setPictureIndex(0);
  }

  //lazy loading on scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        fetchPictures();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPictures]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Pagination</h1>
        <ul className='pagination'>
          {albums && Object.keys(albums).length > 0 && (
            Object.keys(albums).map(albumId => (
              <li key={albumId}><button className={Number(albumId) === Number(currentAlbumId) ? 'active' : ''} onClick={() => handleAlbumChange(albumId)}>{albumId}</button></li>
            ))
          )}
        </ul>
        <h1>Pictures</h1>
        <Suspense fallback={<div><p>Loading...</p></div>}>
          <ul className='pictures'>
            {pictures && pictures.length > 0 ? (
              pictures.map(picture => (
                <li key={picture.id}><PictureItem picture={picture} /></li>
              ))
            ) : (
              <p>Sorry, no pictures here...</p>
            )}
          </ul>
        </Suspense>
      </header>
    </div>
  );
}

export default App;
