import { useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import firebase from '../../config/firebase';
import styled from 'styled-components';

const StyledArticleNote = styled.div`
  margin-top: 1rem;
  textarea {
    padding: 0.5em;
    resize: vertical;
    line-height: 1.4;
    border-color: var(--text-muted);
  }
`;

const ArticleNote = ({ note, articleId, userId }) => {
  const [noteText, setNoteText] = useState(note);

  // https://css-tricks.com/debouncing-throttling-explained-examples/

  // Saving debounced function inside ref to avoid using
  // new instances of debounced function every time input value is changed triggering re-render of this component.
  // "This will end up debouncing each keystroke rather than debouncing the entire input value."
  // https://www.freecodecamp.org/news/debounce-and-throttle-in-react-with-hooks/
  const debouncedSetFirebaseNote = useRef(
    debounce((textareaValue) => {
      firebase.database().ref(`${userId}/${articleId}/note`).set(textareaValue);
      // uncomment below to see debounce in effect
      // console.log('firebase set');
    }, 350)
  ).current;

  const updateNote = (updatedNote) => {
    // update local state immediately
    setNoteText(updatedNote);
    debouncedSetFirebaseNote(updatedNote);
  };

  return (
    <StyledArticleNote className="ArticleNote">
      <label className="visually-hidden" htmlFor="articleNote">
        Edit article note.
      </label>
      <textarea
        id="articleNote"
        className="article-note-text"
        value={noteText}
        onChange={(e) => updateNote(e.target.value)}
      />
    </StyledArticleNote>
  );
};

export default ArticleNote;
