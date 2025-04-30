import calca1 from '../assets/calca1.jpg';
import calca2 from '../assets/calca2.jpg';
import calca1detalhe from '../assets/calca1detalhes1.jpg';
import calca1detalhe2 from '../assets/calca1detalhes2.jpg';
import calca2detalhes1 from '../assets/calca2detalhes1.jpg';
import calca2detalhes2 from '../assets/calca2detalhes2.jpg';

export interface Product {
  id: number;
  name: string;
  model?: string;
  color?: string;
  size?: string;
  price: string;
  imageUrl: string;
  hoverImages?: string[];
}

export interface Section {
  title: string;
  products: Product[];
}

export const sections: Section[] = [
  {
    title: 'Blusas',
    products: [
      {
        id: 1,
        name: 'Blusa 1',
        model: 'Blusa de Manga Longa',
        color: 'Azul',
        size: 'M',
        price: '99,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Blusa 2',
        model: 'Blusa Regata',
        color: 'Branca',
        size: 'P',
        price: '49,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Blusa 3',
        model: 'Blusa Regata',
        color: 'Branca',
        size: 'P',
        price: '79,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
  {
    title: 'Calças',
    products: [
      {
        id: 4,
        name: 'Calça 1',
        model: 'Calça Jeans Skinny',
        color: 'Preta',
        size: '42',
        price: '179,99',
        imageUrl: calca1,
        hoverImages: [calca1detalhe, calca1detalhe2],
      },
      {
        id: 5,
        name: 'Calça 2',
        model: 'Calça Jogger',
        color: 'Cinza',
        size: '40',
        price: '159,99',
        imageUrl: calca2,
        hoverImages: [calca2detalhes1, calca2detalhes2],
      },
      {
        id: 6,
        name: 'Calça 3',
        model: 'Calça Jogger',
        color: 'Cinza',
        size: '40',
        price: '159,99',
        imageUrl: calca2,
        hoverImages: [calca2detalhes1, calca2detalhes2],
      },
    ],
  },
  {
    title: 'Vestidos',
    products: [
      {
        id: 7,
        name: 'Vestido 1',
        model: 'Vestido Longo',
        color: 'Vermelho',
        size: 'M',
        price: '249,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 8,
        name: 'Vestido 2',
        model: 'Vestido Curto',
        color: 'Preto',
        size: 'P',
        price: '199,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 9,
        name: 'Vestido 3',
        model: 'Vestido Curto',
        color: 'Preto',
        size: 'P',
        price: '199,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
  {
    title: 'Bermudas',
    products: [
      {
        id: 10,
        name: 'Bermuda 1',
        model: 'Bermuda Cargo',
        color: 'Bege',
        size: 'M',
        price: '89,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 11,
        name: 'Bermuda 2',
        model: 'Bermuda Jeans',
        color: 'Azul',
        size: 'G',
        price: '109,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 12,
        name: 'Bermuda 2',
        model: 'Bermuda Jeans',
        color: 'Azul',
        size: 'G',
        price: '109,99',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ],
  },
];
