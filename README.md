# Project: openWeatherApi 

# Description
This project has been developed using Playwright, TypeScript and some ctrf reporting. All tests can be found in openweatherapi\tests\api.spec.ts. Within this file you will find 6 different tests. The parameterized test will do 4 tests and can fail depending on the city name + id combination. For some reason this keeps changing. Within the test file you can find the following tests:
- 1. Unsuccessful response - Validates a 401 (because no appId is provided)
- 2. Successful response Utrecht - Make a successfull api call and validates the city name Utrecht
- 3. Validate if it is raining in Utrecht - Simple if else statement test that validates if it is raining in Utrecht
- 4.1. Validate id Groningen - Validates the id of city Groningen (was made to validate the id before creating the parameterized test)
- 4.2. Parameterized test - A parameterized test that validates the id of 4 different cities (Amsterdam, Rotterdam, Den Haag, Groningen)
- 5. TV Maze API: Get Breaking Bad information and validate URL - Fetched the serie Breaking bad and validates the id

# Instructions
Now some instruction on how to set everthing up! In order to use this project you can clone the repositiory with the use of Git bash. 
- Use command: "git clone https://github.com/Moeljo/openweatherapi"
- When the project has been cloned you can open it with an editor such as Visual Studio Code
- The tests can be found here: "openweatherapi\tests\api.spec.ts."
- In order to run the test you will have to install playwright via the terminal of VSC. Check this screenshot, which I made to guide the installation:

<img width="442" alt="playwright instructions" src="https://github.com/user-attachments/assets/b70b8432-e2e9-471b-9810-535536ba6a96">

- You will also need to add the Appid to the "openweatherapi\.env" -> appID = '' that was provided within the assessment document. 
- When all this is done you can run the tests via the command(s)
- npx playwright test 
OR
- npx playwright test api.spec.ts

# Reporting 
I have build in ctrf reporting, which is generated when I push my code to Github. You can see some of those testruns via the tab (Github) Actions. Within those runs a test summary is given that shows which test have run and which ones have failed. The reason why my test are failing in those runs is due to the missing baseURL and appID, which are provide via "my .env" file. Since I orignally added that file within my ".gitignore" it was not pushed to Github. Without that file the test should fail. But to show an example it provides reporting like this: 

<img width="701" alt="ctrf reporting" src="https://github.com/user-attachments/assets/03295974-f5ee-4795-9b89-ff8a7478aa69">
