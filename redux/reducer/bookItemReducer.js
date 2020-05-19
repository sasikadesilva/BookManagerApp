
import { ADD_NEW_BOOK, ADD_NEW_GOAL } from "../constant";
import { updateArrayItem } from "../helper";

const initialState = {
   books : []
}

const bookItemReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_NEW_BOOK : {
            const newState = { ...state };
            
            return {
                ...state,
            
                books : [...state.books, action.playload]
            }
        }

        case ADD_NEW_GOAL : {
            console.log("========>><<NNHJJJJJJJJJ"+state.books)
            updateArrayItem(state.books,action.playload,action.playload.title)
            return{
                ...state,

                books : updateArrayItem(state.books,action.playload,action.playload.title)
            }

        }

       
        default: {
          
         
            return state;
        }

    }
}


export default bookItemReducer