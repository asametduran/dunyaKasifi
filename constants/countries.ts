import { Country } from '@/types';

export const countries: Country[] = [
  {
    id: 'turkiye',
    name: 'Türkiye',
    capital: 'Ankara',
    flagUrl: 'https://flagcdn.com/w320/tr.png',
    region: 'Avrupa/Asya',
    population: 84339067,
    mapPosition: { x: 0.545, y: 0.415 }, // Adjusted position
    description: 'Türkiye, Avrupa ve Asya kıtalarını birbirine bağlayan benzersiz coğrafi konumuyla, zengin tarihi ve kültürel mirasıyla öne çıkan bir ülkedir.',
    details: {
      language: 'Türkçe',
      currency: 'Türk Lirası',
      food: ['Kebap', 'Lahmacun', 'Baklava', 'Mantı'],
      music: ['Türk Halk Müziği', 'Türk Sanat Müziği'],
      landmarks: ['Ayasofya', 'Kapadokya', 'Pamukkale'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'tr-q1',
          question: 'Türkiye\'nin en ünlü doğal oluşumlarından biri hangisidir?',
          options: ['Kapadokya', 'Büyük Kanyon', 'Niagara Şelalesi', 'Amazon Ormanları'],
          correctAnswer: 'Kapadokya',
        },
        {
          id: 'tr-q2',
          question: 'Aşağıdakilerden hangisi Türk mutfağına ait bir yemek değildir?',
          options: ['Mantı', 'Sushi', 'Lahmacun', 'Kebap'],
          correctAnswer: 'Sushi',
        },
        {
          id: 'tr-q3',
          question: 'Türkiye\'nin en kalabalık şehri hangisidir?',
          options: ['Ankara', 'İzmir', 'İstanbul', 'Bursa'],
          correctAnswer: 'İstanbul',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'italya',
    name: 'İtalya',
    capital: 'Roma',
    flagUrl: 'https://flagcdn.com/w320/it.png',
    region: 'Avrupa',
    population: 60317000,
    mapPosition: { x: 0.515, y: 0.41 }, // Adjusted position
    description: 'İtalya, zengin tarihi, sanatı, mimarisi ve dünyaca ünlü mutfağıyla tanınan bir Akdeniz ülkesidir.',
    details: {
      language: 'İtalyanca',
      currency: 'Euro',
      food: ['Pizza', 'Makarna', 'Tiramisu', 'Gelato'],
      music: ['Opera', 'Klasik Müzik'],
      landmarks: ['Kolezyum', 'Pisa Kulesi', 'Venedik Kanalları'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'it-q1',
          question: 'İtalya\'nın hangi şehri kanallarıyla ünlüdür?',
          options: ['Roma', 'Milano', 'Venedik', 'Floransa'],
          correctAnswer: 'Venedik',
        },
        {
          id: 'it-q2',
          question: 'Hangi yemek İtalyan mutfağının simgesidir?',
          options: ['Sushi', 'Pizza', 'Hamburger', 'Döner'],
          correctAnswer: 'Pizza',
        },
        {
          id: 'it-q3',
          question: 'Pisa Kulesi hangi özelliğiyle ünlüdür?',
          options: ['Yüksekliği', 'Eğik olması', 'Rengi', 'Yaşı'],
          correctAnswer: 'Eğik olması',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'misir',
    name: 'Mısır',
    capital: 'Kahire',
    flagUrl: 'https://flagcdn.com/w320/eg.png',
    region: 'Afrika',
    population: 104258327,
    mapPosition: { x: 0.54, y: 0.45 }, // Adjusted position
    description: 'Mısır, antik piramitleri, Nil Nehri ve zengin tarihi mirası ile dünyaca ünlü bir Afrika ülkesidir.',
    details: {
      language: 'Arapça',
      currency: 'Mısır Paundu',
      food: ['Kofta', 'Falafel', 'Kushari'],
      music: ['Arap Müziği', 'Geleneksel Mısır Müziği'],
      landmarks: ['Piramitler', 'Sfenks', 'Nil Nehri'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'eg-q1',
          question: 'Mısır\'ın en ünlü antik yapıları nelerdir?',
          options: ['Piramitler', 'Eyfel Kulesi', 'Kolezyum', 'Taj Mahal'],
          correctAnswer: 'Piramitler',
        },
        {
          id: 'eg-q2',
          question: 'Hangi nehir Mısır\'dan geçer?',
          options: ['Amazon', 'Nil', 'Tuna', 'Fırat'],
          correctAnswer: 'Nil',
        },
        {
          id: 'eg-q3',
          question: 'Mısır\'ın en büyük şehri hangisidir?',
          options: ['İskenderiye', 'Kahire', 'Luksor', 'Aswan'],
          correctAnswer: 'Kahire',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'japonya',
    name: 'Japonya',
    capital: 'Tokyo',
    flagUrl: 'https://flagcdn.com/w320/jp.png',
    region: 'Asya',
    population: 125836021,
    mapPosition: { x: 0.82, y: 0.42 }, // Adjusted position
    description: 'Japonya, modern teknoloji ile geleneksel kültürü harmanlayan, kiraz çiçekleri ve yüksek teknolojisiyle ünlü bir Uzak Doğu ülkesidir.',
    details: {
      language: 'Japonca',
      currency: 'Japon Yeni',
      food: ['Sushi', 'Ramen', 'Tempura', 'Udon'],
      music: ['J-Pop', 'Geleneksel Japon Müziği'],
      landmarks: ['Fuji Dağı', 'Fushimi İnari Tapınağı', 'Tokyo Kulesi'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'jp-q1',
          question: 'Japonya\'nın geleneksel kıyafeti nedir?',
          options: ['Kimono', 'Hanbok', 'Qipao', 'Sari'],
          correctAnswer: 'Kimono',
        },
        {
          id: 'jp-q2',
          question: 'Hangi çiçek Japonya\'nın simgesidir?',
          options: ['Gül', 'Lale', 'Kiraz Çiçeği', 'Orkide'],
          correctAnswer: 'Kiraz Çiçeği',
        },
        {
          id: 'jp-q3',
          question: 'Japonya\'nın en yüksek dağı hangisidir?',
          options: ['Fuji Dağı', 'Everest', 'Ağrı Dağı', 'Kilimanjaro'],
          correctAnswer: 'Fuji Dağı',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'brezilya',
    name: 'Brezilya',
    capital: 'Brasília',
    flagUrl: 'https://flagcdn.com/w320/br.png',
    region: 'Güney Amerika',
    population: 212559417,
    mapPosition: { x: 0.33, y: 0.62 }, // Adjusted position
    description: 'Brezilya, Amazon Yağmur Ormanları, karnavalları ve futboluyla dünyaca ünlü bir Güney Amerika ülkesidir.',
    details: {
      language: 'Portekizce',
      currency: 'Brezilya Reali',
      food: ['Feijoada', 'Pão de Queijo', 'Açaí'],
      music: ['Samba', 'Bossa Nova'],
      landmarks: ['Kurtarıcı İsa Heykeli', 'Amazon Ormanları', 'Copacabana Plajı'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'br-q1',
          question: 'Brezilya\'nın en ünlü festivali nedir?',
          options: ['Oktoberfest', 'Rio Karnavalı', 'Tomatina', 'Holi'],
          correctAnswer: 'Rio Karnavalı',
        },
        {
          id: 'br-q2',
          question: 'Brezilya\'nın en büyük doğal hazinesi nedir?',
          options: ['Sahra Çölü', 'Amazon Ormanları', 'And Dağları', 'Nil Nehri'],
          correctAnswer: 'Amazon Ormanları',
        },
        {
          id: 'br-q3',
          question: 'Rio de Janeiro\'nun simgesi olan heykel hangisidir?',
          options: ['Özgürlük Heykeli', 'Kurtarıcı İsa', 'Sfenks', 'David Heykeli'],
          correctAnswer: 'Kurtarıcı İsa',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'fransa',
    name: 'Fransa',
    capital: 'Paris',
    flagUrl: 'https://flagcdn.com/w320/fr.png',
    region: 'Avrupa',
    population: 67391582,
    mapPosition: { x: 0.485, y: 0.39 }, // Adjusted position
    description: 'Fransa, sanat, moda, mutfak ve romantizmin başkenti olarak bilinen, Eyfel Kulesi ve Louvre Müzesi gibi ikonik yapılarıyla ünlü bir Avrupa ülkesidir.',
    details: {
      language: 'Fransızca',
      currency: 'Euro',
      food: ['Croissant', 'Ratatouille', 'Coq au Vin', 'Baguette'],
      music: ['Şanson', 'Klasik Müzik'],
      landmarks: ['Eyfel Kulesi', 'Louvre Müzesi', 'Notre-Dame Katedrali'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'fr-q1',
          question: 'Fransa\'nın en ünlü müzesi hangisidir?',
          options: ['British Museum', 'Louvre', 'Prado', 'Uffizi'],
          correctAnswer: 'Louvre',
        },
        {
          id: 'fr-q2',
          question: 'Hangi ekmek türü Fransa\'nın simgesidir?',
          options: ['Baguette', 'Pide', 'Pretzel', 'Focaccia'],
          correctAnswer: 'Baguette',
        },
        {
          id: 'fr-q3',
          question: 'Paris\'in simgesi olan yapı hangisidir?',
          options: ['Big Ben', 'Eyfel Kulesi', 'Kolezyum', 'Kremlin'],
          correctAnswer: 'Eyfel Kulesi',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'cin',
    name: 'Çin',
    capital: 'Pekin',
    flagUrl: 'https://flagcdn.com/w320/cn.png',
    region: 'Asya',
    population: 1439323776,
    mapPosition: { x: 0.72, y: 0.42 }, // Adjusted position
    description: 'Çin, Büyük Duvar, zengin tarihi, geleneksel tıbbı ve çeşitli mutfağıyla dünyanın en eski medeniyetlerinden biridir.',
    details: {
      language: 'Mandarin Çincesi',
      currency: 'Çin Yuanı',
      food: ['Pekin Ördeği', 'Dim Sum', 'Çin Mantısı'],
      music: ['Geleneksel Çin Müziği', 'C-Pop'],
      landmarks: ['Çin Seddi', 'Terrakotta Ordusu', 'Yasak Şehir'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'cn-q1',
          question: 'Çin\'in en ünlü yapısı hangisidir?',
          options: ['Çin Seddi', 'Eyfel Kulesi', 'Piramitler', 'Taj Mahal'],
          correctAnswer: 'Çin Seddi',
        },
        {
          id: 'cn-q2',
          question: 'Hangi hayvan Çin kültüründe önemli bir yere sahiptir?',
          options: ['Aslan', 'Ejderha', 'Fil', 'Kartal'],
          correctAnswer: 'Ejderha',
        },
        {
          id: 'cn-q3',
          question: 'Çin\'in eski başkenti hangisidir?',
          options: ['Şangay', "Xi'an", 'Hong Kong', 'Guangzhou'],
          correctAnswer: "Xi'an",
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'hindistan',
    name: 'Hindistan',
    capital: 'Yeni Delhi',
    flagUrl: 'https://flagcdn.com/w320/in.png',
    region: 'Asya',
    population: 1380004385,
    mapPosition: { x: 0.67, y: 0.47 }, // Adjusted position
    description: 'Hindistan, zengin kültürü, baharatlı yemekleri, Bollywood sineması ve Taj Mahal gibi ikonik yapılarıyla tanınan bir Güney Asya ülkesidir.',
    details: {
      language: 'Hintçe ve İngilizce',
      currency: 'Hint Rupisi',
      food: ['Köri', 'Biryani', 'Samosa', 'Tandoori'],
      music: ['Klasik Hint Müziği', 'Bollywood Müziği'],
      landmarks: ['Taj Mahal', 'Amber Kalesi', 'Ganj Nehri'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'in-q1',
          question: 'Hindistan\'ın en ünlü anıtı hangisidir?',
          options: ['Taj Mahal', 'Piramitler', 'Eyfel Kulesi', 'Büyük Duvar'],
          correctAnswer: 'Taj Mahal',
        },
        {
          id: 'in-q2',
          question: 'Hangi nehir Hindistan\'da kutsal sayılır?',
          options: ['Nil', 'Amazon', 'Ganj', 'Tuna'],
          correctAnswer: 'Ganj',
        },
        {
          id: 'in-q3',
          question: 'Hint sinemasının diğer adı nedir?',
          options: ['Hollywood', 'Bollywood', 'Nollywood', 'Tollywood'],
          correctAnswer: 'Bollywood',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'rusya',
    name: 'Rusya',
    capital: 'Moskova',
    flagUrl: 'https://flagcdn.com/w320/ru.png',
    region: 'Avrupa/Asya',
    population: 144104080,
    mapPosition: { x: 0.65, y: 0.32 }, // Adjusted position
    description: 'Rusya, dünyanın en büyük ülkesi olup, zengin kültürü, edebiyatı ve Kremlin gibi tarihi yapılarıyla tanınır.',
    details: {
      language: 'Rusça',
      currency: 'Rus Rublesi',
      food: ['Borş Çorbası', 'Beef Stroganoff', 'Piroşki'],
      music: ['Klasik Rus Müziği', 'Folk Müzik'],
      landmarks: ['Kremlin', 'Kızıl Meydan', 'Kış Sarayı'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'ru-q1',
          question: 'Rusya\'nın başkenti hangi şehirdir?',
          options: ['St. Petersburg', 'Moskova', 'Kiev', 'Kazan'],
          correctAnswer: 'Moskova',
        },
        {
          id: 'ru-q2',
          question: 'Hangi meydan Moskova\'nın merkezinde yer alır?',
          options: ['Taksim', 'Kızıl Meydan', 'Times Meydanı', 'Trafalgar'],
          correctAnswer: 'Kızıl Meydan',
        },
        {
          id: 'ru-q3',
          question: 'Rusya\'nın geleneksel çorbası hangisidir?',
          options: ['Mercimek', 'Borş', 'Minestrone', 'Tavuk Suyu'],
          correctAnswer: 'Borş',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  },
  {
    id: 'ispanya',
    name: 'İspanya',
    capital: 'Madrid',
    flagUrl: 'https://flagcdn.com/w320/es.png',
    region: 'Avrupa',
    population: 47351567,
    mapPosition: { x: 0.47, y: 0.41 }, // Adjusted position
    description: 'İspanya, flamenko dansı, boğa güreşleri, tapas kültürü ve muhteşem plajlarıyla ünlü bir Akdeniz ülkesidir.',
    details: {
      language: 'İspanyolca',
      currency: 'Euro',
      food: ['Paella', 'Tapas', 'Gazpacho'],
      music: ['Flamenko', 'İspanyol Gitarı'],
      landmarks: ['Sagrada Familia', 'Alhambra Sarayı', 'Plaza Mayor'],
    },
    quiz: {
      multipleChoice: [
        {
          id: 'es-q1',
          question: 'İspanya\'nın geleneksel dansı nedir?',
          options: ['Tango', 'Flamenko', 'Samba', 'Vals'],
          correctAnswer: 'Flamenko',
        },
        {
          id: 'es-q2',
          question: 'Barcelona\'nın ünlü kilisesi hangisidir?',
          options: ['Notre Dame', 'Sagrada Familia', 'St. Peter', 'Westminster'],
          correctAnswer: 'Sagrada Familia',
        },
        {
          id: 'es-q3',
          question: 'İspanya\'nın geleneksel pirinç yemeği nedir?',
          options: ['Risotto', 'Paella', 'Pilav', 'Biryani'],
          correctAnswer: 'Paella',
        }
      ],
      trueFalse: [],
      matching: [],
    },
    visited: false,
  }
];