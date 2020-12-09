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
let allTitles = document.querySelector('.allTitles h5')
let titlesList = document.querySelector('.allTitles')
let textArea = document.querySelector('#textArea')
let noteLabel = document.querySelector('#note-label')
let infoText = document.querySelector('#info-text')
let textTemplates = document.querySelector('#text-templates')
let OnloadWindow = window
let favoritNote = document.querySelector('#favorit-note')
let star = document.querySelector('#star')
let starIcon = document.querySelector('#staritow')
let searchBar = document.querySelector('#searchbar')
let statistics = document.querySelector('[data-tooltip="Statistics"]')
let leftDivTitle = document.querySelector('#left h1')


// Event listeners
editorEl.addEventListener('click', e => e.target)
saveBtn.addEventListener('click', saveBtnClicked)
deleteBtn.addEventListener('click', deleteNote)
leftDiv.addEventListener('click', findTheId) // Find the id of the title you click on
OnloadWindow.addEventListener('load', loadOnStart )
searchBar.addEventListener('input', searchNote)
statistics.addEventListener('click', trackInfo)
starIcon.addEventListener('click', addToFavorite)

// Global Variables
let notes = []
let clickedId = null
let tempNote = null
star.checked = false

// Functions'

function addToFavorite() {
          star.checked = !star.checked
          console.log(star.checked)
}

// function showFavorite(FavStatus){
// // notes.push(notes.find(note => note.includes(noteId)).splice(note.length-1, 0 , note.visited += 1))
// notes.filter(note => note.id === noteId).find(note => {
//      note.visited +=1
//      console.log(`${note.title}: Visited ${note.visited} times! `)
//       tempNote = note
// })
// saveNotes()
// // .splice(noteId.length - 1, 1, tempNote)
// }





function trackInfo(e){
     e.preventDefault()

     notes = getNotes()
     leftDivTitle.innerText = "Note Statistics";
     titlesList.innerHTML = ''
     
     
     notes.forEach(note => {
               let timeDispl = moment(note.id).fromNow()
              let title = document.createElement('h5')
               title.innerText = `${note.title}: Visited ${note.visited} times! `
               title.setAttribute('id', note.id)
               title.setAttribute('title', `Created: ${timeDispl}`)
               titlesList.appendChild(title)
     })
     
     
     
          // note, note, note => allTitles
               // note.title + "Has been visited ${besökt}"
               




}

function tracker(noteId){
// notes.push(notes.find(note => note.includes(noteId)).splice(note.length-1, 0 , note.visited += 1))
notes.filter(note => note.id === noteId).find(note => {
     note.visited +=1
     console.log('Title: ' + note.title+ ' Visited times: '+note.visited)
      tempNote = note
})
saveNotes()
// .splice(noteId.length - 1, 1, tempNote)
}

function searchNote(e) {
     let searchInput = e.target.value
     if(getNotes()){
          notes = getNotes()
          notes.filter(note => {
               if(note.title.toUpperCase().includes(searchInput.toUpperCase())){
                    titlesList.innerHTML = ''
                    return note
               }
          }).map( note => {
               
              let timeDispl = moment(note.id).fromNow()
              let title = document.createElement('h5')

               statistics ? title.innerText = note.title + " Times visited: " + note.visited : title.innerText = note.title
               title.setAttribute('id', note.id)
               title.setAttribute('title', `Created: ${timeDispl}`)
               titlesList.appendChild(title)

          })
     }
}


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

function createNote (title, content,contentTemplate) {
     notes.push( {
          id: Date.now(),
          title,
          content,
          contentTemplate,
          dateModified: null,
          favorite:false ,
          visited: 0
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
               tracker(note.id, index)
               textTemplates.remove()
               infoText.remove()
               clickedId.setAttribute('backgroundColor', '#ffffff')
               noteTitle.value = note.title // noteTitle.value ->från vårat form   |  från localStorage -> note.title
               deleteBtn.setAttribute('value', index )
               saveBtn.remove()// Tar bort spara-knappen när man går in i noten.
               editor.ui.view.editable.element.classList.remove(editor.ui.view.editable.element.classList[editor.ui.view.editable.element.classList.length-1])
               editor.ui.view.editable.element.classList.add(note.contentTemplate)
               let favoritIcon = document.createElement('span')
               favoritIcon.innerHTML = ""
               editor.setData(`${note.content}`)   // Tog bort Title, pga blir dubbelt varje gång man sparar
               // return note
          }
          if (note.favorite === true) {
               star.setAttribute('fill', '#FFDF93')
          }
     })
}

function selectedTemp(){
     const rbs = document.querySelectorAll('input[name="text-temp"]'); // rbs = radioButton'S
     let selectedValue; //Selected radio btn

     rbs.forEach(rb => {
          if(rb.checked) {
               selectedValue = rb.value;
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
               titlesList.appendChild(title)
          })
     }

}

function printNote(id) {
     id = clickedId // ????
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
