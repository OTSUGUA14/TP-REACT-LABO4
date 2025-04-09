import React from 'react'
import { FC } from "react";
import { IInstrumento } from '../type/IInstrumento'

const Intrumento: FC<IInstrumento> = ({ id, instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion }) => {
    return (
        <div>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex p-4" id={id}>
                <img
                    className="w-48 h-auto object-cover rounded-lg"
                    src={`/public/imagenes/${imagen}`}
                    alt="Producto"
                />
                <div className="ml-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{instrumento}</h3>
                        <h4>{marca}</h4>
                        <h4>{modelo}</h4>
                        <p className="text-2xl font-bold mt-2">${precio}</p>
                        {costoEnvio == "G" ? (

                            <p className="text-sm text-orange-500 mt-1">Envio gratis a todo el pais</p>
                        ) : (

                            <p className="text-sm text-orange-500 mt-1">Costo de Envío Interior de Argentina: ${costoEnvio}</p>
                        )
                        }
                    </div>
                    <p className="text-sm text-gray-500 mt-4">{cantidadVendida}vendidos</p>
                    <p>{descripcion}</p>
                </div>
            </div>

        </div>
    )
}

export default Intrumento
