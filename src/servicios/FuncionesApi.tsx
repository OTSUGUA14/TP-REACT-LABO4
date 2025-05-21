import PreferenceMP from "../entidades/mercadopago/PreferenceMP";

import Pedido from "../entidades/Pedido";
import { InstrumentoType } from "../models/InstrumentoType";


export async function getPlatosJSONFetch() {
	const urlServer = 'http://localhost:8080/api/platos';
	const response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function deletePlatoXId(id: number) {

	let urlServer = 'http://localhost:8080/api/eliminar/' + id;
	await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
}

export async function getPlatosXBusqueda(termino: String) {
	let urlServer = 'http://localhost:8080/api/buscar/' + termino;
	let response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json();
}


export async function getIngredientesDataBaseJSON() {
	let urlServer = 'http://localhost:8080/api/ingredientes';
	let response = await fetch(urlServer, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json();
}








export async function createPreferenceMP(pedido?: Pedido) {
	let urlServer = 'http://localhost:8080/instrumentos/api/create_preference_mp';
	let method: string = "POST";
	const response = await fetch(urlServer, {
		"method": method,
		"body": JSON.stringify(pedido),
		"headers": {
			"Content-Type": 'application/json'
		}
	});
	return await response.json() as PreferenceMP;
}

export async function obtenerPedidosAgrupadosPorMes() {
	const url = 'http://localhost:8080/api/pedidos/agrupados-por-mes';
	const res = await fetch(url);
	return await res.json();
}

export async function obtenerVentasPorInstrumento() {
	const url = 'http://localhost:8080/api/pedidos/ventas-por-instrumento';
	const res = await fetch(url);
	return await res.json();
}

export const crearPedido = async (pedido: any) => {
	const response = await fetch("http://localhost:8080/api/pedidos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(pedido)
	});

	if (!response.ok) {
		throw new Error("Error al crear el pedido");
	}

	return await response.json();
};

export async function instrumentosTodos() {
	const url = ("http://localhost:8080/instrumentos/getAll");
	const res = await fetch(url);
	return await res.json();
}