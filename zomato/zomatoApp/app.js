// application that allows uses the custom-module
// allows the user to search, select a result, fetch details and display details
const
    zomatoapi = require('zomatoapi'),
    inquirer = require('inquirer'),
    superagent = require('superagent')

async function fetchRestaurant(list) {
    const show = list.map(res => {
        return {
            name: res.restaurant.name,
            id: res.restaurant.id
        }
    })
    return inquirer.prompt([{
        type: 'list',
        message: 'select restaurant for more info',
        name: 'restaurants',
        choices: show,
        validate: show => {
            if (show.length == null)
                return 'select a choice'
            else
                return true
        }
    }])
}


async function search(keyword) {

    const list = []
    const result = await zomatoapi.getRestaurantByKeyword(keyword);
    const res_list = result.restaurants;


    const fetch = await fetchRestaurant(res_list);
    let userSelection = 0

    res_list.forEach(element => {

        if (element.restaurant.name == fetch.restaurants) {
            userSelection = element.restaurant.id;
        }
    });

    const selection = await zomatoapi.getRestaurantByid(userSelection);
    console.log(`${selection.name}`);
    print(selection);
}





const print = (selection) => {
    console.log();
    console.log("Restaurant Info");
    console.log(`Name: ${selection.name}`);
   // console.log(`Url: ${selection.url}`);
    console.log(`Address: ${selection.location.address}`)
    console.log(`City: ${selection.location.city}`)
    console.log(`user rating: ${selection.user_rating.aggregate_rating}`)

}

module.exports = {
    search
}