export const addDbs = (store, db) => {
	store.dispatch('ADDDB', db);
};

export const addSchemas = (store, dbid, schemas) => {
	store.dispatch('ADDSCHEMA', dbid, schemas);
};

export const addTables = (store, dbid, schemaid, tables) => {
	store.dispatch('ADDTABLE', dbid, schemaid, tables);
};

export const addColumns = (store, dbid, schemaid, tablename, columns) => {
	store.dispatch('ADDCOLUMN', dbid, schemaid, tablename, columns);
};
