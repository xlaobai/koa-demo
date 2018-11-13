const config = require('../../config/config');
const Bamod = require(`${config.mod}/bamod`);
const Unit = require(`${config.lib}/unit`);
const redis = require(`${config.conf}/redis`);
const bamod = new Bamod();
const unit = new Unit();

class Back {
    constructor() {
    }

    async getDate(req) {
        await redis.set(`test`, 1);
        let test = await redis.get(`test`);
        let arr = [
            {
                'time' : unit.exDate(+ new Date()),
                'redis' : test 
            }
        ]
        return unit.retStatus(1, arr);
    }

    async postData(req) {
        let state = await bamod.postDate(req.body.fields);
        if( state ){
            return unit.retStatus(1, []);
        } else {
            return unit.retStatus(0, 'POST_ERROR');
        }
    }
}

module.exports = Back;