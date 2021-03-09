import React from 'react';
import {screen, render} from '@testing-library/react';
import CategoryList from "./CategoryList";
import {Answer} from "../App";

test('category is displayed properly in list', () => {
    const answer: Answer = {gameid: 1, categoryId: 3, input: "inputted value", userId: "tester"}

    render(<CategoryList gameid={1} index={2} category={"Animals"} userId={"tester"} setAnswersCallback={() => answer}/>)

    //need to modify because the text is in document but test isn't passing
    expect(screen.getByText("2 : Animals")).toBeInTheDocument()
})