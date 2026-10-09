// Gera screenshots dos sites de clientes em public/projects/<slug>.jpg e
// registra os slugs em app/data/screenshots.json (lido por app/data/projects.ts).
//
// Uso:
//   npm i -D playwright && npx playwright install chromium
//   npm run screenshots
import { chromium } from "playwright"
import { writeFileSync, existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const sites = {
  caspheon: "https://caspheon.com",
  nooncafelounge: "https://nooncafelounge.com.br",
  cedromadeiras: "https://cedromadeiras.com.br",
  h4digital: "https://h4digital.com.br",
  vfelevadores: "https://vfelevadores.com.br",
  topcalcados: "https://topcalcadosdistribuidora.com.br",
}

const outDir = join(process.cwd(), "public", "projects")
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

for (const [slug, url] of Object.entries(sites)) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 })
    await page.waitForTimeout(1500) // animações de entrada
    await page.screenshot({ path: join(outDir, `${slug}.jpg`), type: "jpeg", quality: 85 })
    console.log(`ok   ${slug}`)
  } catch (err) {
    console.warn(`erro ${slug}: ${err.message}`)
  }
}
await browser.close()

// Inclui também imagens adicionadas manualmente (ex.: public/projects/buggo.jpg).
const slugs = existsSync(outDir)
  ? readdirSync(outDir).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(/\.jpg$/, ""))
  : []
writeFileSync(join(process.cwd(), "app", "data", "screenshots.json"), JSON.stringify(slugs.sort(), null, 2) + "\n")
console.log(`screenshots.json: ${slugs.join(", ")}`)
