// Add a commit
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
     let data = localStorage.getItem('Notes')
     // returnerar alla notes som en array av obj
     let convertedData = JSON.parse(data)
     return convertedData
} 

function saveNotes(notes) {

          localStorage.setItem('Notes', JSON.stringify(notes))

}

function createNote (title="", content = "") {
     let note = {
          id: Date.now(),
          title,
          content,
          dateModified: null,
          favorite: false,
     }
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

saveNotes(createNote('Köp-Lista', 'Köp chokladglass'))
getNotes(notes)

function testNotes (n) {
          let notes = [];
          for(let i = 1; i < n; i++) {
               notes.push(createNote())
          }
     return notes;
}
saveNotes(testNotes(5))