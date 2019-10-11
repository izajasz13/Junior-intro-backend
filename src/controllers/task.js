const { Task, validateTask } = require('../models/task')

module.exports = {
    getTaskById: async (req, res) => {
        try{
            const task = await Task.findById(req.params.id)
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
            res.send(JSON.stringify(obj));
        }
        catch(error){
            res.status(500).send('Server side error');
        }
    },

    createTask: async (req, res) => {
        try{
            const data = JSON.parse(req.body);
            const {error} = validateTask(data);
            if(error) return res.status(400).send(error.details[0].message);

            const task = new Task({
                title: data.title,
                description: data.description,
                coins: data.coins,
                exp: data.exp,
                questions: data.questions,
                answers: data.answers
            })
            await task.save();
            res.send("Succesfully added");
        }
        catch(error){
            res.status(500).send('Server side error');
        }
    },

    updateTask: async (req, res) => {
        try{
            const data = JSON.parse(req.body);
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
            res.send(user);
        }
        catch(error){
            res.status(500).send('Server side error');
        }
    }

}