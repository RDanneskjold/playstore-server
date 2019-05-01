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
                    "App": "Bubble Shooter",
                    "Category": "GAME",
                    "Rating": 4.5,
                    "Reviews": "148897",
                    "Size": "46M",
                    "Installs": "10,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Casual",
                    "Last Updated": "July 17, 2018",
                    "Current Ver": "1.20.1",
                    "Android Ver": "4.0.3 and up"
                },
                {
                    "App": "Candy Crush Saga",
                    "Category": "GAME",
                    "Rating": 4.4,
                    "Reviews": "22426677",
                    "Size": "74M",
                    "Installs": "500,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Casual",
                    "Last Updated": "July 5, 2018",
                    "Current Ver": "1.129.0.2",
                    "Android Ver": "4.1 and up"
                },
                {
                    "App": "Candy Crush Soda Saga",
                    "Category": "GAME",
                    "Rating": 4.4,
                    "Reviews": "6198563",
                    "Size": "67M",
                    "Installs": "100,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Casual",
                    "Last Updated": "July 10, 2018",
                    "Current Ver": "1.118.4",
                    "Android Ver": "4.1 and up"
                },
                {
                    "App": "Hello Kitty Nail Salon",
                    "Category": "GAME",
                    "Rating": 4.2,
                    "Reviews": "369203",
                    "Size": "24M",
                    "Installs": "50,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Casual;Pretend Play",
                    "Last Updated": "April 17, 2018",
                    "Current Ver": "1.5",
                    "Android Ver": "4.1 and up"
                },
                {
                    "App": "Pou",
                    "Category": "GAME",
                    "Rating": 4.3,
                    "Reviews": "10485308",
                    "Size": "24M",
                    "Installs": "500,000,000+",
                    "Type": "Free",
                    "Price": "0",
                    "Content Rating": "Everyone",
                    "Genres": "Casual",
                    "Last Updated": "May 25, 2018",
                    "Current Ver": "1.4.77",
                    "Android Ver": "4.0 and up"
                }
            ]
            
            return request(app)
                .get('/apps')
                .query({ sort: 'App', genres: 'Casual' })
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.sortedBy('App')
                    expect(res.body).to.eql(expectedArray)
                })
        })

        it.skip('should load and return an array', () => {
            return request(app)
                .get('/apps')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.lengthOf.at.least(1)
                })
        })
    })
})
