const DB_NAME = "MovieDB";
// const STORE_NAME = "bookmarks";
const DB_VERSION = 1;

// Open IndexedDB
export const openDB = (STORE_NAME) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      try {
        const db = event.target.result;
        // console.log("test 1",db);
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "_id", autoIncrement: true });

          objectStore.createIndex('recordId', 'recordId', { unique: false });
        //   console.log("test 2",objectStore);
        }
      } catch (error) {
        console.error("Error during onupgradeneeded:", error);
      }
    };

    request.onsuccess = () => {
    //   console.log("onsuccess open - ",request);
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error("Failed to open DB:", event.target.error);
      reject(event.target.error);
    };
  });
};


/**
 * 
 * payload - recordId, title, type, flag-> bookMarked, alredyWatched, ... favourite
 */
export const upsertRecord = async (payload) => {
  const STORE_NAME = "userRecords";

  try {
    const db = await openDB(STORE_NAME);

    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // Access the index for movieId
    const index = store.index("recordId");

    return new Promise((resolve, reject) => {
      // Look for an existing record with the given movieId
      const keyRange = IDBKeyRange.only(payload.recordId);
      const request = index.openCursor(keyRange);

      request.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
          // Record exists, perform an update
          const existingRecord = cursor.value;

          const updatedRecord = {
            ...existingRecord,
            ...payload,
          };

          const updateRequest = cursor.update(updatedRecord);

          updateRequest.onsuccess = () => {
            console.log("Bookmark updated:", updatedRecord);
            resolve({ bool: true, type:"updated" });
          };

          updateRequest.onerror = (event) => {
            console.error("Failed to update bookmark:", event.target.error);
            reject({ bool: false, errorMsg:event.target.error});
          };

        } else {
          // No record found, perform an add
          const addRequest = store.add(payload);

          addRequest.onsuccess = () => {
            console.log("Bookmark added:", payload);
            resolve({ bool: true, type:"added" });
          };

          addRequest.onerror = (event) => {
            console.error("Failed to add bookmark:", event.target.error);
            reject({ bool: false, errorMsg:event.target.error});
          };
        }
      };

      request.onerror = (event) => {
        console.error("Cursor error:", event.target.error);
        reject({ bool: false, errorMsg: event.target.error});
      };
    });

  } catch (error) {
    console.error("upsertBookmark error:", error);
    return Promise.reject(error);
  }
};

export const getDataByRecordId= async (recordId) => {
  try {
    const STORE_NAME = "userRecords";
    
    const db = await openDB(STORE_NAME);
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const index = store.index("recordId");

    // Create a query to search for a specific recordId
    const keyRange = IDBKeyRange.only(recordId);
    const request = index.get(keyRange);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve({ bool: true, data: request.result});
      };

      request.onerror = (event) => {
        console.error("Failed to get bookmarks:", event.target.error);
        reject({ bool: false, errorMsg: event.target.error});
      };
    });
  } catch (error) {
    console.error("getDataByRecordId error:", error);
    return Promise.reject({bool: false, msg: "Something went wrong", errorMsg: error});
  }
};

export const getAllDataFromDB= async () => {
  try {
    const STORE_NAME = "userRecords";
    
    const db = await openDB(STORE_NAME);
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const request = store.getAll();


    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve({ bool: true, data: request.result});
      };

      request.onerror = (event) => {
        console.error("Failed to get bookmarks:", event.target.error);
        reject({ bool: false, errorMsg: event.target.error});
      };
    });
  } catch (error) {
    console.error("getDataByRecordId error:", error);
    return Promise.reject({bool: false, msg: "Something went wrong", errorMsg: error});
  }
};