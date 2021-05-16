import debounce from 'lodash.debounce';
import { useRef, useState } from 'react';
import firebase from '../config/firebase';

const ArticleNote = ({ note, articleId }) => {
  const [noteText, setNoteText] = useState(note);
  const textareaRef = useRef();

  const updateNote = (updatedNote) => {
    setNoteText(updatedNote);

    // https://css-tricks.com/debouncing-throttling-explained-examples/
    // debounce keystroke after 1s before updating firebase
    const updateFirebase = debounce((text) => {
      firebase
        .database()
        .ref(`demo/${articleId}/note`)
        // .set(text); // this is not working. why?
        // debounce with the most current textarea value
        .set(textareaRef.current.value);
    }, 1000);

    // why debounced function gets called as many times as the change event after given delay?
    // updateFirebase(updatedNote);

    updateFirebase();
  };

  return (
    <div className="ArticleNote">
      <label className="visually-hidden" htmlFor="articleNote">
        Edit article note.
      </label>
      <textarea
        id="articleNote"
        className="article-note-text"
        ref={textareaRef}
        value={noteText}
        onChange={(e) => updateNote(e.target.value)}
      />
    </div>
  );
};

export default ArticleNote;
