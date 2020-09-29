## Edible.
[![Build Status](https://travis-ci.org/NakiNorton/Edible..svg?branch=master)](https://travis-ci.org/NakiNorton/Edible.)

### Overview
Edible. is a web application designed for plant lovers who want to start foraging for wild plants. The user is able to filter the plants being displayed by 'edible part' categories; roots, seeds, flowers, leaves, fruits, and also search for plants by common name or scientific name. The user can save plants to their Saved Plants page, and also remove plants from this page. 

This app was a solo project developed with an open API, Trefle.

### Technologies and Systems
- React 
- Redux
- React Router
- JSX
- SCSS
- Test driven development with:
    - React testing library
    - Redux mock store
    - Jest

### Setup
1. Clone down this repository to your local machine.
2. CD into this repo's directory.
3. Run npm install.
4. Open the project in your chosen code editor
5. Setup access to the API:
* The API is accessed using a key which you can get for free by signing up on their website https://trefle.io/. 
* Once you get your key, add a new root file to your cloned project called `.env`and assign your key to a variable named `REACT_APP_API_KEY`. 
* I.e. REACT_APP_API_KEY = YOUR-KEY-HERE. This will connect your key with the project.
6. Run npm start.
7. In your browser navigate to localhost:3000 (or whichever port is provided)

### Project in Action 

#### Homepage:
<img src ='readme-assets/homeview.gif' width=740>   


#### A user filter the displayed plants edible part category:
<img src ='readme-assets/filter2.gif' width=740>   


#### A user can save plants to their 'Saved Plants' page and remove saved plants:   
<img src ='readme-assets/save-unsave.gif' width=740>   



### This application was built by:  
Steph Norton: [GitHub](https://github.com/NakiNorton) | [LinkedIn](https://www.linkedin.com/in/stephanie-norton-12888453/) <br>
