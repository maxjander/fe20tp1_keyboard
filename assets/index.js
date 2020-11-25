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
let OnloadWindow = window
// Event listeners
editorEl.addEventListener('click', e => e.target)
saveBtn.addEventListener('click', saveBtnClicked)
deleteBtn.addEventListener('click', deleteNote)
leftDiv.addEventListener('click', findTheId) // Find the id of the title you click on
OnloadWindow.addEventListener('load', loadOnStart )

// Global Variables
let notes =[]

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
function createNote (title, content) {
     notes.push( {
          id: Date.now(),
          title: title,
          content: content,
          dateModified: null,
          favorite: false,
     })
     saveNotes()

}
function deleteNote(){

     notes.splice(deleteBtn.value,)
     saveNotes()
     location.reload();
}

function modifieNote(currentNote) {
     let note = {
          id: currentNote.id,
          title: currentNote.title,
          content: currentNote.content,
          dateModified: Date.now(),
          favorite: currentNote.favorite,
     }
     return note
}
function findTheId(e){ 
     let clickedId = e.target.id
     
     getNotes().filter((note, index) => {
          if(note.id == clickedId)
          {
               noteTitle.value = note.title
               deleteBtn.setAttribute('value', index ) 
               go(note.content)
          }
     })
}
function saveBtnClicked(e){
     createNote(noteTitle.value != ''?noteTitle.value : 'Ingen rubrik!', editorEl.innerHTML)
     saveNotes()
     location.reload();
}
function loadOnStart(){
     if(getNotes()){
          notes = getNotes()
          let myNotesObj = getNotes()
          myNotesObj.map(note =>{
               let title = document.createElement('h5')  
               title.innerText = note.title
               title.setAttribute('id', note.id)
               leftDiv.appendChild(title)
          })  
     }
     
}





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