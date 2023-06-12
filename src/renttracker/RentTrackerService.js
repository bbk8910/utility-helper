import NepaliDateConverter from "nepali-date-converter";
import {
  saveData,
  getDataByIndexID,
  getDataById,
  getAllData,
  saveDataWithId,
} from "../dao/utilityDao";

export const RT_STORE_NAME = "rtStore";
export const RT_CONFIG_STORE_NAME = "rtConfig";
const year = getCurrentNepaliDate().year;
export const entity = {
  year: year,
  month: null,
  settled: false,
  settledDate: null,
  amount: null,
};

export const setting = {
  amount: 0,
};
const rtConfigKey = "rtc";

const dateMap = new Map();
dateMap.set(1, "Baisakh");
dateMap.set(2, "Jestha");
dateMap.set(3, "Ashad");
dateMap.set(4, "Shrawan");
dateMap.set(5, "Bhadra");
dateMap.set(6, "Ashoj");
dateMap.set(7, "Kartik");
dateMap.set(8, "Mangsir");
dateMap.set(9, "Poush");
dateMap.set(10, "Magh");
dateMap.set(11, "Falgun");
dateMap.set(12, "Chaitra");
export const neplaiMonthNameMap = dateMap;

const currentYearMap = new Map();
currentYearMap.set(1, entity);
currentYearMap.set(2, entity);
currentYearMap.set(3, entity);
currentYearMap.set(4, entity);
currentYearMap.set(5, entity);
currentYearMap.set(6, entity);
currentYearMap.set(7, entity);
currentYearMap.set(8, entity);
currentYearMap.set(9, entity);
currentYearMap.set(10, entity);
currentYearMap.set(11, entity);
currentYearMap.set(12, entity);
export const yearMap = currentYearMap;

export function getCurrentNepaliDate() {
  const currentDate = new Date();
  var npDate = NepaliDateConverter.fromAD(currentDate).getBS();
  return npDate;
}
export function loadConfig() {
  return getDataById(rtConfigKey, RT_CONFIG_STORE_NAME);
}
export function saveConfig(obj) {
  obj.id = rtConfigKey;
  return saveDataWithId(obj, RT_CONFIG_STORE_NAME);
}
export function saveRentTracker(obj) {
  return saveData(obj, RT_STORE_NAME);
}

export function getHistory() {
  return getAllData(RT_STORE_NAME);
}

export function getCurrentYearData(year) {
  return getDataByIndexID("year", year, RT_STORE_NAME);
}

export function getSetting() {}

export function getFormatNepaliDate() {
  const date = getCurrentNepaliDate();
  return date.year + "-" + date.month + "-" + date.date;
}

export function formatNepaliDate(obj) {
  return obj.year + "-" + obj.month + "-" + obj.date;
}
