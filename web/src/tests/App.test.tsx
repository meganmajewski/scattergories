import React from 'react';
import { render, screen} from "@testing-library/react";
import App from "../App";

describe('The App',()=> {
    beforeEach(()=> {
        render(<App/>);
    });
    it('should show header, name input and start game on load', ()=> {
        expect(screen.getByText('Enter your name:')).toBeInTheDocument();
        expect(screen.getByTestId('scattergories logo')).toBeInTheDocument();
    });
    it('should take you to the game when you hit the start button',  ()=> {
        screen.getByTestId('start game button').click();
        // expect(window.location).toBe('game');
        expect(screen.getByTestId('letter')).toBeInTheDocument();
    })

});