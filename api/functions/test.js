import { getDb } from "../../utils/mongoClient.js";

export async function getAllTasks() {
  try {
    const db = await getDb();
    const todo_list = db.collection("todo_mindora");
    const data = await todo_list.find().toArray();

    return data;

  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
}