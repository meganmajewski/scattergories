import React from 'react';
import {render, RenderResult, fireEvent, getByTestId, screen} from '@testing-library/react';
import CategoryList from "../components/CategoryList";
import Answer from "../types/Answer";

test('category is displayed properly in list', async () => {
    const answer: Answer = {gameid: 1, categoryId: 3, input: "inputted value", userId: "tester"}

    const answerScreen: RenderResult = render(<CategoryList gameid={1} index={2} category={"Animals"} userId={"tester"} setAnswersCallback={() => answer}/>)
    
    expect(answerScreen.getByText(/2/)).toBeInTheDocument()
    expect(answerScreen.getByText(/Animals/i)).toBeInTheDocument()
})

test('Update Answer on change of input category box', () => {
    const setAnswer = jest.fn();
    const answer: Answer = {gameid: 1, categoryId: 2, input: "cow", userId: "tester"}
    render(<CategoryList gameid={1} index={2} category={"Animals"} userId={"tester"} setAnswersCallback={setAnswer}/>)

    fireEvent.change(
        screen.getByTestId('category-input-2'),
        {target: {value: 'cow'}}

    )
    expect(setAnswer).toBeCalledWith(answer)
})