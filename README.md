# Welcome to Alfonso ☁ v1.0.0

Alfonso is a modern weather app that gives daily, up-to-date information about your current location.

    🌟Get live weather updates for your current location (only with your permission)

    🌟Will it rain this week? Alfono's 5 days summary can tell you just that!

    🕵 Into the details? Alfonos got you covered. Click on any day card and Alfonso will give you a detailed hourly forecast

## 🏃‍♀️Running Alfonso

You need to take a few steps in order to run Alfonso currectly:

1. Download [VS Code](https://code.visualstudio.com/download), and make sure to install the [live server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Open VS Code and open a new terminal (using `cntrl`+`,` or `⌘`+`,`)
3. Using the teminal, clone this repo using the `code` button (you should be on branch `main`)
4. <details>
       <summary>Setup your API key
       </summary>
       
        1. Navigate to [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and sign up for an account 
      
          *if you don't accept the terms of OpenWeatherMap you won't be able to use Alfonso*
      
      2. Go to my API keys where you can generate your keys
      3. Generate a new API Key (you can name it whatever you want) & copy the API key (you can also use the default API key present in your API Keys
      4. create a new JavaScript file called `secrets.js` in the API directory `(repo\scripts\api)` and open it using VS Code
      5. type the following inside secrets.js : 
       ` export const __APPID = <<"Your_API_Key">>;`
    
        Example: `export const __APPID = "5a88867e81db6e0685c26364c8c702e1";`
        
       >  ℹ **Don't forget to save the file!**
   </details>

5. enable the live server plugin and click on go live (you can find it in the status bar at the bottom of VS Code)
6. if your broweser does not open automagically, you can navigate to `http://localhost:<port-name>/` where port-name will be displayed wherever you clicked on the live server button

   Example: `http://localhost:5500`

7. once prompted, allow Alfonso to access your location

_this information is needed to deliver accurate weather data; no other information is collected or sent to any 3-rd parties_

8. 🥳 Now you can enjoy using Alfonso, Hurray!

8.5 😁 Enthusiasts & Developers: checkout the browser's console for more a more info

## 💁‍♂️ more information on Alfonso

✉ Currently, Alfonso only supports English but it was built to support both LTR and RTL languages in a future release. Also, the current HTML elements and ARIA-labels are sufficient enough and we're eager for your feedback (remember that this is a beta release and some stuff will surely be changed in the final release)

📩 I chose OpenWeatherMap API because I was not able to get access to proper APIs with methods that fullfill original goals of Alfonso. You will notice that each hourly forecast will be seperated by 3 hours interval instead of one (this is available in the API but behind a paywall).

😙 Some aspects of Alfonso could be even more optimized but the API paywall prevents access to proper API methods
