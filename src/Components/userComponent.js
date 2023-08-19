import SpotifyComponent from "./spotifyComponent.js"
import userModel from '../Models/userModel.js'

export default class UserComponent {
    constructor () {
        
    }

    async commenceAuth(request, response) {
        let token = request.access_token
        this.spotifyService = new SpotifyComponent(token)
        let result = await this.spotifyService.getUserProfile(null, token)
        if(result.success) {
            var user_id = result.response.id
            // check user exists already registered
            var user = null
            var user = await userModel.findByUserId(user_id)
            if(!user) {
                await userModel.addNewUser(result.response)
            }
            response.redirect(`/dashboard/${user_id}`)
        } else {
            response.error(result.error)
        }
    }
}