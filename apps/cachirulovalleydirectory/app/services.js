App.Services = (function(lng, App, undefined) {
	var load_categories = function(){
		lng.Service.Settings.timeout = 2500;
        lng.Service.Settings.dataType = 'json';
        lng.Service.Settings.error = function() {
            console.log('Timeout exceed (500ms):', arguments);
        };

	    var url = 'http://www.letsnode.com:8085/api/cats';
        var parameters = {
			callback: '?'
        };

        lng.Service.json(url, parameters,
            function(response) {
				var cats = response.cats;

				var config = {
				    container_id: 'directory_cats_list',
				    template_id: 'cats-tmp',
				    data: cats
				};

				lng.View.Template.List.create(config);
            }
        );
	}

    var load_users_from_cat = function(id_cat, callback) {
        lng.Service.Settings.timeout = 2500;
        lng.Service.Settings.dataType = 'json';
        lng.Service.Settings.error = function() {
            console.log('Timeout exceed (500ms):', arguments);
        };

        var url = 'http://www.letsnode.com:8085/api/users';
        var parameters = {
            id_cat: id_cat,
			callback: '?'
        };

        lng.Service.json(url, parameters,
            function(data) {
				var profiles = data.users;
				var config = {
				    container_id: 'list-plain',
				    template_id: 'profile-tmp',
				    data: profiles
				};

				lng.View.Template.List.create(config);
				callback(null, data)
            }
        );
    };
	
	//load_categories();
	
    return {
		load_categories : load_categories,
        load_users_from_cat: load_users_from_cat
    }


})(LUNGO, App);