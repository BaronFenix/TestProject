const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

});

const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model('kitten', kittySchema);
const silence = new Kitten({ name: 'sniffle' });
  
// const kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'fluffy' });

fluffy.speak(); // "Meow name is fluffy"

// fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//   });

//   silence.save(function (err, silence) {
//     if (err) return console.error(err);
//     silence.speak();
//   });

 (async () =>{
    const cat = await Kitten.findOne({name:"fluffy"});
      if(cat) await cat.delete();
      else console.log("error");
    console.log(cat);

  await Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
  console.log(kittens);
});
})();

  // Kitten.find({ name: /^fluff/ });