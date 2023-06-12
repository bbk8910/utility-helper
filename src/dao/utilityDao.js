import {
  RT_CONFIG_STORE_NAME,
  RT_STORE_NAME,
} from "../renttracker/RentTrackerService";

const DB_NAME = "utilityDB";
const DB_VERSION = 1;

export const E_UNIT_STORE = "eUnitStore";

const storeMap = new Map();
storeMap.set(E_UNIT_STORE, { indexList: null, autoIncrement: true }); //key is store name and value is index field
storeMap.set(RT_STORE_NAME, { indexList: ["year"], autoIncrement: true });
storeMap.set(RT_CONFIG_STORE_NAME, {
  indexList: null,
  autoIncrement: false,
});

const getDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function (event) {
      reject(new Error("Error opening database", event.target.errorCode));
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      Array.from(storeMap).map(([key, value]) => {
        if (!db.objectStoreNames.contains(key)) {
          // Check if store exists
          const objectStore = db.createObjectStore(key, {
            keyPath: "id",
            autoIncrement: value.autoIncrement,
          });
          Array.of(value?.indexList)?.forEach((data) => {
            objectStore.createIndex(data + "_index", data, {
              unique: false,
            });
          });
          console.log("Created Store name  ", key);
        }
      });
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };
  });
};

export function saveData(object, storeName) {
  console.log("Saving object: {}", object);

  if (object && object.id) {
    return updateData(storeName, object.id, object);
  }
  return addData(object, storeName);
}

export async function saveDataWithId(object, storeName) {
  console.log("Saving object: {}", object);
  let dbObj = await getDataById(object.id, storeName);
  if (dbObj) {
    updateData(storeName, object.id, object);
  } else {
    return addData(object, storeName);
  }
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
          console.log("Error getting object", event);
          resolve(null);
        };

        getRequest.onsuccess = function (event) {
          resolve(event.target.result);
        };
      })
      .catch((error) => resolve(null));
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

export function findDataByFieldName(fieldName, fieldValue, storeName) {
  fieldName = fieldName + "_index";
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        console.log("FieldName, FieldValue", fieldName, fieldValue);
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const index = objectStore.index(fieldName);
        const request = index.get(fieldValue);
        console.log("index id requet", request);

        request.onsuccess = function (event) {
          const result = event.target.result;
          resolve(result); // Resolve with the retrieved data
        };

        request.onerror = function (event) {
          reject(request.error); // Reject with the error
        };
      })
      .catch((error) => reject(error));
  });
}

export function getDataByIndexID(indexID, fieldValue, storeName) {
  indexID = indexID + "_index";
  return new Promise((resolve, reject) => {
    getDB()
      .then((db) => {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const index = objectStore.index(indexID); // Assuming the index is named "id"
        console.log("index", index);
        const request = index.openCursor();
        console.log("request", request);

        const dataList = [];

        request.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            dataList.push(cursor.value);
            // if (cursor.key === fieldValue) {
            //   // Compare with fieldValue, not indexID
            //   // Match the index ID and field value
            //   dataList.push(cursor.value);
            // }
            cursor.continue();
          } else {
            resolve(dataList); // Resolve with the list of matched data
          }
        };

        request.onerror = function (event) {
          reject(request.error); // Reject with the error
        };
      })
      .catch((error) => reject(error));
  });
}
