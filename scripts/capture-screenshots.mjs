// Gera screenshots dos sites em public/projects/<slug>.jpg e
// registra os slugs em app/data/screenshots.json (lido por app/data/projects.ts).
//
// Uso:
//   npm i -D playwright && npx playwright install chromium
//   npm run screenshots
import { chromium } from "playwright"
import { writeFileSync, existsSync, readdirSync, rmSync } from "node:fs"
import { join } from "node:path"

const sites = {
  caspheon: "https://caspheon.com",
  nooncafelounge: "https://nooncafelounge.com.br",
  cedromadeiras: "https://cedromadeiras.com.br",
  h4digital: "https://h4digital.com.br",
  vfelevadores: "https://vfelevadores.com.br",
  topcalcados: "https://topcalcadosdistribuidora.com.br",
  onsmart: "https://onsmart.ai/",
  pokedex: "https://feliperogai.github.io/pokedex/",
  "chorao-eterno": "https://feliperogai.github.io/chorao-eterno/",
}

const outDir = join(process.cwd(), "public", "projects")
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

for (const [slug, url] of Object.entries(sites)) {
  try {
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 })
    if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status()}`)
    // fecha avisos de cookies para o print ficar limpo
    for (const label of ["Aceitar", "Aceito", "Accept", "Concordo", "OK"]) {
      const button = page.getByRole("button", { name: label, exact: true }).first()
      if (await button.isVisible().catch(() => false)) {
        await button.click().catch(() => {})
        break
      }
    }
    await page.waitForTimeout(1500) // animações de entrada
    const text = (await page.textContent("body").catch(() => "")) ?? ""
    if (text.trim().length < 40) throw new Error("página vazia ou com erro")
    await page.screenshot({ path: join(outDir, `${slug}.jpg`), type: "jpeg", quality: 85 })
    console.log(`ok   ${slug}`)
  } catch (err) {
    rmSync(join(outDir, `${slug}.jpg`), { force: true })
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
