// import { test, expect } from '@playwright/test';
// async function delay(time) {
//     return new Promise(function(resolve) { 
//         setTimeout(resolve, time)
//     });
//  }
// test('Success Login', async ({ page }) => {
//   await page.goto('http://localhost:7777/');

//   await page.waitForSelector('#loginForm_username');
//   await page.fill('#loginForm_username',"david");
//   await page.fill('#loginForm_password',"123456");
//   await Promise.all([
//         page.click('button[type=submit]'),
//         page.waitForNavigation({waitUntil:'networkidle'})]);

//   expect(await page.url(), "should navigate to dahsboard page").toMatch(/dashboard$/);
//   await Promise.all([    page.click('*[data-menu-id="/awmodeler/index"]'),
//      page.waitForNavigation({waitUntil:'networkidle'})]);
// await delay(1000);
//     //  console.log(await page.url())
//    try {
//      await page.click('*[data-menu-id="/awmodeler/index"]');
//      await page.waitForNavigation({timeout:5000});
//    } catch (e) {

//    }
//  await page.screenshot({path:"./test.png"});
// // expect(await page.url(), "should navigate to awmodeler page").toMatch(/awmodeler/);

//    console.log(await page.url())
//    const pageTitle = await page.title();


// });

import { chromium, test, expect } from '@playwright/test';

// test('Success checking bing', (async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto('http://www.bing.com/');
//     await page.screenshot({ path: `example.png` });
//     await browser.close();
// }))

test('Success Login', async ({ page }) => {
    await page.goto('https://mbt-dev.oppo.itealab.net/');
    // await page.goto('http://localhost:7777/');

    await page.waitForSelector('#loginForm_username');
    await page.fill('#loginForm_username', "david");
    await page.fill('#loginForm_password', "123456");
    await Promise.all([
        page.click('button[type=submit]'),
        page.waitForNavigation({ waitUntil: 'networkidle' })]);

    expect(await page.url(), "should navigate to dahsboard page").toMatch(/dashboard$/);

    await Promise.all([page.click('*[data-menu-id="/awmodeler/index"]'),
    page.waitForNavigation({timeout:5000})]);
    await page.screenshot({path:"./test.png"});
    expect(await page.url(), "should navigate to awmodeler page").toMatch(/awmodeler.*/);

})