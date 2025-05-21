import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { createPreferenceMP } from '../servicios/FuncionesApi';
import { useState } from 'react';
import PreferenceMP from '../entidades/mercadopago/PreferenceMP';
import { ProductoCarrito } from '../context/CarritoContext'; // o desde donde lo tengas definido

import { InstrumentoPedido, PedidoCart, PedidoDetalle } from '../models/PedidoCart';

type CheckoutMPProps = {
    montoCarrito: number;
    itemsCarrito: ProductoCarrito[];
};
function CheckoutMP({ montoCarrito, itemsCarrito }: CheckoutMPProps) {

    const [idPreference, setIdPreference] = useState<string>('');

    const getPreferenceMP = async () => {
        if (montoCarrito <= 0 || itemsCarrito.length === 0) {
            alert("Agregue al menos un instrumento al carrito");
            return;
        }

        // Armamos los detalles del pedido a partir del carrito
        const detalles: PedidoDetalle[] = itemsCarrito.map(item => {
           const instrumento = new InstrumentoPedido(item.id);


            return new PedidoDetalle(instrumento, item.cantidad);
        });


        const fechaActual = new Date().toISOString().split("T")[0];

        const pedidoCompleto = {
            fechaPedido: fechaActual,
            totalPedido: montoCarrito,
            titulo: `Pedido Buen Sabor`,
            montoTotal: montoCarrito,
            detalles: detalles
        };

        try {
            // 1. Enviamos el pedido a tu API
            const responsePedido = await fetch('http://localhost:8080/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoCompleto)
            });

            if (!responsePedido.ok) throw new Error("Error al crear el pedido");

            console.log("✅ Pedido creado correctamente");

            // 2. Creamos la preferencia de Mercado Pago
            const response: PreferenceMP = await createPreferenceMP({
                id: 0,
                titulo: pedidoCompleto.titulo,
                montoTotal: montoCarrito
            });

            console.log("Preference id: " + response.id);
            if (response?.id) setIdPreference(response.id);

        } catch (error) {
            console.error("❌ Error:", error);
            alert("Error al crear el pedido o la preferencia de Mercado Pago");
        }
    };



    //es la Public Key se utiliza generalmente en el frontend.
    initMercadoPago('APP_USR-c6496d8a-6ffe-4a98-abde-aedc89b989b7', { locale: 'es-AR' });

    //redirectMode es optativo y puede ser self, blank o modal
    return (
        <div>
            <button onClick={getPreferenceMP} className='btMercadoPago'>COMPRAR con <br></br> Mercado Pago</button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet
                    initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
                    customization={{}} // o directamente podés omitir esta prop si no la usás
                />

            </div>
        </div>
    );

}

export default CheckoutMP