// Selectors  ()
let leftDiv = document.querySelector('#left')  
let searchNoteInputEl = document.querySelector('#search-note')
let rightDiv = document.querySelector('#right')
let saveBtn = document.querySelector('#save-btn')
let deleteBtn = document.querySelector('#delete-btn')
let noteTitle = document.querySelector('#note-title') //The Note title you want to add
let editorEl = document.querySelector('#editor') // The editor
let showAllNotes = document.querySelector('#showAllNotes') // The editor
let noteContent = document.querySelector('#note-content')
let noteUl = document.querySelector('#note-list')
let allTitles = document.querySelector('#allTitles')
let textArea = document.querySelector('#textArea')
let OnloadWindow = window



// Event listeners
editorEl.addEventListener('click', e => e.target)
saveBtn.addEventListener('click', saveBtnClicked)
deleteBtn.addEventListener('click', deleteNote)
leftDiv.addEventListener('click', findTheId) // Find the id of the title you click on
OnloadWindow.addEventListener('load', loadOnStart )

// Global Variables
<<<<<<< HEAD
let notes =[]  // Den globala variablen
=======
let notes = []
let clickedId = null
>>>>>>> main
// Functions
function findNote(){
     console.log(allTitles)
    console.log(searchNoteInputEl.value) 
    getNotes().filter((note, index) => {
     
     if(note.title.toLowerCase() === searchNoteInputEl.value.toLowerCase()){           
            
                    let title = document.createElement('h5')  
                    title.innerText = note.title
                    title.setAttribute('id', note.id)
                    leftDiv.appendChild(title)
              
          } 
          
    })

}
function getNotes() {
     // laddar från localStorage,    all value som finns i note hämta den. 
     let retriveddata = localStorage.getItem('Notes')
     // returnerar alla notes som en array av obj
     let convertedData = JSON.parse(retriveddata)
     return convertedData // 
} 

function saveNotes() {
          localStorage.setItem('Notes', JSON.stringify(notes)) // För att spara i localstorage måste vi göra det till en string först från (let notes =[])
}

function createNote (title, content) {
<<<<<<< HEAD
     // Den gör ingenting just nu
     notes.push( {
          id: Date.now(),
          title: title, // Vi får title och contetnt från 
          content: content,
=======
     // 
     notes.push( {
          id: Date.now(),
          title,
          content,
>>>>>>> main
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
function deleteNote(){

     notes.splice(deleteBtn.value,)
     saveNotes() // sparar även i localstorage 
     window['location'].reload()
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
<<<<<<< HEAD
     let clickedId = e.target.id  // hitta från titeln
     
     getNotes().filter((note, index) => {  // getNotes är localstorage
          if(note.id == clickedId)

          // Skapa ett attribut till knappen som heter value
          {
               noteTitle.value = note.title  // vänstra sida a från formen, högra sidan är localstorage
               deleteBtn.setAttribute('value', index )  // Den hämtar value från localstorage 
               console.log(deleteBtn)
               editor.setData(`<h1>${noteTitle.value}</h1> <br> ${note.content}`)
=======
     clickedId = e.target
     
     getNotes().filter((note, index) => {
          if(note.id == clickedId.id)
          {
               clickedId.setAttribute('backgroundColor', '#ffffff')
               noteTitle.value = note.title // noteTitle.value ->från vårat form   |  från localStorage -> note.title
               deleteBtn.setAttribute('value', index )
               editor.setData(`<h1>${note.title}</h1> <br> ${note.content}`)
>>>>>>> main
               
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
          notes.map( note => {
               let title = document.createElement('h5')  
               title.innerText = note.title
               title.setAttribute('id', note.id)
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