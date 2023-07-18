import * as SQLite from "expo-sqlite";
import { networks } from "./networks";

const useDB = () => {
  const dbInit = () => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase("bitwallet.db");
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT)",
          [],
          () => {
            const db = SQLite.openDatabase("bitwallet.db");
            db.transaction((tx) => {
              tx.executeSql(
                "CREATE TABLE IF NOT EXISTS networks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, chainId TEXT, chainIdHex TEXT, isSelected INTEGER, rpcURL TEXT, account TEXT, privateKey TEXT)",
                [],
                async () => {
                  await Promise.all(
                    networks.map(async (network, index) => {
                      await dbAdd("networks", {
                        id: index + 1,
                        name: network.name,
                        chainId: network.chainId,
                        chainIdHex: network.chainIdHex,
                        isSelected: network.isSelected,
                        rpcURL: network.rpcURL,
                        account: network.account,
                        privateKey: network.privateKey,
                      }).catch((err) => console.log(err));
                    })
                  );
                  resolve();
                },
                (error) => reject(error)
              );
            });
          },
          (error) => reject(error)
        );
      });
    });
  };

  const dbRead = (table) => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase("bitwallet.db");
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM " + table,
          null,
          (txObj, resultSet) => resolve(resultSet.rows._array),
          (txObj, error) => reject(error)
        );
      });
    });
  };

  const dbAdd = (table, values) => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase("bitwallet.db");
      db.transaction((tx) => {
        const columns = Object.keys(values).join(",");
        const placeholders = Object.keys(values)
          .map(() => "?")
          .join(",");

        tx.executeSql(
          `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
          Object.values(values),
          (_, result) => resolve(result.insertId),
          (error) => reject(error)
        );
      });
    });
  };

  const dbUpdate = (table, values, whereClause, whereArgs) => {
    return new Promise((resolve, reject) => {
      const db = SQLite.openDatabase("bitwallet.db");
      db.transaction((tx) => {
        const setColumns = [];
        const setValues = [];

        Object.keys(values).forEach((column) => {
          setColumns.push(`${column} = ?`);
          setValues.push(values[column]);
        });

        const setClause = setColumns.join(", ");

        const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

        tx.executeSql(
          query,
          [...setValues, ...whereArgs],
          (_, result) => resolve(result.rowsAffected),
          (error) => reject(error)
        );
      });
    });
  };

  const dbReset = () => {
    const db = SQLite.openDatabase("bitwallet.db");
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        const queries = [
          "DROP TABLE IF EXISTS account",
          "DROP TABLE IF EXISTS networks",
        ];

        const promises = queries.map((query) => {
          return new Promise((resolve, reject) => {
            tx.executeSql(
              query,
              [],
              (txObj, resultSet) => {
                console.log(`Table '${query}' deleted`);
                resolve();
              },
              (txObj, error) => {
                console.log(`Error deleting table '${query}':`, error);
                reject(error);
              }
            );
          });
        });

        Promise.all(promises)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  return { dbInit, dbRead, dbAdd, dbUpdate, dbReset };
};

export default useDB;
