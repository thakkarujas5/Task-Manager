# GET '/tasks'

## Query Parameters:-

  1) isCompleted (optional): If present, filter the tasks by completion status. If set to true, return only completed tasks. If set to false, return only incomplete tasks.
  2) sortBy (optional) - if present, sorts tasks based on the specified property. To sort in ascending order, simply provide the property name. To sort in descending order, prefix the property name with a -. For example, to sort by priority in descending order, use sortBy=-priority.

##Example Request:- GET /tasks?isCompleted=true&sortBy=-priority

# GET '/tasks/:id'

## Request Parameters:-

1) id:- The id of the task which the user wants to get.

##Example Request:- GET /tasks/1

# POST '/tasks'

## Request Body:-

  ```json
{
  "id": "ID of Task",
  "title": "Title of task",
  "description": "Description of Task",
  "isCompleted": "Boolean value indicating whether the task in completed or not",
  "priority": "Priority of task, values can be:- high, medium, low"
  
}
```

# DELETE '/tasks/:id'

## Request Parameters:-

1) id:- The id of the task which the user wants to delete.

##Example Request:- DELETE /tasks/1

# PUT '/tasks/:id'

## Request Parameters

1) id:- The id of the task which the user wants to update.


## Request Body:-

  ```json
{
  "id": "ID of Task",
  "title": "Title of task",
  "description": "Description of Task",
  "isCompleted": "Boolean value indicating whether the task in completed or not",
  "priority": "Priority of task, values can be:- high, medium, low"
  
}
```
Note:- The user does not need to fill in all the details in the json, just the ones the user wants to update is sufficient enough.
  
  
