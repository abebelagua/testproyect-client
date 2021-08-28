function frecuencyEC(value, formatMessage) {
	switch (value) {
		case "BSN":
			return formatMessage({ id: "frequency.bsn" });
		case "WEE":
			return formatMessage({ id: "frequency.wee" });
		case "M01":
			return formatMessage({ id: "frequency.m01" });
		case "M02":
			return formatMessage({ id: "frequency.m02" });
		case "M03":
			return formatMessage({ id: "frequency.m03" });
		case "M04":
			return formatMessage({ id: "frequency.m04" });
		case "M05":
			return formatMessage({ id: "frequency.m05" });
		case "M06":
			return formatMessage({ id: "frequency.m06" });
		case "M07":
			return formatMessage({ id: "frequency.m07" });
		case "M08":
			return formatMessage({ id: "frequency.m08" });
		case "M09":
			return formatMessage({ id: "frequency.m09" });
		case "M10":
			return formatMessage({ id: "frequency.m10" });
		case "M11":
			return formatMessage({ id: "frequency.m11" });
		case "M12":
			return formatMessage({ id: "frequency.m12" });
		case "TWM":
			return formatMessage({ id: "frequency.twm" });
		default:
			return "";
	}
}

function ifHaveMovements(value, formatMessage) {
	if (value === "Y") {
		return formatMessage({ id: "query.ac.ymovement" });
	}
	return value;
}

const scrollTop = () => {
	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
};

const getConfirmation = value => {
	let cfm = "";
	switch (value) {
		case "WITHOUT":
			cfm = "querie.lc.without";
			break;
		case "CONFIRM":
			cfm = "querie.lc.confirm";
			break;
		default:
			cfm = value;
	}

	return cfm;
};

function getAmount(amount, currency) {
	return `${currency} ${Number.parseFloat(amount).toFixed(2)}`;
}

function getTypeLC(statement) {
	let status = "";
	switch (statement) {
		case "MD":
			status = "querie.lc.MD";
			break;
		case "DP":
			status = "querie.lc.DP";
			break;
		case "SP":
			status = "querie.lc.SP";
			break;
		case "CO":
			status = "querie.lc.CO";
			break;
		case "AC":
			status = "querie.lc.AC";
			break;
		case "MA":
			status = "querie.lc.MA";
			break;
		case "-":
			status = "querie.lc.A";
			break;
		default:
			status = statement;
	}

	return status;
}

function getTypeName(checkbook) {
	let type = "";
	switch (checkbook) {
		case "Certificado":
			type = "querie.cb.certificate";
			break;
		case "Nominativo":
			type = "querie.cb.nominative";
			break;
		default:
			type = checkbook;
	}

	return type;
}

export {
	scrollTop,
	getConfirmation,
	getAmount,
	getTypeLC,
	frecuencyEC,
	ifHaveMovements,
	getTypeName
};
