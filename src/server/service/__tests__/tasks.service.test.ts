import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskService } from '../tasks.service';
import { CreateTask, UpdateTask } from '../../../schemas/tasks';
import { HTTPException } from 'hono/http-exception';

// Mock the database
vi.mock('../../../db', () => ({
  db: {
    query: {
      tasksTable: {
        findMany: vi.fn(),
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// Import after mocking
import { db } from '../../../db';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(async () => {
    taskService = new TaskService();
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create an instance of TaskService', () => {
      expect(taskService).toBeInstanceOf(TaskService);
    });
  });

  describe('error handling', () => {
    it('should throw HTTPException when getTaskById finds no task', async () => {
      (
        db.query.tasksTable.findFirst as ReturnType<typeof vi.fn>
      ).mockResolvedValue(undefined);

      await expect(taskService.getTaskById(999)).rejects.toThrow(HTTPException);
    });

    it('should throw HTTPException when createTask fails', async () => {
      const createTaskData: CreateTask = {
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      };

      (db.insert as ReturnType<typeof vi.fn>).mockReturnValue({
        values: () => ({
          returning: () => Promise.resolve([]),
        }),
      });

      await expect(taskService.createTask(createTaskData)).rejects.toThrow(
        HTTPException
      );
    });

    it('should throw HTTPException when updateTask finds no task', async () => {
      const updateTaskData: UpdateTask = {
        title: 'Updated Task',
      };

      (db.update as ReturnType<typeof vi.fn>).mockReturnValue({
        set: () => ({
          where: () => ({
            returning: () => Promise.resolve([]),
          }),
        }),
      });

      await expect(taskService.updateTask(999, updateTaskData)).rejects.toThrow(
        HTTPException
      );
    });

    it('should throw HTTPException when deleteTask finds no task', async () => {
      (db.delete as ReturnType<typeof vi.fn>).mockReturnValue({
        where: () => ({
          returning: () => Promise.resolve([]),
        }),
      });

      await expect(taskService.deleteTask(999)).rejects.toThrow(HTTPException);
    });
  });

  describe('happy path', () => {
    it('should create a task', async () => {
      const validCreateData: CreateTask = {
        title: 'Valid Task',
        description: 'Valid Description',
        completed: false,
      };

      const mockTask = {
        id: 1,
        ...validCreateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.insert as ReturnType<typeof vi.fn>).mockReturnValue({
        values: () => ({
          returning: () => Promise.resolve([mockTask]),
        }),
      });

      const result = await taskService.createTask(validCreateData);
      expect(result).toEqual(mockTask);
    });

    it('should update a task', async () => {
      const validUpdateData: UpdateTask = {
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true,
      };

      const mockTask = {
        id: 1,
        ...validUpdateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.update as ReturnType<typeof vi.fn>).mockReturnValue({
        set: () => ({
          where: () => ({
            returning: () => Promise.resolve([mockTask]),
          }),
        }),
      });

      const result = await taskService.updateTask(1, validUpdateData);
      expect(result).toEqual(mockTask);
    });

    it('should update a task with partial data', async () => {
      const partialUpdateData: UpdateTask = {
        title: 'Only Title Updated',
      };

      const mockTask = {
        id: 1,
        title: partialUpdateData.title,
        description: 'Original Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (db.update as ReturnType<typeof vi.fn>).mockReturnValue({
        set: () => ({
          where: () => ({
            returning: () => Promise.resolve([mockTask]),
          }),
        }),
      });

      const result = await taskService.updateTask(1, partialUpdateData);
      expect(result).toEqual(mockTask);
    });
  });
});
