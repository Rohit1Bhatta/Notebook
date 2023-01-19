const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/1notebook";


const connectToMongo = () => {
    mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true} ,()=>{
        console.log("Mongo is connected");
    })
 
}
mongoose.set('strictQuery', true);

module.exports = connectToMongo;



//   mongoose
//     .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//       console.log("Mongo is connected");

//       app.listen(5000, () => {
//         console.log(`1 NoTe BoOk listening on port ${port}`);
//       });
//     })
//     .catch((error) => {
//       console.log("Mongo is not connected");
//       console.log(error);
//     });
// };