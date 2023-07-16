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
- \*\* ~~work on the charting/stats functionality~~ DONE
- add other types of tests, eg mock test of 40 questions
- graphs look okay but still need some attention in terms of styling
- handle filtering to show different graphs (practice, mock, category)
- ~~Read questions functionality~~ DONE
- practice by category functionality
- ~~deploy to paid render instance~~ DONE
- ~~toggle flagged status while reading questions~~ DONE
- ~~modal alert message when exiting reading questions~~ DONE
- ~~Fix: when there are few questions in a test, the question list displays them too far apart (probably space-evenly is set)~~ DONE
