# Engram

A personal tracking system for online learning materials

## Problem

- While learning to become a web developer, I had to absorb large amount of information in a relatively short period of time.
- There are some online documents and articles that I tend to revisit over time because 1. I forget 2. for deeper understanding.
- When I find some really good article, I bookmark it for later read, but when it's hidden inside bookmark folders, I don't even remember that I have them.
- I want to see all the things that I learned in one sight so hold onto the concepts and build mental map, but most of the existing solutions are not utilizing bigger screen to do that.

## Things I learned

### How to show preview image on twitter

- Add "summery_large_image" to twitter:card meta tag
- Check the image dimension from working site. This tends to be changed often.
- **IMPORTANT**: Use absolute path to your resource. For example, `https://engram.netlify.app/preview.png`.
- In general, OG is used as a fallback when twitter card is not available. Place twitter meta before OG.

```html
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta
    name="description"
    content="A personal tracking system for online learning resources"
  />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

  <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
  <title>Engram</title>

  <!-- Twitter cards-->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@sidhlee" />
  <meta name="twitter:title" content="Engram" />
  <meta
    name="twitter:description"
    content="Personal tracking system for online learning resources"
  />
  <meta name="twitter:image" content="https://engram.netlify.app/preview.png" />
  <!-- Open Graph-->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://engram.netlify.app" />
  <meta property="og:title" content="Engram" />
  <meta name="image" property="og:image" content="%PUBLIC_URL%/preview.png" />
  <meta
    property="og:description"
    content="Personal tracking system for online learning resources"
  />
  <meta property="og:site_name" content="Engram" />
  <meta name="author" content="Sid Hayoun Lee" />
  <!-- Next tags are optional but recommended -->
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
</head>
```

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
- [Twitter card [summary_large_image] not displaying image](https://webmasters.stackexchange.com/a/77547)
