const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Inicia un navegador con Puppeteer
  const browser = await puppeteer.launch({ headless: true });  // Si deseas ver el navegador, cambia headless: false
  const page = await browser.newPage();

  // Carga la página
  await page.goto('https://streamdz4.lat/eventos.html', { waitUntil: 'domcontentloaded' });

  // Espera a que los elementos de los partidos sean visibles
  await page.waitForSelector('.event-item');

  // Extrae los datos de los partidos
  const partidos = await page.evaluate(() => {
    const partidosElements = document.querySelectorAll('.event-item');
    const partidosData = [];

    partidosElements.forEach((element) => {
      const name = element.querySelector('.event-info h2')?.innerText || 'No Name';
      const enlace = element.querySelector('.event-url')?.innerText || 'No Enlace';
      partidosData.push({ name, enlace });
    });

    return partidosData;
  });

  // Guarda los datos en un archivo JSON
  fs.writeFileSync('partidos.json', JSON.stringify(partidos, null, 4), 'utf-8');

  console.log('✅ JSON generado correctamente!');

  // Cierra el navegador
  await browser.close();
})();