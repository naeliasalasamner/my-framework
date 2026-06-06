const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Homepage', () => {

  test.describe('General', () => {
    test('loads and has correct title', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await expect(page).toHaveTitle(/Naelia Salas/i);
    });
  });

  test.describe('Navigation', () => {
    test('clicking About nav link scrolls to about section', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await page.click('a[href="#about"]');
      await expect(page.locator('#about')).toBeVisible();
    });

    test('clicking Projects nav link scrolls to projects section', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await page.click('a[href="#projects"]');
      await expect(page.locator('#projects')).toBeVisible();
    });

    test('clicking Contact nav link scrolls to contact section', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await page.click('a[href="#contact"]');
      await expect(page.locator('#contact')).toBeVisible();
    });
  });

  test.describe('CV Download', () => {
    test('button is visible and has correct download attribute', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      const downloadButton = page.locator('a[download="NaeliaSalasCv.pdf"]');
      await expect(downloadButton).toBeVisible();
      await expect(downloadButton).toHaveAttribute('href', '/NaeliaSalasCv.pdf');
    });
  });

  test.describe('Contact Form', () => {
    test('shows error for invalid email', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.fillContactForm('Tester', 'notanemail', 'Hello');
      await homePage.submitForm();
      await expect(page.locator('text=Please enter a valid email address.')).toBeVisible();
    });

    test('shows error when GDPR is not checked', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.fillContactForm('Tester', 'test@test.com', 'Hello');
      await homePage.submitForm();
      await expect(page.locator('text=You must agree to the GDPR terms.')).toBeVisible();
    });
  });

});