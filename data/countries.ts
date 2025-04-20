export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
}

export interface Country {
  id: string;
  name: string;
  flagUrl: string;
  capital: string;
  facts: string[];
  landmarks: string[];
  questions: Question[];
}

export const countries: Country[] = [
  {
    id: 'tr',
    name: 'Türkiye',
    flagUrl: 'https://images.pexels.com/photos/2058349/pexels-photo-2058349.jpeg?auto=compress&cs=tinysrgb&w=300',
    capital: 'Ankara',
    facts: [
      'İstanbul, iki kıtada yer alan tek şehirdir',
      'Türk kahvesi UNESCO Kültürel Miras Listesi\'ndedir',
      'Noel Baba (St. Nicholas) Türkiye\'de doğmuştur',
    ],
    landmarks: [
      'Ayasofya',
      'Pamukkale',
      'Kapadokya',
    ],
    questions: [
      {
        id: 'tr-1',
        text: 'Türkiye\'nin başkenti hangi şehirdir?',
        options: ['İstanbul', 'Ankara'],
        correctOption: 1,
      },
      {
        id: 'tr-2',
        text: 'Hangi ünlü tarihi yapı İstanbul\'da bulunur?',
        options: ['Ayasofya', 'Pisa Kulesi'],
        correctOption: 0,
      },
    ],
  },
  {
    id: 'it',
    name: 'İtalya',
    flagUrl: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=300',
    capital: 'Roma',
    facts: [
      'Pizza ilk kez Napoli\'de yapılmıştır',
      'Roma\'daki Colosseum dünyanın en büyük antik amfiteatrıdır',
      'Venedik 118 küçük adadan oluşur',
    ],
    landmarks: [
      'Colosseum',
      'Pisa Kulesi',
      'Venedik Kanalları',
    ],
    questions: [
      {
        id: 'it-1',
        text: 'İtalya\'nın başkenti hangi şehirdir?',
        options: ['Milano', 'Roma'],
        correctOption: 1,
      },
      {
        id: 'it-2',
        text: 'Hangi ünlü yemek İtalya\'da doğmuştur?',
        options: ['Sushi', 'Pizza'],
        correctOption: 1,
      },
    ],
  },
  {
    id: 'jp',
    name: 'Japonya',
    flagUrl: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=300',
    capital: 'Tokyo',
    facts: [
      'Japonya\'da 6,852 ada vardır',
      'Suşi ilk kez Japonya\'da yapılmıştır',
      'Japonya\'da en popüler spor beyzbol\'dur',
    ],
    landmarks: [
      'Fuji Dağı',
      'Fushimi Inari Tapınağı',
      'Tokyo Kulesi',
    ],
    questions: [
      {
        id: 'jp-1',
        text: 'Japonya\'nın en yüksek dağı hangisidir?',
        options: ['Fuji Dağı', 'Tokyo Kulesi'],
        correctOption: 0,
      },
      {
        id: 'jp-2',
        text: 'Hangi yemek Japonya\'nın geleneksel yemeğidir?',
        options: ['Pizza', 'Suşi'],
        correctOption: 1,
      },
    ],
  },
];