import yaml from 'js-yaml'
import fs from 'fs'
import { globSync } from 'glob'
import { remarkMermaid } from 'remark-mermaid-nextra'
import nextra from 'nextra'

const yamlFiles = globSync(['**/_meta.yaml'])
yamlFiles.map(path => {
  const meta = yaml.load(fs.readFileSync(path, 'utf8'))
  fs.writeFileSync(path.replace('.yaml', '.json'), JSON.stringify(meta, null, 2))
})

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  mdxOptions: {
      remarkPlugins: [remarkMermaid],
  }
})

export default withNextra()
