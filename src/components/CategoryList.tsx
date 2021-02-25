import React from 'react';
import { Answer } from '../App';
interface Props {
    index: number,
    category: string;
    setAnswersCallback: (answer: Answer) => void
}
export default function CategoryList(props: Props): JSX.Element {
    
    return (
    <div key={props.index}>
       {props.index}: {props.category}
       <input type="text" onChange={(e)=> {
            props.setAnswersCallback({input: e.target.value, categoryId: props.index})
            console.log(e)
       }}/>
    </div>)
} 