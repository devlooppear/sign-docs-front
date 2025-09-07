# 📄 Plataforma de Assinatura Digital - Frontend

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-5.x-blue?logo=mui)
![Status](https://img.shields.io/badge/Desafio%20T%C3%A9cnico-100%25%20Frontend-brightgreen)

---

## 🚀 Sobre o Projeto

Este projeto é a interface frontend para a plataforma de assinatura digital de documentos, desenvolvida como desafio técnico. A aplicação oferece:

- Interface intuitiva para upload de documentos PDF por administradores
- Visualização e assinatura digital visual de documentos por usuários finais
- Autenticação JWT e controle de sessões
- Dashboard responsivo para gestão de documentos e assinaturas
- Sistema de internacionalização (i18n)
- Tema claro/escuro personalizável
- Histórico completo de assinaturas realizadas

> **Atenção:** Esta aplicação frontend precisa se conectar com a API backend para funcionar corretamente. Certifique-se de que o backend esteja rodando antes de iniciar o frontend.

---

## 🛠️ Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React
- [React 18](https://reactjs.org/) - Biblioteca de interface
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Material-UI (MUI)](https://mui.com/) - Componentes de interface
- [React Query](https://tanstack.com/query) - Gerenciamento de estado servidor
- [React Hook Form](https://react-hook-form.com/) - Formulários
- [i18next](https://www.i18next.com/) - Internacionalização
- [PDF.js](https://mozilla.github.io/pdf.js/) - Visualização e manipulação de PDF

---

## 🏁 Como Começar

1. **Clone o repositório:**

  ```bash
  git clone <repo-url>
  cd sign-docs-front
  ```

2. **Instale as dependências:**

  ```bash
  yarn install
  # ou npm install
  ```

3. **Configure o ambiente:**

  - Copie o arquivo `.env.example` para `.env`:
    ```bash
    cp .env.example .env
    ```
  - Configure a variável de ambiente com a URL da API:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3250/api
    ```

4. **Certifique-se de que o backend está rodando:**
  - O backend deve estar disponível na URL configurada (padrão: `http://localhost:3250`)
  - Verifique se a API está respondendo corretamente

5. **Inicie a aplicação:**

  ```bash
  yarn dev
  # ou npm run dev
  ```

6. **Acesse a aplicação:**
  - Abra o navegador em: [`http://localhost:3000`](http://localhost:3000)


---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev

# Build para produção
yarn build

# Executar versão de produção
yarn start

# Linting
yarn lint

# Testes (se configurados)
yarn test
```

---

## 🔐 Autenticação e Autorização

A aplicação utiliza:

- **JWT Tokens** para autenticação
- **AuthContext** para gerenciamento de estado global
- **AuthRouteGuard** para proteção de rotas
- **Redirecionamento automático** baseado no tipo de usuário (admin/cliente)
- **Persistência de sessão** com localStorage

---

## 📱 Funcionalidades por Perfil

### 👤 **Usuários (Clientes)**
- Login e cadastro na aplicação
- Visualização de documentos disponíveis para assinatura
- Interface de assinatura digital visual em PDF
- Histórico pessoal de assinaturas realizadas
- Download de documentos assinados
- Perfil pessoal editável

### 👨‍💼 **Administradores**
- Todas as funcionalidades de usuário comum
- Upload de novos documentos PDF
- Gerenciamento completo de usuários
- Visualização de todas as assinaturas do sistema
- Dashboard administrativo avançado
- Controle de acesso e permissões

