import { useFormik } from 'formik';
import * as yup from 'yup';
import { useArticles } from '../context/articlesContext';

export default function useArticleFormik(topic, onSubmitCallback) {
  const { addArticle } = useArticles();

  const formik = useFormik({
    initialValues: {
      topicName: topic ? topic : '',
      articleTitle: '',
      articleUrl: '',
      articleNote: '',
    },
    // use .object().shape() instead of .object() to avoid cyclic dependency error.
    // https://github.com/jquense/yup/issues/79#issuecomment-704963538
    validationSchema: yup.object().shape(
      {
        topicName: yup.string().required('Topic is required'),
        // Requiring either of the two fields
        // https://github.com/jquense/yup/issues/79#issuecomment-699605408
        articleTitle: yup.string().when('articleUrl', {
          is: (url) => !url || url.length === 0,
          then: yup.string().required('Either article name or url is required'),
          otherwise: yup.string(),
        }),
        articleUrl: yup.string().when('articleTitle', {
          is: (title) => !title || title.length === 0,
          then: yup.string().required('Either article name or url is required'),
          otherwise: yup.string(),
        }),
        articleNote: yup.string(),
      },
      ['articleTitle', 'articleUrl']
    ),
    onSubmit: (values) => {
      console.log(values);

      /** @type {import('../App').Article} */
      const article = {
        createdAt: Date.now(),
        deleted: false,
        topic: values.topicName,
        title: values.articleTitle,
        href: values.articleUrl,
        note: values.articleNote,
        stars: 0,
        read: 0,
      };
      addArticle(article);
      formik.resetForm();
      if (onSubmitCallback) {
        onSubmitCallback();
      }
    },
  });
  return formik;
}
