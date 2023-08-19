import SpotifyWebApi from "spotify-web-api-node";

export default class authComponent {
  constructor() {
    this.spotifyWebApi = new SpotifyWebApi()
  }

  setEnvVariable()
  {
    this.spotifyWebApi.setClientId(process.env.CLINET_ID)
    this.spotifyWebApi.setClientSecret(process.env.CLINET_SECRET)
    this.spotifyWebApi.setRedirectURI(process.env.REDIRECT_URI)
  }

  getAuthUrl() {
    this.setEnvVariable()
    var scopes = process.env.SCOPES.split(',');
    var state = "some-state-of-my-choice"
    // Create the authorization URL
    return this.spotifyWebApi.createAuthorizeURL(scopes, state)
  }

  async processAuth(request, response) {
    let code = request.query.code
    let tokenData = await this.getRefreshTokenFromCode(code)
    if(tokenData.success) {
        request.access_token = tokenData.token_response.access_token
    } else {
        response.error(tokenData.token_response.error ?? 'token could not be generated', tokenData.token_response.error_description ?? {})
    }
  }

  async getRefreshTokenFromCode(code) {
    this.setEnvVariable()
    let tokenResponse = await this.spotifyWebApi.authorizationCodeGrant(code)
    if(tokenResponse.statusCode == 200) {
        return {success: true, token_response : tokenResponse.body}
    } else {
        return {success: false, token_response : tokenResponse.body}
    }
  }
}
