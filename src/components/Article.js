import ArticleControls from './ArticleControls';
import ArticleTitle from './ArticleTitle';

import firebase from '../config/firebase';
import { useState } from 'react';
import ArticleDeleteConfirm from './ArticleDeleteConfirm';
import ArticleNote from './ArticleNote';

const Article = ({ id, title, href, stars, read, note }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const updateStars = async (updatedStars) => {
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

  const incrementRead = () => {
    firebase
      .database()
      .ref(`demo/${id}/read`)
      .set(read + 1);
  };

  const decrementRead = () => {
    // can't decrement below 0
    if (read === 0) return;
    firebase
      .database()
      .ref(`demo/${id}/read`)
      .set(read - 1);
  };

  const toggleConfirmMenu = () => {
    setShowDeleteConfirm((show) => !show);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const deleteArticle = async () => {
    try {
      firebase.database().ref(`demo/${id}/deleted`).set(true);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="Article">
      <ArticleTitle href={href} title={title} />
      <ArticleControls
        stars={stars}
        href={href}
        read={read}
        note={note}
        updateStars={(stars) => updateStars(stars)}
        incrementRead={incrementRead}
        decrementRead={decrementRead}
        toggleConfirmMenu={toggleConfirmMenu}
        toggleNote={() => setShowNote((show) => !show)}
      />
      {showNote && <ArticleNote note={note} articleId={id} />}
      {showDeleteConfirm && (
        <ArticleDeleteConfirm
          cancelDelete={cancelDelete}
          deleteArticle={deleteArticle}
        />
      )}
    </li>
  );
};

export default Article;
