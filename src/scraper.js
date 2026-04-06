const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeLinkedIn(profileUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(profileUrl, { waitUntil: 'networkidle2' });
  const html = await page.content();
  await browser.close();

  const $ = cheerio.load(html);

  const name = $('h1.top-card-layout__title').text().trim();
  const headline = $('h2.top-card-layout__headline').text().trim();
  const summary = $('section.summary p').text().trim();
  const experience = [];
  $('section.experience li').each((i, el) => {
    experience.push($(el).text().trim());
  });
  const skills = [];
  $('section.skills li').each((i, el) => {
    skills.push($(el).text().trim());
  });
  const followers = $('span.top-card__follower-count').text().trim() || 'N/A';
  const location = $('span.top-card-layout__first-subline').text().trim();

  return { name, headline, summary, experience, skills, followers, location };
}

module.exports = scrapeLinkedIn;