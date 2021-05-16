import { useEffect, useState } from 'react';
import firebase from '../config/firebase';

export const userKey = 'demo';

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

/**
 * An object containing topics as key and each topic is mapped to an array of articles of the topic.
 * @typedef {{[topic:string]: Article[]}} TopicsOfArticles
 */

/**
 * @returns {{topicsOfArticles: TopicsOfArticles, addArticle: (article:Article) => void}}
 */
export default function useArticles() {
  /**
   * @type {[StateArticle[], function]}
   */
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const articlesRef = firebase.database().ref(userKey);

    const unsubscribe = articlesRef.on('value', (dataSnapshot) => {
      const data = dataSnapshot.val();
      console.log(data);

      const currentArticles = Object.entries(data).map(([key, val]) => ({
        ...val,
        id: key,
      }));

      setArticles(currentArticles);
    });
    return unsubscribe;
  }, []);

  /** an object containing topics as key and each topic is mapped to an array of articles with given topic  */
  const topicsOfArticles = articles.reduce((topics, article) => {
    const topic = article.topic;
    // If article is deleted, don't include it in the articles array
    if (article.deleted) {
      return topics;
    }

    if (topics[topic]) {
      topics[topic].push(article);
    } else {
      const newTopicArray = [];
      newTopicArray.push(article);
      topics[topic] = newTopicArray;
    }
    return topics;
  }, {});

  return { topicsOfArticles };
}

/**
 * Add an article to user's db
 * @param {Article} article
 */
export const addArticle = (article) => {
  const articlesRef = firebase.database().ref(userKey);
  articlesRef.push(article);
};

/**
 *
 * @param {StateArticle[]} articles
 */
export const deleteArticles = (articles) => {
  const articlesRef = firebase.database().ref(userKey);
  const updateObject = articles.reduce((obj, article) => {
    // multi-path updates allows you to update values without overwriting other property values in the same level
    // https://stackoverflow.com/questions/33784702/updating-nested-objects-firebase
    const updatePath = `${article.id}/deleted`;
    obj[updatePath] = true;
    return obj;
  }, {});
  articlesRef.update(updateObject);
};
