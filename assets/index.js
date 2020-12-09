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
let OnloadWindow = window
let favoritNote = document.querySelector('#favorit-note')
let star = document.querySelector('#star')
let starIcon = document.querySelector('#staritow')
let searchBar = document.querySelector('#searchbar')
let statisticsNav = document.querySelector('[data-tooltip="Statistics"]')
let leftDivTitle = document.querySelector('#left h1')
let favoritesNav = document.querySelector('[data-tooltip="Favorites"]')

// Event listeners
editorEl.addEventListener('click', e => e.target)
saveBtn.addEventListener('click', saveBtnClicked)
deleteBtn.addEventListener('click', deleteNote)
leftDiv.addEventListener('click', findTheId) // Find the id of the title you click on
OnloadWindow.addEventListener('load', loadOnStart )
searchBar.addEventListener('input', searchNote)
statisticsNav.addEventListener('click', trackInfo)
favoritesNav.addEventListener('click', renderFavorite)
starIcon.addEventListener('click', addToFavorite)

// Global Variables
let notes = []
let clickedId = null
let tempNote = null
let currentFavIcon = false
let starIconImg = `<svg class="yellowStar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid" width="17" height="16" viewBox="0 0 17 16">
                    <path id="staritow"
                         d="M9 1L11.2857 6.71429H17L12.4286 10.7143L14.1429 17L9 13L3.85714 17L5.57143 10.7143L1 6.71429H6.71429L9 1Z" />
               </svg>`
// Functions'

function renderFavorite(){

     if(getNotes()){
          leftDivTitle.innerText = "Favorite notes";
          titlesList.innerHTML = ''
          notes = getNotes()
          notes.filter(note => {
               if(note.favorite === true){
                    let timeDispl = moment(note.id).fromNow()
                    let title = document.createElement('h5')
                    title.innerHTML = `${note.title} ${starIconImg}`
                    title.setAttribute('id', note.id)
                    title.setAttribute('active','')
                    title.setAttribute('title', `Created: ${timeDispl}`)
                    titlesList.appendChild(title)
               }

          })
     }
}

function loadOnStart(){

     if(getNotes()){
          notes = getNotes()
          notes.map( note => {
              let timeDispl = moment(note.id).fromNow()
              let title = document.createElement('h5')
               title.innerHTML = `${note.title} ${note.favorite === true?starIconImg: ''}`
               title.setAttribute('id', note.id)
               title.setAttribute('title', `Created: ${timeDispl}`)
               titlesList.appendChild(title)
          })
     }

}




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
}

function tracker(noteId){
notes.filter(note => note.id === noteId).find(note => {
     note.visited +=1
     console.log('Title: ' + note.title+ ' Visited times: '+note.visited)
      tempNote = note
     })
saveNotes()
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
               //  title.innerHTML = `${note.title} ${starIconImg}`
              let timeDispl = moment(note.id).fromNow()
              let title = document.createElement('h5')

               leftDivTitle.innerText === 'Note Statistics' ? 
               title.innerText = `${note.title} Times visited: ${note.visited}` :

               leftDivTitle.innerText === 'Favorite notes'?
               title.innerHTML = `${note.title} ${starIconImg}`:
               
               leftDivTitle.innerText === 'Saved Notes!' && note.favorite === true?
               title.innerHTML = `${note.title} ${starIconImg}`:
               title.innerHTML = `${note.title}`

               
               
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


function deleteNote(){
     notes.splice(deleteBtn.value,1)
     saveNotes()
     location.reload();
}

function createNote (title, content,contentTemplate) {
     favorite = currentFavIcon
     notes.push( {
          id: Date.now(),
          title,
          content,
          dateModified: null,
          favorite,
          visited: 0
     })
     saveNotes()
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
}

function saveBtnClicked(e){
     createNote(noteTitle.value != ''?noteTitle.value : 'Ingen rubrik!', editorEl.innerHTML)
     saveNotes()
     location.reload();
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

function addToFavorite() {
          currentFavIcon = star.checked = !star.checked 
}