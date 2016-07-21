var mongo = require('mongodb');
var Server = mongo.Server;
	Db=mongo.Db;
	BSON=mongo.BSONPure;

var server = new Server('localhost',27017,{auto_reconnect:true});
db= new Db('winedb',server);

db.open(function(err,db){
	if(!err){
		console.log("Successfully connected to 'winedb' database");
		db.collection('wines',{strict:true},function(err,collection){
			if(err){
				console.log("wines collection doesn't exists, creating it");
				populateDB();
			}
			
		});
	} else {
		console.log("Not connected");
	}
	
});

var populateDB = function() {
	
	var wines = [
	    {
	        name: "CHATEAU DE SAINT COSME",
	        year: "2009",
	        grapes: "Grenache / Syrah",
	        country: "France",
	        region: "Southern Rhone",
	        description: "The aromas of fruit and spice...",
	        picture: "saint_cosme.jpg"
	    },
	    {
	        name: "LAN RIOJA CRIANZA",
	        year: "2006",
	        grapes: "Tempranillo",
	        country: "Spain",
	        region: "Rioja",
	        description: "A resurgence of interest in boutique vineyards...",
	        picture: "lan_rioja.jpg"
	    }];
		db.collection('wines',function(err,collection){
			if(err){
				console.log("Error creating collection wines");
			}
			collection.insert(wines,{safe:true},function(err,result){});
		});
}


exports.findAll = function(req,res){
	db.collection('wines',function(err,collection){
		collection.find().toArray(function(err,items){
			res.send(items);
		});
	});
};

exports.findById = function(req,res){
	var id = req.params.id;
	console.log("Retrieving wine with id:"+id);
	db.collection('wines',function(err,collection){
		collection.findOne({'_id':new BSON.ObjectID(id)},function(err,item){
			if(err){
				console.log("Error finding wine with id:"+id);
			}
			res.send(item);
		});	
	});
};

exports.addWine =function(req,res){
	var wine = req.body;
	console.log("inserting wine "+ JSON.stringify(wine));
	db.collection('wines',function(err,collection){
		collection.insert(wine,{safe:true},function(err,result){
			if(err){
				res.send({'error':'An error has occurred'});
			}else {
				console.log("Successfully inserted wine");
				res.send(result[0]);
			}
		});
	});
};
	exports.updateWine = function(req,res){
		var id = req.params.id;
		var wine = req.body;
		console.log("updating wine with id "+id);
		db.collection('wines',function(err,collection){
			collection.update({'_id':new BSON.ObjectID(id)},wine,{safe:true},function(err,result){
				if(err){
					console.log("Error updating wine with id "+id);
					res.send({'error':'An error has occurred'});
				}else {
					res.send(wine);
				}
			});
			
		});
	};
	exports.deleteWine = function(req,res){
		var id = req.params.id;
		console.log("Deleting wine with id "+id);
		db.collection('wines',function(err,collection){
			collection.remove({'_id':new BSON.ObjectID(id)},{safe:true},function(err,result){
				if(err){
					console.log("Error deleting wine with id "+id);
					res.send({'error':'An error has occurred'});
				}else {
					console.log("Deleted wine with id "+id);
					res.send("Success");
				}
			});
		});			
};