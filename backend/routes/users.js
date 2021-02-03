const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  Register.find()
    .then((register) => res.json(register))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").post((req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;
  const userType = Number(req.body.userType);

  const newUser = new User({ fName, lName, email, password, userType});

  newUser
    .save()
    .then(() => res.json("Registered Successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post('/login',function(req,res){
    const email = req.body.email;
    const password = req.body.password
    console.log(req.body)
 });

router.route('/:id').get((req, res) => {
    console.log(req.body)
    User.findById(req.params.id)
    .then(User => res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Player deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(User => {
    User.email = req.body.email;
    User.password = req.body.password;
    User.fName = req.body.fName;
    User.lName = req.body.lName;
    User.userType=Number(req.body.userType);

    User.save()
    .then(() => res.json('User updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;