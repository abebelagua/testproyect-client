import { CsvBuilder } from "filefy";
import jsPDF from "jspdf";
import "jspdf-autotable";
import bfilogo from "../assets/img/sitelogo.png";
import watermark from "../assets/img/watermark.png";
import moment from "moment";

/**
 * Función para realizar ajustes a un documento PDF
 *
 * @callback pdfAdjustments
 * @param {jsPDF} doc Documento PDF
 * @param {Object} opts Opciones utiles sobre el documento PDF
 */

/**
 * Genera un documento PDF
 *
 * @category Útiles
 * @subcategory Cliente
 *
 * @function generatePDF
 *
 * @param {string} title Título del documento PDF
 * @param {string} pin Pin del usuario
 * @param {Object} options Opciones para el documento
 * @param {number} [options.top = 30] Margen superior
 * @param {number} [options.bottom = 30] Margen inferior
 * @param {number} [options.left = 40] Margen izquierdo
 * @param {number} [options.right = 40] Margen derecho
 * @param {string} [options.orientation = "landscape"] Orientación de la hoja del documento
 * @param {boolean} [options.watermark = true] Indica si se utiliza o no la marca de agua en el documento
 * @param {pdfAdjustments} [adjustments = (doc, opts) => {}] Función para realizar ajustes al documento PDF
 *
 * @returns Un objeto jsPDF
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Jaime Alan Gutiérrez Cruz
 */
// eslint-disable-next-line no-unused-vars
async function generatePDF(
	title,
	pin,
	options = {},
	adjustments = (doc, opts) => {}
) {
	const top = options.top ? options.top : 30;
	const bottom = options.bottom ? options.bottom : 30;
	const left = options.left ? options.left : 40;
	const right = options.right ? options.right : 40;
	const orientation = options.orientation ? options.orientation : "landscape";
	const withWatermark = options.watermark ? options.watermark : true;

	const logoY = top - 20;
	const logoWidth = 50;
	const logoHeight = 50;
	const localLocale = moment();
	localLocale.locale("en");
	const code = `P${localLocale.format("ddd")}-${pin}`.toUpperCase();

	// eslint-disable-next-line new-cap
	const doc = await new jsPDF(orientation, "pt", "A4").setProperties({
		title,
		author: "BFI: Banca en Línea",
		creator: code
	});
	const { width, height } = doc.internal.pageSize;

	doc.addImage(bfilogo, "PNG", left, logoY, logoWidth, logoHeight);

	doc.setFontSize(11);
	doc.text("Banco Financiero Internacional .s.a", left + logoWidth, top);

	doc.setFontSize(9);
	doc.text("https://bel.bfi.com", left + logoWidth, top + 15, {
		url: "https://bel.bfi.com"
	});

	doc.setFontSize(11);
	doc.text(moment().format("DD/MM/YYYY HH:mm:ss"), width - right - 100, top);

	doc.setFontSize(9);
	doc.text(code, width - right - 60, top + 15);

	doc.line(
		left,
		logoY + logoHeight + logoY / 2,
		width - right,
		logoY + logoHeight + logoY / 2
	);

	doc.setFontSize(12);
	doc.text(
		title ? title.toUpperCase() : "UNTITLED",
		355,
		logoY + logoHeight + logoY / 2 + 25
	);

	if (adjustments) {
		await adjustments(doc, {
			margin: {
				left,
				right,
				top: logoY + logoHeight + logoY / 2 + 40,
				bottom
			},
			headStyles: { fillColor: [0, 81, 158] },
			pageSize: { width, height }
		});
	}

	if (withWatermark) {
		const totalPages = doc.internal.getNumberOfPages();

		for (let i = 1; i <= totalPages; i += 1) {
			doc.setPage(i);
			doc.addImage(
				watermark,
				"PNG",
				width / 2 - 352 / 1.2,
				height / 2 - 157 / 2,
				352 * 1.5,
				157 * 1.5
			);
		}
	}

	return doc;
}

function generateCSV(title, columns = [], data = [], delimeter = ";") {
	const fileName = `BEL-${title.toUpperCase().replaceAll(" ", "_")}`;
	const builder = new CsvBuilder(`${fileName}.csv`);

	builder
		.setDelimeter(delimeter)
		.setColumns(columns)
		.addRows(data)
		.exportFile();
}

export { generatePDF, generateCSV };
