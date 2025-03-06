import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No news available. Please try a different search.</p>;
  }

  return (
    <div className='CardContainer'>
      {data.map((curItem, index) => {
        return (
          <div className='card' key={index}>
            {curItem.urlToImage && (
              <img 
                src={curItem.urlToImage} 
                alt={curItem.title}
                onError={(e) => e.target.style.display = 'none'} 
              />
            )}
            <div className='cardContent'>
              <a href={curItem.url} target='_blank' rel='noopener noreferrer'>
                {curItem.title}
              </a>
              <p>{curItem.description}</p>
              <button onClick={() => window.open(curItem.url, '_blank')} className='read-more-btn'>Read More</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string
    })
  )
};

export default Card;
