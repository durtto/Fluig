//logica da tela que adiciona contato
'use strict';

app.novoContatoView = kendo.observable({
    onShow: function() {},
    afterShow: function() {
		window.location.reload();
    	app.mobileApp.hideLoading();
    }
});

(function(parent) {
    var dataProvider = app.data.ramdomUser,
    localDataProvider = app.data.localStorage,
    processImage = function(img) {
        if (!img) {
            var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
            img = 'data:image/png;base64,' + empty1x1png;
        }
        return img;
    },
    dataSourceOptions = {
        type: 'json',
        transport: {
            read: {
                url: dataProvider.url
            }
        },
        change: function(e) {
            var data = this.data();
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                dataItem['picture.thumbnail'] =
                processImage(dataItem['picture.thumbnail']);
            }
        },
        schema: {
            data: 'results',
        },
    },
    dataSource = new kendo.data.DataSource(dataSourceOptions),
    novoContatoViewModel = kendo.observable({
        dataSource: dataSource,
        detailsShow: function(e) {
            app.mobileApp.hideLoading();
            var dataSource = novoContatoViewModel.get('dataSource'),
            itemModel;
            app.mobileApp.showLoading();
            dataSource.fetch(function(){
                app.mobileApp.hideLoading();


                itemModel = this.data()[0];
                itemModel.picture.thumbnail = processImage(itemModel.picture.thumbnail);
                if (!itemModel.name.first) {
                    itemModel.name.first = String.fromCharCode(160);
                }
                novoContatoViewModel.set('currentItem', itemModel);
            });
        },
        saveClick: function() {
            console.log(novoContatoViewModel.currentItem);
            localDataProvider.add(novoContatoViewModel.currentItem);
            localDataProvider.sync();
            // novoContatoViewModel.nextClick();
            app.notification.show('Contato Salvo!','info');
        },
        nextClick: function() {
            var dataSource = novoContatoViewModel.get('dataSource');
            app.mobileApp.showLoading();
            dataSource.read().then(function(){
                window.location.reload();
                app.mobileApp.hideLoading();                
            });
        },
        currentItem: null
    });
    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('novoContatoViewModel', novoContatoViewModel);
        });
    } else {
        parent.set('novoContatoViewModel', novoContatoViewModel);
    }
})(app.novoContatoView);