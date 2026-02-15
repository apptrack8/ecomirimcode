# EcoMirim - Site Institucional

Site institucional da organização EcoMirim, dedicada à educação ambiental e reciclagem nas escolas públicas de São Paulo.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 16+ (recomendado: Node.js 18+)
- npm ou yarn

### Instalação e Execução

1. **Clone ou navegue até o diretório do projeto:**
   ```bash
   cd ecomirin-br
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse o site:**
   Abra seu navegador e acesse: `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção localmente

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho com navegação
│   ├── Footer.jsx      # Rodapé
│   ├── Hero.jsx        # Seção hero da home
│   ├── SDGBanners.jsx  # Banners dos ODS
│   ├── ImpactCounters.jsx # Contadores de impacto
│   ├── HowItWorks.jsx  # Seção "Como Funciona"
│   ├── ServiceCard.jsx # Card de serviços
│   ├── TeamCard.jsx    # Card de membros do time
│   ├── ContactForm.jsx # Formulário de contato
│   ├── Accordion.jsx   # Componente de acordeão
│   └── useScrollReveal.jsx # Hook para animações
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── GetInvolved.jsx # Página "Se Envolver"
│   ├── Mission.jsx     # Página "Nossa Missão"
│   ├── About.jsx       # Página "Sobre nós"
│   ├── Team.jsx        # Página "Nosso Time"
│   └── Contact.jsx     # Página "Contato"
├── assets/             # Assets do projeto
│   └── logo.png        # Logo da organização (ÚNICO arquivo de imagem)
├── App.jsx             # Componente principal
├── main.jsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🎨 Customização

### Logo da Organização

**IMPORTANTE:** O único arquivo de imagem permitido no projeto é o logo.

- **Localização:** `src/assets/logo.png`
- **Nome exato:** `logo.png` (não altere o nome)
- **Formato:** PNG (recomendado) ou JPG
- **Como substituir:** 
  1. Substitua o arquivo `src/assets/logo.png` pelo logo real
  2. Mantenha o nome exato: `logo.png`
  3. O logo será exibido automaticamente no header e footer

### Paleta de Cores

As cores principais estão definidas como variáveis CSS:

```css
:root {
  --green-1: #0f7a3a;  /* Verde principal */
  --green-2: #23b36b;  /* Verde secundário */
}
```

### Configuração do Formulário de Contato

O formulário de contato está configurado para envio via API mock. Para integrar com serviços reais:

#### Opção 1: Formspree (Recomendado)

1. Acesse [Formspree.io](https://formspree.io)
2. Crie uma conta e um novo formulário
3. Substitua o endpoint no arquivo `src/components/ContactForm.jsx`:

```javascript
// Linha ~45 do ContactForm.jsx
const response = await fetch('https://formspree.io/f/SEU_ENDPOINT_AQUI', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

#### Opção 2: API Personalizada

Implemente seu próprio endpoint de API e ajuste o código de envio conforme necessário.

### Personalização de Conteúdo

Todos os textos e informações estão nos componentes React. Para personalizar:

1. **Textos gerais:** Edite diretamente nos arquivos dos componentes
2. **Informações de contato:** Atualize em `src/components/Footer.jsx` e `src/pages/Contact.jsx`
3. **Dados do time:** Modifique o array `teamMembers` em `src/pages/Team.jsx`
4. **Metas e objetivos:** Ajuste em `src/pages/Mission.jsx`

## 🎯 Funcionalidades

### ✅ Implementado

- [x] Design responsivo (mobile-first)
- [x] Navegação entre páginas
- [x] Animações de scroll reveal
- [x] Formulários de contato e envolvimento
- [x] Sistema de validação de formulários
- [x] Componentes reutilizáveis
- [x] SVG inline para ícones e ilustrações
- [x] Paleta de cores personalizada
- [x] Tipografia Inter
- [x] SEO básico (meta tags)

### 🔧 Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **TailwindCSS** - Framework CSS
- **React Router** - Roteamento
- **Intersection Observer** - Animações de scroll

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first e é totalmente responsivo:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## ♿ Acessibilidade

O projeto segue boas práticas de acessibilidade:

- [x] Tags semânticas HTML
- [x] ARIA labels em SVGs
- [x] Contraste adequado de cores
- [x] Navegação por teclado
- [x] Formulários com labels apropriados
- [x] Textos alternativos em imagens

## 🧪 Testes de Qualidade

### Checklist de Testes

#### Responsividade
- [ ] Teste em dispositivos móveis (iPhone, Android)
- [ ] Teste em tablets (iPad, Android)
- [ ] Teste em diferentes resoluções de desktop
- [ ] Verifique o menu hamburger em mobile
- [ ] Teste o formulário em diferentes tamanhos de tela

#### Funcionalidade
- [ ] Navegação entre todas as páginas
- [ ] Formulários de contato e envolvimento
- [ ] Links externos (ODS, redes sociais)
- [ ] Animações de scroll
- [ ] Validação de formulários

#### Acessibilidade
- [ ] Navegação por teclado (Tab, Enter)
- [ ] Leitores de tela (teste com NVDA/JAWS)
- [ ] Contraste de cores
- [ ] Tamanho de fonte legível

#### Performance
- [ ] Carregamento rápido
- [ ] Sem erros no console
- [ ] Imagens otimizadas
- [ ] Código minificado em produção

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

O build será gerado na pasta `dist/` e estará pronto para deploy em qualquer servidor web.

### Opções de Deploy

- **Netlify:** Arraste a pasta `dist/` para o Netlify
- **Vercel:** Conecte o repositório e configure build command: `npm run build`
- **GitHub Pages:** Use GitHub Actions para deploy automático
- **Servidor próprio:** Faça upload da pasta `dist/` para seu servidor

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique se todas as dependências estão instaladas
2. Confirme que está usando Node.js 16+
3. Verifique se o arquivo `logo.png` está no local correto
4. Consulte a documentação das tecnologias utilizadas

## 📄 Licença

Este projeto foi desenvolvido especificamente para a organização EcoMirim. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a educação ambiental**
