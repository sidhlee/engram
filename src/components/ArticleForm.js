import FormInput from './FormInput';
import useArticleFormik from '../hooks/useArticleFormik';

const ArticleForm = ({ addArticle, className }) => {
  const formik = useArticleFormik(addArticle);
  const formClassName = `ArticleForm form form-topic shadow ${
    className ? className : ''
  }`;
  return (
    <form className={formClassName} onSubmit={formik.handleSubmit}>
      <FormInput
        name="topicName"
        placeholder="Topic"
        formik={formik}
        autoComplete={true}
      />
      <FormInput
        name="articleTitle"
        placeholder="Article Name"
        formik={formik}
      />
      <FormInput name="articleUrl" placeholder="Article URL" formik={formik} />
      <FormInput
        name="articleNote"
        placeholder="Note"
        formik={formik}
        textarea={true}
      />

      <button className="button" type="submit">
        Add
      </button>
    </form>
  );
};
export default ArticleForm;
