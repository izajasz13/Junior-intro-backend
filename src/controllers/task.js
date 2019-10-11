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
    }
}