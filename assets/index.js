// Selectors
let leftDiv = document.querySelector('#left')
let rightDiv = document.querySelector('#right')
let saveBtn = document.querySelector('#save-btn')
let deleteBtn = document.querySelector('#delete-btn')
let noteTitle = document.querySelector('#note-title') //The Note title you want to add
let editorEl = document.querySelector('#editor') // The editor
let showAllNotes = document.querySelector('#showAllNotes') // The editor
let noteContent = document.querySelector('#note-content')
let noteUl = document.querySelector('#note-list')
let allTitles = document.querySelector('#allTitles h2')
let textArea = document.querySelector('#textArea')
let noteLabel = document.querySelector('#note-label')
let infoText = document.querySelector('#info-text')
let textTemplates = document.querySelector('#text-templates')
let OnloadWindow = window



// Event listeners
editorEl.addEventListener('click', e => e.target)
saveBtn.addEventListener('click', saveBtnClicked)
deleteBtn.addEventListener('click', deleteNote)
leftDiv.addEventListener('click', findTheId) // Find the id of the title you click on
OnloadWindow.addEventListener('load', loadOnStart )

// Global Variables
let notes = []
let clickedId = null
let clickedTemp
// Functions
function getNotes() {
     // laddar från localStorage
     let retriveddata = localStorage.getItem('Notes')
     // returnerar alla notes som en array av obj
     let convertedData = JSON.parse(retriveddata)
     return convertedData
}

function saveNotes() {
          localStorage.setItem('Notes', JSON.stringify(notes))
}

<<<<<<< HEAD
function createNote (title, content) {
     //
=======
function createNote (title, content,contentTemplate) {
>>>>>>> Raulf
     notes.push( {
          id: Date.now(),
          title,
          content,
          contentTemplate,
          dateModified: null,
          favorite: false,
     })
     saveNotes()
}

function deleteNote(){

     notes.splice(deleteBtn.value,1)
     saveNotes()
     location.reload();
}

function modifieNote(currentNote) {
     let note = {
          id: currentNote.id,
          title: currentNote.title,
          content: currentNote.content,
          contentTemplate: currentNote.contentTemplate,
          dateModified: Date.now(),
          favorite: currentNote.favorite,
     }
     return note
}
function findTheId(e){
     clickedId = e.target

     getNotes().filter((note, index) => {
          if(note.id == clickedId.id)
          {
               textTemplates.remove()
               infoText.remove()
               clickedId.setAttribute('backgroundColor', '#ffffff')
               noteTitle.value = note.title // noteTitle.value ->från vårat form   |  från localStorage -> note.title
               deleteBtn.setAttribute('value', index )
<<<<<<< HEAD
               editor.setData(`${note.content}`)   // Tog bort Title, pga blir dubbelt varje gång man sparar

=======
               editor.ui.view.editable.element.classList.remove(editor.ui.view.editable.element.classList[editor.ui.view.editable.element.classList.length-1])
               editor.ui.view.editable.element.classList.add(note.contentTemplate)
               let favoritIcon = document.createElement('span')
               favoritIcon.innerHTML = ""
               editor.setData(`${note.content}`)   // Tog bort Title, pga blir dubbelt varje gång man sparar

          }
     })
}

function selectedTemp(){
     const rbs = document.querySelectorAll('input[name="text-temp"]');
     let selectedValue;

     rbs.forEach(rb => {
          if(rb.checked) {
               selectedValue = rb.value;
>>>>>>> Raulf
          }
     })
     return selectedValue
}

function saveBtnClicked(e){
     let selected = selectedTemp()
     createNote(
          noteTitle.value != ''?noteTitle.value : 'Ingen rubrik!',
          editorEl.innerHTML, selected

      )
     saveNotes()
     location.reload();
}

function loadOnStart(){

     if(getNotes()){
          notes = getNotes()
          notes.map( note => {
              let timeDispl = moment(note.id).fromNow()
              let title = document.createElement('h5')

               title.innerText = note.title
               title.setAttribute('id', note.id)
               title.setAttribute('title', `Created: ${timeDispl}`)
               console.log(timeDispl);
               leftDiv.appendChild(title)
          })
     }

}

function printNote(id) {
     id = clickedId
     let = printEl = document.createElement('div')
     printEl.setAttribute('id', 'printMe')

     let myTitle = document.createElement('h2')
     let myParagrapf = document.createElement('p')

     myTitle.innerText = document.querySelector(`#${id}`).firstChild.innerText= 'sdadsad'
     myParagrapf.innerText=document.querySelector(`#${$theId}`).innerText

     return `${id}`
}

// function loadOnStart(){
//      let myNotesObj
//      if(myNotesObj = notes = getNotes()){
//           // notes = getNotes()
//           // let myNotesObj = getNotes()
//           myNotesObj.map(note =>{
//                let title = document.createElement('h5')
//                title.innerText = note.title
//                title.setAttribute('id', note.id)
//                leftDiv.appendChild(title)
//           })
//      }

// }





// Check the id of the clicked Title


// Find the matched obj...

// Good To Have Stuff
// // Append all notes
// function appendAllNotes(){
//      let myNotesObj = getNotes()
//      myNotesObj.map(note =>{
//           let title = note.title
//           let content = note.content
//           let fullNoteLi = document.createElement('li')


//           fullNoteLi.innerHTML = `<h2>${title}</h2> <p>${content}</p>`
//           noteUl.appendChild(fullNoteLi)

//      })
// }
