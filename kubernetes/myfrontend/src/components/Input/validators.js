const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MIN = 'MIN';

// ACTIONS 
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val});

// checker function

export const validate = (value, validators) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_MIN) {
            isValid = isValid && +value >= validator.val
        }
    }
    return isValid;
};