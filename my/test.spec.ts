import { test, expect} from "@playwright/test";

test('Test singlish to sinhala', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/');

  await page.getByPlaceholder("Input Your Singlish Text Here.").fill("uba mokadha karannee");

  await expect(page.locator('div.bg-slate-50')).toHaveText("උබ මොකද කරන්නේ")
});