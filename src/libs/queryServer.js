var Gamedig = require('gamedig');

/**
 * Queries Cbcraft. Returns false if error / server is offline
 * @function queryServer
 * 
 * @param {queryServerCallback} callback
 */

/**
 * Callback after Cbcraft is queried
 * @callback queryServercallback
 * 
 * @param {Object|Boolean} response - JSON containing information about the server, or false if offline / failure
 */

function queryServer(ip, callback) {
    Gamedig.query(
        {
            type: 'minecraft',
            host: ip,
        },
        function(state) {
            if(!state.error) {
                callback(state);
            } else {
                callback(false);
            }
        }
    );
}

module.exports.queryServer = queryServer;