package supercell.instrumentos.backend.controller;

import supercell.instrumentos.backend.models.Pedido;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author Gerardo
 */
public class MercadoPagoController {
    
    public PreferenceMP getPreferenciaIdMercadoPago(Pedido pedido){
        try {
            MercadoPagoConfig.setAccessToken("APP_USR-1544348409559091-051415-91745b799894918305be6ceedb54f344-205323963");
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
               .id("1234")
               .title(pedido.getTitulo())
               .description("Pedido realizado desde el carrito de compras")
               .pictureUrl("https://img-global.cpcdn.com/recipes/0709fbb52d87d2d7/1200x630cq70/photo.jpg")
               .quantity(1)
               .currencyId("ARG")
               .unitPrice(new BigDecimal(pedido.getMontoTotal()))
               .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/mpsuccess")
                    .pending("http://localhost:5173/mppending").failure("http://localhost:5173/mpfailure").build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backURL)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);
            
            PreferenceMP mpPreference = new PreferenceMP();
            mpPreference.setStatusCode(preference.getResponse().getStatusCode());
            mpPreference.setId(preference.getId());
            return mpPreference;
                
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        
    }
    
}
