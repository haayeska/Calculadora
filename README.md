# Calculadora

Calculadora com parênteses, porcentagem e atalhos de teclado. Mostra o resultado em tempo real enquanto você digita, no padrão brasileiro (vírgula decimal e ponto nos milhares).

**[Ver a calculadora funcionando](https://haayeska.github.io/Calculadora/)**

## Funcionalidades

- Soma, subtração, multiplicação e divisão respeitando a ordem das operações
- Parênteses: o botão `()` decide sozinho se abre ou fecha
- Porcentagem: `200 × 10%` dá `20`
- Prévia do resultado enquanto a conta é digitada
- Aviso de erro, como divisão por zero
- Corrige imprecisões como `0,1 + 0,2` (dá `0,3`, e não `0,30000000000000004`)
- Funciona pelo teclado físico

## Atalhos de teclado

| Tecla                  | Ação            |
| ---------------------- | --------------- |
| `0` a `9`, `,` ou `.`  | Digitar números |
| `+` `-` `*` `/` `%`    | Operações       |
| `(` `)`                | Parênteses      |
| `Enter` ou `=`         | Calcular        |
| `Backspace`            | Apagar o último |
| `Esc`                  | Limpar tudo     |

## Como o cálculo funciona

A conta é resolvida em [`src/lib/calcular.ts`](src/lib/calcular.ts) **sem usar `eval()`**, que executaria qualquer código digitado. O texto é quebrado em pedaços (números, operadores e parênteses) e resolvido por um analisador recursivo, em que cada nível de precedência é uma função:

```
soma     →  produto  ( + ou -  produto )*
produto  →  sinal    ( × ou ÷  sinal )*
sinal    →  -sinal   ou  primario %*
primario →  número   ou  ( soma )
```

## Tecnologias

- [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Como rodar

Você precisa do [Node.js](https://nodejs.org/) 20 ou mais novo.

```bash
git clone https://github.com/haayeska/Calculadora.git
cd Calculadora
npm install
npm run dev
```

## Estrutura

```
src/
├── components/
│   ├── Card.tsx      # Moldura da calculadora e atalhos de teclado
│   ├── Display.tsx   # Visor com a conta e a prévia
│   ├── Keypad.tsx    # Teclas
│   └── Button.tsx    # Botão com as variações de cor
├── hooks/
│   └── useCalculadora.ts  # Regras do que cada tecla faz
└── lib/
    └── calcular.ts   # Analisador e formatação dos números
```
