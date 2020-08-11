const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'f9eb110890ba444096cf3f8eab091106'
});

const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    let userFound = false;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get score'))
}

module.exports = {
    handleImage,
    handleApiCall
}