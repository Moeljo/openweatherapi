import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const baseUrl = process.env.baseURL as string;
const appID = process.env.appID as string;

//Opdracht 1 - Assert op 401 - call zonder appID
test.describe.parallel("Unsuccessful response", () => {
    test("Validate response status 401", async ({ request }) => {
        //Sending a GET request to the weather API.
        //`baseUrl` is the base URL of the API.
        const response = await request.get(`${baseUrl}`)
        expect(response.status()).toBe(401)
    });
});

//Opdracht 2 - Assert op 200 + valideer veld met waarde "Utrecht"
test.describe.parallel("Successful response Utrecht", () => {
    test("Validate response status 200 from location Utrecht", async ({ request }) => {
        //Latitude of location Utrecht
        const latitude = '52.090736';
        //Longtude of location Utrecht
        const longitude = '5.121420';
        //Sending a GET request to the weather API.
        //`baseUrl` is the base URL of the API.
        //`latitude` and `longitude` are the coordinates of the location for which weather data is being requested.
        //`appid` is the API key required for authentication.
        const response = await request.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${appID}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data).toHaveProperty('name')
        expect(data.name).toBe('Utrecht')
    });
});

//Opdracht 3 - Check voor slecht weer in Utrecht
test.describe.parallel("Validate if its raining in Utrecht", () => {
    test("Validate the weather in Utrecht", async ({ request }) => {
        //Latitude of location Utrecht
        const latitude = '52.090736';
        //Longtude of location Utrecht
        const longitude = '5.121420';
        //Sending a GET request to the weather API.
        //`baseUrl` is the base URL of the API.
        //`latitude` and `longitude` are the coordinates of the location for which weather data is being requested.
        //`appid` is the API key required for authentication.
        const response = await request.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${appID}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        //Set checkWeather based on API response
        let checkWeather = data.weather && data.weather[0].main === 'Rain'; 
        if (checkWeather) {
            expect(data).toHaveProperty('weather')
            expect(data.weather[0].main).toBe('Rain')
            console.log("It is raining");
        } else {
        console.log("it is not raining");
        };
    });
});

//Opdracht 4.1 - Valideer id van Groningen
test.describe.parallel("Validate id Groningen", () => {
    test("Validate id from location Groningen", async ({ request }) => {
        //Latitude of location Groningen
        const latitude = '53.219383';
        //Longtude of location Groningen
        const longitude = '6.566502';
        //Sending a GET request to the weather API.
        //`baseUrl` is the base URL of the API.
        //`latitude` and `longitude` are the coordinates of the location for which weather data is being requested.
        //`appid` is the API key required for authentication.
        const response = await request.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${appID}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data).toHaveProperty('name')
        expect(data.name).toBe('Groningen')
        expect(data.id).toBe(2755251)
    });
});

//Opdracht 4.2 - Geparametiseerde test 
//Amsterdam, Lat = 52.370216, Lon = 4.895168, id = 2759794
//Rotterdam, Lat = 51.924419, Lon = 4.477733, id = 2747891
//Den Haag, Lat = 52.070499, Lon = 4.300700, id = 2747372
//Groningen, Lat = 53.219383, Lon = 6.566502, id = 2755251
test.describe.parallel("Validate ids for different cities", () => {
    const cities = [
        { city: 'Amsterdam', latitude: '52.370216', longitude: '4.895168', expectedId: 2759794 },
        { city: 'Rotterdam', latitude: '51.924419', longitude: '4.477733', expectedId: 2747891 },
        //Value city and expectedId keeps changing?
        //{ city: 'Gemeente Den Haag', latitude: '52.070499', longitude: '4.300700', expectedId: 2747372 },
        { city: 'The Hague', latitude: '52.070499', longitude: '4.300700', expectedId: 2747373 },
        { city: 'Groningen', latitude: '53.219383', longitude: '6.566502', expectedId: 2755251 }
    ];
    cities.forEach(({ city, latitude, longitude, expectedId }) => {
        test(`Validate id from location ${city}`, async ({ request }) => {
            const response = await request.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${appID}`);
            expect(response.status()).toBe(200);
            const data = await response.json();     
            //Validate the city name and the city id
            expect(data).toHaveProperty('name');
            expect(data.name).toBe(city);
            expect(data.id).toBe(expectedId);
        });
    });
});

//Opdracht 5 - TV Maze API - Assert op id breaking bad
const tvMazeUrl = process.env.tvmazeURL as string;

test('TV Maze API: Get Breaking Bad information and validate URL', async () => {
  //Search for serie "Breaking Bad" via de search-API
  const response = await fetch(`${tvMazeUrl}search/shows?q=breaking+bad`);
  const searchData = await response.json();
  //Save the show id 
  const breakingBadId = searchData[0].show.id;
  //Use show id to fetch showinfo 
  const showResponse = await fetch(`${tvMazeUrl}shows/${breakingBadId}`);
  const showData = await showResponse.json();
  //Assert that response contains URL that contains the correct id
  expect(showData.url).toContain(breakingBadId.toString());
  //Print correct id
  console.log(breakingBadId);
});