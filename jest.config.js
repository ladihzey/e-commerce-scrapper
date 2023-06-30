module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '@static/(.*)': '<rootDir>/static/$1',
    },
};
