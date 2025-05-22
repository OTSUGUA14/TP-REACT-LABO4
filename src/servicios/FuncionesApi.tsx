import PreferenceMP from "../entidades/mercadopago/PreferenceMP";

import Pedido from "../entidades/Pedido";
import { InstrumentoCreateType, InstrumentoType } from "../models/InstrumentoType";


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


export const deleteInstrumento = async (idInstumento: string) => {
	await fetch(`http://localhost:8080/instrumentos/delete/${idInstumento}`, {
		method: 'DELETE'
	});
	window.location.reload();
};

export async function modificarInstrumento(id: number, data: Partial<InstrumentoType>): Promise<void> {
	const response = await fetch(`http://localhost:8080/instrumentos/patch/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Error al modificar el instrumento");
	}
}

export async function crearInstrumento(data: InstrumentoCreateType): Promise<void> {
	const response = await fetch('http://localhost:8080/instrumentos/add', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error("Error al crear el instrumento");
	}
}
export async function guardarPedido(pedido: any): Promise<any> {
	const url = 'http://localhost:8080/instrumentos/api/pedidos';

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(pedido),
	});

	if (!response.ok) {
		throw new Error('Error al guardar el pedido');
	}

	return await response.json();
}

export async function obtenerInstrumentoPorId(id: string) {
	const url = `http://localhost:8080/instrumentos/${id}`;

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error('Error al cargar el instrumento');
	}

	return await res.json();
}

export async function descargarReportePedidosExcel(desde: string, hasta: string) {
	if (!desde || !hasta) {
		throw new Error("Por favor seleccioná ambas fechas.");
	}

	const url = `http://localhost:8080/reportes/pedidos/excel?desde=${desde}&hasta=${hasta}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Error al descargar el archivo.");
	}

	const blob = await response.blob();
	return blob;
}


export async function verificarUsuario(usuarioDTO: object): Promise<{ valido: boolean; rol: string }> {
	const response = await fetch("http://localhost:8080/usuario/verify", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(usuarioDTO),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText || "Error en la respuesta");
	}

	const data = await response.json();
	return data; // { valido, rol }
}

export async function agregarUsuario(usuarioDTO: object): Promise<any> {
	const response = await fetch("http://localhost:8080/usuario/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(usuarioDTO),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(errorText || "Error en la respuesta");
	}

	const data = await response.json();
	return data;
}
