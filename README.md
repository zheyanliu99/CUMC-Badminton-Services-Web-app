# CUMC-Badminton-Services-Web-app
web application for CUMC Badminton Services

# notifications 

* Save environment variables such as api path in [environment.ts](CUMC-Badminton-Service/src/environments/) in development mode and [environment.prod.ts](CUMC-Badminton-Service/src/environments/) in production mode.
* To use session, refter to sessionStorage method in [app.component.ts](CUMC-Badminton-Service/src/app/app.component.ts) and also in login and registration component. userId is saved to session after login. 
* Edit nav bar in app-nav-bar component. Main page in index component.

# AWS Cloudfront and S3 Buckets Deployment
### Step 1: build your web app locally
Go to the CUMC-Badminton-Service directory, build the application with `ng build` in your terminal.
A directory named "dist" will be build.
Go to `dist/cumc-badminton-service` directory in your computer. Copy all the files.

### Step 2: AWS S3 bucket update
Login to the AWS, go to the "S3" service and go into the project page.
Click "upload" button, in the following page, drag or paste all the files in step 1 to the portal.
upload.
Done.

* No need to change the cloudfront service. Will deploy automatically.

