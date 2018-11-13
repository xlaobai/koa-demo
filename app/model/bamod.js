const config = require('../../config/config');
const Init = require(`${config.mod}/init`);

class Bamod extends Init{
    constructor() {
        super();
    }

    async postDate(arr) {
        let res = await this.insert(arr, 'tp_admin');
        if(res) {
            return res;
        } else {
            return 0;
        }
    }
}

module.exports = Bamod;