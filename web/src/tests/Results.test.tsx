import React from 'react';
import {render} from '@testing-library/react';
import Results from '../types/Results';
import ResultsList from '../components/ResultsList';

describe('Results List', ()=> {

    test('should print results for given user', () => {
        const allResults: Results[] = [
            {input: "mango", categoryid:1,  gameid:1, userid:'1'},
            {input: "mushrooms", categoryid:2,  gameid:1, userid:'1'},
            {input: "melons", categoryid:1,  gameid:1, userid:'2'},
            {input: "mickey mouse", categoryid:2,  gameid:1, userid:'2'}
        ]
        const results = render(<ResultsList
            results={allResults}
            userId='1'
            gameNum={1}
            />)
            expect(results.getByText(/mango/i)).toBeInTheDocument()
            expect(results.getByText(/mushrooms/i)).toBeInTheDocument()
            expect(results.queryByText(/melons/i)).not.toBeInTheDocument()
            expect(results.queryByText(/mickey mouse/i)).not.toBeInTheDocument()
        })
    test('should only show results for current round', ()=> {
        const allResults: Results[] = [
            {input: "apples", categoryid:1,  gameid:1, userid:'1'},
            {input: "avacados", categoryid:2,  gameid:1, userid:'1'},
            {input: "arctic fox", categoryid:1,  gameid:2, userid:'1'},
            {input: "angel", categoryid:2,  gameid:2, userid:'1'}
        ]
        const results = render(<ResultsList
            results={allResults}
            userId='1'
            gameNum={1}
        />)
        expect(results.getByText(/apples/i)).toBeInTheDocument()
        expect(results.getByText(/avacados/i)).toBeInTheDocument()
        expect(results.queryByText(/arctic fox/i)).not.toBeInTheDocument()
        expect(results.queryByText(/angle/i)).not.toBeInTheDocument()
    })
})