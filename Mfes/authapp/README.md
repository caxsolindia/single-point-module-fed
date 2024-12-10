# Auth-App    

### description

## Pages

- Login Page
- SSO Page
- Dashboard Page

# Login Page

- App running on Localhost:8082 for now email id and password , Sign In Button is disabled
- On starting Auth App user get Login Page
- after that User click on Microsoft SSO Button which is Present bottom Page

# SSO Page

- After clicking on SSO Microsoft Button then SSO Component render
- in that component we extract dynamic URL and store it into browser SESSION
- stored access token in Browser Session dynamically

# Dashboard Page

- after all process finish and user not getting error then we navigate user to dashboard page

# Error

- if access token is null or empty then Error pop up will display and user redirect Login Page

## MFE App Tech Desc

- Test Cases added
- App Name - authApp
- Code formation tools added
- App running on Local 8082 Portal
- Remote configure added in this MFE App
