import ArticleControls from './ArticleControls';
import ArticleTitle from './ArticleTitle';

import firebase from '../config/firebase';

const Article = ({ id, title, href, stars, read, note }) => {
  const updateStars = async (id, updatedStars) => {
    console.log('updateStars', id, updatedStars, stars);
    // Ignore if stars falls out of range
    if (updatedStars < 0 || updatedStars > 5) return;

    // If user clicks on the "on" star, turn it off.
    if (updatedStars === stars && stars !== 0) {
      return firebase
        .database()
        .ref(`demo/${id}/stars`)
        .set(stars - 1);
    }

    const starsRef = firebase.database().ref(`demo/${id}/stars`);
    starsRef.set(updatedStars);
  };
  return (
    <li className="Article">
      <ArticleTitle href={href} title={title} />
      <ArticleControls
        stars={stars}
        href={href}
        read={read}
        note={note}
        updateStars={(stars) => updateStars(id, stars)}
      />
    </li>
  );
};

export default Article;
