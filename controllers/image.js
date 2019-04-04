const clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '49c55de0a25645e9823334cace3326c0'
});


const handleApiCall = (req, res) =>{
  app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input)
      .then(data =>{
        res.json(data);
      })
      .catch(err=> res.status(400).json('Unable to connect with API'))
}

const handleImage = (req, res, db)=> {
  const {id} = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{
      res.json(entries[0]);
  })
  .catch(err=> res.status(400).json('unable to get entries'))
}

module.exports= {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}
