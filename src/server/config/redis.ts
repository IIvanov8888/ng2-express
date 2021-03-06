'use strict';

let credentials: any = require('../routes/common/cfenv').Credentials(process.env.REDIS);

if (credentials === null) {
    const redis_path: any = require('path');
    credentials = require(redis_path.resolve() + '/env.json').redis;
}

const redis: any = require('redis').createClient(credentials.port, credentials.host);

if (credentials.password !== undefined) {
    redis.auth(credentials.password, () => {
        console.log('$redis => Connected to Redis on server ' + credentials.host);
    });
} else {
    console.log('$redis => Connected to Redis on local');
}

redis.on('connect', () => {
    console.log('$redis => Connected to Redis');
});

redis.on('error', (err: any) => {
    console.log('$redis => Redis error: ', err);
});

module.exports = redis;
