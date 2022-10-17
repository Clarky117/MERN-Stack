const db = require('../config/connection');
const User = require('../models/User');
const ForSale = require('../models/forSale');
const userSeeds = require('./userSeeds.json');
const forsaleSeeds = require('./forsaleSeeds.json');


db.once('open', async () => {
    await User.deleteMany({});
    await ForSale.deleteMany({});    
    
    await User.create(userSeeds);
    await ForSale.create(forsaleSeeds)

    console.log('all done!');
    process.exit(0);
});