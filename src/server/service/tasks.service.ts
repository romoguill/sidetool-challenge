import { desc, eq } from "drizzle-orm";
import { CreateTask, Task, UpdateTask } from "../../schemas/tasks";
import { db } from "../../db";
import { tasksTable } from "../../db/schema";
import { HTTPException } from "hono/http-exception";

export class TaskService {
  async getTasks(): Promise<Task[]> {
    const tasks = await db.query.tasksTable.findMany({
      orderBy: [desc(tasksTable.createdAt)],
    });

    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await db.query.tasksTable.findFirst({
      where: eq(tasksTable.id, id),
    });

    if (!task) {
      throw new HTTPException(404, {
        message: "Task not found",
      });
    }

    return task;
  }

  async createTask(data: CreateTask): Promise<Task> {
    const createdTasks = await db
      .insert(tasksTable)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!createdTasks[0]) {
      throw new HTTPException(500, {
        message: "Failed to create task",
      });
    }

    return createdTasks[0];
  }

  async updateTask(id: number, data: UpdateTask): Promise<Task> {
    const updatedTasks = await db
      .update(tasksTable)
      .set(data)
      .where(eq(tasksTable.id, id))
      .returning();

    if (!updatedTasks[0]) {
      throw new HTTPException(404, {
        message: "Task not found",
      });
    }

    return updatedTasks[0];
  }

  async deleteTask(id: number): Promise<Task> {
    const deletedTasks = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();

    if (!deletedTasks[0]) {
      throw new HTTPException(404, {
        message: "Task not found",
      });
    }

    return deletedTasks[0];
  }
}
