const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');



test('homapage loads and has correct title', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto('/');
    await expect(page).toHaveTitle(/naelia salas/);
});

test('clicking About nav link scrolls to about section', async ({ page}) => {
    const homePage = new HomePage(page)
    await homePage.goto('/');
    await page.click('a[href="#about"]');
    await expect(page.locator('#about')).toBeVisible();
});

test('clicking Projects nav link scrolls to projects section', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto('/');
    await page.click('a[href="#projects"]');
    await expect(page.locator('#projects')).toBeVisible();
});

test('clicking Contact nav link scrolls to projects section', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto('/');
    await page.click('a[href="#contact"]');
    await expect(page.locator('#contact')).toBeVisible();
});

test('CV download button is visible and correct download attribute', async ({ page }) => {
    const homePage = new HomePage(page)
    await page.goto('/');
    const downloadButton = page.locator('a[download="NaeliaSalasCv.pdf"]');
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toHaveAttribute('href', '/NaeliaSalasCv.pdf');
});

test('form shows error for invalid email', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto('/');
    await page.fill('input[placeholder="Your name"]', 'Tester');
    await page.fill('input[placeholder="Your email"]', 'notanemail');
    await page.fill('textarea[placeholder="Your message"]', 'Hello');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
});

test('form shows error when GDPR is not checked', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto('/');
    await homePage.fillContactForm('Tester', 'testtest.com', 'Hello');
    await homePage.submitForm();
    await expect(page.locator('text=You must agree to the GDPR terms')).toBeVisible();
});

