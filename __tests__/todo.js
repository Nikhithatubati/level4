/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("checking the todo list", () => {
  beforeAll(() => {
    add({
      title: "listening music ",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("add a new todo to the existing list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Watching DJ tillu movie",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("A completed TODO is maarked", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retrive all todo which are overdue", () => {
    let todo_list = overdue();

    expect(
      todo_list.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("todo which are due for today are retrieved ", () => {
    let todo_list = dueToday();

    expect(
      todo_list.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("todo which are due for later are retrieved", () => {
    let todo_list = dueLater();

    expect(
      todo_list.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
