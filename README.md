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
- ~~logout button should be hidden when user moves mouse from it, navigates to a different tab, or clicks elsewhere in the application~~ DONE
- some issues with alert duration
- login, register, reset password, verify email can probably be a shared layout
- should probably move text and message from sendResetPasswordSG and sendEmailVerificationSG to separate file and import

To Do for current DriveL driver theory MCQ app:

- ~~add answer shuffling to each question on backend so that correct answer is not always the first answer displayed - do once at test creation~~ DONE
- ~~submitting an answer should update the Atlas database in addition to appContext.~~ ~~Have done this but issue with delay from server regarding styling of the selected answer.~~ DONE
- ~~display if the question is right or wrong upon answering.~~ DONE
- handle user navigating away from tests by using browser back/forward buttons or simply closing the browser mid test
- ~~when all questions in a test have been submitted, the test should be automatically submitted~~
- ~~when a test has been submitted, the user can review their results by category and question~~ DONE
- ~~when the user is reviewing their results by question (a list of the questions) - they can click on the question in the list and see the question as it appeared in the test with their answer~~ DONE
- ~~should not be possible to go to the next question until the current question has been answered, but user can go back and forth through answers already submitted~~ DONE
- ~~add functionality to 'results' button~~ DONE
- ~~add enough questions so that we can randomly select a proportionate amount from each category to create a 20 question test~~ DONE
- ~~for each user there can only be one Test document. If they exit a test early without completing it, any Test documents should be deleted. We'll have to handle the case where a user may log in from a PC start a test, and then later log in from a phone and start another test. The easiest way to handle this would be to check for an existing Test doc before creating our new Test and deleting existing Test docs.~~ Done - Not tested with multiple machines, but works when exiting a test early on the same machine.
- ~~allow user to flag questions~~ Done
- ~~CSS fixes needed: 'results' text for the results icon appears out of vertical alignment with text for other buttons~~ DONE
- CSS fixes needed: for questions with no image, the question text should span the entire width of the question container
- ~~CSS fixes needed: I used NavLinks for two of the buttons in the Results. The active class is not being applied correctly.~~ DONE
- ~~CSS fixes needed: the Categories page and the Test page both have vertical scrolling enabled even though the content is not overflowing. The QuestionList page is the only page that requires scrolling. Needs a fix.~~
- There is an issue with being logged into the app on multiple devices and attempting to create a new test on both of them. Possibly due to the deletion of abandoned tests upon creation of a new test.
- modal message needs to be defined when modal is called
