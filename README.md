# Simple Todo App

For the Todo app, I had to reorganize the code and rewrite the form validator using the "this" JavaScript keyword.

## Functionality

This app lets you create todo's with an optional due date, which can then be completed by clicking a checkbox or deleted with the delete button. 

It starts out with three existing todo's with the first one already checked. 
New todo's must have a name length between two and forty characters or else the submit button is deactivated. 

If the name is too short, an error message will appear, which disappears once the desired conditions have been met.
The date is optional, so not picking a date will not display an error message.
However, if you partially fill out the date, it will disable the submit button and display an erorr message until the date is between '01-01-2023' and '12-31-3000'.

## Technology

This project was built using HTML, CSS, and JavaScript. With the DOM connecting JS to the HTML, they all work together to create the functionality and design of this todo app.

![Screenshot 2025-05-08 112140](https://github.com/user-attachments/assets/1845f73d-7702-4067-80b7-60f221910f99)

![Screenshot 2025-05-08 112317](https://github.com/user-attachments/assets/71f6a4ea-29a2-48cd-bb46-6af91a2d5dee)

![Screenshot 2025-05-08 112351](https://github.com/user-attachments/assets/9c140107-6f62-4acb-b6d5-e074156fa13e)

## Deployment

This project is deployed on GitHub Pages:

[Link to todo-app repo](https://noathegenii.github.io/se_project_todo-app/)
