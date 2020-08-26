import React from 'react';
import './ImageCard.scss';

const ImageCard = ({ url, tagName, setTagName }) => {
  const imageCardHandler = (e) => {
    setTagName(tagName);
  };

  return (
    <div className='image-card' onClick={imageCardHandler}>
      <img src={url}/>
    </div>
  );
}

export default ImageCard;