BalloonEditor
    .create( document.querySelector( '#editor' ), {
        placeholder: 'Write here...'
    }, {
      toolbar: {
           items: [  'heading', '|','bold', 'italic', '|', 'bulletedList', 'numberedList', ],

           heading: {
          options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
          }
       }
        } )
        .then( editor => {
            window.editor = editor;
            // let focusedEditor = editor.editing.view.focus()

            
        } )
        .catch( error => {
            console.error( error );
    } );
