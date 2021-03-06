import styled from 'styled-components';
import FormInput from '../FormInput';
import useArticleFormik from '../../hooks/useArticleFormik';

const StyledArticleForm = styled.form`
  z-index: 1000;
  min-width: 350px;
  &.border {
    border: 1px solid var(--border-color);
  }
`;

const ArticleForm = ({ className, topic, closeForm }) => {
  const formik = useArticleFormik(topic, closeForm);

  const formClassName = `ArticleForm form form-topic ${
    className ? className : ''
  }`;

  return (
    <StyledArticleForm className={formClassName} onSubmit={formik.handleSubmit}>
      <div className="form-inputs">
        {!topic && (
          <FormInput
            name="topicName"
            placeholder="Topic"
            formik={formik}
            autoComplete={true}
          />
        )}
        <FormInput
          name="articleTitle"
          placeholder="Article Name"
          formik={formik}
        />
        <FormInput
          name="articleUrl"
          placeholder="Article URL"
          formik={formik}
        />
        <FormInput
          name="articleNote"
          placeholder="Note"
          formik={formik}
          textarea={true}
        />
      </div>

      <div className="form-buttons">
        <button className="button" type="button" onClick={closeForm}>
          Cancel
        </button>
        <button className="button" type="submit">
          Add
        </button>
      </div>
    </StyledArticleForm>
  );
};
export default ArticleForm;
