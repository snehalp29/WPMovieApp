var { expect } = require('chai')
var cmain = require('./main')
describe('test', () => {
    it('works', () => {
        expect(true).to.be.true
    })
    it('works again', () => {
        expect('hi').to.equal('hi')
    })
    it('require is working', () => {
        expect(cmain).to.exist;
    });
})