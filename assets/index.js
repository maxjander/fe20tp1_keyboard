// Selectors
let leftDiv = document.querySelector('#left')
let rightDiv = document.querySelector('#right')
let saveBtn = document.querySelector('#save-btn')

let deleteBtn = document.querySelector('#delete-btn')
let updateBtn = document.querySelector('#update-btn')
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
let demoHolderEl = document.querySelector('#demo-holder')
let demoH1El = document.querySelector('#demo-h1')
let demoPEl = document.querySelector('#demo-p')

let OnloadWindow = window
let favoritNote = document.querySelector('#favorit-note')
let star = document.querySelector('#star')
let starIcon = document.querySelector('#staritow')
let searchBar = document.querySelector('#searchbar')
let navListEl = document.querySelector('.nav-list')
let searchNav = document.querySelector('[data-tooltip="Search"]')
let favoritesNav = document.querySelector('[data-tooltip="Favorites"]')
let statisticsNav = document.querySelector('[data-tooltip="Statistics"]')
let settingsNav = document.querySelector('[data-tooltip="Settings"]')
let addNoteNav = document.querySelector('[data-tooltip="add"]')
let leftDivTitle = document.querySelector('#left h1')
let rbs = document.querySelectorAll('input[name="text-temp"]')
    // Event listeners
editorEl.addEventListener('click', e => e.target)
saveBtn.addEventListener('click', saveBtnClicked)
updateBtn.addEventListener('click', modifieNote)
// editorEl.addEventListener('input', modifieNote)
deleteBtn.addEventListener('click', deleteNote)
leftDiv.addEventListener('click', renderClickedNote) // Find the id of the title you click on
OnloadWindow.addEventListener('load', loadOnStart)
searchBar.addEventListener('input', searchNote)
navListEl.addEventListener('click', activeNavEl) // renderTitle
navListEl.addEventListener('click', renderTitle) // renderTitle
starIcon.addEventListener('click', addToFavorite)
textTemplates.addEventListener('click', addExempleTemplate)


// Global Variables
let notes = []
let clickedId = null
let clickedNavElement = null
let tmpTemplate = null
let tempNote = null
let currentFavIcon = false
let starIconImg = `<svg class="yellowStar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    preserveAspectRatio="xMidYMid" width="17" height="16" viewBox="0 0 17 16">
                    <path id="staritow"
                         d="M9 1L11.2857 6.71429H17L12.4286 10.7143L14.1429 17L9 13L3.85714 17L5.57143 10.7143L1 6.71429H6.71429L9 1Z" />
               </svg>`
    // let activeNav
    // Functions'

    function modifieNote() {
    let noteIndex = findeNoteIndex()
    let currentNote = notes[noteIndex]
    
     
    

    notes[noteIndex] = {
        id: currentNote.id,
        title: noteTitle.value,
        content: editorEl.innerHTML,
        contentTemplate: currentNote.contentTemplate,
        dateModified: Date.now(),
        favorite: true,
    }
    
    saveNotes()
    location.reload();
}

function createNote(title, content, contentTemplate) {

    notes.push({
        id: Date.now(),
        title,
        content,
        contentTemplate,
        dateModified: null,
        favorite: currentFavIcon,
        visited: 0
    })

    saveNotes()
}

    function findeNoteIndex() {
        currentNoteId = clickedId
    return notes.findIndex(note => note.id == currentNoteId)
}

function findeNote() {
    currentNoteId = clickedId
    return notes.find(note => note.id == currentNoteId)
}

function renderClickedNote(e) {
    // clickedId = e.target
    clickedId = Number(e.target.id)
    getNotes().filter((note, index) => {
        if (note.id == clickedId) {
            tracker(clickedId, index)
            textTemplates.remove()
            infoText.remove()
            noteTitle.value = note.title // noteTitle.value ->från vårat form   |  från localStorage -> note.title
            deleteBtn.setAttribute('value', index)
            updateBtn.setAttribute('value', index) 
            editor.ui.view.editable.element.classList.remove(editor.ui.view.editable.element.classList[editor.ui.view.editable.element.classList.length - 1])
            editor.ui.view.editable.element.classList.add(note.contentTemplate)
            let favoritIcon = document.createElement('span')
            favoritIcon.innerHTML = ""
            editor.setData(`${note.content}`) // Tog bort Title, pga blir dubbelt varje gång man sparar
                // return note
                

        }
        if (note.favorite === true) {
            star.setAttribute('fill', '#FFDF93')
        }
    })
}

function addExempleTemplate() {
    tmpTemplate = selectedTemp()
    return tmpTemplate
}

function viewDemo() {
    if (tmpTemplate.length < 1) {

        console.log(tmpTemplate)
    }

}

function renderTitle(e) {

    if (getNotes()) {
        titlesList.innerHTML = ''
        notes = getNotes()
        notes.filter(note => {
            if (note.favorite === true) {
                let timeDispl = moment(note.id).fromNow()
                let title = document.createElement('h5')
                title.innerHTML = `${note.title} ${starIconImg}`
                title.setAttribute('id', note.id)
                title.setAttribute('active', '')
                title.setAttribute('title', `Created: ${timeDispl}`)
                titlesList.appendChild(title)
                
            }

        })
    }
}

function loadOnStart() {

    if (getNotes()) {
        notes = getNotes()
        notes.map(note => {
            let timeDispl = moment(note.id).fromNow()
            let title = document.createElement('h5')
            title.innerHTML = `${note.title} ${note.favorite === true?starIconImg: ''}`
            title.setAttribute('id', note.id)
            title.setAttribute('title', `Created: ${timeDispl}`)
            titlesList.appendChild(title)
        })
    }

}


function activeNavEl(e) {
    e.preventDefault()
    clickedNavElement = e.target.getAttribute("value")
    notes = getNotes()
    leftDivTitle.innerText = clickedNavElement;
    titlesList.innerHTML = ''
    notes.forEach(note => {
        let timeDispl = moment(note.id).fromNow()
        let title = document.createElement('h5')


        switch (clickedNavElement) {
            case 'Search':
                title.innerText = note.favorit = true ? note.title + starIconImg : note.title
                break;
            case 'Favorite notes':
                title.innerHTML = `${note.title} ${starIconImg}`
                break;

            case 'Favorite notes':
                title.innerHTML = `${note.title} ${starIconImg}`
                break;

            default:
                console.log('zigg!')
                break;
        }

        // If 'Note Statistics' is clicked from navbar then run this

        // If 'Favorite notes' is clicked from navbar then run this
        // leftDivTitle.innerText === '' && note.favorite === true ?


        // If 'Saved Notes!' is clicked from navbar then run this
        // leftDivTitle.innerText === 'Saved Notes!' && note.favorite === true?
        // title.innerHTML = `${note.title} ${starIconImg}`:
        // title.innerHTML = `${note.title}`




        title.setAttribute('id', note.id)
        title.setAttribute('title', `Created: ${timeDispl}`)
        titlesList.appendChild(title)
    })

}

function tracker(noteId) {
    notes.filter(note => note.id === noteId).find(note => {
        note.visited += 1
        tempNote = note
    })
    saveNotes()
}

function searchNote(e) {
    let searchInput = e.target.value
    if (getNotes()) {
        notes = getNotes()
        notes.filter(note => {
            if (note.title.toUpperCase().includes(searchInput.toUpperCase())) {
                titlesList.innerHTML = ''
                return note
            }
        }).map(note => {

            let timeDispl = moment(note.id).fromNow()
            let title = document.createElement('h5')

            // If 'Note Statistics' is clicked from navbar then run this
            leftDivTitle.innerText === 'Note Statistics' ?
                title.innerText = `${note.title} visited: ${note.visited} times.` :

                // If 'Favorite notes' is clicked from navbar then run this
                leftDivTitle.innerText === 'Favorite notes' ?
                title.innerHTML = `${note.title} ${starIconImg}` :

                // If 'Saved Notes!' is clicked from navbar then run this
                leftDivTitle.innerText === 'Saved Notes!' && note.favorite === true ?
                title.innerHTML = `${note.title} ${starIconImg}` :
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


function deleteNote() {
    notes.splice(deleteBtn.value, 1)
    saveNotes()
    location.reload();
}

function createNote(title, content, contentTemplate) {

    notes.push({
        id: Date.now(),
        title,
        content,
        contentTemplate,
        dateModified: null,
        favorite: currentFavIcon,
        visited: 0
    })

    saveNotes()
}





function selectedTemp() {
    rbs = document.querySelectorAll('input[name="text-temp"]'); // rbs = radioButton'S
    let selectedValue; //Selected radio btn

    rbs.forEach(rb => {
        if (rb.checked) {
            selectedValue = rb.value;
        }
    })
    return selectedValue
}

function saveBtnClicked(e) {
    let selected = selectedTemp()
    createNote(
        noteTitle.value != '' ? noteTitle.value : 'Ingen rubrik!',
        editorEl.innerHTML, selected

    )
    saveNotes()
    location.reload();
}



function printNote(id) {
    id = clickedId // ????
    let = printEl = document.createElement('div')
    printEl.setAttribute('id', 'printMe')

    let myTitle = document.createElement('h2')
    let myParagrapf = document.createElement('p')

    myTitle.innerText = document.querySelector(`#${id}`).firstChild.innerText = 'sdadsad'
    myParagrapf.innerText = document.querySelector(`#${$theId}`).innerText

    return `${id}`
}

function addToFavorite() {
    currentFavIcon = star.checked = !star.checked
}