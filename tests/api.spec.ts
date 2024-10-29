import { test, expect } from '@playwright/test';

const API_KEY = '0fiuZFh4'

test.describe.parallel("Collection Retrieval", () => {
    test("Retrieve collection and check title ", async ({ request }) => {
        const response = await request.get(`?key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()//voorkomen dat aschryone proces door gaat
        expect(data.artObjects.length).toBeGreaterThan(0)
        expect(data.artObjects[0]).toHaveProperty('title')
    })
})

test.describe.parallel("Collection Detail Retrieval", () => {
    test("Retrieve Collection and check details", async ({ request }) => {
        const objectNumber = 'RP-P-OB-184' //Hier zit geen limiet op?
        const response = await request.get(`?objectNumber=${objectNumber}&key=${API_KEY}`)
        expect(response.status()).toBe(200)
        const data = await response.json()
        expect(data.artObjects[1]).toHaveProperty('title')
        expect(data.artObjects[0]).toHaveProperty('principalOrFirstMaker')
        expect(data.artObjects[0].principalOrFirstMaker).toBe('anoniem')//tobe Willem Claesz. Heda is veranderd?
    })
})