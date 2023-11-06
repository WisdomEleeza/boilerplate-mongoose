require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: [String],
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person ({
    name: "foobar",
    // age: 3,
    favoriteFoods: ['Chips', 'Gari']
})

newPerson.save((err, data) => {
  if(err){
    done(err)
  } else {
    done(null, data);
  }
})
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) {
      done(err)
    } else {
      done(null, data)
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};


const findOneByFood = (food, done) => { 
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if(err) {
      done(err)
    } else {
      done(null, data)
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if(err) {
      done(err)
    } else {
      done(null, data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // Use the 'findOneAndUpdate' method to find and update the person by name
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }, // Return the updated document
    (err, updatedPerson) => {
      if (err) {
        done(err);
      } else {
        done(null, updatedPerson);
      }
    }
  );
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, findDelete) => {
    if(err) {
      done(err)
    } else {
      done(null, findDelete)
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  // Use the 'remove' method to delete all people with the specified name
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      done(err);
    } else {
      done(null, result);
    }
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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
