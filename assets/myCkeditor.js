BalloonEditor
    .create( document.querySelector( '#editor' ) )
    .then( newEditor => {
        editor = newEditor
    } )
    .catch( error => {
        console.error( error );
    } );
