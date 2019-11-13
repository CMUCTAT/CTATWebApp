export async function openItemSliding(id, page, rtl = false) {
    try {
        const slidingItem = await page.$(id);
        const boundingBox = await slidingItem.boundingBox();
        const centerX = parseFloat(boundingBox.x + boundingBox.width / 2);
        const centerY = parseFloat(boundingBox.y + boundingBox.height / 2);
        let halfX = centerX / 2;
        let endX = 0;
        if (rtl) {
            halfX = centerX + (centerX / 2);
            endX = boundingBox.width;
        }
        await page.mouse.move(centerX, centerY);
        await page.mouse.down();
        await page.mouse.move(halfX, centerY);
        await page.mouse.move(endX, centerY);
        await page.mouse.up();
        await page.waitFor(2000);
    }
    catch (err) {
        throw err;
    }
}
export async function closeItemSliding(page) {
    await page.mouse.move(0, 0);
    await page.mouse.down();
    await page.mouse.up();
    await page.waitFor(1000);
}
