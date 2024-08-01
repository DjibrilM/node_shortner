import puppeteer from 'puppeteer';
import { Page } from 'puppeteer';

const getPageMetaData = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();
  await page.goto(url);
  const pageTitle = await page.title();
  const contentFromMeta = await page.$$eval('meta', (elements) =>
    elements.map((el) => ({
      content: el.content,
      name: el.name,
      property: el.content,
    })),
  );

  await browser.close();

  return { metaDatas: contentFromMeta, title: pageTitle };
};

export default getPageMetaData;
