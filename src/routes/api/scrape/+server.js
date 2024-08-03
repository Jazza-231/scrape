import fs from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";
import puppeteer from "puppeteer";

const downloadFile = async (url, fileName) => {
  const res = await fetch(url);
  if (!fs.existsSync("C:\\Users\\green\\Downloads\\Scraper")) {
    await mkdir("C:\\Users\\green\\Downloads\\Scraper", { recursive: true });
  }
  const destination = path.resolve(
    "C:\\Users\\green\\Downloads\\Scraper",
    fileName,
  );
  const fileStream = fs.createWriteStream(destination, { flags: "wx" });
  await finished(Readable.fromWeb(res.body).pipe(fileStream));
};

export async function GET({ url }) {
  let urlTo = url.searchParams.get("url");
  console.log(urlTo);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlTo);

  const image = await page.$(".no-click.screenshot-image");

  if (image) {
    const imageProp = await image.getProperty("src");
    const imageUrl = await imageProp.evaluate((x) => x);

    if (imageUrl && !imageUrl.includes("st.prntscr.com")) {
      const fileName = path.basename(imageUrl);
      await downloadFile(imageUrl, fileName);
    }

    await browser.close();

    return new Response(imageUrl, { status: 200 });
  } else {
    await browser.close();

    return new Response(url, { status: 404 });
  }
}
