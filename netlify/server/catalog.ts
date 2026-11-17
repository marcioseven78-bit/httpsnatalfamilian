// Catálogo da loja. Preços originais em centavos; o desconto da Black Friday é aplicado no servidor.
export const BLACK_FRIDAY_DISCOUNT = 0.45;

export type Product = {
  id: string;
  name: string;
  category: "Enfeites" | "Árvores" | "Iluminação" | "Kits Temáticos" | "Mesa Posta";
  description: string;
  priceCents: number;
  art: string; // identificador da ilustração usada no front-end
  tag?: string;
};

export const PRODUCTS: Product[] = [
  { id: "bolas-vermelhas-12", name: "Kit 12 Bolas Vermelhas Glitter", category: "Enfeites", description: "Bolas de 8 cm com acabamento brilhante, inquebráveis.", priceCents: 8990, art: "ball-red", tag: "Mais vendido" },
  { id: "bolas-douradas-12", name: "Kit 12 Bolas Douradas Foscas", category: "Enfeites", description: "Elegância clássica em dourado fosco, 8 cm.", priceCents: 8990, art: "ball-gold" },
  { id: "estrela-ponteira", name: "Estrela Ponteira Dourada", category: "Enfeites", description: "Ponteira de 25 cm com brilho espelhado para o topo da árvore.", priceCents: 6990, art: "star" },
  { id: "arvore-180", name: "Árvore Pinheiro Nevado 1,80 m", category: "Árvores", description: "580 galhos com pontas nevadas e base metálica firme.", priceCents: 49990, art: "tree", tag: "Destaque" },
  { id: "arvore-120", name: "Árvore Pinheiro Clássico 1,20 m", category: "Árvores", description: "Ideal para apartamentos, montagem fácil em 3 partes.", priceCents: 25990, art: "tree-small" },
  { id: "pisca-100", name: "Pisca-Pisca 100 LEDs Luz Quente", category: "Iluminação", description: "10 m de fio, 8 funções, uso interno e externo.", priceCents: 5990, art: "lights" },
  { id: "cascata-led", name: "Cascata LED 400 Lâmpadas", category: "Iluminação", description: "Cortina de luz para fachadas e janelas, 4 m.", priceCents: 13990, art: "cascade" },
  { id: "kit-tema-classico", name: "Kit Tema Clássico Vermelho & Ouro", category: "Kits Temáticos", description: "40 peças: bolas, laços, pinhas e fitas para decorar a árvore inteira.", priceCents: 29990, art: "kit-classic", tag: "Kit completo" },
  { id: "kit-tema-nordico", name: "Kit Tema Nórdico Branco & Madeira", category: "Kits Temáticos", description: "35 peças em madeira, feltro e branco neve.", priceCents: 27990, art: "kit-nordic" },
  { id: "guirlanda", name: "Guirlanda de Porta 40 cm", category: "Enfeites", description: "Folhagem natural artificial, pinhas e laço de veludo.", priceCents: 11990, art: "wreath" },
  { id: "papai-noel", name: "Papai Noel Decorativo 45 cm", category: "Enfeites", description: "Boneco em tecido com barba macia e saco de presentes.", priceCents: 15990, art: "santa" },
  { id: "toalha-mesa", name: "Toalha de Mesa Natalina 2,20 m", category: "Mesa Posta", description: "Jacquard com bordado de folhas e detalhes dourados.", priceCents: 12990, art: "table" },
];

export function salePrice(priceCents: number) {
  return Math.round(priceCents * (1 - BLACK_FRIDAY_DISCOUNT));
}
