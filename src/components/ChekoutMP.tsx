import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { createPreferenceMP } from '../servicios/FuncionesApi';
import { useState } from 'react';
import PreferenceMP from '../entidades/mercadopago/PreferenceMP';


function CheckoutMP({ montoCarrito = 0 }) {

    const [idPreference, setIdPreference] = useState<string>('');

    const getPreferenceMP = async () => {
        if (montoCarrito > 0) {
            const response: PreferenceMP = await createPreferenceMP({ id: 0, titulo: 'Pedido Buen Sabor', montoTotal: montoCarrito });
            console.log("Preference id: " + response.id);
            if (response)
                setIdPreference(response.id);
        } else {
            alert("Agregue al menos un plato al carrito");
        }

    }


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