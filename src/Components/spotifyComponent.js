import SpotifyWebApi from "spotify-web-api-node";

export default class SpotifyComponent {
  constructor(accessToken) {
    this.spotifyWebApi = new SpotifyWebApi()
    this.spotifyWebApi.setClientId(process.env.CLINET_ID)
    this.spotifyWebApi.setClientSecret(process.env.CLINET_SECRET)
    this.spotifyWebApi.setRedirectURI(process.env.REDIRECT_URI)
    this.spotifyWebApi.setAccessToken(accessToken)
  }

  async getUserProfile() {
    let result = await this.spotifyWebApi.getMe()
    if(result.statusCode == 200) {
        return {success: true, response : result.body}
    } else {
        return {success: true, error : result.body}
    }
  }
}
