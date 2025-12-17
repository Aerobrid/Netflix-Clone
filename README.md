## Website Link
[Deployed using Render](https://netflix-clone-olcs.onrender.com) 

## Updates

- Deployed Docker image to AWS Elastic Container Registry
- Created an AWS Elastic Compute Cloud (EC2) instance to pull the ECR Docker image 
- Deployed app using NGINX reverse proxy with valid domain name and SSL certification through certbot
- Updated React dependencies according to CVE-2025-55182 security vulnerability
- Added head endpoint to ping website via UptimeRobot. 
- Added GET endpoint to ping for MongoDB cluster via Cronitor. This makes it so that the link above is hopefully running 24/7. Note that this is a demo and service may be **unavailable at times**. 

## How to run when cloning 
If you instead download project as zip: <br />

- (Optional) Run this in the main folder and then go into the frontend folder to run **npm install** again to get proper dependencies:
    ```
    npm install
    ```
- To prepare for deployment 
    ```
    npm run build
    ```
- Start Application
    ```
    npm run start
    ```