const Event = require("../models/Event");

module.exports = {
  //test function
  ping: (req, res) => {
    return res.json({message: 'pong'})
  },
  create: async (req, res) => {
    try{ 
        let data = req.body.data
        await Event.create({
            title: data.title, description: data.description, date: data.date, startTime: data.startTime, recurringDates: data.recurring, endTime: data.endTime, location: data.location
        })
        res.json({message: 'Event created!'})
    }catch(err){
        console.log(err)
    }
  },
};