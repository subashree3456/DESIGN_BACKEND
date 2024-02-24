import Task from "../model/task.model.js";

export const createtask = async (req, res) => {
  const newtask = new Task({
    author: req.userId,
    ...req.body,
  });
  try {
    const savetask = await newtask.save();
    res.status(201).json(savetask);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const deletetask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.author != req.userId) {
      return res(403).send("you can delete only your task");
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send("Task has been deleted...!");
  } catch (error) {
    res.status(500).send(error);
  }
};
export const gettasks = async (req, res) => {
  try {
    const task = await Task.find();
    if (!task) return res.status(404).send("task not found");
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
export const edittask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.author != req.userId) {
      return res(403).send("you can edit only your task");
    }
    await task.updateOne(req.body);
    res.status(200).send("Task has been updated...!");
  } catch (error) {
    res.status(500).send(error);
  }
};
export const edittaskCompelet = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.author != req.userId) {
      return res(403).send("you can edit only your task");
    }
    const data = {
      desc: task.desc,
      date: task.date,
      time: task.time,
      assignUser: task.assignUser,
      author: task.author,
      isCompleted: true,
    };

    await task.updateOne(data);
    res.status(200).send("Task has been updated...!");
  } catch (error) {
    res.status(500).send(error);
  }
};
