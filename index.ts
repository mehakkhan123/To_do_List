#! /usr/bin/env node
import inquirer from "inquirer";

let toDoList: string[] = [];
let condition = true;

let task = async () => {
  while (condition) {
    let operation = await inquirer.prompt([
      {
        name: "operation",
        type: "list",
        choices: ["add", "delete", "view", "update", "exit"],
        message: "What do you want to do?",
      },
    ]);
    if (operation.operation === "add") {
      await add();
    } else if (operation.operation === "view") {
      await view();
    } else if (operation.operation === "update") {
      await update();
    } 
    else if (operation.operation === "exit") {
      condition = false;
    } else if (operation.operation === "delete") {
      await deleteTask();
    }
  }
};

let add = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "addTask",
      type: "input",
      message: "Enter your task:",
    },
  ]);
  toDoList.push(newTask.addTask);
  console.log(`"${newTask.addTask}" has been added successfully.`);
};

let view = async () => {
  console.log(`Your toDo list:`);
  toDoList.forEach((task, index) => {
    console.log(`${index+1}: ${task}`);
  });
};

let deleteTask = async () => {
  await view();
  let index = await inquirer.prompt([
    {
      name: "delete",
      type: "input",
      message:
        "Enter the index no. of the task you want to delete from your list:",
    },
  ]);
  let deleteIndex = toDoList.splice(index.delete - 1, 1);
  console.log(
    `"${deleteIndex}" This task has been deleted successfully from your list.`
  );
};

let update = async () => {
  await view();
  let updateTask = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the index no of the task you want to update:",
    },
    {
      name: "newTask",
      type: "input",
      message: "Enter the new task:",
    },
  ]);
  toDoList[updateTask.index-1] = updateTask.newTask;
  console.log(
    `Task at index no. ${updateTask.index} has been updated successfully. Go to "view" option to check the updated list.`
  );
};

task();
