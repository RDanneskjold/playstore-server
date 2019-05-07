const app = require('../app')
const request = require('supertest')

const chai = require('chai')
const expect = chai.expect
chai.use(require("chai-sorted"));

describe('Express App', () => {
    describe('GET /apps endpoint', () => {

        it('should load and return an array', () => {
            return request(app)
                .get('/apps')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.lengthOf.at.least(1)
                })
            })
            
        it('should filter using the search term', () => {
            const expectedArray = [
                {
                    "App": "Plants vs. Zombies FREE",
                    "Category": "GAME",
                    "Rating": 4.4,
                    "Reviews": "4066989",
                    "Size": "69M",
                    "Installs": "100,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone 10+",
                    "Genres": "Strategy",
                    "Last Updated": "July 6, 2018",
                    "Current Ver": "2.2.00",
                    "Android Ver": "4.1 and up"
                },
                {
                    "App": "Zombie Hunter King",
                    "Category": "GAME",
                    "Rating": 4.3,
                    "Reviews": "10306",
                    "Size": "50M",
                    "Installs": "1,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Mature 17+",
                    "Genres": "Action",
                    "Last Updated": "August 1, 2018",
                    "Current Ver": "1.0.8",
                    "Android Ver": "2.3 and up"
                }
            ]
            
            return request(app)
                .get('/apps')
                .query({ search: 'zom' })
                .expect(200)
                .then(res => {
                    expect(res.body).to.eql(expectedArray)
                })
        })

        it('should return an error if genres is not valid', () => {
            return request(app)
                .get('/apps')
                .query({ genres: 'hello' })
                .expect(400, 'Sort must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
        })

        it('should return an array of apps sorted by a genres term', () => {
            const expectedArray = [
                {
                    "App": "Solitaire",
                    "Category": "GAME",
                    "Rating": 4.7,
                    "Reviews": "254258",
                    "Size": "23M",
                    "Installs": "10,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Card",
                    "Last Updated": "August 1, 2018",
                    "Current Ver": "2.137.0",
                    "Android Ver": "4.1 and up"
                }
            ]
            
            return request(app)
                .get('/apps')
                .query({ genres: 'Card' })
                .expect(200)
                .then(res => {
                    expect(res.body).to.eql(expectedArray)
                })
        })

        it('should should return an error if sort is not valid', () => {
            return request(app)
                .get('/apps')
                .query({ sort: 'stuff' })
                .expect(400, 'Sort must be one of Rating or App')
        })

        it('should return a sorted array if sort is Rating', () => {
            return request(app)
                .get('/apps')
                .query({ sort: 'Rating' })
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.sortedBy('Rating')
                })
        })

        it('should return a sorted array if sort is App and filtered by genre', () => {
            const expectedArray = [
                {
                    "App": "Helix Jump",
                    "Category": "GAME",
                    "Rating": 4.2,
                    "Reviews": "1497361",
                    "Size": "33M",
                    "Installs": "100,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Action",
                    "Last Updated": "April 9, 2018",
                    "Current Ver": "1.0.6",
                    "Android Ver": "4.1 and up"
                },
                {
                    "App": "Kick the Buddy",
                    "Category": "GAME",
                    "Rating": 4.3,
                    "Reviews": "1000417",
                    "Size": "Varies with device",
                    "Installs": "50,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Teen",
                    "Genres": "Action",
                    "Last Updated": "July 5, 2018",
                    "Current Ver": "Varies with device",
                    "Android Ver": "4.4 and up"
                },
                {
                    "App": "ROBLOX",
                    "Category": "GAME",
                    "Rating": 4.5,
                    "Reviews": "4447388",
                    "Size": "67M",
                    "Installs": "100,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone 10+",
                    "Genres": "Adventure;Action & Adventure",
                    "Last Updated": "July 31, 2018",
                    "Current Ver": "2.347.225742",
                    "Android Ver": "4.1 and up"
                },
                {
                    "App": "slither.io",
                    "Category": "GAME",
                    "Rating": 4.4,
                    "Reviews": "5234162",
                    "Size": "Varies with device",
                    "Installs": "100,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Action",
                    "Last Updated": "November 14, 2017",
                    "Current Ver": "Varies with device",
                    "Android Ver": "2.3 and up"
                },
                {
                    "App": "Temple Run 2",
                    "Category": "GAME",
                    "Rating": 4.3,
                    "Reviews": "8118609",
                    "Size": "62M",
                    "Installs": "500,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Action",
                    "Last Updated": "July 5, 2018",
                    "Current Ver": "1.49.1",
                    "Android Ver": "4.0 and up"
                },
                {
                    "App": "Zombie Hunter King",
                    "Category": "GAME",
                    "Rating": 4.3,
                    "Reviews": "10306",
                    "Size": "50M",
                    "Installs": "1,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Mature 17+",
                    "Genres": "Action",
                    "Last Updated": "August 1, 2018",
                    "Current Ver": "1.0.8",
                    "Android Ver": "2.3 and up"
                }
            ]
            
            return request(app)
                .get('/apps')
                .query({ sort: 'App', genres: 'Action' })
                .expect(200)
                .then(res => {
                    expect(res.body).to.eql(expectedArray)
                })
        })
    })
})
