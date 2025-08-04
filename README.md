# StoreFlow – React + TypeScript E-commerce Demo

StoreFlow é uma pequena aplicação **front-end** que consome a _FakeStore API_ para exibir produtos, gerenciar um carrinho e simular um fluxo de checkout completo em três etapas.  
O projeto demonstra boas práticas de **estado global** com Context + `useReducer`, **formulários** performáticos com `react-hook-form` + Zod, e UI responsiva com **Tailwind CSS**.

---

## ✨ Funcionalidades principais

| Módulo | Descrição |
|--------|-----------|
| **Catálogo** | Grade responsiva com produtos da FakeStore; clique no cartão para abrir detalhes em um modal. |
| **Carrinho** | Painel lateral à direita com botões de `+ / − / remover`; total em tempo real. |
| **Checkout “multi-step”** | Modal separado em 3 passos (Delivery → Payment → Review) com validação em cada etapa. |
| **Login (demo)** | Autenticação usando o endpoint `/auth/login` da FakeStore (`mor_2314` / `83r5^_`). |
| **Tema claro/escuro** | Controle no header, persistido em _localStorage_. |
| **Acessibilidade** | Alt-text em imagens, aria-labels, navegação por teclado. |

---

## 🗂️ Stack & principais libs

* **React 18 + Vite** – boot rápido com HMR.  
* **TypeScript** – tipagem completa do domínio.  
* **Tailwind CSS** – utilitários + dark-mode.  
* **React Hook Form 7** – formulários não controlados performáticos.  
* **Zod** – esquema de validação + inferência de tipos.  
* **React Context API + `useReducer`** – estado global (cart, auth, theme) sem dependências externas.  
* **Lucide-react** – ícones SVG.  

---

## ▶️ Como executar localmente

### Pré-requisitos
* **Node.js ≥ 18**  
* **npm** ou **pnpm** (recomendado)

### Passos

```bash
# 1. clonar o repositório
git clone https://github.com/<sua-conta>/storeflow.git
cd storeflow

# 2. instalar dependências
npm install

# 3. rodar em modo desenvolvedor
npm run dev
