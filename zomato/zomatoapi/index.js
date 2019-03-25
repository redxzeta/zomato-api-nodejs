// Export a method for API search
// Export a method for API fetch
// Export a method for API search
// Export a method for API fetch
//https://developers.zomato.com/api/v2.1/search?q=<keyword>
//https://developers.zomato.com/api/v2.1/restaurant?res_id=<id>

const
    config = require('./config'),
    superagent = require('superagent')



const _fetch = (command) => {
    return superagent.get(`${config.url}/${command}&apikey=${config.api}`)


        .then(response => response.body)
        .catch(error => error.response.body)
}

exports.getRestaurantByid = res_id => {
    return _fetch(`restaurant?res_id=${res_id}`)
}

exports.getRestaurantByKeyword = keyword => {
   return _fetch(`search?entity_id=281&entity_type=city&q=${keyword}&count=10`)
}
