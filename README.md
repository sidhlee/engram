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

### Use React-Helmet-Async (and don't forget HelmetProvider)

Using react-helmet throws the following warning:

```text
index.js:1 Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: SideEffect(NullComponent)
```

### Firebase is a state management tool

By updating state inside Firebase's value change listener, you're effectively synchronizing your app to the cloud database which works as the single source of truth.

- Added Redux then removed it because when you're working with firebase, almost all actions affecting global state will have side-effect (by mutating outside source - Firebase). Curious what would be the reason if someone's adding Redux into this equation.
- However, there are still some app-level state that you wouldn't put it in firebase e.g. routing and UI state

### Context killed Redux

Yes. Those job postings require Redux is for maintaining legacy codebase. You can have a one big context with multiple reducers, but before you create a "store" context and throw everything inside, read [this](https://www.reddit.com/r/reactjs/comments/abmr2d/single_context_vs_multiple_contexts/) thread on reddit.

> assuming you have control over the contexts you create, which is better - creating a new provider/consumer for every small piece of data OR creating a single context for all of them?
>
> gaearon·2y React core team
> If these pieces of data usually change together then one context is fine. If they change independently then multiple might work better for you.

If your context has many related state, you can use `useReducer`. You can create one reducer function that uses `switch` statement to filter different actions and return updated state(context value).

You can also create your helper function to combine multiple reducers a la Redux.
The following code example is from [SO](https://stackoverflow.com/questions/59200785/react-usereducer-how-to-combine-multiple-reducers).

```js
const StoreContext = React.createContext();
const initialState = { a: 1, b: 1 };

// omit distinct action types for brevity
const plusOneReducer = (state, _action) => state + 1;
const timesTwoReducer = (state, _action) => state * 2;
const rootReducer = combineReducers({
  a: reduceReducers(plusOneReducer, plusOneReducer), // aNew = aOld + 1 + 1
  b: reduceReducers(timesTwoReducer, plusOneReducer), // bNew = bOld * 2 + 1
});

const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);
  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider>
  );
};

const Comp = () => {
  const [globalState, globalDispatch] = React.useContext(StoreContext);
  return (
    <div>
      <p>
        a: {globalState.a}, b: {globalState.b}
      </p>
      <button onClick={globalDispatch}>Click me</button>
    </div>
  );
};

const App = () => (
  <StoreProvider>
    {' '}
    <Comp />{' '}
  </StoreProvider>
);
ReactDOM.render(<App />, document.getElementById('root'));

//
// helpers
//

function combineReducers(slices) {
  return (state, action) =>
    Object.keys(slices).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: slices[prop](acc[prop], action),
      }),
      state
    );
}

function reduceReducers(...reducers) {
  return (state, action) =>
    reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);
}
```

Or use can use [react-combine-reducers](https://www.npmjs.com/package/react-co) to simplify everything.

```ts
import { useReducer } from 'react';
import combineReducers from 'react-combine-reducers';

type Identity = {
  name: string;
};

type Location = {
  country: string;
  city: string;
};

type ProfileState = {
  identity: Identity;
  location: Location;
};

type Action = {
  type: string;
  payload: any;
};

type ProfileReducer = (state: ProfileState, action: Action) => ProfileState;

const initialIdentity: Identity = {
  name: 'Harry',
};

const initialLocation: Location = {
  country: 'UK',
  city: 'London',
};

const identityReducer = (state: Identity, action: Action) => {
  switch (action.type) {
    case 'ACTION_A':
      return { ...state, name: 'Puli' };
    default:
      return state;
  }
};

const locationReducer = (state: Location, action: Action) => {
  switch (action.type) {
    case 'ACTION_B':
      return { ...state, city: 'Manchester' };
    default:
      return state;
  }
};

const [profileReducer, initialProfile] = combineReducers<ProfileReducer>({
  identity: [identityReducer, initialIdentity],
  location: [locationReducer, initialLocation],
});

const [state, dispatch] = useReducer<ProfileReducer>(
  profileReducer,
  initialProfile
);

console.log(state);
// Outputs the following state:
// {
//   identity: {
//     name: "Harry"
//   },
//   location: {
//     country: "UK",
//     city: "London"
//   }
// }
```

### Global Error Handling with React

You can create errorContext or one big chunk of context on top that keeps all the state. Whether you want to split certain state into separate context depends on how the state is being used:

- Is it only used in certain part of your app?
- Is it used in almost everywhere?

### Update authorized domains after deployment

You need to register your domain at Firebase after deploying your project. Otherwise, the authentication will not work from your live site (localhost is registered by default at Firebase console.)

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

## Project Pseudo Code

```js
/*************************
 * DB Schema
 *************************/

// [NESTED]
// userKey: {
//   topic0: {
//     topic: "JavaScript",
//     articles: {
//      article0: {
//        title: "Learn firebase",
//        href: "https://djcnjdnds.cosd",
//        note: "lorem ipsum...",
//        stars: 4,
//        read: 0,
//        deleted: false
//      },
//      article1: { ... },
//      ...}
//      },
//      topic1: { ... }
// }
// pros: easier to pass chunk of data to Topic component
// cons: more headache updating state, db tree gets more complicated

// VS

// [FLATTENED]
// userKey: {
//   articleKey: {
//     topicKey: topicKey,
//     topic: "JavaScript"
//     title: "Learn firebase",
//     href: "https://djcnjdnds.cosd",
//     note: "lorem ipsum...",
//     stars: 4,
//     read: 0,
//     deleted: false
//   },
// }
// pros: easier when updating state, db tree looks cleaner, easier to move article to different topic
// cons: need to group articles by topic then pass them down to Topic component, ds not matching component structure

// [Advice from Ana] Think about which entity has more focus in your app. Is it article or user?
// This will help decide the structure of data
// => This app's main focus is to help user manage their personal list of items

/*************************
 * AUTH
 *************************/

// https://github.com/firebase/firebaseui-web
// https://firebase.google.com/docs/auth/web/google-signin
// https://firebase.google.com/docs/auth/web/firebaseui
// https://www.youtube.com/watch?v=PKwu15ldZ7k
// https://stackoverflow.com/questions/49838273/react-setting-up-firebase-auth-with-firebase-ui

// Add firebase
// Enable Google sign-in from firebase console

// Use FirebaseUI Auth (a drop-in UI Lib) to handle sign-in flow
// setup FirebaseUI config
// Init FirebaseUI widget
// render the FirebaseUI Auth interface
// Handle errors
// Redirect user on success to main page
// Get user photo and render it to navbar
// Get user data and render items on page
// A new user account is created and linked to the credentials in firebase db
// Firebase takes care of user logged-in state and will also to token authentication on reload.

// [Advice from Ana] For front-end positions, you should minimize the steps to test-drive your app.
// Having to login and seeing the empty screen on which you have to populate the data yourself is
// NOT a great experience.
// Instead, focusing on creating great UI and impressing non-technical user (e.g. with animation and quality design)
// will give you more change to get hired.
// IF you really want to add auth page, then start with adding "Try as Guest" button that lead the user to the
// main page with pre-populated data. When MVP is finished, then you can add real authentication.

/*************************
 * <App />
 *************************/

// Check auth on mount

// <Switch /> from 'react-router-dom'
// If the user is logged in, Route path="/"
// else Route path="auth"

// Get user data once user is authenticated
// - use user key to fetch Engram data
// We're keeping nested state on top level, so useReducer / redux might be the right tool...
// const initialState = engramData
// [state, dispatch] = useReducer(reducer, initialState)
// actions: ADD_TOPIC, REMOVE_TOPIC, ADD_ARTICLE, REMOVE_ARTICLE, UPDATE_STAR, INCREMENT_READ, DECREMENT_READ, UPDATE_NOTE
// TODO: can(should) I use Immer / Redux?

// transform Engram to render:
// list of <Topic />
// inside each Topic, render:
// list of <Article />

// handlers to pass down:
// addTopic, removeTopic, addArticle, removeArticle, updateStar, incrementRead, decrementRead, updateNote

// TODO
// // 2. Should I use React.memo to memoize <Topic /> and <Article /> and only re-render on props change ?
// => will lead to using React.memo on all child components under <App/>
// but I think keeping the state in top level is cleaner way. keeping own state inside children and updating selectively might get messy...
// https://reactjs.org/docs/react-api.html#reactmemo

/*************************
 * <Topic />
 *************************/

// { articles, addArticle, removeArticle } = props
// On "Add" button click, Topic opens up a form to enter title, href, note, stars.
// Push article to topic on form submit.
// On "Delete" button click, show confirm modal to delete / cancel => delete all articles within that topic

/*************************
 * <Article />
 *************************/

// { title, href, note, start, read, updateStar, incrementRead, decrementRead, updateNote, removeArticle } = props
// Update star on star button click
// Increment read on read button click
// Decrement read on unread button click
// Display form and update note on note button click
// Show confirm modal on delete button click to delete / cancel
// Open preview modal on preview button click (Stretch Goal)
```

## Reference

- [Authentication with Firebase in React - GitHub Repo](https://github.com/WebDevSimplified/React-Firebase-Auth)
- [Search-optimized SPAs with React Helmet](https://blog.logrocket.com/search-optimized-spas-react-helmet/)
- [Netlify renders 404 on page refresh (using React and react-router)](https://stackoverflow.com/questions/58065603/netlify-renders-404-on-page-refresh-using-react-and-react-router)
- [Twitter card [summary_large_image] not displaying image](https://webmasters.stackexchange.com/a/77547)
