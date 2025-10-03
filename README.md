## Website Link
[Deployed using Render](https://netflix-clone-olcs.onrender.com)  (May take a minute to load since I used free subscription)

## Updates
Added a `/ping-db` endpoint that keeps the free MongoDB Atlas cluster awake by responding to periodic HTTP requests (e.g., via UptimeRobot ~5 min) to prevent auto-pausing. This makes it so that the link above is hopefully running 24/7. Contact me if you are having issues with connecting.

## How to run when cloning (faster option)
If you instead download project as zip: <br />

* (Optional) Run this in the main folder and then go into the frontend folder to run **npm install** again to get proper dependencies:
    ```
    npm install
    ```
* To prepare for deployment 
    ```
    npm run build
    ```
* Start Application
    ```
    npm run start
    ```



