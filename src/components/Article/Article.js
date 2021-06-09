import { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../config/firebase';
import ArticleControls from './ArticleControls';
import ArticleTitle from './ArticleTitle';
import ArticleNote from './ArticleNote';
import ConfirmationAlert from '../ConfirmationAlert';

const StyledArticle = styled.li`
  padding: 0.5rem;
  background: var(--cl-white);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .article-name {
    font-size: 1rem;
    font-weight: 500;

    margin-bottom: 1em;
  }
  .article-controls {
    width: 100%;
    max-width: 390px;
    margin-left: auto;
    .row {
      display: flex;
      justify-content: space-between;

      padding: 0 0.25em;
      gap: 0.5em;
    }
    svg {
      // align icons vertically with other text element
      display: block;
    }
    .article-btn {
      font-size: 1rem;
    }
    .article-note {
      &.not-empty {
        color: var(--text-main);
        text-decoration: underline;
        // font-weight: bold;
      }
    }
  }
  .article-note-text {
    width: 100%;
  }
`;

const Article = ({ id, userId, title, href, stars, read, note }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const updateStars = async (updatedStars) => {
    // Ignore if stars falls out of range
    if (updatedStars < 0 || updatedStars > 5) return;

    // If user clicks on the "on" star, turn it off.
    if (updatedStars === stars && stars !== 0) {
      return firebase
        .database()
        .ref(`${userId}/${id}/stars`)
        .set(stars - 1);
    }
    const starsRef = firebase.database().ref(`${userId}/${id}/stars`);
    starsRef.set(updatedStars);
  };

  const incrementRead = () => {
    firebase
      .database()
      .ref(`${userId}/${id}/read`)
      .set(read + 1);
  };

  const decrementRead = () => {
    // can't decrement below 0
    if (read === 0) return;
    firebase
      .database()
      .ref(`${userId}/${id}/read`)
      .set(read - 1);
  };

  const toggleConfirmMenu = () => {
    setShowDeleteConfirm((show) => !show);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const deleteArticle = async () => {
    firebase.database().ref(`${userId}/${id}/deleted`).set(true);
    setShowDeleteConfirm(false);
  };

  return (
    <StyledArticle className="Article">
      <ArticleTitle href={href} title={title} />
      <ArticleControls
        stars={stars}
        read={read}
        note={note}
        updateStars={(stars) => updateStars(stars)}
        incrementRead={incrementRead}
        decrementRead={decrementRead}
        toggleConfirmMenu={toggleConfirmMenu}
        toggleNote={() => setShowNote((show) => !show)}
      />
      {showNote && <ArticleNote note={note} articleId={id} userId={userId} />}
      {showDeleteConfirm && (
        <ConfirmationAlert
          message="Delete article?"
          confirmText="Delete"
          cancelAction={cancelDelete}
          confirmAction={deleteArticle}
        />
      )}
    </StyledArticle>
  );
};

export default Article;
