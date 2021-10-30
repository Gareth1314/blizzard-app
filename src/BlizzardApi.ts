import { BlizzAPI } from 'blizzapi'

var apiUrl = "https://us.api.blizzard.com"
var blizzardAuthUrl = "https://us.battle.net/oauth/token"
var namespace = "dynamic-us"
var clientId = "1623fbb526924943b96ecd8eebaa3a28"
var clientSecret = "o709bPif9Oa6sTggBpAsdwBF9WqUFfeo"
var barthilasRealmId = 3723

export type Auction = {
    id: number
}

export type AuctionApiResponse = {
    auctions: Auction[]
}

export type ClientCredentials = {
    clientId: string
    secret: string
}

export type BearerResponse = {
    access_token: string
}

export async function getBlizzardAuthToken(clientId: string, clientSecret: string): Promise<BearerResponse> {
    let formData = new FormData();
    formData.append('grant_type', 'client_credentials');
    
    var response = await fetch(blizzardAuthUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa('1623fbb526924943b96ecd8eebaa3a28:o709bPif9Oa6sTggBpAsdwBF9WqUFfeo')
        },
        body: 'grant_type=client_credentials'
    })
    return response.json()
}

export async function getAuctions(clientId: string, clientSecret: string): Promise<AuctionApiResponse> {
    var tokenResult = await getBlizzardAuthToken(clientId, clientSecret)
    var bearerToken = tokenResult.access_token

    var response = await fetch(apiUrl + `/data/wow/connected-realm/3723/auctions?namespace=${namespace}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${bearerToken}`
        }
    })

    return response.json()
}