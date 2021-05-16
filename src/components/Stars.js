import { FaStar } from 'react-icons/fa';

const Stars = ({ stars, updateStars }) => {
  const maxStars = 5;
  if (stars < 0 || stars > maxStars) {
    throw new Error('Stars should be a number between 0 and 5');
  }
  const starItems = [...Array(maxStars)].map((_, i) => {
    // give className based on number of stars
    const className = i < stars ? 'star-item star-on' : 'star-item star-off';
    return (
      <li key={i} className={className}>
        <button
          className="star-btn"
          type="button"
          onClick={() => updateStars(i + 1)} // update stars based on the button index between 0 to 4
        >
          <FaStar />
        </button>
      </li>
    );
  });

  return <ul className="Stars">{starItems}</ul>;
};

export default Stars;
