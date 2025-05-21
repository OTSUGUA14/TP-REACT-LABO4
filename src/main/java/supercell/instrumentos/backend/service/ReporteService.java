package supercell.instrumentos.backend.service;

import java.time.LocalDate;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import supercell.instrumentos.backend.models.Pedido;
import supercell.instrumentos.backend.models.PedidoDetalle;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.time.format.DateTimeFormatter;
import java.util.List;

import supercell.instrumentos.backend.repository.PedidoRepository;

@Service
public class ReporteService {

    private final PedidoRepository pedidoRepository;

    public ReporteService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public byte[] generarReportePedidos(LocalDate desde, LocalDate hasta) throws IOException {
        List<Pedido> pedidos = pedidoRepository.findByFechaPedidoBetween(desde, hasta);

        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Pedidos");

            // Estilo de encabezado
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            // Crear encabezado
            Row header = sheet.createRow(0);
            String[] columnas = { "Fecha Pedido", "Instrumento", "Marca", "Modelo", "Cantidad", "Precio", "Subtotal" };
            for (int i = 0; i < columnas.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columnas[i]);
                cell.setCellStyle(headerStyle);
            }

            DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            int rowNum = 1;

            for (Pedido pedido : pedidos) {
                for (PedidoDetalle detalle : pedido.getDetalles()) {
                    if (detalle.getInstrumento() == null)
                        continue;

                    Row row = sheet.createRow(rowNum);

                    row.createCell(0).setCellValue(pedido.getFechaPedido().format(df));
                    row.createCell(1).setCellValue(detalle.getInstrumento().getInstrumento());
                    row.createCell(2).setCellValue(detalle.getInstrumento().getMarca());
                    row.createCell(3).setCellValue(detalle.getInstrumento().getModelo());
                    row.createCell(4).setCellValue(detalle.getCantidad());
                    row.createCell(5).setCellValue(detalle.getInstrumento().getPrecio());

                    // Subtotal = Cantidad * Precio (usamos fórmula Excel)
                    String cantidadCell = "E" + (rowNum + 1); // Excel rows are 1-based
                    String precioCell = "F" + (rowNum + 1);
                    row.createCell(6).setCellFormula(cantidadCell + "*" + precioCell);

                    rowNum++;
                }
            }

            // Autoajustar columnas
            for (int i = 0; i < columnas.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

}
