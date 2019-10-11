const { User } = require('../models/user');
const taskName = require('../models/taskNames').taskName;

module.exports = {
    getTasksFromSection: async (req, res) => {
        try{
            const tasks = await taskName.find({section: req.params.sectionId}).sort('number');
            const user = await User.findById(req.headers.userid);
            if(!user) return res.status(404).send('No user with given ID');
            res.send({tasks: tasks, currentTask: user.currentTask});
        } catch(err){
            res.status(500).send(err.message);
        }
    }
}
