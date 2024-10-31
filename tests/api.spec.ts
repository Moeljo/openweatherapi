import { test, expect } from '@playwright/test';

const API_KEY = '0fiuZFh4'


test.describe.parallel("Successful response", () => {
    test("Validate response status 200", async ({ request }) => {
        const response = await request.get(`?key=${API_KEY}`)
        expect(response.status()).toBe(200)
    })
})

test.describe.parallel("Collection Retrieval", () => {
    test("Retrieve collection and check for title ", async ({ request }) => {
        const response = await request.get(`?key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data.artObjects.length).toBeGreaterThan(0)
        expect(data.artObjects[0]).toHaveProperty('title')
    })
})

test.describe.parallel("Collection Retrieval", () => {
    test("Retrieve collection and validate title ", async ({ request }) => {
        const response = await request.get(`?key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data.artObjects.length).toBeGreaterThan(0) 
        expect(data.artObjects[0]).toHaveProperty('title')
        expect(data.artObjects[0].title).toBe('Blauwe papegaai')
    })
})

test.describe.parallel("Collection Retrieval Details", () => {
    test("Retrieve collection and check objectnumber & longtitle", async ({ request }) => {
        const objectNumber = 'BK-17496'
        const response = await request.get(`?objectNumber=${objectNumber}&key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data.artObjects.length).toBeGreaterThan(0)
        expect(data.artObjects[0]).toHaveProperty('longTitle')
        expect(data.artObjects[0].longTitle).toBe('Blauwe papegaai, Meissener Porzellan Manufaktur, 1731')
    })
})

test.describe.parallel("Collection Retrieval Details", () => {
    test("Fail this test for reporting", async ({ request }) => {
        const objectNumber = 'SK-A-447' 
        const response = await request.get(`?objectNumber=${objectNumber}&key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data.artObjects[0]).toHaveProperty('title')
        expect(data.artObjects[0]).toHaveProperty('principalOrFirstMaker')
        expect(data.artObjects[0].principalOrFirstMaker).toBe('Meissener Porzellan Manufaktur') // Does not exist Meissener Porzellan Manufaktur
    })
})

test.describe.parallel("Collection Retrieval Details", () => {
    test("Retrieve Collection and check details", async ({ request }) => {
        const objectNumber = 'RP-P-OB-184' 
        const response = await request.get(`?objectNumber=${objectNumber}&key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data.artObjects[1]).toHaveProperty('title')
        expect(data.artObjects[0]).toHaveProperty('principalOrFirstMaker')
        expect(data.artObjects[0].principalOrFirstMaker).toBe('Meissener Porzellan Manufaktur')
    })
})