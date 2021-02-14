const { app, BrowserWindow } = require('electron')
const path = require('path')
const db = require('electron-db');

// This will save the database in the same directory as the application.
const location = path.join(__dirname, 'tables')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html');
  createTable();
  insertIntoClients();
  getRows();
  updateRow();
  deleteRecord();
  // let term = 'Test';
  // let field = 'name'
  // search(field, term);
}

function createTable() {
  db.createTable('clients', location, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
    } else {
      console.log('An error has occured. ' + msg)
    }
  })
}


function insertIntoClients() {
  let obj = new Object();
  // console.log(location);
  obj.name = "Test name";
  obj.task = "Paco, Botolan, Zambales";
  obj.date = new Date();

  if (db.valid('clients', location)) {
    db.insertTableContent('clients', location, obj, (succ, msg) => {
      // succ - boolean, tells if the call is successful
      // console.log("Success: " + succ);
      // console.log("Message: " + msg);
    })
  }
}

function getRows() {
  db.getRows('clients', location, {
    task: "Paco, Botolan, Zambales",
    name: 'Test name'
  }, (succ, result) => {
    // succ - boolean, tells if the call is successful
    // console.log("Success: " + succ);
    // console.log(result);
  })
}


function updateRow() {
  let where = {
    "name": "Test name"
  };

  let set = {
    "address": "Paco, Botolan, Zambales"
  }

  db.updateRow('clients', location, where, set, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    // console.log("Success: " + succ);
    // console.log("Message: " + msg);
  });
}

// function search(field, term) {
//   db.search('clients', location, field, term, (succ, data) => {
//   if (succ) {
//     console.log(data);
//   }
// });
// }

function deleteRecord() {
  db.deleteRow('clients', location, {'id': 1613330476955}, (succ, msg) => {
  console.log(msg);
});
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
