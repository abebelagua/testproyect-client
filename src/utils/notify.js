import { toast } from "react-toastify";

/**
 * Muestra un toast para un mensaje de error.
 *
 * @category Útiles
 * @subcategory Notificaciones
 *
 * @param {string} error Mensaje
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Antonio Torres Vargas
 */
function notifyError(error) {
	toast.error(error, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	});
}

/**
 * Muestra un toast para un mensaje de advertencia.
 *
 * @category Útiles
 * @subcategory Notificaciones
 *
 * @param {string} warning Mensaje
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Roxana Bermúdez Rodríguez
 */
function notifyWarning(warning) {
	toast.warning(warning, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	});
}

/**
 * Muestra un toast de mensaje de éxito.
 *
 * @category Útiles
 * @subcategory Notificaciones
 *
 * @param {string} success Mensaje
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Jaime Alan Gutiérrez Cruz
 */
function notifySuccess(success) {
	toast.success(success, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	});
}

/**
 * Muestra un toast de mensaje de información.
 *
 * @category Útiles
 * @subcategory Notificaciones
 *
 * @param {string} info Mensaje
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Jaime Alan Gutiérrez Cruz
 */
function notifyInfo(info) {
	toast.info(info, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	});
}

/**
 * Muestra un toast en modo oscuro con un mensaje dado.
 *
 * @category Útiles
 * @subcategory Notificaciones
 *
 * @param {string} msg Mensaje
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Jaime Alan Gutiérrez Cruz
 */
function notifyDark(msg) {
	toast.dark(msg, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	});
}

/**
 * Muestra un toast con un mensaje dado.
 *
 * @category Útiles
 * @subcategory Notificaciones
 *
 * @param {string} msg Mensaje
 *
 * @since 0.0.1
 * @version 0.0.1
 * @author Jaime Alan Gutiérrez Cruz
 */
function notifyDefault(msg) {
	toast(msg, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined
	});
}

export {
	notifyError,
	notifyWarning,
	notifySuccess,
	notifyInfo,
	notifyDark,
	notifyDefault
};
