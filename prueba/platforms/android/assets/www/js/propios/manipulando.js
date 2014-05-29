/*
    @autor:     Khriz Enríquez
    @contacto:  @khrizenriquez
    @copyright: 2014
*/

var visitas = localStorage;
var mensajeR = "#e74c3c";
var mensajeV = "#27ae60";
var mensajeA = "#2980b9";
var mensajeG = "#7f8c8d";
var acceso = {};
var appId = 662143983862826;
/*FB.options({
    appId: '662143983862826'
});*/

( function ( ) {
    document.addEventListener('deviceready', onDeviceReady, false);
} )();

function onDeviceReady (){
    
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
    if( is_android ) {
        $('select.form-control').removeClass('form-control').css('width', '100%');
    }
    //mostrandoModal ( );

    //para inicializar la funcion localizar que me muestra los datos del mapa
    google.maps.event.addDomListener(window, 'load', localizar);

    document.getElementById( "btnMenu" ).addEventListener( "click", function ( ) {
        presionandoMenu ( this );
    } );

    subiendoImagen( "123", "txtImg", "btnSeleccionarLogo", "divMsj" );
    if ( visitas.getItem('visitasUsuario') > 2 ) {
        console.log( "Ya no aparece el mensaje :(" );
    }else
    if ( visitas.getItem('visitasUsuario') <= 2 ) {
        $( "#tour" ).crumble( );
        visitas.setItem( "visitasUsuario", ( parseInt( visitas.getItem('visitasUsuario') ) + 1 ) );
    }else{
        $( "#tour" ).crumble( );
        visitas.setItem('visitasUsuario', 0);
    }
}

/*
    función que se encargará de disparar el método para la geocalización
*/
function localizar() {
    navigator.geolocation.getCurrentPosition(mapa, error);
}

function mapa( pos ) {
    var latitud = pos.coords.latitude;//obtengo la latitud de mi posición
    var longitud = pos.coords.longitude;//obtengo la longitud de mi posición

    var centro = new google.maps.LatLng(latitud, longitud);



    /*
        me sirve para desplegar los datos del mapa, si será satelital o no
        mientras menor sea el número de "zoom" mas lo aleja
    */
    var propiedades = {
        center: centro,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 18,
        zoomControl: true,
        zoomControlOptions: {
            position    : google.maps.ControlPosition.RIGHT_BOTTOM,
            style: google.maps.ZoomControlStyle.SMALL
        },
    };

    /*var weatherLayer =
        new google.maps.weather.WeatherLayer({
            temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
        }
    );*/
    var mapa = new google.maps.Map( document.getElementById('divMapa'), propiedades );
    /*var cloudLayer = new google.maps.weather.CloudLayer();
    */
    var marcador =  new google.maps.Marker({
        draggable: false,//para indicar si nuestro marcador se arrastrará
        map: mapa,
        title: 'Khriz te encontro',
        position: centro,//se ubica en el centro obteniendo la latitud y longitud
    });


    //Creo un evento asociado a "mapa" cuando se hace "click" sobre el
     google.maps.event.addListener(mapa, "click", function(evento) {
     //Obtengo las coordenadas separadas
         var latitud = evento.latLng.lat();
         var longitud = evento.latLng.lng();

         //Puedo unirlas en una unica variable si asi lo prefiero
         var coordenadas = evento.latLng.lat() + ", " + evento.latLng.lng();

        //Las muestro con un popup
         alert(coordenadas);

         //Creo un marcador utilizando las coordenadas obtenidas y almacenadas por separado en "latitud" y "longitud"
         var coordenadas = new google.maps.LatLng(latitud, longitud); /* Debo crear un punto geografico utilizando google.maps.LatLng */
         var marcador = new google.maps.Marker({position: coordenadas,map: mapa, animation: google.maps.Animation.DROP, title:"Un marcador cualquiera"});
     });

    //weatherLayer.setMap(mapa);//lo situo en el mapa
    //cloudLayer.setMap(mapa);//lo situo en el mapa
}

//  obtengo los errores si no se puede conectar
function error ( errorC ) {
    console.log( errorC );
    if( errorC.code == 0 ) {
        console.log('Error desconocido.');
    }else
    if( errorC == 1 ) {
        console.log('Opción des habilitada.');
    }else
    if( errorC == 2 ) {
        console.log('La posición no esta disponible por el momento.');
    }else
    if( errorC == 3 ) {
        console.log('Algo extraño paso.');
    }
}

/*
    la opción para mostrar el menú dependerá si se presiona el botón o no, por esa razón en estas funciones se manipulan los eventos del menú

    si viene 0 es que el menú no se ha desplegado y debo mostrarlo (parecido a toggle)
    si viene 1 es que el menú si se ha desplegado y debo ocultarlo (parecido a toggle)
*/
function presionandoMenu ( valorAtributo ) {
    var opciones = $( valorAtributo ).data( "opciones" );
    if ( opciones == 0 ) {
        $( ".sinIngresar" ).css( "display", "none" );
        $( ".Ingresado" ).css( "display", "none" );
        $( "#navMenu" ).css( "background", "rgba(0, 153, 204, 0)" );
        $( valorAtributo ).data( "opciones", '1' );
    }else
    if ( opciones == 1 ) {
        if ( acceso.idUsuario == undefined || acceso.idUsuario == "" ) {
            $( ".Ingresado" ).css( "display", "none" );
            $( ".sinIngresar" ).css( "display", "inline-block" );
        }else {
            $( ".sinIngresar" ).css( "display", "none" );
            $( ".Ingresado" ).css( "display", "inline-block" );
        }
        $( "#navMenu" ).css( "background", "rgba(0, 153, 204, 1)" );
        $( valorAtributo ).data( "opciones", '0' );
    }else{
        $( ".sinIngresar" ).css( "display", "none" );
        $( ".Ingresado" ).css( "display", "none" );
        $( "#navMenu" ).css( "background", "rgba(0, 153, 204, 0)" );
        $( valorAtributo ).data( "opciones", '1' );
    }
}

function mostrandoModal ( ) {
    $( '#modalSesion' ).modal({
        keyboard: false,
        show: true,
    });
}

function mostrandoCompartirImg ( ) {
    $( '#modalCompartirImagen' ).modal({
        keyboard: false,
        show: true,
    });
    $( "#modalCompartirImagen h4" ).text( "Comparte tu imágen " + acceso.primerNombre );
}

function cuentaPalabras ( limite, elementoTexto, elementoMensaje ) {
    if ( isNaN( limite ) ) 
        return false;
    else{
        var resultado = ( limite - elementoTexto.value.length );

        if( resultado <= 200 && resultado >= 50 ){
            elementoMensaje.style.color = mensajeV;
            elementoMensaje.innerHTML = resultado;
        }else
        if( resultado <= 50 && resultado >= 10 ){
            elementoMensaje.style.color = mensajeA;
            elementoMensaje.innerHTML = resultado;
        }else
        if( resultado <= 10 && resultado >= 1 ){
            elementoMensaje.style.color = mensajeR;
            elementoMensaje.innerHTML = resultado;
        }else{
            elementoMensaje.style.color = "red";
            elementoMensaje.innerHTML = resultado;
        }
    }
}

/*
    idEmpresa: hace referencia al id de la empresa
    idFile: es el id del input file que se ejecutará para subir las imágenes
    idBoton: es el boton que se ejecutará para mostrar el mensaje donde se seleccionarán las imagenes
    divMsj: div donde aparecerán los mensajes
*/
function subiendoImagen( idUsuario, idFile, idBoton, divMsj ) {
    document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
    document.getElementsByClassName( divMsj )[0].innerHTML = "";

    var wrapper = $("<div style='height: 0; width: 0; overflow: hidden;'><div>");
    var fileImagen = $( "#" + idFile ).wrap( wrapper );

    //todos los evento que tenga se los quito
    $( "#" + idBoton ).off("click");

    //agrego el evento click para que lo escuche el elemento
    $( "#" + idBoton ).on("click", function(event, objetct){
        if ( idUsuario == "" || idUsuario == null || idUsuario == undefined ) {
            document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
            return document.getElementsByClassName( divMsj )[0].innerHTML = "Ingresa una empresa válida.";
        }else{
            if ( idFile == "txtFileLogo" ){
                if ( $( "#divImagenLogoE>div" ).length > 0 ){
                    document.getElementsByClassName( "divMsjLogoE" )[0].style.color = mensajeR;
                    document.getElementsByClassName( "divMsjLogoE" )[0].innerHTML = "Elimina la imágen del logotipo de que tienes para poder subir otra imágen.";
                    return false;
                }
            }else
            if ( idFile == "txtFileImgEmpresa" ){
                for ( var i = 0; i < $( "#divImagenE>div>img" ).length; i++ ){
                    console.log( $( "#divImagenE>div>img" )[0].id );
                }
            }
            document.getElementsByClassName( divMsj )[0].innerHTML = "";
            fileImagen.click();
        }
    }).show();

    cargandoImagenes ( idFile );
}

function cargandoImagenes ( nombreFile ) {
    console.log( nombreFile );
    //apago las escuchas del evento change que tenga el input file
    $( "#" + nombreFile ).off("change");
    //escucho el evento change
    $( "#" + nombreFile ).on("change", function () {
        //cuando seleccione las imágenes las tengo que mostrar en el documento HTML
        var dataImg;
        if ( nombreFile == 'txtImg' )
            dataImg = validandoCantidaFotos ( nombreFile, 1, "divMsj" );

        if ( dataImg.length === 0 || dataImg.length > 4 ){
            return false;
        }
        for (var i = 0; i < dataImg.length; i++) {
            var file = this.files[i], fileName = file.name, fileSize = file.size, fileType = file.type, nombreEmpleado = "Khriz";
            if( fileType.match('image.*') ) {
                //Validamos el tipo de archivo o file que deseamos subir.
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    // Great success! All the File APIs are supported.
                    //FileReader API HTML5,
                    var reader = new FileReader();
                    reader.onload = function( e ) {
                        if ( nombreFile == 'txtImg' ) {
                            $("#divImagenLogoE").append("<div>"+ 
                                "<i class='el-icon-remove' onclick='removerElementos ( event );'></i>" +
                                "<img src='"+ e.target.result +"' id='thumb-"+ nombreFile +"' class='img-responsive img-rounded'/>" +
                                "</div>");
                            /*
                            if ( imgTipo === 1 ){
                                document.getElementsByClassName( 'divMsjLogoE' )[0].style.color = mensajeV;
                                document.getElementsByClassName( 'divMsjLogoE' )[0].innerHTML = "";
                                datosIndividuales(1, "logos", "fsLogoEmpresarial", document.getElementById("selectEmpresa").value);
                            }
                            if ( imgTipo === 2 ){
                                document.getElementsByClassName( 'divMsjImgE' )[0].style.color = mensajeV;
                                document.getElementsByClassName( 'divMsjImgE' )[0].innerHTML = "";
                                datosIndividuales(1, "imgProductos", "fsImagenesEmpresa", document.getElementById("selectEmpresa").value);  
                            }
                            */
                        }
                    }
                    reader.readAsDataURL( file );
                } else {
                    document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
                    document.getElementsByClassName( divMsj )[0].innerHTML = "Tu navegador actual no soporta la carga de imágenes, puedes actualizarlo para obtener mejores resultados.";
                }
            }else{
                document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
                document.getElementsByClassName( divMsj )[0].innerHTML = "Solo se permiten archivos JPG, GIF, PNG.";
            }   
        }
    });
    
    //document.getElementById("txtIdEmpresa").value = document.getElementById("selectEmpresa").value;
}

/*
    Función para saber cuantas fotos hay en la base de datos
    
    nombreFile: es el nombre del input file donde están las imágenes
    imgTipo: 1 logo, 2 img
    divMsj: el div donde se mostrará el mensaje
*/
function validandoCantidaFotos ( nombreFile, imgTipo, divMsj) {
    var valor = [];//meteré todas las imágenes que seleccione dentro de este vector
    var imageFiles = document.getElementById( nombreFile ), filesLength = imageFiles.files.length;
    //el primer filtro es el valor máximo de las imágenes
    if ( imgTipo === 1 ) {
        if ( filesLength > 1 ){
            document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
            return document.getElementsByClassName( divMsj )[0].innerHTML = "Revisa la imágen que seleccionaste.";
        }
    }else
    if ( imgTipo === 2 ){
        if ( filesLength > 4 ){
            document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
            return document.getElementsByClassName( divMsj )[0].innerHTML = "El número máximo de imágenes es de 4.";
        }
    }
    /*var consultaInfo = $.post( "subiendo-imagenes/",
    { 
        idEmpresa: document.getElementById( "selectEmpresa" ).value, 
        tipoCarga: imgTipo, 
        idFoto: e.target.parentElement.getElementsByTagName( "img" )[0].id 
    }, function (){}, "json" );
    
    var eliminandoImg = 
    
    consultaInfo.done(function ( data ) {
        if ( data.estatus === "insertado" ){*/
            for (var i = 0; i < filesLength; i++) {
                valor.push(imageFiles.files[i].name);
            }
            return valor;
        /*}else
        if ( data.estatus === "limite" ){
            document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
            return document.getElementsByClassName( divMsj )[0].innerHTML = "Sobrepasaste el límite de imágenes que puedes subir.";
        }else
        if( data.estatus === "error" ){
            document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
            return document.getElementsByClassName( divMsj )[0].innerHTML = "Ocurrió un error, inténtelo de nuevo.";
        }else
        if( data.estatus === "noFormato" ){
            document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
            var valorErrores;
            (data.cantidad === 1) ? valorErrores = "archivo" : valorErrores = "archivos";
            return document.getElementsByClassName( divMsj )[0].innerHTML = "El formato es incorrecto en " + data.cantidad + " " + valorErrores + ".";
        }
    });
    consultaInfo.fail(function ( data ){
        document.getElementsByClassName( divMsj )[0].style.color = mensajeR;
        return document.getElementsByClassName( divMsj )[0].innerHTML = "Ocurrió un error interno, inténtelo de nuevo.";
    });*/
}

/*
    evento que se disparará cuando se eliminen los valores (imágenes) pulsando la equis( x )
*/
function removerElementos ( e ){
        //  obteniendo el elemento padre para saber si es logo o img de lo qu se hace
    var varTipoCarga;
    var divContenedor = e.target.parentElement.parentElement.id;

    if( divContenedor == 'divImagenLogoE' )
        varTipoCarga = 1;

    //  si eliminaré la imágen debo disparar la acción que elimine la imágen de la bd
    if ( divContenedor == 'divImagenLogoE' ){
        if ( e.target.parentElement.getElementsByTagName("img")[0].id === 'thumb-txtImg' ){
            e.target.parentElement.remove();
            return document.getElementById("txtImg").value = "";
        }else{
            document.getElementsByClassName( 'divMsjE' )[0].style.color = mensajeR;
            document.getElementsByClassName( 'divMsj' )[0].innerHTML = "Ocurrio un error, inténtalo de nuevo.";
        }
    }
}

function  subiendoImagenesLogo () {
    var bar = $('.progress-bar'), percent = $('.progress-bar'), status = $('.msj');
    $("#formImg").ajaxForm({
        beforeSubmit: function (formData, jqForm, options) {
            for (var i=0; i < formData.length; i++) { 
                if (!formData[i].value) {
                    document.getElementsByClassName("divMsj")[0].innerHTML = "";
                    return false;
                }
            }
        },
        beforeSend: function () {
            document.getElementsByClassName("progressLogoE")[0].style.display = "block";
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        uploadProgress: function (event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        success: function( data ){
            bar.width(0 + '%');
            percent.html(0 + '%');
            if ( data == '{"estatus":"insertado"}' ){
                //datosIndividuales(1, "logos", "fsLogoEmpresarial", document.getElementById("selectEmpresa").value);
                return document.getElementsByClassName("progressLogoE")[0].style.display = "none";
            }else
            if ( data == '{"estatus":"limite"}' ){
                document.getElementsByClassName("progressLogoE")[0].style.display = "none";
                document.getElementsByClassName( "divMsj" )[0].style.color = mensajeR;
                return document.getElementsByClassName( "divMsj" )[0].innerHTML = "Sobrepasaste el límite de imágenes que puedes subir.";
            }else
            if( data == '{"estatus":"error"}' ){
                document.getElementsByClassName("progressLogoE")[0].style.display = "none";
                document.getElementsByClassName( "divMsj" )[0].style.color = mensajeR;
                return document.getElementsByClassName( "divMsj" )[0].innerHTML = "Ocurrió un error, inténtelo de nuevo.";
            }else
            if( data == '{"estatus":"noFormato"}' ){
                document.getElementsByClassName("progressLogoE")[0].style.display = "none";
                var valorErrores;
                (data.cantidad === 1) ? valorErrores = "archivo" : valorErrores = "archivos";
                document.getElementsByClassName( "divMsj" )[0].style.color = mensajeR;
                return document.getElementsByClassName( "divMsj" )[0].innerHTML = "El formato es incorrecto en " + data.cantidad + " " + valorErrores + ".";
            }
        },
        complete: function( data ){
        },
        error: function ( data ) {
            document.getElementsByClassName( "divMsj" )[0].style.color = mensajeR;
            return document.getElementsByClassName( "divMsj" )[0].innerHTML = "Ocurrió un error interno, inténtelo de nuevo.";
        }
    });
}

function iniciandoSesion() {
    //var redirectUri = 'https://www.facebook.com/connect/login_success.html',
    //    loginUrl = FB.getLoginUrl( {  scope: scope });

    var redirectUri = 'https://www.facebook.com/connect/login_success.html',
            loginUrl = 'https://www.facebook.com/dialog/oauth'
                + '?response_type=token'
                + '&display=popup'
                + '&scope=' + encodeURIComponent('user_about_me,publish_stream,read_stream')
                + '&redirect_uri=' + encodeURIComponent(redirectUri)
                + '&client_id=' + appId;
                console.log( redirectUri );
                console.log( loginUrl );

    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_LA/sdk.js', function(){
        FB.init({
            appId: appId,
            status     : true,
            xfbml      : true,
            version    : 'v2.0'
        });
        FB.login(function( response ) {
            if ( response.authResponse ) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
                console.log( response );
                console.log('Good to see you, ' + response.name + '.');
                acceso.primerNombre = response.first_name;
                acceso.genero = response.gender;
                acceso.idUsuario = response.id;
                acceso.apellido = response.last_name;
                acceso.nombreUsuario = response.name;
                acceso.verificacion = response.verified;

                $( "#btnIniciarSesion" ).attr( "disabled", true );

                var guardandoUsuario = $.ajax({
                    url: 'http://khrizphp.aws.af.cm/clases/actualizandoDatos.php',
                    dataType: 'jsonp',
                    data: {
                        idFb: acceso.idUsuario,
                        busquedaUser: "busquedaUser",
                    }
                });

                guardandoUsuario.done( function ( data ) {
                    console.log( "done " + data.estatus );
                    if ( data.estatus == "yaExiste" ) {
                        presionandoMenu ( "0" );
                        $( '#modalSesion' ).modal( 'hide' );
                        $( "#btnIniciarSesion" ).attr( "disabled", false );
                        return true;
                    }else
                    if ( data.estatus == "noExiste" ) {
                        var insertando = $.ajax({
                            url: 'http://khrizphp.aws.af.cm/clases/insercionDatos.php',
                            dataType: 'jsonp',
                            jsonpCallback: 'callback',
                            type: 'GET',
                            data: {
                                idFb: acceso.idUsuario,
                                nombreUsuario: acceso.nombreUsuario,
                                primerNombre: acceso.primerNombre,
                                apellidosUsuario: acceso.apellido,
                                generoUsuario: acceso.genero,
                                estadoUsuario: acceso.verificacion,
                                insertandoUser: "insertandoUser",
                            }
                        });
                        insertando.done( function ( data ) {
                            if ( data.estatus == 'insertado' ) {
                                presionandoMenu ( "0" );
                                $( '#modalSesion' ).modal( 'hide' );
                                $( "#btnIniciarSesion" ).attr( "disabled", false );
                            }else
                            if ( data.estatus == 'error' ) {
                                console.log( "fail " + data.estatus );
                                document.getElementsByClassName( "divMsjSesion" )[0].innerHTML = "Revisa tu conexión de internet y vuelve a inicar sesión.";
                                $( "#btnIniciarSesion" ).attr( "disabled", false );
                            }
                        } );
                        insertando.fail( function ( data ){
                            $( "#btnIniciarSesion" ).attr( "disabled", false );
                            console.log( data );
                        } );
                    }
                });

                guardandoUsuario.fail( function ( data ) {
                    console.log( "fail " + data.estatus );
                    document.getElementsByClassName( "divMsjSesion" )[0].innerHTML = "Revisa tu conexión de internet y vuelve a inicar sesión.";
                    $( "#btnIniciarSesion" ).attr( "disabled", false );
                } );
            });
            } else {
                delete acceso.primerNombre;
                delete acceso.genero;
                delete acceso.idUsuario;
                delete acceso.apellido;
                delete acceso.nombreUsuario;
                delete acceso.verificacion;
                console.log('User cancelled login or did not fully authorize.');
            }
        });
        //$('#loginbutton,#feedbutton').removeAttr('disabled');
        //FB.getLoginStatus(updateStatusCallback);
    });
}
