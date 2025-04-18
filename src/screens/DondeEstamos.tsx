const DondeEstamos = () => {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>¿Dónde Estamos?</h1>
        <p>Nos encontramos en Av. Las Heras y Av. San Martin, Ciudad de Mendoza</p>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.5014879472853!2d-68.84569968481904!3d-32.88945798094367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e09190a087edf%3A0x2ec0f258d3e3a6b6!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20M5500%20Mendoza!5e0!3m2!1ses!2sar!4v1689786518974!5m2!1ses!2sar"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
    );
  };
  
  export default DondeEstamos;
  