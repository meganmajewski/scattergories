import React from 'react';
import {screen, render} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

test('ensure homepage shows the proper text and logo', () => {
  render(<App/>)

  expect(screen.getByAltText('Scattergories, FordLabs edition')).toHaveAttribute('src', 'logo_2.svg')
  expect(screen.getByText('Enter your name:')).toBeInTheDocument()
  expect(screen.getByText('Start')).toBeInTheDocument()
  expect(screen.getByText('New to Scattergories? Read Rules')).toBeInTheDocument()
  expect(screen.getByText('Here')).toHaveAttribute('href', 'https://github.com/meganmajewski/scattergories/wiki/Rules-of-the-game/')

})

test('when start button is clicked, category list is displayed', () => {
  const app = render(<App/>)

  userEvent.click(screen.getByText('Start'))

  expect(screen.getByAltText("John Handy's head opening with squirrels coming out")).toBeInTheDocument()
})
