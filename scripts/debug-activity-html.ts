import puppeteer from 'puppeteer';

const URL = 'https://www.powerhousekorea.com/article/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=167904461&t=board';

async function debugHtml() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navigating to ' + URL);
    await page.goto(URL, { waitUntil: 'networkidle2' });

    const title = await page.title();
    console.log('Page Title:', title);

    const result = await page.evaluate(() => {
        const textToFind = "정재욱 상임대표는"; // Shorter substring

        const allElements = document.querySelectorAll('div, p, span');
        for (const el of allElements) {
            if (el.textContent?.includes(textToFind) && el.children.length === 0) { // Leaf node
                return {
                    found: true,
                    tagName: el.tagName,
                    className: el.className,
                    parentClass: el.parentElement?.className,
                    grandParentClass: el.parentElement?.parentElement?.className,
                    outerHTML: el.outerHTML
                };
            }
        }
        return { found: false };
    });

    console.log('Selector Search Result:', JSON.stringify(result, null, 2));

    await browser.close();
}

debugHtml();
