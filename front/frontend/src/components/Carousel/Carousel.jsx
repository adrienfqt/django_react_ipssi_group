import React from 'react';
import './Carousel.css';
import PropTypes from 'prop-types';

const Carousel = ({ data, onItemClick }) => {
  return (
    <div className="carousel">
      {data.map((item) => (
        <div
          key={item.id}
          className="carousel-item"
          onClick={() => onItemClick(item.id)} // Add onClick handler
        >
          <img src={item.image} alt={item.name} />
          <div className="carousel-item-details">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired, // Add prop type for onItemClick
};

export default Carousel;