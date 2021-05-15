import { useFormik } from 'formik';
import * as yup from 'yup';

const ErrorMessage = ({ children }) => {
  return <p className="error-message">{children}</p>;
};

const ArticleForm = () => {
  const formik = useFormik({
    initialValues: {
      topicTitle: '',
      articleTitle: '',
      articleUrl: '',
      articleNote: '',
    },
    // use .object().shape() instead of .object() to avoid cyclic dependency error.
    // https://github.com/jquense/yup/issues/79#issuecomment-704963538
    validationSchema: yup.object().shape(
      {
        topicTitle: yup.string().required('Topic is required'),
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
      console.log(formik.errors);
      formik.resetForm();
    },
  });
  return (
    <form className="form form-topic" onSubmit={formik.handleSubmit}>
      <div className="input-control">
        <label htmlFor="topic-title" className="visually-hidden">
          Topic
        </label>
        <input
          id="topic-title"
          // name has to match form state names
          name="topicTitle"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.topicTitle}
          placeholder="Topic"
        />
        {formik.errors.topicTitle && (
          <ErrorMessage>{formik.errors.topicTitle}</ErrorMessage>
        )}
      </div>

      <div className="input-control">
        <label htmlFor="article-title" className="visually-hidden">
          Article
        </label>
        <input
          id="article-title"
          name="articleTitle"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.articleTitle}
          placeholder="Article Name"
        />
        {formik.touched.articleTitle && formik.errors.articleTitle && (
          <ErrorMessage>{formik.errors.articleTitle}</ErrorMessage>
        )}
      </div>

      <div className="input-control">
        <label htmlFor="article-url" className="visually-hidden">
          Article URL
        </label>
        <input
          id="article-url"
          name="articleUrl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.articleUrl}
          placeholder="Article URL"
        />
        {formik.touched.articleUrl && formik.errors.articleUrl && (
          <ErrorMessage>{formik.errors.articleUrl}</ErrorMessage>
        )}
      </div>

      <div className="input-control">
        <label htmlFor="article-note" className="visually-hidden">
          Note
        </label>
        <textarea
          id="article-note"
          name="articleNote"
          rows={5}
          onChange={formik.handleChange}
          value={formik.values.articleNote}
          placeholder="Note"
        />
        {formik.errors.articleNote && (
          <ErrorMessage>{formik.errors.articleNote}</ErrorMessage>
        )}
      </div>

      <button className="button" type="submit">
        Add
      </button>
    </form>
  );
};
export default ArticleForm;
