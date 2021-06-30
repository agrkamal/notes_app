const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    console.log(chalk.green(title + ' ' + body));

    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
    } else {
        console.log(chalk.red.inverse('Note title already exists'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const containNote = notes.filter(note => note.title !== title)
    saveNotes(containNote)

    if (notes.length > containNote.length) {
        console.log(chalk.green.inverse('Note removed'))
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes: '));
    notes.forEach((note) => console.log(chalk.bold(note.title)));
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if (note) {
        console.log(chalk.green.inverse(`${note.title}:`))
        console.log(chalk.inverse(note.body))
    } else {
        console.log(chalk.red.inverse('No note found for this title.'))

    }

}

const loadNotes = () => {
    try {
        const jsonData = fs.readFileSync('notes.json')
        return JSON.parse(jsonData)
    } catch (e) {
        return []
    }


}

const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', jsonData)
}



module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}