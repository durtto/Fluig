// logica do local binding
'use strict';

(function () {
	// cria o localStorage se não estiver definido
	if(localStorage["contacts"] == undefined){
		localStorage["contacts"] = JSON.stringify([]);
	}

	// seta o dataSource como variável global
	var provider = app.data.localStorage = new kendo.data.DataSource({
		transport: {
			create: function(options){
<<<<<<< HEAD
				//function to create a new local record
				console.log(options);
=======
				//função que cria registro local
>>>>>>> 02684a8533d33dd200d0d001b22055404a2673b5
				var localData = JSON.parse(localStorage["contacts"]);
				localData.push(options.data);
				localStorage["contacts"] = JSON.stringify(localData);
				options.success(options.data);
			},
			read: function(options){
				// pega o array de contatos gravados localmente
				var localData = JSON.parse(localStorage["contacts"]);
				options.success(localData);
			},
			destroy: function(options){
				//apaga registro
				var localData = JSON.parse(localStorage["contacts"]);
				for(var i=0; i<localData.length; i++){
					if(options.data.username === localData[i].username){
						localData.splice(i,1);
						break;
					}
				}
				localStorage["contacts"] = JSON.stringify(localData);
				options.success(options.data);
			}
		},
		schema: {
			model: {
				id: "ID",
				fields: {
					ID: { type: "number", editable: false }
				}
			}
		}
	});
})();