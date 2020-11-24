//let ed = null
let ed

DecoupledEditor
    .create(document.querySelector('#editor'))
    .then(editor => {
         ed = editor
         const toolbarContainer = document.querySelector('#toolbar-container')
         toolbarContainer.appendChild(editor.ui.view.toolbar.element)
         //editor.setData(<p>${22}</p>);
         console.log(ed)
    })
    .catch(error => {
         console.error(error)
    })

function go(data) {
     ed.setData(data)
}