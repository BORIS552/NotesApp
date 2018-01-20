module.exports = function(app){
	var notes = require('../controllers/note.controller.js');

	app.post('/notes', notes.create);
	app.get('/notes', notes.findAll);
	app.get('/notes/:noteId', notes.findOne);
	app.put('/notes/:noteId', notes.update);
	app.delete('/notes/:noteId', notes.delete);
	app.post('/notes/search',notes.search);
}