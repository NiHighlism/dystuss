import * as actionTypes from './actionTypes';

export const setTheme = theme => {
	return {
		type: actionTypes.SET_THEME,
		payload: {
			theme: theme
		}
	}
}
