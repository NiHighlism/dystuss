import * as actionTypes from './actions/actionTypes'

const themeDictionary = {
  Midnight: {
    name: "dark",
    color: "#afbda6",
    backimg: "/assets/firewatch_1.jpg"
  },
  Dawn: {
    name: "dark",
    color: "#f2c548",
    backimg: "/assets/firewatch_2.jpg"
  },
  Morning: {
    name: "light",
    color: "#306458",
    backimg: "/assets/firewatch_3.jpg"
  },
  Midmorning: {
    name: "light",
    color: "#3c6e8f",
    backimg: "/assets/firewatch_4.jpg"
  },
  Afternoon: {
    name: "light",
    color: "#9a5126",
    backimg: "/assets/firewatch_5.jpg"
  },
  Dusk: {
    name: "dark",
    color: "#f5ba54",
    backimg: "/assets/firewatch_6.jpg"
  },
  Evening: {
    name: "dark",
    color: "#95d1e9",
    backimg: "/assets/firewatch_7.jpg"
  },
  Night: {
    name: "dark",
    color: "#a0a5ab",
    backimg: "/assets/firewatch_8.jpg"
  }
}

let timeSlot;
let hr = new Date().getHours();

if (hr >= 1 && hr < 4)
  timeSlot = "Midnight";
else if (hr >= 4 && hr < 6)
  timeSlot = "Dawn";
else if (hr >= 6 && hr < 9)
  timeSlot = "Morning";
else if (hr >= 9 && hr < 12)
  timeSlot = "Midmorning";
else if (hr >= 12 && hr < 17)
  timeSlot = "Afternoon";
else if (hr >= 17 && hr < 20)
  timeSlot = "Dusk";
else if (hr >= 20 && hr < 22)
  timeSlot = "Evening";
else timeSlot = "Night";

themeDictionary["Auto-change"] = { ...themeDictionary[timeSlot] }

// Loading a pre-set theme (if any) from LocalStorage

let presetTheme;
let themeSet = JSON.parse(localStorage.getItem("themeSet"));

if (themeDictionary[themeSet] !== undefined) {
  presetTheme = { ...themeDictionary[themeSet] }
}
else {
  // Default theme is set automatically according to the time
  presetTheme = { ...themeDictionary[timeSlot] };
}

// Initial State
const initialState = {
  Theme: { ...presetTheme },
  themeDict: themeDictionary,
  signUpMessage: '',
  signUpFollowLink: '',
  signInMessage: '',
  signInFollowLink: '',
  forgotPassMessage: '',
  forgotPassFollowLink: '',
  resendEmailMessage: '',
  resendEmailFollowLink: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_THEME:
      localStorage.setItem("themeSet", JSON.stringify(action.payload.theme))
      if (action.payload.theme === "Auto-change")
        return {
          ...initialState,
          Theme: { ...themeDictionary[timeSlot] }
        }
      else
        return {
          ...initialState,
          Theme: { ...themeDictionary[action.payload.theme] }
        }
    case actionTypes.SET_SIGNUP_MESSAGE:
      return {
        ...initialState,
        signUpMessage: action.payload.message,
        signUpFollowLink: action.payload.link
      }
    case actionTypes.SET_SIGNIN_MESSAGE:
      return {
        ...initialState,
        signInMessage: action.payload.message,
        signInFollowLink: action.payload.link
      }
    case actionTypes.SET_FORGOTPASS_MESSAGE:
      return {
        ...initialState,
        forgotPassMessage: action.payload.message,
        forgotPassFollowLink: action.payload.link
      }
    case actionTypes.SET_RESEND_EMAIL_MESSAGE:
      return {
        ...initialState,
        resendEmailMessage: action.payload.message,
        resendEmailFollowLink: action.payload.link
      }
    default:
      return {
        ...state
      }
  }
}

export default reducer;
