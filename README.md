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
- ~~\*\* we will need permissions - the 'add question' page should only be accessible to admins~~ DONE
- ~~server should only allow admins to add questions~~ DONE
- create code to generate different types of test. A practice test consists of 20 questions, a mock theory test consists of 40 questions.
- \*\* work on the charting/stats functionality
- ~~\*\* must set up a test user so people can demo the app without signing up, Test user is an admin. Will not be able to add questions, Will not be able to update profile. Will be able to take tests and view results.~~
- ~~in my haste to get the app working, I failed to implement createUserQuestionData properly. There is a route and controller on the backend, but there is no request from the frontend. Therefore, at the moment I can only do this by making a request from Postman for a particular user. This means that newly registered users can't create tests! Fix ASAP.~~ DONE
- ~~setup autocomplete for password (suggest for registration, fill for login)~~
- will have to add a completion date to each Test document, the
- since previous Tests are browseable and we will display whether each question is flagged or not, we will have to update the isFlagged status of each question in a Test document. This will modify the updatedAt date for the Test. This is why we need to add a completion date for the test. Probably the best time to update the isFlagged status for an old Test document is when the user requests to view/browse the Test.
