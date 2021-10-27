'use strict';

const fs= require('fs');
const expect = require('chai').expect;
const parseRDF = require('../lib/parse-rdf.js');

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {
    it('should be a function', () => {
        expect(parseRDF).to.be.a("function");

        const book = parseRDF(rdf);
        console.log('book---', book);
        expect(book).to.be.an("object");
        expect(book).to.be.a.property('id', 132);
        expect(book).to.be.a.property('title', 'The Art of War');

        expect(book).to.be.a.property('authors')
        .that.is.an('array').with.lengthOf(2)
        .contains('Sunzi, active 6th century B.C.')
        .contains('Giles, Lionel');

        
        expect(book).to.be.a.property('subjects')
        .that.is.an('array').with.lengthOf(2)
        .contains('War -- Early works to 1800')
        .contains('Military art and science -- Early works to 1800');
    });
});

// node rdf-to-json ../data/cache/epub/1/pg1.rdf