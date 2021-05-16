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
    if (topics[topic]) {
      topics[topic].push(article);
    } else {
      const newTopicArray = [];
      newTopicArray.push(article);
      topics[topic] = newTopicArray;
    }
    return topics;
  }, {});

  /**
   * Add an article to user's db
   * @param {Article} article
   */
  const addArticle = (article) => {
    const articlesRef = firebase.database().ref(userKey);
    articlesRef.push(article);
  };

  return { topicsOfArticles, addArticle };
}
