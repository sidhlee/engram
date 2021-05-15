import { useFormik } from 'formik';
import * as yup from 'yup';

export default function useArticleFormik() {
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
      formik.resetForm();
    },
  });
  return formik;
}
