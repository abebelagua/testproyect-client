import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
	IconButton,
	InputAdornment,
	TextField,
	Tooltip
} from "@material-ui/core";
import { Clear, Search } from "@material-ui/icons";

export default function SearchField(props) {
	const { value, onChange, placeholder } = props;
	const { formatMessage } = useIntl();

	return (
		<TextField
			size="small"
			autoFocus={false}
			value={value}
			onChange={e => onChange(e.target.value)}
			placeholder={formatMessage({ id: placeholder })}
			variant="standard"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Tooltip title="search">
							<Search fontSize="small" />
						</Tooltip>
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							disabled={false}
							onClick={() => {
								onChange("");
							}}
							aria-label="search"
						>
							<Clear fontSize="small" aria-label="clear" />
						</IconButton>
					</InputAdornment>
				),
				inputProps: {
					"aria-label": "search"
				}
			}}
		/>
	);
}
SearchField.defaultProps = {
	value: null,
	placeholder: "beltable.searchTooltip"
};
SearchField.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string
};
