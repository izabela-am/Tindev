const Dev = require("../models/Dev")

module.exports = {
    async store(req, res) {
        const {devId} = req.params
        const {user} = req.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        // if targeted dev does not exist returns error mssg
        if(!targetDev) {
            return res.status(400).json({error: "This developer does not exist!"})
        }

        // tells db who the logged dev has given 'dislikes' to
        loggedDev.dislikes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev)
    }
}