module.exports = {
    modulePaths: [
        "<rootDir>/app/",
    ],
    testRegex: "tests/.*\\.test\\.(js|jsx)$",
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
        "^.+\\.css$": "jest-transform-css"
    },
    verbose: true,
};
