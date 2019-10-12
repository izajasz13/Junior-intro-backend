const { User, validate, validateLogin } = require('../models/user')
const taskName = require('../models/taskNames').TaskName;

module.exports = {

    getUserById: async function (req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send('A user with the given ID was not found.')
            res.send(user)

        } catch (error) {

            res.status(500).send('Error occurred')
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find().sort('timeCreated');
            res.send(users);
        } catch (error) {
            res.status(500).send('An error occured.');
        }
    },

    updateUser: async (req, res) => {
        try {
            const { error } = validate(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    currentTask: req.body.currentTask,
                    coins: req.body.coins,
                    experience: req.body.experience 
                },
                { new: true});
            if(!user) return res.status(404).send('User not found.');
            res.send(user);
        } catch (error) {
            res.status(500).send('An error occured.');
        }
    },

    loginUser: async (req, res) => {
        try {
            const { error } = validateLogin(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            let user = await User.findOne({ username: req.body.username });
            if (!user || (user.password != req.body.password)) return res.status(400).send('Invalid username or password.');

            const tasks = await taskName.find().count();

            res.send({ 
               coins: user.coins,
               experience: user.experience,
               _id: user._id,
               username: user.username,
               name: user.name,
               currentTask: user.currentTask,
               tasksAmount: tasks
            });
        } catch (error) {
            res.status(500).send('An error occured.');
        }
    }
}