require('dotenv').config();
/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');

// Creating a constant so that I don't always have to type mongoose.Schema
const Schema = mongoose.Schema;

// Use the mongoose connect() function to the MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(process.env.MONGO_URI, function(err, db) {
  if (err) return console.log(err)
  })

/* Mongoose Schema for Person */
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: {
    type: [String]
  }
});
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  // create new object and pass in fields
  const firstPerson = new Person({ name: 'nitehoot', age: 21, favoriteFoods: ['pizza', 'french fries', 'salad'] });
  // save the document
  firstPerson.save(function (err, data) {
    // handle error logging - When interacting with remote services, errors may occur!
    if (err) { return console.error(err); }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    // handle error logging - When interacting with remote services, errors may occur!
    if (err) { return console.error(err); }
    done(null, data);
  });
  console.log(arrayOfPeople);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    // handle error logging - When interacting with remote services, errors may occur!
    if (err) { return console.error(err); }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    // handle error logging - When interacting with remote services, errors may occur!
    if (err) { return console.error(err); }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findOne({ _id: personId }, function (err, data) {
    // handle error logging - When interacting with remote services, errors may occur!
    if (err) { return console.error(err); }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key.
  Person.findById(personId, function (err, person) {
    if (err) { return console.error(err); }

    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save(function (err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // findOneAndUpdate uses ( conditions , update , options , callback )
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, updatedDoc) {
    if (err) return console.log(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(
    personId,
    (err, removedDoc) => {
      if (err) return console.log(err);
      done(null, removedDoc);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';
  Person.deleteMany({ name: nameToRemove }, function (err, response) {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  Person.find({ favoriteFoods: foodToSearch })
    .limit(2).sort({ name: 'asc' }).select('-age').exec((err, response) => {
      if (err) return console.log(err);
      done(null, response);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

// ----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
