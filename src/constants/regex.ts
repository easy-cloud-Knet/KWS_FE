export const ID_REGEX = /^20\d{8}$/;

export const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*#?&])[A-Za-z\d$@!%*#?&]{5,11}$/;

export const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

// pw regex
export const PW_ALPHABET_REGEX = /^(?=.*[a-z])(?=.*[A-Z])/;
export const PW_NUMBER_REGEX = /[0-9]/;
export const PW_SPECIAL_REGEX = /[$@!%*#?&]/;
export const PW_LENGTH_REGEX = /^[A-Za-z\d$@!%*#?&]{5,11}$/;
