import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import _ from "underscore";
import {writeLog}  from "../services/logService"

export default ({ config }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config }));

	// perhaps expose some API metadata at the root

	api.get('/', (req, res) => {
		let infoData = {
			version : version,
			enabled: true
		}
		let response = _.assign({status: 'OK'}, {data: infoData})
		res.json( response );
	});

	api.post('/write', (req, res) => {
		console.log("Received request: " + req)
		writeLog(req.body)
			.then((r) => {
				let response = _.assign({status: 'OK'}, {data: null, returnCode: "write success"})
				res.json(response)
			})
			.catch((e) => {
				let response = _.assign({status: 'ERROR'}, {message: e, returnCode: "error occurred"})
				res.json(response)
			})

	});

	return api;
}
