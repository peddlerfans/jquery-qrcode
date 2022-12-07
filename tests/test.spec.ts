import { chromium, test, expect } from '@playwright/test';
async function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }
test('Success Login', async ({ page }) => {
  await page.goto('http://localhost:7777/#/login/');

  await page.waitForSelector('#loginForm_username');
  await page.fill('#loginForm_username',"david");
  await page.fill('#loginForm_password',"123456");
  await Promise.all([
        page.click('button[type=submit]'),
        page.waitForNavigation({waitUntil:'networkidle'})]);

  expect(await page.url(), "should navigate to dahsboard page").toMatch(/dashboard$/);
  await Promise.all([    page.click('*[data-menu-id="/awmodeler/index"] a'),
     page.waitForNavigation({waitUntil:'networkidle'})]);
await delay(1000);
     console.log(await page.url())
  //  try {
  //    await page.click('*[data-menu-id="/awmodeler/index"] a');
  //    await page.waitForNavigation({timeout:5000});
  //  } catch (e) {

  //  }
 await page.screenshot({path:"./test.png"});
// expect(await page.url(), "should navigate to awmodeler page").toMatch(/awmodeler/);

   console.log(await page.url())
   const pageTitle = await page.title();


},

);

// test('Failed Login', async ({ page }) => {
//   await page.goto('http://localhost:7777/');

//   await page.waitForSelector('#loginForm_username');
//   await page.fill('#loginForm_username',"david");
//   await page.fill('#loginForm_password',"abcd");
//   await Promise.all([
//         page.click('button[type=submit]'),
//         page.waitForNavigation({waitUntil:'networkidle', timeout:2000})]);

//   expect(await page.url(), "should navigate to dahsboard page").toMatch(/dashboard$/);
//   await Promise.all([    page.click('*[data-menu-id="/awmodeler/index"] a'),
//      page.waitForNavigation({waitUntil:'networkidle', timeout:2000})]);
// await delay(1000);
//      console.log(await page.url())
//   //  try {
//   //    await page.click('*[data-menu-id="/awmodeler/index"] a');
//   //    await page.waitForNavigation({timeout:5000});
//   //  } catch (e) {

//   //  }
//  await page.screenshot({path:"./test.png"});
// // expect(await page.url(), "should navigate to awmodeler page").toMatch(/awmodeler/);

//    console.log(await page.url())
//    const pageTitle = await page.title();


// },

// );
// AW管理
// 账户管理
// group

