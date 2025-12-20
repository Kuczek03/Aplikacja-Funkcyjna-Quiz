export const questions = [
  {
    id: 1,
    text: "Otwierasz nową aplikację. Na co najpierw zwracasz uwagę?",
    options: [
      { text: "Czy kolory i animacje są ładne i czytelne", score: 0 },
      { text: "Zastanawiam się, jak zrobili ten efekt przejścia", score: 5 },
      { text: "Sprawdzam, jak szybko się ładuje i czy dane są poprawne", score: 10 }
    ]
  },
  {
    id: 2,
    text: "Gdy słyszysz słowo 'Terminal' (konsola), co czujesz?",
    options: [
      { text: "Strach. Wolę klikać myszką w interfejsie", score: 0 },
      { text: "Używam, jak muszę (np. do Gita), ale bez miłości", score: 5 },
      { text: "Mój drugi dom. Myszka mogłaby nie istnieć", score: 10 }
    ]
  },
  {
    id: 3,
    text: "Musisz naprawić błąd w kodzie. Jakie to uczucie?",
    options: [
      { text: "Frustracja, zwłaszcza jak coś się 'rozjeżdża' na ekranie", score: 0 },
      { text: "Ciekawa zagadka logiczna, lubię śledzić przepływ danych", score: 10 },
      { text: "Zależy czy błąd jest w logice czy w wyglądzie", score: 5 }
    ]
  },
  {
    id: 4,
    text: "Które narzędzie wydaje Ci się najciekawsze?",
    options: [
      { text: "Figma (Projektowanie interfejsów)", score: 0 },
      { text: "Docker (Konteneryzacja i serwery)", score: 10 },
      { text: "React/Vue (Budowanie komponentów)", score: 5 }
    ]
  },
  {
    id: 5,
    text: "Co wolisz robić w projekcie grupowym?",
    options: [
      { text: "Dbać o to, żeby aplikacja była piękna i intuicyjna dla klienta", score: 0 },
      { text: "Projektować strukturę bazy danych i API", score: 10 },
      { text: "Integrować jedno z drugim", score: 5 }
    ]
  },
  {
    id: 6,
    text: "Twoja idealna praca to...",
    options: [
      { text: "Widzieć natychmiastowy efekt wizualny swojej pracy", score: 0 },
      { text: "Budować skomplikowane systemy, których nie widać gołym okiem", score: 10 },
      { text: "Trochę tego, trochę tamtego", score: 5 }
    ]
  },
  {
    id: 7,
    text: "Jaki jest Twój stosunek do CSS?",
    options: [
      { text: "Uwielbiam! Flexbox i Grid to moi przyjaciele", score: 0 },
      { text: "Umiem wyśrodkować diva, ale wolę logikę JS", score: 5 },
      { text: "Nienawidzę. Dlaczego ten przycisk jest krzywo?!", score: 10 }
    ]
  },
  {
    id: 8,
    text: "Wybierz technologie, które brzmią ciekawiej:",
    options: [
      { text: "Sass, Tailwind, WebGL", score: 0 },
      { text: "Node.js, Python, SQL", score: 10 },
      { text: "Next.js, TypeScript", score: 5 }
    ]
  }
];

export const results = [
  {
    title: "Analiza zakończona!",
    desc: `
      <strong>Wynik 0-30 pkt: Frontend Developer / UI Designer 🎨</strong><br>
      Masz oko do szczegółów, lubisz widzieć efekty swojej pracy i cenisz estetykę. Świat przeglądarek to Twój żywioł.<br><br>
      
      <strong>Wynik 35-55 pkt: Fullstack Developer 🦄</strong><br>
      Jesteś człowiekiem orkiestrą. Rozumiesz zarówno świat wizualny, jak i logikę stojącą za nim. Potrafisz połączyć te dwa światy.<br><br>
      
      <strong>Wynik 60-80 pkt: Backend / DevOps ⚙️</strong><br>
      Interesuje Cię to, co jest "pod maską". Wydajność, bazy danych, serwery i czysta logika. Wygląd to sprawa drugorzędna.
    `
  }
];