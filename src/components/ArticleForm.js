import FormInput from './FormInput';
import useArticleFormik from '../hooks/useArticleFormik';

const ArticleForm = ({ addArticle }) => {
  const formik = useArticleFormik(addArticle);
  return (
    <form
      className="ArticleForm form form-topic"
      onSubmit={formik.handleSubmit}
    >
      <FormInput name="topicTitle" placeholder="Topic" formik={formik} />
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
