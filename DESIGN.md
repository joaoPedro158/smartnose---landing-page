---
name: SmartNose
description: Landing page B2B para monitoramento contínuo de fermentação e gases por sensores olfativos eletrônicos e IA.
colors:
  primary: "#00CFAA"
  secondary: "#0099CC"
  accent-mint: "#00E5C0"
  brand-dark: "#05080e"
  surface-dark: "#070b14"
  card-bg: "#101928"
  text-bright: "#ffffff"
  text-muted: "#D1D5DB"
  text-subtle: "#94a3b8"
  border-glass: "rgba(255, 255, 255, 0.1)"
typography:
  display:
    fontFamily: '"Plus Jakarta Sans", sans-serif'
    fontSize: "clamp(32px, 5vw, 60px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-1.5px"
  headline:
    fontFamily: '"Plus Jakarta Sans", sans-serif'
    fontSize: "clamp(28px, 4vw, 48px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: '"JetBrains Mono", monospace'
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "1.2px"
rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#020617"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent-mint}"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.text-bright}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  card-step:
    backgroundColor: "rgba(16, 25, 40, 0.58)"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: SmartNose

## Overview

**Creative North Star: "The Spectral Sensing Laboratory"**

O SmartNose adota uma estética tecnológica de bio-sensoriamento de última geração, combinando uma atmosfera de laboratório digital escuro com resplendores espectrais em tom ciano e azul elétrico (#00CFAA e #0099CC). O design visual evoca precisão científica, monitoramento olfativo em tempo real e autoridade B2B sem perder a elegância e fluidez de um produto moderno de alta tecnologia.

A interface utiliza superfícies escuras profundas (#05080e, #070b14) sobrepostas por cards translúcidos em estilo glassmorphism, micro-bordas sutis de alta nitidez (`rgba(255,255,255,0.1)`) e focos de luzes radiais borradas (`blur(80px)`). Elementos interativos e distintivos utilizam destaques em gradiente contínuo com pílulas neon e tipografia monoespaçada técnica para badges e indicadores telemétricos.

**Key Characteristics:**
- Fundo noturno profundo (#05080e / #070b14) com esferas radiais de luz ciano/azul em movimento pulsante.
- Destaques visuais e CTAs primários com gradientes duplos ciano-azul (`linear-gradient(90deg, #00CFAA, #0099CC)`).
- Tipografia primária arrojada e geométrica em *Plus Jakarta Sans*, contrastada com corpo fluido em *Inter* e detalhes técnicos em *JetBrains Mono*.
- Micro-interações táteis e animações suaves (`fade-up`, `glow-pulse`, `scale-in`).

## Colors

A paleta de cores do SmartNose é ancorada em contrastes de alta visibilidade telemétrica sobre fundos escuros de baixa reflexão.

### Primary
- **Spectral Cyan** (#00CFAA): Tom primário de alta intensidade telemétrica, utilizado para pontos de ação principais, badges proeminentes e acertos visuais.

### Secondary
- **Deep Electric Blue** (#0099CC): Tom secundário complementar, utilizado para transições em gradiente, conectores de dados e distinção de camadas.

### Tertiary / Accent
- **Mint Glow** (#00E5C0): Tom de destaque de altíssimo brilho para status ativos, partículas animadas e sublinhados de navegação.

### Neutral
- **Deep Void Background** (#05080e): Fundo base primário noturno.
- **Surface Dark** (#070b14): Fundo secundário para seções alternadas.
- **Glass Card Background** (rgba(16, 25, 40, 0.58)): Superfície container de leitura.
- **Bright White** (#ffffff): Títulos e textos de alto contraste.
- **Muted Text** (#D1D5DB / #94a3b8): Parágrafos de corpo e descrições secundárias.

### Named Rules
**The Spectral Glow Rule.** O tom primário ciano (#00CFAA) e o gradiente nunca são aplicados em blocos maciços sem um suave resplendor (`box-shadow: 0 0 25px rgba(0,207,170,0.35)`). O brilho telemétrico define o status ativo.

## Typography

**Display Font:** Plus Jakarta Sans (fallback: sans-serif)
**Body Font:** Inter (fallback: sans-serif)
**Label/Mono Font:** JetBrains Mono (fallback: monospace)

**Character:** A combinação entre *Plus Jakarta Sans* e *Inter* transmite solidez corporativa e clareza de leitura, enquanto *JetBrains Mono* insere o DNA de precisão técnica e amostragem de dados.

### Hierarchy
- **Display** (800, clamp(32px, 5vw, 60px), 1.1, -1.5px): Título principal do Hero.
- **Headline** (800, clamp(28px, 4vw, 48px), 1.08, -0.035em): Títulos de seções principais.
- **Title** (700, 20px, 1.2): Títulos de cards e destaques médios.
- **Body** (400, 16px/18px, 1.625): Texto principal de explicação e parágrafos.
- **Label** (700, 10px, 1.2px, uppercase): Badges de fluxo telemétrico, tags de sensores e rótulos de passos.

### Named Rules
**The Tech Mono Badge Rule.** Todos os rótulos de contagem, passos de processo e tags de infraestrutura telemétrica devem usar estritamente *JetBrains Mono* em caixa alta com letter-spacing ≥ 0.9px.

## Layout

O layout base é organizado em um container centralizado com largura máxima de 1280px (`max-w-[1280px]`) e padding lateral de 32px (`px-8`). O Hero utiliza um grid assimétrico de 12 colunas (6 colunas para texto / 6 colunas para mídia), adaptando-se para coluna única em telas móveis (< 1024px). O ritmo vertical segue um padrão de respiro generoso entre seções (py-16 a py-20 / 64px a 80px).

## Elevation & Depth

O SmartNose rejeita sombras tradicionais de iluminação superior em favor do estilo *Glassmorphism Noturno* e iluminação traseira (*Backlight/Ambient Glow*).

### Shadow Vocabulary
- **Spectral Ambient Glow** (`box-shadow: 0 0 25px -3px rgba(0,207,170,0.35), 0 0 10px -2px rgba(0,229,192,0.25)`): Aplicado a botões de ação e badges principais.
- **Glass Border Stroke** (`border: 1px solid rgba(255, 255, 255, 0.1)` com `backdrop-blur-md`): Para Header fixo e containers de cartão.
- **Diffused Radial Sphere** (`blur(80px)` com `radial-gradient`): Para esferas atmosféricas de fundo.

### Named Rules
**The Backlight Elevation Rule.** Em vez de projetar sombras pretas para baixo, os elementos flutuantes projetam luzes coloridas em ciano para trás, simulando sensores acesos no escuro.

## Shapes

O sistema de formas combina bordas em pílula total (`rounded-full` / 9999px) para botões de ação e navegação com cantos suavemente suavizados de 8px a 14px (`rounded-[8px]` / `rounded-[14px]`) para cards de conteúdo e molduras telemétricas.

## Components

### Buttons
- **Shape:** Pílula arredondada (`rounded-full`).
- **Primary:** Gradiente ciano-azul (`linear-gradient(90deg, #00CFAA, #0099CC)`), texto `#020617`, padding `14px 28px`, brilho ambiental.
- **Hover / Focus:** Transição de escala `scale-[1.04]` com aumento de brilho `brightness-110`.
- **Secondary / Ghost:** Fundo translúcido `rgba(255,255,255,0.04)`, borda `1px solid rgba(255,255,255,0.2)`, texto branco.

### Header & Navigation
- **Fixed Header:** Fundo escuro com desfoque de vidro (`backdrop-blur-md`), altura de 64px, borda inferior sutil `rgba(255,255,255,0.1)`.
- **Nav Links:** *Plus Jakarta Sans* 13px caixa alta, sublinhado ativo animado em tom ciano com resplendor.

### Flow & Step Cards
- **Flow Connector:** Linha com gradiente de 1px e partícula animada pulsante em ciclo contínuo.
- **Step Marker:** Círculo com borda translúcida, ícone técnico centralizado e código numérico em *JetBrains Mono*.

## Do's and Don'ts

### Do:
- **Do** usar o gradiente duplo `#00CFAA` -> `#0099CC` para todos os botões de ação principal (CTA).
- **Do** manter a hierarquia tipográfica estrita usando *JetBrains Mono* apenas em métricas, códigos e dados telemétricos.
- **Do** manter os fundos em tons escuros noturnos (#05080e, #070b14) para garantir o contraste e efeito dos resplendores radiais.

### Don't:
- **Don't** utilizar fundos brancos ou cinzas claros em seções ou cartões.
- **Don't** misturar cores de destaque fora do espectro ciano, azul elétrico e verde-menta.
- **Don't** remover a opacidade translúcida e o vidro fosco dos cartões e Header.
