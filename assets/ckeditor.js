DecoupledEditor
.create(document.querySelector('#editor'))
.then(editor => {
     const toolbarContainer = document.querySelector('#toolbar-container');
     toolbarContainer.appendChild(editor.ui.view.toolbar.element);
     editor.setData(`<p>${22}</p>`);
})
.catch(error => {
     console.error(error);
});
