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
dateMap.set(0, "Baisakh");
dateMap.set(1, "Jestha");
dateMap.set(2, "Ashad");
dateMap.set(3, "Shrawan");
dateMap.set(4, "Bhadra");
dateMap.set(5, "Ashoj");
dateMap.set(6, "Kartik");
dateMap.set(7, "Mangsir");
dateMap.set(8, "Poush");
dateMap.set(9, "Magh");
dateMap.set(10, "Falgun");
dateMap.set(11, "Chaitra");
export const neplaiMonthNameMap = dateMap;

const currentYearMap = new Map();
currentYearMap.set(0, entity);
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
export const yearMap = currentYearMap;

export function getCurrentNepaliDate() {
    const currentDate = new Date();

    let obj = NepaliDateConverter.now();
    const symbols = Object.getOwnPropertySymbols(obj);
    const year = obj[symbols[0]];
    const monthIndex = obj[symbols[1]];
    const date = obj[symbols[2]];
    const day = obj[symbols[3]];
    const result = {year: year, monthIndex: monthIndex, date: date};
    return result;
}

export function getCurrentNepaliDateInNumber() {

    let obj = NepaliDateConverter.now();
    const symbols = Object.getOwnPropertySymbols(obj);
    const year = obj[symbols[0]];
    const monthIndex = obj[symbols[1]];
    const month = (monthIndex + 1) > 10 ? (monthIndex + 1) : "0" + (monthIndex + 1);
    const date = Number(obj[symbols[2]]) > 10 ? obj[symbols[2]] : "0" + obj[symbols[2]];
    return {year: year, month: month, day: date};
}

export function getCurrentNepaliDateInString() {

    let obj = NepaliDateConverter.now();
    const symbols = Object.getOwnPropertySymbols(obj);
    const year = obj[symbols[0]];
    const monthIndex = obj[symbols[1]];
    const month = (monthIndex + 1) > 9 ? (monthIndex + 1) : "0" + (monthIndex + 1);
    const date = Number(obj[symbols[2]]) > 9 ? obj[symbols[2]] : "0" + obj[symbols[2]];
    return year + "-" + month + "-" + date;
}

export function getFormaedBSDate() {
    const npDate = getCurrentNepaliDate();
    return (
        dateMap.get(npDate.monthIndex) + " " + npDate.date + ", " + npDate.year
    );
}

export function getBSMonthAndDay() {
    const npDate = getCurrentNepaliDate();
    return (
        dateMap.get(npDate.monthIndex) + " " + npDate.date
    );
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

export function getSetting() {
}

export function getFormatNepaliDate() {
    const date = getCurrentNepaliDate();
    return date.year + "-" + date.month + "-" + date.date;
}
