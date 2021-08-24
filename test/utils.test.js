const chai = require('chai');
const assert = chai.assert;
const utils = require('../utils/utils')

describe('Ujnit test utils', () => {
    it('test valid email', () => {
        const isvalid = utils.objectUtils.validateEmail('rafa@gmail.com')
        assert.isTrue(isvalid)
    })

    it('test not valid email', () => {
        const isvalid = utils.objectUtils.validateEmail('rafagmail.com')
        assert.isFalse(isvalid)
    })
})