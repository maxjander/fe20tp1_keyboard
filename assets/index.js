// Selectors
let leftDiv = document.querySelector('#left')
let rightDiv = document.querySelector('#right')
let saveBtn = document.querySelector('#save-btn')
let loadAll = document.querySelector('#load-btn')
let noteTitle = document.querySelector('#note-title') //The Note title you want to add
let ckEditor = document.querySelector('#editor') // The editor
let showAllNotes = document.querySelector('#showAllNotes') // The editor
let noteContent = document.querySelector('#note-content')
let noteUl = document.querySelector('#note-list')
let allTitles = document.querySelector('#allTitles h2')
let textArea = document.querySelector('#textArea')

let notes =[]

// function addNote() {
//      // Making a loop that push 3 instances of note withe 
//      for(let i = 0; i<3; i++)
//      {
//           let note = {
//                id: null,
//                title: '',
//                note:'',
//                date:null,
//                favorit:false,
//           }
//           note.id = i
//           note.title = 'Your title'
//           note.note = 'This is a note.'
//           note.date = new Date().toLocaleString('se')
          
//           console.log(note.id)
//           notes.push(note)
//      }
//        return note
// }

// console.log(addNote())
// console.log(notes)


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
     saveNotes('')
     return note
}

// function findNoteById(noteId){
   
// }

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

// Append all notes
function appendAllNotes(){
     let myNotesObj = getNotes()
     myNotesObj.map(note =>{
          let title = note.title
          let content = note.content
          let fullNoteLi = document.createElement('li')


          fullNoteLi.innerHTML = `<h2>${title}</h2> <p>${content}</p>`
          noteUl.appendChild(fullNoteLi)
          
     })
}


function showNotes() {
  getNotes().map(function (note) {
    let title = document.createElement('h2')
    let ingredients = document.createElement('p')

    title.innerText = note.title
    ingredients.innerText = note.content

    showAllNotes.appendChild(title)
    showAllNotes.appendChild(ingredients)
  })
}

// Event listeners

ckEditor.addEventListener('click', (e) =>{
return e.target
})

saveBtn.addEventListener('click', (e) =>{
     console.log('Title: ', noteTitle.value ,'Content: ',ckEditor.innerHTML)
     createNote(noteTitle.value != ''?noteTitle.value : 'Ingen rubrik!'  ,ckEditor.innerHTML)
     saveNotes()
})

loadAll.addEventListener('click', (e) =>{
     noteUl.innerHTML = ''
appendAllNotes()


})








// Show all titles in the left  div (, )
window.onload = function(){
     let myNotesObj = getNotes()
     myNotesObj.map(note =>{

          let title = document.createElement('h2')  

          title.innerText = note.title
          title.setAttribute('id', note.id)
           leftDiv.appendChild(title)
          
     })
}


// create a function that find the id of the matched obj
function findTheId(e){
     let clickedId = e.target.id
     let clicked = e.target
     
     getNotes().filter(note => {
          if(note.id == clickedId)
          {
               noteTitle.value = note.title
               note.content
               ckEditor.getdata = noteContent

          }
          console.log(clicked)
     })
     
}

// create a lissener that listen form click on titles
leftDiv.addEventListener('click', findTheId)

// Check the id of the clicked Title


// Find the matched obj...

