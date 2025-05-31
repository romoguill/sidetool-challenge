import { test, expect } from "@playwright/test";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

test.describe("Home Page", () => {
  test("should have metadata", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle("Sidetool - Tasks Management App");
  });

  test("should display tasks title", async ({ page }) => {
    await page.goto(BASE_URL);

    const taskTitle = page.getByRole("heading", { name: "Tareas" });
    await expect(taskTitle).toBeVisible();
  });

  test("display 0/0 tasks", async ({ page }) => {
    await page.goto(BASE_URL);

    const taskCount = page.getByText("0/0");
    await expect(taskCount).toBeVisible();
  });

  test("should display filter options", async ({ page }) => {
    await page.goto(BASE_URL);

    const filterOptions = page.getByRole("main").getByRole("button");
    await expect(filterOptions).toBeVisible();
  });

  test("should display add new task button", async ({ page }) => {
    await page.goto(BASE_URL);

    const addNewTaskButton = page.getByRole("link");
    await expect(addNewTaskButton).toBeVisible();
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
