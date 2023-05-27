Frontend and backend built as part of John Smilga's MERN stack course on Udemy.

I have added:

- email verification on registration
  - added logic if user has already verified
- forgot/reset password functionality
- refresh and access tokens
- refactored displayAlert to take arguments
- created html and text email messages for verification and reset password emails
- implemented sendgrid for emails in production env
- ensured test user can't change password

To Do:

- implement password strength checker for registration and reset password
- app should fail gracefully on econnrefused, i.e. navigate to landing
- user 'name' should be capitalized for emails, store as title case?
- logout button should be hidden when user moves mouse from it, navigates to a different tab, or clicks elsewhere in the application
- some issues with alert duration
- login, register, reset password, verify email can probably be a shared layout
- should probably move text and message from sendResetPasswordSG and sendEmailVerificationSG to separate file and import
