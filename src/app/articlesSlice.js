import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {Object} Article
 * @property {number} createdAt
 * @property {boolean} deleted
 * @property {string} href
 * @property {string} note
 * @property {string} title
 * @property {string} topic
 * @property {number} read
 * @property {number} stars
 */

/**
 * @typedef {object} StateArticle
 * @property {string} id
 * @property {number} createdAt
 * @property {boolean} deleted
 * @property {string} href
 * @property {string} note
 * @property {string} title
 * @property {string} topic
 * @property {number} read
 * @property {number} stars
 */

/**  @type {StateArticle[]} */
const initialState = [];

const getArticleIndexById = (articles, articleId) => {
  return articles.findIndex((article) => article.id === articleId);
};

const set = (state, action) => {
  // to replace existing state with Immer, return the new value directly
  // https://redux-toolkit.js.org/usage/immer-reducers#resetting-and-replacing-state
  return action.payload;
};

const add = (state, action) => {
  // Immer allows you to directly mutate the "draft" state and it will update the state immutably for you.
  // https://redux-toolkit.js.org/usage/immer-reducers#immutable-updates-with-immer
  state.push(action.payload);
};

const remove = (state, action) => {
  const id = action.payload;
  const articleIndex = getArticleIndexById(state, id);
  if (articleIndex === -1) return;
  // this is Immer way
  state.splice(articleIndex, 1);
};

const updateStars = (state, action) => {
  const { id, stars } = action.payload;
  // stars should be a number between 0 and 5
  if (stars < 0 || stars > 5) return;

  const articleIndex = getArticleIndexById(state, id);
  if (articleIndex === -1) return;
  state[articleIndex].stars = stars;
};

const incrementRead = (state, action) => {
  const id = action.payload;
  const articleIndex = getArticleIndexById(state, id);
  if (articleIndex === -1) return;
  state[articleIndex].read++;
};
const decrementRead = (state, action) => {
  const id = action.payload;
  const articleIndex = getArticleIndexById(state, id);
  if (articleIndex === -1) return;
  // don't decrement when it's 0
  if (state[articleIndex].read === 0) return;
  state[articleIndex].read--;
};
const updateNote = (state, action) => {
  const { id, note } = action.payload;
  const articleIndex = getArticleIndexById(state, id);
  if (articleIndex === -1) return;
  state[articleIndex].note = note;
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    set,
    add,
    remove,
    updateStars,
    incrementRead,
    decrementRead,
    updateNote,
  },
});

export const {
  set: setArticles,
  add: addArticle,
  remove: removeArticle,
  incrementRead: incrementArticleRead,
  decrementRead: decrementArticleRead,
  updateStars: updateArticleStars,
  updateNote: updateArticleNote,
} = articlesSlice.actions;

export default articlesSlice.reducer;
