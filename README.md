# Engram

A personal tracking system for online learning materials

## Problem

- While learning to become a web developer, I had to absorb large amount of information in a relatively short period of time.
- There are some online documents and articles that I tend to revisit over time because 1. I forget 2. for deeper understanding.
- When I find some really good article, I bookmark it for later read, but when it's hidden inside bookmark folders, I don't even remember that I have them.
- I want to see all the things that I learned in one sight so hold onto the concepts and build mental map, but most of the existing solutions are not utilizing bigger screen to do that.

## Things I learned

### Keep any work that takes more time (computation, network request, etc...) higher in the tree

Components that are lower in the tree tend to get re-rendered more often than their ancestors and have more instances of the same component. Try to keep children as dumb as possible for better performance.

### Firebase is a state management tool

By updating state inside Firebase's value change listener, you're effectively synchronizing your app to the cloud database which works as the single source of truth.

- Added Redux then removed it because when you're working with firebase, almost all actions affecting global state will have side-effect (by mutating outside source - Firebase). Curious what would be the reason if someone's adding Redux into this equation.

### Update authorized domains after deployment

- Go to console > authentication > sign-in method > Authorized domains
- Add app domain to allow authenticating from your deployed app.

### Group validation with Yup and Formik

You can chain your yup instance with `when()` to add ternary operation to the validation.

```js
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
```

### Yup for generating multiple error message for different validation errors

```js
const validationSchema = yup.object().shape(
      {
        topicName: yup.string().required('Topic is required'),
        articleTitle: yup.string().required('Article name is required'),
        articleUrl: yup
          .string()
          .matches(
            // https://stackoverflow.com/a/3809435/13036807
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Not a valid URL'
          )
          .required('Article URL is required'),
      }
    ),
```

### Align Functionalities with App Identity

- What specific problem your app solve?
- Focus on what your app does to reinforce brand identity.
- eg. This is not a note-talking app like Evernote/ Notion. Require URL field.

## Reference

- [Authentication with Firebase in React - GitHub Repo](https://github.com/WebDevSimplified/React-Firebase-Auth)
- [Search-optimized SPAs with React Helmet](https://blog.logrocket.com/search-optimized-spas-react-helmet/)
- [Netlify renders 404 on page refresh (using React and react-router)](https://stackoverflow.com/questions/58065603/netlify-renders-404-on-page-refresh-using-react-and-react-router)
