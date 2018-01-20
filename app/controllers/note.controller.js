var Note = require('../models/note.model.js');
exports.create = function(req, res){
	if(!req.body.content){
		res.status(400).send({message: "Note can not be empty"});
	}
	var note  = new Note({title: req.body.title || "Untitled Note", content:req.body.content});
	note.save(function(err, data){
		console.log(data);
		if(err){
			console.log(err);
			res.status(500).send({message: "Some Error occured while creating the note."});
		} else{
			res.send(data);
		}
	});
};

exports.findAll = function(req, res){
	Note.find(function(err, notes){
		if(err){
			res.status(500).send({message: "Some error occured while retrieving notes"});
		} else {
			res.send(notes);
		}
	});
};

exports.findOne = function(req, res){
	Note.findById(req.params.noteId, function(err, data){
		if(err){
			res.status(500).send({message:"Could not find the note"});
		} else {
			res.send(data);
		}
	});

};

exports.update = function(req, res){
	Note.findById(req.params.noteId, function(err, note){
		if(err){
			res.status(500).send({message:"Could not find the note"});		
		} 

		note.title = req.body.title;
		note.content = req.body.content;

		note.save(function(err, data){
			if(err){
				res.status(500).send({message: "Could not update the note"});
			} else {
				res.send(data);
			}
		});
	});
};

exports.delete = function(req, res){
	Note.remove({_id: req.params.noteId}, function(err, data){
		if(err){
			res.status(500).send({message: "Could not delete the note"});
		} else {
			res.send({message:"Note deleted Successfully"});
		}
	});
};

exports.search = function(req, res){
	Note.find(req.body, function(err, data){
		if(err){
			res.status(500).send({message: "Could not find the note"});
		} else {
			res.send(data);
		}
	})
}
