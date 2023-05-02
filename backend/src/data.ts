import { Product } from './models/productModel'
import { User } from './models/userModel'
import bcrypt from 'bcryptjs'

export const products: Product[] = [
  {
    name: 'Lençol cama de casal cinza',
    slug: 'lencol-casal-cinza',
    category: 'Cama',
    image: '../images/p1.jpg',
    price: 12099,
    countInStock: 10,
    brand: 'Sultan',
    rating: 4.5,
    numReviews: 10,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Lençol de cama box casal vermelho estanpado com babado',
    slug: 'lencol_cama_box_casal_com_babado',
    category: 'Cama',
    image: '../images/p2.jpg',
    price: 10099,
    countInStock: 20,
    brand: 'Sultan',
    rating: 4.0,
    numReviews: 10,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Lençol cama de casal 4 peças de algodão',
    slug: 'lencol_cama_queen_4_pecas_algodao',
    category: 'Cama',
    image: '../images/p3.jpg',
    price: 22099,
    countInStock: 0,
    brand: 'Bouton',
    rating: 4.8,
    numReviews: 17,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
    banner: '../images/b2.jpg',
  },
  {
    name: 'Lençol cama de solteiro rosa 2 peças',
    slug: 'lencol-cama-solteiro-nuvem-rosa-2-pecas',
    category: 'Cama',
    image: '../images/p4.jpg',
    price: 7899,
    countInStock: 15,
    brand: 'Bouton',
    rating: 4.5,
    numReviews: 14,
    description: 'Produto de alta qualidade',
    reviews: [
      { name: 'UserTest', comment: 'Bom', rating: 4, createdAt: new Date() },
    ],
    images: ['../images/p14.jpg'],
    isFeatured: true,
    banner: '../images/b1.jpg',
  },
  {
    name: 'Travesseiro de corpo 100%_algodão',
    slug: 'travesseiro_de_corpo_100percent_algodao',
    category: 'Cama',
    image: '../images/p5.jpg',
    price: 4899,
    countInStock: 2,
    brand: 'Casa Dona',
    rating: 3.5,
    numReviews: 10,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Travesseiro Percal Alto Luna Fibra Silicone',
    slug: 'travesseiro_luna_alto',
    category: 'Cama',
    image: '../images/p6.jpg',
    price: 3099,
    countInStock: 55,
    brand: 'Luna',
    rating: 4.9,
    numReviews: 30,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Travesseiro Comfort Emma',
    slug: 'travesseiro_comfort_emma',
    category: 'Cama',
    image: '../images/p7.jpg',
    price: 2699,
    countInStock: 22,
    brand: 'Emma',
    rating: 4.5,
    numReviews: 50,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Toalha de Banho Aveludada Bella Para Bordar',
    slug: 'toalha_banho_para_bordar',
    category: 'Banho',
    image: '../images/p8.jpg',
    price: 3299,
    countInStock: 18,
    brand: 'Dohler',
    rating: 4.5,
    numReviews: 30,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Toalha de Banho Azul',
    slug: 'toalha_banho_icone_azul',
    category: 'Banho',
    image: '../images/p9.jpg',
    price: 2699,
    countInStock: 80,
    brand: 'Camesa ',
    rating: 4.5,
    numReviews: 14,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
  {
    name: 'Toalha de Banho para hotel Prata',
    slug: 'toalha-banho-para-hotel-prata-santista',
    category: 'Banho',
    image: '../images/p10.jpg',
    price: 2399,
    countInStock: 72,
    brand: 'Emma',
    rating: 4.0,
    numReviews: 48,
    description: 'Produto de alta qualidade',
    reviews: [],
    images: [],
    isFeatured: false,
  },
]

export const users: User[] = [
  {
    name: 'Teste1',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'Teste2',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]
