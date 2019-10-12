const { Task, validateTask } = require('../models/Task');
const { taskName } = require('../models/taskNames');

module.exports = {
    getTaskById: async (req, res) => {
        try {
            const id = req.params.id;
            const task = await Task.findById(id);
            if (!task) return res.status(404).send('No task with given ID');
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
        catch (error) {
            res.status(500).send(error);
        }
    },

    createTask: async (req, res) => {
        try {
            const data = req.body;
            const { error } = validateTask(data);
            if (error) return res.status(400).send(error.details[0].message);

            const task = new Task({
                title: data.title,
                description: data.description,
                coins: data.coins,
                exp: data.exp,
                questions: data.questions,
                answers: data.answers
            });

            const taskName = new taskName({
                numer: data.sectionNumber,
                title: task.title,
                taskId: task._id,
                section: data.section
            });

            await task.save();
            await taskName.save();
            res.send("Succesfully added");
        }
        catch (error) {
            res.status(500).send(error);
        }
    },

    updateTask: async (req, res) => {
        try {
            const data = req.body;
            const { error } = validateTask(data);
            if (error) return res.status(400).send(error.details[0].message);
            const task = await Task.findByIdAndUpdate(data.id,
                {
                    title: data.title,
                    description: data.description,
                    coins: data.coins,
                    exp: data.exp,
                    questions: data.questions,
                    answers: data.answers
                },
                { new: true }
            );
            if (!task) return res.status(404).send('Task not found');
            res.send("Updated succesfully")
        }
        catch (error) {
            res.status(500).send('Server side error');
        }
    }

}