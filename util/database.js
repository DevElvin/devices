import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseAsync("places.db");

export default function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txt) => {
      txt.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
         title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
           address TEXT NOT NULL,
           lat REAL NOT NULL,
           lng REAL NOT NULL
           )`,
        [],
        () => resolve("Places table created"),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUE (?, ?, ?, ?, ?)`,
        [place.title, place.imageUri, place.address, place.location.lat, place.location.lng],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}
