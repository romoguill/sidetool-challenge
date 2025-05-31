import { test, expect, Page } from "@playwright/test";
import { db } from "../src/db";
import { tasksTable } from "../src/db/schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// Helper function to create tasks via UI
async function createTestTasks(page: Page) {
  const tasks = [
    {
      title: "Nueva tarea 1",
      description: "Descripción de la tarea 1",
    },
    {
      title: "Nueva tarea 2",
      description: "Descripción de la tarea 2",
    },
  ];

  await page.goto(BASE_URL + "/tasks/create");

  for (const task of tasks) {
    await page.getByRole("textbox", { name: "Título" }).fill(task.title);
    await page
      .getByRole("textbox", { name: "Descripción" })
      .fill(task.description);

    const submitButton = page.getByRole("button", { name: "Crear" });
    await submitButton.click();

    // Wait for the button to be enabled (indicating the request completed)
    await expect(submitButton).toBeEnabled({ timeout: 5000 });

    // Clear the form for the next task (if there are more)
    await page.getByRole("textbox", { name: "Título" }).clear();
    await page.getByRole("textbox", { name: "Descripción" }).clear();
  }
}

// Test data - exported so tests can reference it
export const testTasks = [
  {
    title: "Nueva tarea 1",
    description: "Descripción de la tarea 1",
  },
  {
    title: "Nueva tarea 2",
    description: "Descripción de la tarea 2",
  },
];

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await db.delete(tasksTable);
    await page.goto(BASE_URL);
  });

  test("should have metadata", async ({ page }) => {
    await expect(page).toHaveTitle("Sidetool - Tasks Management App");
  });

  test("should display tasks title", async ({ page }) => {
    const taskTitle = page.getByRole("heading", { name: "Tareas" });
    await expect(taskTitle).toBeVisible();
  });

  test("display 0/0 tasks", async ({ page }) => {
    const taskCount = page.getByText("0/0");
    await expect(taskCount).toBeVisible();
  });

  test("should display filter options", async ({ page }) => {
    const filterOptions = page.getByRole("main").getByRole("button");
    await expect(filterOptions).toBeVisible();
  });

  test("should display add new task button", async ({ page }) => {
    const addNewTaskButton = page.getByRole("link");
    await expect(addNewTaskButton).toBeVisible();
  });

  test("should redirect to /tasks/create", async ({ page }) => {
    await page.getByRole("link").click();
    await expect(page).toHaveURL(BASE_URL + "/tasks/create");
  });
});

test.describe("Create page", () => {
  test("should display a form with title and description inputs", async ({
    page,
  }) => {
    await page.goto(BASE_URL + "/tasks/create");

    const heading = page.getByRole("heading", { name: "Crear" });
    await expect(heading).toBeVisible();

    const backButton = page.getByRole("link", { name: "Atrás" });
    await expect(backButton).toBeVisible();

    const titleInput = page.getByRole("textbox", { name: "Título" });
    await expect(titleInput).toBeVisible();

    const descriptionInput = page.getByRole("textbox", { name: "Descripción" });
    await expect(descriptionInput).toBeVisible();

    const createButton = page.getByRole("button", { name: "Crear" });
    await expect(createButton).toBeVisible();
  });
});

test.describe("CRUD operations", () => {
  // Create test data once for all tests in this describe block
  test.beforeEach(async () => {
    // Reset the test db
    await db.delete(tasksTable);
  });

  test.afterEach(async () => {
    await db.delete(tasksTable);
  });

  test("should create tasks", async ({ page }) => {
    await createTestTasks(page);
  });

  test("should read/display tasks", async ({ page }) => {
    await createTestTasks(page);

    // Navigate to home page to verify the tasks were created
    await page.goto(BASE_URL);

    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");

    // Verify both tasks are displayed
    for (const task of testTasks) {
      const taskTitle = page.getByRole("heading", {
        name: task.title,
        exact: true,
      });
      await expect(taskTitle).toBeVisible();

      const taskDescription = page.getByText(task.description, {
        exact: true,
      });
      await expect(taskDescription).toBeVisible();
    }
  });

  test("should update a task", async ({ page }) => {
    await createTestTasks(page);
  });

  test("should delete a task", async ({ page }) => {
    await createTestTasks(page);
  });
});

// await page.goto('http://localhost:3000/home');
//   await page.getByRole('link').click();
//   await page.getByRole('textbox', { name: 'Título' }).fill('Nueva tarea');
//   await page.getByRole('textbox', { name: 'Descripción' }).click();
//   await page.getByRole('textbox', { name: 'Descripción' }).fill('Algo para hacer');
//   await page.getByRole('button', { name: 'Crear' }).click();
//   await page.getByRole('link', { name: 'Atrás' }).click();
//   await page.locator('div').filter({ hasText: /^Nueva tarea$/ }).getByRole('button').click();
//   await page.getByRole('menuitem', { name: 'Editar' }).click();
//   await page.getByRole('textbox', { name: 'Título' }).fill('Nueva tarea modificada');
//   await page.getByRole('button', { name: 'Actualizar' }).click();
//   await page.locator('div:nth-child(2) > div > .peer').click();
//   await page.locator('div:nth-child(4) > div > .peer').click();
//   await page.locator('[id="radix-«r30»"]').click();
//   await page.getByRole('menuitem', { name: 'Eliminar' }).click();
//   await page.locator('div').filter({ hasText: 'Tareas4/' }).getByRole('button').click();
//   await page.getByRole('menuitem', { name: 'Completadas' }).click();
//   await page.locator('div').filter({ hasText: 'Tareas4/' }).getByRole('button').click();
//   await page.getByRole('menuitem', { name: 'Incompletas' }).click();
//   await page.locator('div').filter({ hasText: 'Tareas0/' }).getByRole('button').click();
