Front end and back end originally built as part of John Smilga's MERN stack course on Udemy. Massively changed at this point as I have taken what we built in the course and essentially used it as a base for my own application. Added new models, controllers, and routes on the backend. Added new pages and components and completely gutted and repurposed routes, appContext, actions and reducer functionality.

I have added:

- email verification on registration
  - added logic if user has already verified
- forgot/reset password functionality
- refresh and access tokens
- refactored displayAlert to take arguments
- created html and text email messages for verification and reset password emails
- implemented sendgrid for emails in production env
- ensured test user can't change password
- used react-toastify for toast notifications to the user
- used @loadable/component for code splitting

To Do for current DriveL driver theory MCQ app:

- handle user navigating away from tests by using browser back/forward buttons or simply closing the browser mid test
- There is an issue with being logged into the app on multiple devices and attempting to create a new test on both of them. Possibly due to the deletion of abandoned tests upon creation of a new test.
- ModalAlert code duplication between ResultsSharedLayout and Test
- noticed an answer was incorrect in one of the questions - turn right instead of turn left. Note: when a question is edited (in the database currently only), the previous test results do not get updated. If we were to handle this (probably best to just double check before creation of the question), would push updates to previous test results for all users upon editing on the frontend

What we could do but won't:

- add swipe left and right for navigating test questions on mobile.
- add the remaining 830 questions from the original app
- add ability for admins to edit and delete questions
- add tool tips (using react-toastify perhaps) that inform the user how to use the app. Allow user to turn these off or disable them automatically.
- fix no error warning when user exceeds allowed number of logins (rate limit)
- Make it look better on bigger screens
- Rename all images so that we can manipulate the question image URL and use it for the alt text description
- fix all those useEffect missing dependency warnings with useCallback
