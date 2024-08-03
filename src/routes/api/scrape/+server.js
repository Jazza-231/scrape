import puppeteer from "puppeteer";

export async function GET({ url }) {
  let urlTo = url.searchParams.get("url");
  console.log(urlTo);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlTo);

  const image = await page.$(".no-click.screenshot-image");

  if (image) {
    const imageUrl = await image.getProperty("src");
    return new Response(imageUrl, { status: 200 });
  } else {
    return new Response(url, { status: 404 });
  }
}
