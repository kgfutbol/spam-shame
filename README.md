# Spam Shame

### Description
Spam Shame is a Chrome extension that helps protect yourself and other users from websites that sell your personal
information resulting in you receiving spam emails.
Gmail emails come with a unique feature that is the center of our application. Periods in the middle of the email
are ignored when sending to the user. For example, the following emails all send to the same inbox.
`example@gmail.com`
`e.xample@gmail.com`
`e.x.a.m.p.l.e@gmail.com`
Using this we can detect if you are receiving spam emails from a source that should not have your email.
This extension gives you the ability to report these spam emails which adds them to a database of companies that
sell emails. If you try signing up with a company that sells emails you will be warned.

### Technologies
Chrome version 87.0.4280.88
MongoDB version 4.4.2
Node version 14.15.1

### Setup
Clone the repository found at https://github.com/kgfutbol/spam-shame
Create a database called spam_shame with a collection called reports through MongoDB
Run `npm install` to install all Node.js dependencies
Click `Load Unpacked` within the Chrome Extensions Manager
Select the `Spam Shame` file to add the extension to Chrome
Within the Chrome Extensions drop down menu, select `Spam Shame` (you can also pin it to your Chrome bar!)
Enter your Gmail into the popup and click `SUBMIT`

### Usage
When signing up for an email, use the right-click context menu on email boxes and select `InsertEmail`
Click the `LINKED "DOT EMAILS"` button in the popup to view sites you've signed up for.
Within your gmail account, report emails that are flagged as being spam
This adds the original site you signed up with to our database of sites that sell emails to third parties

### Uninstall
Uninstalling is easy. Navigate to the Chrome Extensions Manager, and click the `Remove` button under Spam Shame.
