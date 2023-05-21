const DB_NAME = "utilityDB";
const DB_VERSION = 1;

export const E_UNIT_STORE = "eUnitStore";

const storeList = [E_UNIT_STORE, "hello"]; // List of stores to create

const getDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function (event) {
      reject(new Error("Error opening database", event.target.errorCode));
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      storeList.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          // Check if store exists
          db.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      });
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };
  });
};

export async function saveData(object, storeName) {
  console.log("Saving object: {}", object);

  if (object && object.id) {
    return updateData(storeName, object.id, object);
  }
  return addData(object, storeName);
}

function addData(object, storeName) {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const addRequest = objectStore.add(object);

        addRequest.onerror = function (event) {
          reject(new Error("Error adding object", event.target.errorCode));
        };

        addRequest.onsuccess = function (event) {
          resolve();
        };
      })
      .catch((error) => reject(error));
  });
}

function updateData(storeName, id, obj) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await getDB();
      const transaction = db.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const getRequest = objectStore.get(id);

      getRequest.onerror = function (event) {
        reject(new Error(`Error getting object: ${event.target.errorCode}`));
      };

      getRequest.onsuccess = function (event) {
        const data = event.target.result;

        if (!data) {
          reject(new Error(`Object with ID ${id} not found`));
          return;
        }

        const updatedObject = Object.assign({}, data, obj);
        const putRequest = objectStore.put(updatedObject);

        putRequest.onerror = function (event) {
          reject(new Error(`Error updating object: ${event.target.errorCode}`));
        };

        putRequest.onsuccess = function (event) {
          resolve(updatedObject);
        };
      };
    } catch (error) {
      reject(error);
    }
  });
}

export function getDataById(key, storeName) {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        const transaction = db.transaction([storeName], "readonly");

        const objectStore = transaction.objectStore(storeName);
        const getRequest = objectStore.get(key);

        getRequest.onerror = function (event) {
          reject(new Error("Error getting object", event.target.errorCode));
        };

        getRequest.onsuccess = function (event) {
          resolve(event.target.result);
        };
      })
      .catch((error) => reject(error));
  });
}

export function getAllData(storeName) {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        const transaction = db.transaction([storeName], "readonly");

        const objectStore = transaction.objectStore(storeName);
        const getRequest = objectStore.getAll();

        getRequest.onerror = function (event) {
          reject(new Error("Error getting objects", event.target.errorCode));
        };

        getRequest.onsuccess = function (event) {
          resolve(event.target.result);
        };
      })
      .catch((error) => reject(error));
  });
}

export function deleteData(storeName, idList) {
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        const transaction = db.transaction([storeName], "readwrite");
        const objectStore = transaction.objectStore(storeName);
        const deleteRequests = idList.map((id) => objectStore.delete(id));

        Promise.all(deleteRequests)
          .then(() => {
            resolve(
              `Object(s) with ID(s) ${idList ? idList.join(", ") : ""} deleted`
            );
          })
          .catch((error) => {
            reject(`Error deleting object(s): ${error}`);
          });
      })
      .catch((error) => reject(`Error getting database: ${error}`));
  });
}
