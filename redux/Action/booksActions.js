import { ADD_NEW_BOOK, ADD_NEW_GOAL } from "../constant";


export  const addNewBook = (data) => ({
    type: ADD_NEW_BOOK,
    playload : data,
});

export  const addNewGoal = (data) => ({
    type: ADD_NEW_GOAL,
    playload : data,
});