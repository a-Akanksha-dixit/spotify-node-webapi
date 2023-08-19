import { response } from "express"
import authComponent from "../Components/authComponent.js"

export default class authController {
    constructor() {
        this.helper = new authComponent()
    }

    login = async (request, response) => {
        let authUrl = await this.helper.getAuthUrl()
        response.success(authUrl)
    }

    processAuth = async (request, response, next) => {
        await this.helper.processAuth(request, response)
        next()
    }
}