const router = require('express').Router();
let Player = require('../models/player.model');

router.route('/').get((req, res) => {
    var position  = req.query.position 
    var count = parseInt(req.query.limit);
    var offset = parseInt(req.query.skip)

    if(isNaN(count) || isNaN(offset)) {
        count = 100 
        offset = 0
    }

    if((position == null || !position)) {
    Player.find().limit(count).skip(offset)
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
    var filter = {'position' : position }
    Player.find(filter).limit(count).skip(offset)
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route('/add').post((req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const age = Number(req.body.age);
    const position = req.body.position.toUpperCase();
    const goals = Number(req.body.goals);
    const assists = Number(req.body.assists);
    const saves = Number(req.body.saves);
    const cleanSheet = Number(req.body.cleanSheet);
    const matches = Number(req.body.matches);
    const salary = Number(req.body.salary);
    const price = Number(req.body.price);

    
    const newPlayer = new Player({
        fName, lName, age, position, goals, assists, saves, cleanSheet, matches, salary, price
    });

    newPlayer.save()
    .then(() => res.json('Player added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Player.findByIdAndDelete(req.params.id)
    .then(() => res.json('Player deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    Player.findById(req.params.id)
    .then(player => {
    player.fName = req.body.fName;
    player.lName = req.body.lName;
    player.age = Number(req.body.age);
    player.position = req.body.position.toUpperCase();
    player.goals = Number(req.body.goals);
    player.assists = Number(req.body.assists);
    player.saves = Number(req.body.saves);
    player.cleanSheet = Number(req.body.cleanSheet);
    player.matches = Number(req.body.matches);
    player.salary = Number(req.body.salary);
    player.price = Number(req.body.price);

    player.save()
    .then(() => res.json('Player updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/submit-offer/:id').post((req, res) => {
    console.log("Submit offer")
    Player.findById(req.params.id)
    .then(player => {
    var offer = {
        salary : req.body.salary,
        price : req.body.price, 
        club : req.body.club,
        description : req.body.description,
        accepted : false
     };

    player.offers.push(offer);
    player.save()
    .then(() => res.json('Offer submitted!'))
    .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/offers/all').get((req, res) => {
    console.log("All offers")
    var playersWithOffers = [];
    Player.find()
    .then(players => {
        players.forEach(function (arrayItem) {
            var offerJSON = arrayItem.offers;
            numberOfOffers = Object.keys(offerJSON).length;

            if(numberOfOffers > 0) {
                var player = {
                    "id": arrayItem._id,
                    "fName" : arrayItem.fName,
                    "lName" : arrayItem.lName,
                    "age" : arrayItem.age,
                    "pos" : arrayItem.position
                }

                playersWithOffers.push(player);
        }
        });
        res.json(playersWithOffers)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/offers/:id').get((req, res) => {
    console.log("Offer for a player")
    Player.findById(req.params.id)
    .then(player => {
        res.json(player.offers)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;