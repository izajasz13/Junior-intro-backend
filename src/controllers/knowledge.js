const Knowledge = require('../models/knowledgeBase').Knowledge;

module.exports = {
    getKnowledgeById: async (req, res) => {
        try{
            const knowledge = await Knowledge.findById(req.params.id);
            if(!knowledge) return res.status(404).send('No knowledge with given ID');
            res.send(knowledge);
        } catch(err){
            res.status(500).send(err.message);
        }
    }
}