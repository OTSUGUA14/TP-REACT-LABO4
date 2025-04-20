package supercell.instrumentos.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import supercell.instrumentos.backend.models.CategoriaInstrumento;
import supercell.instrumentos.backend.models.Instrumento;
import supercell.instrumentos.backend.payload.InstrumentoDTO;
import supercell.instrumentos.backend.repository.CategoriaRepositorio;
import supercell.instrumentos.backend.repository.InstrumentoRepository;

@Service
public class InstrumentoService {
    @Autowired
    private InstrumentoRepository instrumentoRepository;
    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    public List<Instrumento> getAllInstrumentos(){
        return instrumentoRepository.findAll();
    }

    @Transactional
    public String addInstrumento(InstrumentoDTO instrumentoDTO){
        Optional<CategoriaInstrumento> categoriaOptional = categoriaRepositorio.findById(instrumentoDTO.idCategoria());
        Instrumento instrumento = Instrumento.builder()
            .instrumento(instrumentoDTO.instrumento())
            .marca(instrumentoDTO.marca())
            .modelo(instrumentoDTO.modelo())
            .imagen(instrumentoDTO.imagen())
            .precio(instrumentoDTO.precio())
            .costoEnvio(instrumentoDTO.costoEnvio())
            .cantidadVendida(instrumentoDTO.cantidadVendida())
            .descripcion(instrumentoDTO.descripcion())
            .idCategoria(categoriaOptional.get())
            .build();
        
        instrumentoRepository.save(instrumento);
        return "Instrumento Agregado";
    }

    @Transactional
    public Optional<Instrumento> getInstrumento(Long ID){
        return instrumentoRepository.findById(ID);
    }

    @Transactional
    public boolean delete(Long id){
        if(instrumentoRepository.existsById(id)){
            instrumentoRepository.deleteById(id);
            return true;
        } else{
            return false;
        }
    }

    @Transactional
    public Instrumento patchInstrumento(Long ID, InstrumentoDTO instrumentoDTO){
        return instrumentoRepository.findById(ID).map(existingInstrumento ->{
            // Un if por cada campo
            if (instrumentoDTO.instrumento() != null){
                existingInstrumento.setInstrumento(instrumentoDTO.instrumento());
            }
            if (instrumentoDTO.marca() != null) {
                existingInstrumento.setMarca(instrumentoDTO.marca());
            }
            if (instrumentoDTO.modelo() != null) {
                existingInstrumento.setModelo(instrumentoDTO.modelo());
            }
            if (instrumentoDTO.imagen() != null) {
                existingInstrumento.setImagen(instrumentoDTO.imagen());
            }
            if (instrumentoDTO.precio() != 0.0f) {
                existingInstrumento.setPrecio(instrumentoDTO.precio());
            }
            if (instrumentoDTO.costoEnvio() != null) {
                existingInstrumento.setCostoEnvio(instrumentoDTO.costoEnvio());
            }
            if (instrumentoDTO.cantidadVendida() != 0) {
                existingInstrumento.setCantidadVendida(instrumentoDTO.cantidadVendida());
            }
            if (instrumentoDTO.descripcion() != null) {
                existingInstrumento.setDescripcion(instrumentoDTO.descripcion());
            }
            if (instrumentoDTO.idCategoria() != null) {
                Optional<CategoriaInstrumento> categorOptional = categoriaRepositorio.findById(instrumentoDTO.idCategoria());
                existingInstrumento.setIdCategoria(categorOptional.get());
            }
            return instrumentoRepository.save(existingInstrumento);
        }).orElseThrow(() -> new EntityNotFoundException("No se encontro una noticia con el ID: " + ID));
    }

    @Transactional
    public List<CategoriaInstrumento> loadCategorias(){
        List<CategoriaInstrumento> categorias = new ArrayList<>();
        
        categorias.add(CategoriaInstrumento.builder()
            .denominacion("Cuerda")
            .build()
        );
        categorias.add(CategoriaInstrumento.builder()
            .denominacion("Viento")
            .build()
        );
        categorias.add(CategoriaInstrumento.builder()
            .denominacion("Percusion")
            .build()
        );
        categorias.add(CategoriaInstrumento.builder()
            .denominacion("Teclado")
            .build()
        );
        categorias.add(CategoriaInstrumento.builder()
            .denominacion("Electronico")
            .build()
        );

        return categoriaRepositorio.saveAll(categorias);
    }


    @Transactional
    public List<Instrumento> loadInstrumentos() {
        List<Instrumento> instrumentos = new ArrayList<>();


        instrumentos.add(Instrumento.builder()
                .instrumento("Mandolina Instrumento Musical Stagg Sunburst")
                .marca("Stagg")
                .modelo("M20")
                .imagen("nro10.jpg")
                .precio(2450)
                .costoEnvio("G")
                .cantidadVendida(28)
                .descripcion("Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.")
                .idCategoria(categoriaRepositorio.findById(1L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Pandereta Pandero Instrumento Musical")
                .marca("DyM ventas")
                .modelo("32 sonajas")
                .imagen("nro9.jpg")
                .precio(325)
                .costoEnvio("150")
                .cantidadVendida(10)
                .descripcion("1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ")
                .idCategoria(categoriaRepositorio.findById(3L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Triangulo Musical 24 Cm Percusion")
                .marca("LBP")
                .modelo("24")
                .imagen("nro8.jpg")
                .precio(260)
                .costoEnvio("250")
                .cantidadVendida(3)
                .descripcion("Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio")
                .idCategoria(categoriaRepositorio.findById(3L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Bar Chimes Lp Cortina Musical 72 Barras ")
                .marca("FM")
                .modelo("LATIN")
                .imagen("nro7.jpg")
                .precio(2250)
                .costoEnvio("G")
                .cantidadVendida(2)
                .descripcion("BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B")
                .idCategoria(categoriaRepositorio.findById(3L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Shekeres. Instrumento. Música. Artesanía. ")
                .marca("Azalea Artesanías")
                .modelo("Cuentas de madera")
                .imagen("nro6.jpg")
                .precio(850)
                .costoEnvio("300")
                .cantidadVendida(5)
                .descripcion("Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.")
                .idCategoria(categoriaRepositorio.findById(3L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Antiguo Piano Aleman Con Candelabros. ")
                .marca("Neumeyer")
                .modelo("Stratus")
                .imagen("nro3.jpg")
                .precio(17000)
                .costoEnvio("2000")
                .cantidadVendida(0)
                .descripcion("Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.")
                .idCategoria(categoriaRepositorio.findById(4L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Guitarra Ukelele Infantil Grande 60cm")
                .marca("GUITARRA")
                .modelo("UKELELE")
                .imagen("nro4.jpg")
                .precio(500)
                .costoEnvio("G")
                .cantidadVendida(5)
                .descripcion("Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad")
                .idCategoria(categoriaRepositorio.findById(1L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Teclado Organo Electronico Musical Instrumento 54 Teclas ")
                .marca("GADNIC")
                .modelo("T01")
                .imagen("nro2.jpg")
                .precio(2250)
                .costoEnvio("G")
                .cantidadVendida(1375)
                .descripcion("Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm")
                .idCategoria(categoriaRepositorio.findById(5L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Instrumentos De Percusión Niños Set Musical Con Estuche ")
                .marca("KNIGHT")
                .modelo("LB17")
                .imagen("nro1.jpg")
                .precio(2700)
                .costoEnvio("300")
                .cantidadVendida(15)
                .descripcion("Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento.")
                .idCategoria(categoriaRepositorio.findById(3L).get())
                .build());

        instrumentos.add(Instrumento.builder()
                .instrumento("Batería Musical Infantil Juguete Niño 9 Piezas Palillos ")
                .marca("Bateria")
                .modelo("Infantil")
                .imagen("nro5.jpg")
                .precio(850)
                .costoEnvio("250")
                .cantidadVendida(380)
                .descripcion("DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM")
                .idCategoria(categoriaRepositorio.findById(3L).get())
                .build());

        return instrumentoRepository.saveAll(instrumentos);
    }
}
