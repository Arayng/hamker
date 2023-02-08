import { IDBPDatabase, openDB } from "idb";

function indexedDb() {
  let db = null;
  let database = 'hamkerr';
  const tables = ['todo','calc']

  async function createObjectStore(){
    try{
      db = await openDB(database, 1, {
        upgrade(db){
          for(const t of tables){
            if (db.objectStoreNames.contains(t)){
              continue;
            }
            db.createObjectStore(t)
          }
        }
      });
    } catch(e){
      return false;
    }
  }

  async function getTodo(){
    const tx = db.transaction('todo', 'readonly');
    const store = tx.objectStore('todo');
    const result = await store.getAll()
    return result;
  }
}
export default indexedDb;
