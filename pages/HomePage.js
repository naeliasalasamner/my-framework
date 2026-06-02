class HomePage {
    constructor(page) {
        this.page = page;

    // selectors
        this.nameInput = page.locator('input[placeholder="Your name"]');
        this.emailInput = page.locator('input[placeholder="Your email"]');
        this.messageInput = page.locator('textarea[placeholder="Your message"]');
        this.gdprCheckbox = page.locator('input.gdpr-checkbox');
        this.submitButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('/')
    }

    async fillContactForm(name, email, message) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.messageInput.fill(message);
    }
    async submitForm() {
        await this.submitButton.click();
    }
}

module.exports = HomePage;