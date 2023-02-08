const installDB = function(){
  var db = null;
  var request = window.indexedDB.open('Hamker');
  request.onerror = function(e) {
    alert('hamker does not work in this browser');
    console.log(e.target.errorCode)
  };
  request.onupgradeneeded = function(e) {
    db = request.result;
    let todo = db.createObjectStore('todo',{keyPath: 'id',autoIncrement: true})
        todo.createIndex("cont", 'cont', { unique: false });
        todo.createIndex("date", 'date', { unique: false });
        todo.createIndex("complete", 'complete', { unique: false });
    let calc = db.createObjectStore('calc',{keyPath: 'id',autoIncrement: true})
        calc.createIndex("money", 'money', { unique: false });
        calc.createIndex("date", 'date', { unique: false });
        calc.createIndex("type", 'type', { unique: false });
        calc.createIndex("memo", 'memo', { unique: false });
    console.log('hamker is Loaded')
  }
}

const writeDB = function(result, store){
  var db = null;
  if(!window.indexedDB){
    window.alert('hamker does not work in this browser')
  } else {
    var request = window.indexedDB.open('Hamker');
    request.onerror = function (e) {
      alert('error : '+e.target.errorCode)
    };
    request.onsuccess = function () {
      db = this.result;
      const target = db.transaction(store, 'readwrite').objectStore(store);
      request = target.add(result);
      request.onerror = function (e) {
        alert('error : '+e.target.errorCode)
      }
    }
  }
}

const getDB = async function(store){
  return new Promise(function(resolve,reject){
    var db = null;
    if(!window.indexedDB){
      window.alert('hamker does not work in this browser')
    } else {
      var request = window.indexedDB.open('Hamker');
      request.onerror = function (e) {
        alert('error : '+e.target.errorCode)
      };
      request.onsuccess = function () {
        db = this.result;
        const target = db.transaction(store, 'readonly').objectStore(store);
        request = target.getAll();
        request.onerror = function (e) {
          reject(alert('error : '+e.target.errorCode))
        }
        request.onsuccess = function (e) {
          var result = e.target.result;
          resolve(result)
        }
      }
    }
  })
}

const delData = function (id, store){
  var db = null;
  var request = window.indexedDB.open('Hamker');

  request.onerror = function (e) {
    alert('hamker does not work in this browser');
  };
  request.onsuccess = function (e) {
    db = this.result;
    let target = parseInt(id);
    const request = db.transaction(store, 'readwrite').objectStore(store);
    request.delete(target).onsuccess = function(){

    }
  }
}

const todoComplete = function(id){
  var db = null;
  var request = window.indexedDB.open('Hamker');

  request.onerror = function (e) {
    alert('hamker does not work in this browser');
  };
  request.onsuccess = function (e) {
    db = this.result;
    let target = parseInt(id);
    const request = db.transaction('todo', 'readwrite').objectStore('todo');
    request.get(target).onsuccess = function(e){
      let data = e.target.result;
      data.complete = (data.complete === 0)? 1:0;
      request.put(data);
    }
  }
}

export {installDB, getDB, writeDB, delData, todoComplete}