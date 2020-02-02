module.exports = {
    extends:'eslint-config-airbnb-base',
    rules:{
        'no-console': 2,
        'import/prefer-default-export': 0,
        'no-unused-vars': 'off',
        'no-param-reassign': 'off',
        'no-alert': 'off',
        'no-return-assign': 'off',
        'no-continue': 'off',
        'import/no-cycle': 'off',
        'no-unused-expressions': 'off',
        'max-len': 'off'
    },
    env:{
        browser:true 
    }
};