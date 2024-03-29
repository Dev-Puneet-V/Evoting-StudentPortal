const express = require('express');
const router = express.Router();
// const voteController = require('../controllers/vote_count_controller');
const elections = require('../models/election');
const votes = require('../models/votes');
const authenticated = require('../config/authenticated');
// router.post('/verify_and_count', authenticated.checkUserLoggedIn, authenticated.stage2, voteController.count);
router.get('/page' , authenticated.checkUserLoggedIn, authenticated.stage2, async (req, res) => {
    const eId = req.query.election_id;
    let voted = false;
    await votes.findOne({voter : req.user._id, eId : eId}, (err, data) => {
        
        if(data) {
            voted = true;
            
        }
    });
    if(voted) {
        await elections.find({}, (err, data) => {
            if(err){console.log('error in finding elections list', err); return res.redirect('back');}
             return res.render('vote', {
                elections: data
            });
        });
    }else {
        let election = await elections.findById(eId, (err) => {
            if(err){
            return res.redirect('back');
            }
        }).populate({
            path: 'positions',
            populate: {
                path: 'candidate',
                model: 'User'
            }
        });
        
        return res.render('voting_page' ,{
            data : election,
            e_id : eId
        });
}
});
router.get('/voter', authenticated.checkUserLoggedIn, authenticated.stage2, (req, res) => {
    elections.find({}, (err, data) => {
        if(err){console.log('error in finding elections list'); data = {}}
        return res.render('vote', {
            elections: data
        });
    })
});
router.post('/count', authenticated.checkUserLoggedIn, authenticated.stage2, async (req, res) => {
    const e_id = req.query.e_id;
    let election = await elections.findById(e_id).populate({
        path: 'positions',
        populate: {
            path: 'candidate',
            model: 'User'
        }
     });
     const data = req.body;
     for(let i = 0 ;i < election.positions.length; i++) {
        votes.create({
            eId : e_id,
            position: election.positions[i]._id,
            candidate: data[election.positions[i]._id],
            voter: req.user._id
        }, (err, data) => {
            if(err){console.log("unable to save data"); return;}
        });
     }
    req.flash('success','Voted successfullt');
    return res.render('voted');
});
module.exports = router;