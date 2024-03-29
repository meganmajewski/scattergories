import React from 'react';
import Answer from "../types/Answer";
interface Props {
    gameid: number,
    index: number,
    category: string;
    userId: string;
    setAnswersCallback: (answer: Answer) => void
}
export default function CategoryList(props: Props): JSX.Element {

    return (
    <div key={props.index} data-testid={`category-item-${props.index}`}>
       {props.index}: {props.category}
       <input className="category-input" data-testid={`category-input-${props.index}`} type="text" onChange={(e)=> {
            props.setAnswersCallback({gameid: props.gameid, userId: props.userId, input: e.target.value, categoryId: props.index})
       }}/>
    </div>)
} 