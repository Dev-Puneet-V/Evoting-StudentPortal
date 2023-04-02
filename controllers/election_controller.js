const Election = require('../models/election');
const moment = require('moment');
module.exports.details = (req, res) => {
    Election.find({}, null,{ sort :{ createdAt : -1}}, (err, elections) => {
        if (err) { console.log('error in finding election details') }
        return res.render('admin_home', {
            elections: elections
        });
    });
}

module.exports.create = function (req, res) {
    const elect_name = req.body.elect_name;
    Election.create({name: elect_name }, async (err, id) => {
        if (err) {
            Election.find({}, (err, elections) => {
                if (err) { console.log('error in loding data'); return; }
                return res.render('admin_home', { elections: elections});
            });
        }
        var positions;
        req.flash('success','Election successfully created!');

        return res.render('enter_election_data', {
            positions : positions,
            id : id._id
        });
    });
}

module.exports.updateTime = function (req, res) {
    let sDate = req.body.sDate;
    let sTime = req.body.sTime;
    let eDate = req.body.eDate;
    let eTime = req.body.eTime;
    let eId = req.body.e_id;
    let scheduledTime = new Date(sDate + " " + sTime);
    let endTime = new Date(eDate + " " + eTime); 
    
    console.log(req.body, scheduledTime, endTime);
    // let enTime = moment(scheduledTime).add(parseInt(eTime.substr(0, 2)), 'h').add(parseInt(eTime.substr(3)), 'm').toDate();
    Election.findByIdAndUpdate(eId, {scheduleTime : scheduledTime, endTime : endTime}).exec((err, data) => {
        if(err){req.flash('error','Unable to update time of election'); console.log('Error in updating time of election', err);}
        else{req.flash('success','Election time updated');}
        return res.redirect('/admin/get_election_info?election_id=' + eId);
    });
}
