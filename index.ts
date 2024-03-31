#! /usr/bin/env node
import inquirer from "inquirer";

let toDoList: string[] = [];
let condition = true;

while (condition) {
  let input = await inquirer.prompt([
    {
      name: "add",
      type: "input",
      message: "What do you want to add in your todo list?",
    },
    {
      name: "addMore",
      type: "confirm",
      message: "Do you want to add more in your todo list?",
      default: "false",
    }
  ]);
  toDoList.push(input.add);
  condition = input.addMore;
  console.log(toDoList);
}