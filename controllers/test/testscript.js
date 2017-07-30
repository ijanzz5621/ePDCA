var data = {

    tables: {
        people: [
            {id: 1, name: "John", age:29}
            ,{id:2, name: "Peter", age:31}
        ],
        cars: [
            {id: 1, brand: "Nissan", model: "Serena", owner_id: 2}
            , {id: 2, brand: "BMW", model: "X5", owner_id: 2}
            , {id: 3, brand: "Honda", model: "Civic", owner_id: 1}
        ]
    }

}

exports.testInsert = function(){
    var db = require('../../lib/db');
    db.connect(db.MODE_PRODUCTION, function(){
        db.fixtures(data, function(err){
            if (err) return console.log(err);
            console.log('data has been loaded.')
        });
    });
};



