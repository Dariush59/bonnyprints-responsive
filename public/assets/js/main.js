$( document ).ready(function() {
    var formGroup       = $("#form-container > .form-group");
    var myform          = $("#myform");
    var album           = $( "#album" );
    var addUrl          = $("#addUrl");
    var formContainer   = $("#form-container");
    var btnSuccess      = $(".btn-success");
    var formLeng        = 3;

    $(function() {
        addUrl.click(function () {
            formLeng = ++formGroup.length;
            console.log(formLeng);
            formContainer.append(
                '<div class="form-group">'+
                ' <label class="control-label col-sm-2" for="Url_' + formLeng + '">Url_' + formLeng + ':</label>'+
                '<div class="col-sm-10"> '+
                '<input type="url" class="form-control" name="Url_' + formLeng + '">'+
                '</div>'+
                '</div>');
        });
        myform.submit(function(event) {
            event.preventDefault();
            btnSuccess.prop('disabled', true);
            var urlValue = $.trim($('input[name=Url_'+formLeng+']').val());
            album.empty();

            $.ajax({
                url: event.currentTarget.action,
                type: event.currentTarget.method,
                dataType: 'json',
                data: myform.serialize(),
                success: function(data) {
                    getAlbumBuilder(data);
                    if(urlValue.length > 0) {
                        var width = 30 - ((formLeng-3) * 3);
                        $( "#album img" ).css("width", width + '%');
                    }
                    btnSuccess.prop('disabled', false);
                }
            });
        });
    });
    
    function getAlbumBuilder(data) {
        $.each( data, function( index, objValue ) {
            $.each( objValue , function( key, value ) {
                if (((index+1)%2) == 0 )
                    album.append( '<img id="'+index+'" class="evenImg img-responsive" src="albums/'+ value +'" />' );
                else
                    album.append( '<img id="'+index+'" class="oddImg img-responsive" src="albums/'+ value +'" />' );
                if( index != 0  ){
                    var topVal = 0;
                    var indexId = $("#" + index);
                    while(index >= 1){ topVal += -0.6; --index;}
                    indexId.css("margin-top", topVal+"%");
                }
            });
        });
    }
});