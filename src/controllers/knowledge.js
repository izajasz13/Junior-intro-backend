const Knowledge = require('../models/knowledgeBase').Knowledge;
const KnowledgeList = require('../models/knowledgeList').Knowledge;
const validateKnowledge = require('../models/knowledgeBase').validateKnowledge;

module.exports = {
    getKnowledgeById: async (req, res) => {
        try{
            const knowledge = await Knowledge.findById(req.params.id);
            if(!knowledge) return res.status(404).send('No knowledge with given ID');
            res.send(knowledge);
        } catch(err){
            res.status(500).send(err.message);
        }
    },

    getKnowledgeTitles: async (req, res) => {
        try{
            const titles = await KnowledgeList.find();
            if(!titles) return res.status(404).send('No knowledge available');
            const titlesMapped = titles.map((x) => {
                return {
                    title: x.title, 
                    knowledgeId: x.knowledgeId
                }
            });
            res.send(titlesMapped);
        } catch(err){
            res.status(500).send(err.message);
        }
    },

    createKnowledge: async (req, res) => {
        try {
            const {error} = validateKnowledge(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            const knowledge = new Knowledge({
                title: req.body.title,
                description: req.body.description,
                content: req.body.content
            });
            const knowledgeList = new KnowledgeList({
                title: req.body.title,
                knowledgeId: knowledge._id
            });

            await knowledge.save();
            await knowledgeList.save();

            res.send("Succesfully added");
        }
        catch(error) {
            res.status(500).send(error.message);
        }
    }
};
