import Vue from 'vue';

export const ADDDB = (state, db) => {
	state.dblist = db;
};

export const ADDSCHEMA = (state, dbid, schemas) => {
	let model = state.dblist.find(x => x.id === parseInt(dbid));
	Vue.set(model, 'schemas', schemas);
};

export const ADDTABLE = (state, dbid, schemaid, tables) => {
	let db = state.dblist.find(x => x.id === parseInt(dbid));
	let model = db.schemas.find(x => x.schemaid === schemaid || x.schemaid === parseInt(schemaid));
	Vue.set(model, 'tables', tables);
};

export const ADDCOLUMN = (state, dbid, schemaid, tablename, columns) => {
	let db = state.dblist.find(x => x.id === parseInt(dbid));
	let model = db.schemas.find(x => x.schemaid === schemaid || x.schemaid === parseInt(schemaid));
	let table = model.tables.find(x => x.tablename === tablename);
	Vue.set(table, 'columns', columns);
};
