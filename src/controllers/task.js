const { Task, validateTask } = require('../models/task')
const { User } = require('../models/user')

module.exports = {
    getTaskById: async (req, res) => {
        try{
            const id = req.params.id;
            const task = await Task.findById(id);
            if(!task) return res.status(404).send('No task with given ID');
            const obj = {
                description: task.description,
                prize: {
                    exp: task.exp,
                    coins: task.coins
                },
                questions: task.questions,
                answers: {
                    number: task.answers.number,
                    content: task.answers.content
                }
            }
            res.send(obj);
        }
        catch(error){
            res.status(500).send(error);
        }
    },

    createTask: async (req, res) => {
        try{
            const data = req.body;
            const {error} = validateTask(data);
            if(error) return res.status(400).send(error.details[0].message);

            const task = new Task({
                title: data.title,
                description: data.description,
                nextTask: null,
                coins: data.coins,
                exp: data.exp,
                questions: data.questions,
                answers: data.answers
            })
            const taskCreated = await Task.findOne({title: data.title});
            const id = taskCreated._id;
            console.log(id);
            res.send("Succesfully added");
        }
        catch(error){
            res.status(500).send(error);
        }
    },

    updateTask: async (req, res) => {
        try{
            const data = req.body;
            const {error} = validateTask(data);
            if(error) return res.status(400).send(error.details[0].message);
            const task = await Task.findByIdAndUpdate(data.id,
                {
                    title: data.title,
                    description: data.description,
                    coins: data.coins,
                    exp: data.exp,
                    questions: data.questions,
                    answers: data.answers
                },
                {new: true}
            );
            if (!task) return res.status(404).send('Task not found');
            res.send("Updated succesfully")
        }
        catch(error){
            res.status(500).send('Server side error');
        }
    },

    checkAnswers: async (req, res) => {
        try{
            const data = req.body;
            const task = Task.findById(data.id);
            if(!task) return res.status(404).send('No task with given ID');

            const points = task.answers.map((ele, i) => data.answers[i] === ele ? 1 : 0);  
            const user = User.findById(data.user);
            const coins = user.coins + (points.reduce((ele, acc) => acc + ele) * task.coins);
            const experience = user.experience + task.exp;
            
            const userUpdate = await User.findByIdAndUpdate(data.user,
                {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    currentTask: task.nextTask,
                    coins,
                    experience
                },
                { new: true});
            if(!userUpdate) return res.status(404).send('User not found.');
            res.send(user);
        }
        catch(error){
            res.status(500).send('Server side error');
        }
    }
}