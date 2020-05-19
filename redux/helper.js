

 function getBookItem(type, title, description, price) {
  return {
    type: type,
    title: title,
    description: description,
    price: price,
    dueDate: '',
    isGoalCompleted: false,
    isCreateGalle: false
  }
}

 function getBookItemWithGoal(type, title, description, price, dueDate, isCreateGoal, isGoalCompleted) {
  return {
    type: type,
    title: title,
    description: description,
    price: price,
    dueDate: dueDate,
    isGoalCompleted: isGoalCompleted,
    isCreateGoal: isCreateGoal
  }
}

function updateArrayItem(array,item,key){
 
 const newArray = array.map(i =>
    i.title === key
      ? i = item
      : i
  );
 return newArray
}

export  {
  getBookItem, getBookItemWithGoal,updateArrayItem
}

