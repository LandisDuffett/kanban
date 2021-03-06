import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class TasksService {

  async getAll(userEmail) {
    return await dbContext.Tasks.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }
  async getByListId(id, userEmail) {
    let data = await dbContext.Tasks.find({ listId: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board.");
    }
    return data;
  }
  async find(query = {}) {
    let task = await dbContext.Tasks.find(query);
    return task;
  }

  async getById(id, userEmail) {
    let data = await dbContext.Tasks.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }
  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this task");
    }
  }
  async deleteComment(id, commentId) {
    return await dbContext.Tasks.findByIdAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
  }

  async deleteTasksByListId(id) {
    return await dbContext.Tasks.findByIdAndDelete({ listId: id });

  }

  async addComment(id, body) {
    return await dbContext.Tasks.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { comments: body } },
      { new: true }
    );
  }
}

export const tasksService = new TasksService();