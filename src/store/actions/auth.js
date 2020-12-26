import axios from 'axios';
import * as actionTypes from './actionTypes';

// Synchronous action creator for setting sign up message
export const setSignupMessage = (message, link) => {
	return {
		type: actionTypes.SET_SIGNUP_MESSAGE,
		payload: {
			message: message,
			link: link
		}
	}
}

// Asynchronous action Creator for sign Up
export const signUp = (email, username, password, bio, confPassword) => {
	return dispatch => {

		if (confPassword !== password) {
			dispatch(setSignupMessage("Passwords don't match", ''))
		}
		else {
			const axiosOptions = {
				'method': 'POST',
				'url': `${process.env.REACT_APP_DB_HOST}/auth/signup`,
				'data': {
					'email': email,
					'username': username,
					'password': password,
					'bio': bio
				}
			}

			axios(axiosOptions)
				.then(response => {
					dispatch(setSignupMessage("Signed Up! Please verify your email!", ''))
				})
				.catch(error => {
					let status = error.response.status
					//console.log(error.response);

					if (status === 402) {
						dispatch(setSignupMessage("Username is taken", ''))
					}
					else if (status === 401) {
						dispatch(setSignupMessage("This email is registered with another account.", ''))
					}
					else {
						dispatch(setSignupMessage("It's not you, it's us. Try again later.", ''))
					}
				})
		}
	}
}

// Synchronous action creator for setting sign in message
export const setSignInMessage = (message, link) => {
	return {
		type: actionTypes.SET_SIGNIN_MESSAGE,
		payload: {
			message: message,
			link: link
		}
	}
}

// Asynchronous action creator for sign In
export const signIn = (username, password, remember) => {
	return dispatch => {

		const axiosOptions = {
			'method': 'POST',
			'url': `${process.env.REACT_APP_DB_HOST}/auth/login`,
			'data': {
				'username': username,
				'password': password,
				'remember': remember
			}
		}

		axios(axiosOptions)
			.then(response => {
				localStorage.setItem('access_token', response.data.access_token);
				localStorage.setItem('refresh_token', response.data.refresh_token);
				localStorage.setItem('userID', response.data.id);
				localStorage.setItem('username', response.data.username);
				window.location.pathname = "/profile";
			})
			.catch(error => {
				let status = error.response.status;
				if (status === 401) {
					dispatch(setSignInMessage("Couldn't verify. Please check credentials!", ''));
				}

				if (status === 402) {
					dispatch(setSignInMessage("Please verify your email before signing in. ", '/resendVerification'));
				}

				if (status === 403) {
					dispatch(setSignInMessage("Account not found. ", '/signup'));
				}
			})

	}
}

// Synchronous action creator for setting Forgot pass message
export const setForgotPassMessage = (message, link) => {
	return {
		type: actionTypes.SET_FORGOT_PASS_MESSAGE,
		payload: {
			message: message,
			link: link
		}
	}
}

// Asynchronous action creator for forgot pass handler
export const submitForgotPass = email => {
	return dispatch => {

		const axiosOptions = {
			'method': 'POST',
			'url': `${process.env.REACT_APP_DB_HOST}/auth/reset/request`,
			'data': {
				'email': email,
			}
		}

		axios(axiosOptions)
			.then(response => {
				dispatch(setForgotPassMessage("Ah, Dementia. Reset mail sent!", ''));
			})
			.catch(error => {
				let status = error.response.status

				if (status === 401) {
					dispatch(setForgotPassMessage("User is not registered. Please sign up first.", "/signup"));
				}
				else {
					dispatch(setForgotPassMessage("It's not you, it's us. Try again later.", ''));
				}
			})
	}
}

// Synchronous action creator for setting resend email message
export const setResendEmailMessage = (message, link) => {
	return {
		type: actionTypes.SET_RESEND_EMAIL_MESSAGE,
		payload: {
			message: message,
			link: link
		}
	}
}

// Asynchronous action creator for resend email handler
export const resendEmail = email => {
	return dispatch => {
		
		const axiosOptions = {
			'method': 'POST',
			'url': `${process.env.REACT_APP_DB_HOST}/auth/resendVerificationEmail`,
			'data': {
				'email': email,
			}
		}

		axios(axiosOptions)
			.then(response => {
				dispatch(setResendEmailMessage("Verification mail sent!"));
			})
			.catch(error => {
				let status = error.response.status

				if (status === 401) {
					dispatch(setResendEmailMessage("User is not registered. Please sign up first.", "/signup"));
				}
				else {
					dispatch(setResendEmailMessage("It's not you, it's us. Try again later.", ''));
				}
			})
	}
}
