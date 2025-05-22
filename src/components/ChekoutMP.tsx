import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { crearPedido, createPreferenceMP } from '../servicios/FuncionesApi';
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
            // 1. Enviar pedido
            await crearPedido(pedidoCompleto);
            console.log("✅ Pedido creado correctamente");

            // 2. Crear preferencia de Mercado Pago
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
        <div className='containerMercado'>
            <button onClick={getPreferenceMP} className="btMercadoPago">
                COMPRAR con <br /> Mercado Pago
            </button>
            <div className={idPreference ? 'divVisible' : 'divInvisible'}>
                <Wallet
                    initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
                    customization={{}} // Puedes omitir esto si no lo usás
                />
            </div>
        </div>
    );


}

export default CheckoutMP