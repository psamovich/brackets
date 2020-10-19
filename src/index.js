function isOpeningBracket(bracket, bracketsConfig) {
    return bracketsConfig.some(e => bracket === e[0]);
}

function areBracketsAPair(opening, closing, bracketsConfig) {
    return bracketsConfig.find(e => opening === e[0])[1] === closing;
}

function areOpeningClosingEqual(bracket, bracketsConfig) {
    const pair = bracketsConfig.find(e => bracket === e[0]);
    return pair ? pair[0] === pair[1] : false;
}

module.exports = function check(str, bracketsConfig) {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const bracket = str[i];
        if (areOpeningClosingEqual(bracket, bracketsConfig)) {
            const previous = stack[stack.length - 1];
            if (previous && previous === bracket) {
                stack.pop();
            } else {
                stack.push(bracket);
            }
        } else if (isOpeningBracket(bracket, bracketsConfig)) {
            stack.push(bracket);
        } else {
            const lastOpeningBracket = stack.pop();
            if (!lastOpeningBracket || !areBracketsAPair(lastOpeningBracket, bracket, bracketsConfig)) {
                return false;
            }
        }
    }
    return stack.length === 0;
}
