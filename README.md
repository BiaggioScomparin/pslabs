# PSL Labs — Premium Synthesis Line 🧬

Marca e plataforma de peptídeos de alta pureza (>99% HPLC) e padrão biotecnológico/farmacêutico, com modelo de venda híbrido (Consumidor Final e Atacado para Revendedores) e entrega ultra-rápida (Same-Day via Uber Moto/Flash em SP e Sedex nacional).

---

## 📁 Estrutura do Repositório

```
psl-labs/
├── brand/               # Identidade visual, logos em vetor SVG e paleta de cores
│   ├── logo_approved_white_bg.svg    # Logotipo oficial (Fundo Branco)
│   ├── logo_approved_transparent.svg # Logotipo oficial (Fundo Transparente)
│   ├── logo_approved_dark_bg.svg     # Logotipo oficial (Versão Negativa)
│   └── logo_approved_official.png    # Imagem de referência aprovada
├── catalog/             # Base de dados e precificação de produtos
│   ├── psl_products.json             # 117 variações calculadas (B2C & B2B)
│   ├── tabela_completa_precos.csv    # Tabela exportada para Excel/Sheets
│   └── build_catalog.js              # Script de cálculo de custos e margens
├── packaging/           # Especificações e gabaritos de rótulos
│   └── vial_label_template.svg       # Gabarito para frascos liofilizados (58x26mm)
├── guides/              # Guias didáticos e protocolos
└── web/                 # Aplicativo Web (Catálogo & Calculadora de Reconstituição)
    └── index.html       # Single Page Application responsiva para mobile e desktop
```

---

## 🚀 Como Executar o Aplicativo Web

O aplicativo é 100% autônomo (não requer dependências pesadas ou build) e pode ser aberto diretamente:

1. Dê um duplo clique no arquivo `web/index.html` para abrir em qualquer navegador (Chrome, Edge, Safari, Firefox).
2. Ou sirva via servidor local:
   ```bash
   npx serve web
   ```

---

## 💎 Identidade da Marca

- **Cor Primária**: Verde Esmeralda Clínico (`#145C46` / RGB 20, 92, 70)
- **Fundo**: Branco Clínico (`#FFFFFF`)
- **Conceito**: Sobriedade médica, síntese molecular pura e autoridade em longevidade e regeneração celular.

---

## 💰 Regra de Precificação & Margens

- **Insumos fixos adicionados por frasco**: **R$ 41,00**
  - R$ 30,00 (Água Bacteriostática)
  - R$ 5,00 (Frete rateado de importação)
  - R$ 2,00 (Embalagem de proteção)
  - R$ 1,00 (Etiqueta adesiva)
  - R$ 3,00 (Caixa de envio)
- **Preço de Varejo (B2C)**: No mínimo o dobro do custo total:
  $$\text{Preço B2C} \ge (\text{Custo do Pó} + \text{R\$ 41,00}) \times 2$$
- **Preço de Atacado (B2B)**: Caixa fechada com 10 frascos para revendedores e clínicas parceiras.

---

## ⚡ Diferencial Logístico

- **São Paulo (Capital e Grande SP)**: Entrega expressa no mesmo dia via **Uber Moto / Flash** em até 2 horas.
- **Brasil Geral**: Envios diários via **Correios Sedex** com proteção térmica isotérmica.
