Frontend and backend originally built as part of John Smilga's MERN stack course on Udemy. Massively changed at this point as I have taken what we built in the course and essentially used it as a base for my own application. Added new models, controllers, and routes on the backend. Added new pages and components and completely gutted and repurposed routes, appContext, actions and reducer functionality.

I have added:

- email verification on registration
  - added logic if user has already verified
- forgot/reset password functionality
- refresh and access tokens
- refactored displayAlert to take arguments
- created html and text email messages for verification and reset password emails
- implemented sendgrid for emails in production env
- ensured test user can't change password

To Do (from original Jobify MERN project):

- implement password strength checker for registration and reset password
- app should fail gracefully on econnrefused, i.e. navigate to landing
- user 'name' should be capitalized for emails, store as title case?
- some issues with alert duration
- login, register, reset password, verify email can probably be a shared layout
- should probably move text and message from sendResetPasswordSG and sendEmailVerificationSG to separate file and import

To Do for current DriveL driver theory MCQ app:
\*\* indicates must be done before hosting site or pushing it to Portfolio

- handle user navigating away from tests by using browser back/forward buttons or simply closing the browser mid test
- There is an issue with being logged into the app on multiple devices and attempting to create a new test on both of them. Possibly due to the deletion of abandoned tests upon creation of a new test.
- ModalAlert code duplication between ResultsSharedLayout and Test
- graphs look okay but still need some attention in terms of styling
- handle filtering to show different graphs (practice, mock, category)
- ~~need to reset currentQuestion integer in global state when the user reads questions~~ DONE
- ~~add loading spinner for CategoryPractice - when we select category, we are fetching and rendering based on the result~~ DONE
- noticed an answer was incorrect in one of the questions - turn right instead of turn left. Note: when a question is edited (in the database currently only), the previous test results do not get updated. If we were to handle this (probably best to just double check before creation of the question), would push updates to previous test results for all users upon editing on the frontend
- ChooseNumQuestionsStartTest is rendering before data is present
- if the timer runs out before the user answers any questions, there is a null pointer error (reading 'correct' in Categories). Could be userAnswer is null?
- 'Least seen' test. When selecting the number of questions, the slider shows 36, but only 30 questions are returned. Adjusting the slider below 36 and back to 36 still returns only 30 questions.
- the 'results' button is showing up when browsing previous results
- when browsing the questions in the results page, the user can't browse forward where the timer has run out and some or all answers have no answer submitted
