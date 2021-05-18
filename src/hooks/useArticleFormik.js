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
    validationSchema: yup.object().shape({
      topicName: yup.string().required('Topic is required'),
      articleTitle: yup.string().required('Article name is required'),
      articleUrl: yup
        .string()
        .matches(
          // https://stackoverflow.com/a/3809435/13036807
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          'Not a valid URL'
        )
        .required('Article URL is required'),
    }),
    onSubmit: (values) => {
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
