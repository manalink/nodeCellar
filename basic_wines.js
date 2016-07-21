exports.findAll = function(req,res){
	res.send([{name:'wine1'},{name:'wine2'}])
};

exports.findById = function(req,res){
	res.send({id:req.params.id,name:"The name",description:"description"});
};