# METATALES

MetaTales is a blog website where users can see and read blogs of other users, & create and edit their own blogs. It also has signup and login functionality (via email & password) which is compulsory for user who wants to use this platform.

This website is my first ever Mega Project using React, which is being built as a Software-Solution, that actually solves a problem.

Thanks a lot to my mentor [Sir. Hitesh Choudhary](https://github.com/hiteshchoudhary) for guiding me throughout the project (idea to deployment), giving me assignments to strengthen my fundamentals, and helping me in solving my doubts.

## Tech Stack:
1. **Frontend:** ReactJS, Redux Toolkit, Tailwind CSS
2. **Backend:** Appwrite (No-Code Backend)
3. **External Libraries/APIs:** [TinyMCE (Rich Text Editor)](https://www.npmjs.com/package/@tinymce/tinymce-react), [HTML React Parser](https://www.npmjs.com/package/html-react-parser), [React Hook Form](https://react-hook-form.com/get-started)
4. **Deployment:** Vercel (Frontend), Appwrite Cloud (Backend)

## Learnings:
1. Appwrite services and SDK for backend functionalities like authentication, database management, and file (image) storage.
2. React Router DOM for routing and navigation in React applications by using `<Link/>` component and `useNavigate()` hook.
3. React Hook Form for form handling and validation in React by using `register`, `handleSubmit`, `Controller`, `watch()`, `setValue()`, `control`, and `getValues()` components/hooks. 
4. Redux Toolkit for state management in React applications by using `configureStore()`, `createSlice()`, `reducers()` and `react-redux` hooks like `useSelector()` and `useDispatch()`.
5. TinyMCE Rich Text Editor integration in React using "tinymce-react" package.
6. In RTK, there's a `current()` method which allows us to take a snapshot of the Proxy and turns it back into a plain JavaScript array/object. This wrapping of state into a Proxy (using `Immer`) is what enables the "mutating" syntax in reducers, while still maintaining immutability under the hood.
7. RTK treates every reducer as a standalone function, therefore `this` keyword cannot be used in reducer functions, as it doesn't refer to the `reducers` object itself. If inside a reducer, we want access to another reducer then the best way is to use a helper function like `addPostLogic()` which has access to both `state` and `action` (passed as arguments) to perform the required operations efficiently.
8. A reducer function shouldn't return any value, or at max can return `undefined`. If we return any value from a reducer function, then that value will be treated as the new state of the slice, which can lead to unexpected behavior and bugs in the application. Therefore, it's important to ensure that reducer functions do not return any value, and instead only modify the state directly, by using the `useDispatch()` hook.
9. For reading data from the state, we should be using `useSelector()` hook, instead of creating a reducer to read the data. And the callback inside `useSelector()` should be only used to return the actual state, and not returning any other non-primitive types of data, as it can lead to unnecessary re-renders and performance issues in the application. If we want to perform any operations on the state data before using it in the component, then we should do that inside the component itself, by using the data returned from `useSelector()`, instead of doing that inside the callback of `useSelector()`.
10. `useMemo()` hook is used to memoize (cache) the result of a function to avoid waste of resources upon every component render and improving performance by only re-rendering when there's change in the function argument or the data required to perform the operation successfully. Whereas, `useCallback()` hook is used to memoize a function definition itself, to prevent unnecessary re-creations of the function on every render, which can be useful when passing functions as props to child components, as this will avoid the child-component think that the prop has changed (even if the code inside function is exactly same), preventing unnecessary re-renders.