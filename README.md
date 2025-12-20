# 🧠 Functional Quiz App

> Nowoczesna platforma quizowa SPA (Single Page Application) napisana w czystym JavaScript, oparta na paradygmacie Programowania Funkcyjnego.

## 📖 O Projekcie

**Functional Quiz App** to lekka, ale potężna aplikacja przeglądarkowa, która pozwala na rozwiązywanie testów wiedzy i psychotestów, a także tworzenie własnych quizów.

Projekt został zbudowany bez użycia frameworków (jak React czy Vue), aby zademonstrować siłę **Vanilla JS** oraz architektury opartej na **Czystych Funkcjach (Pure Functions)**, niemutowalności danych i zarządzaniu stanem w stylu Redux.

## ✨ Kluczowe Funkcje

### 🎮 Rozgrywka
- **Silnik Quizu:** Obsługa pytań wielokrotnego wyboru z różną wagą punktową.
- **Licznik Czasu (Timer):** Presja czasu – masz 15 sekund na odpowiedź!
- **Algorytm Tasowania:** Pytania są losowane przy każdym podejściu (Fisher-Yates Shuffle).
- **Wizualizacja Wyników:** Generowane dynamicznie wykresy SVG i paski postępu.

### 🛠️ Kreator i Edycja
- **Wbudowany Kreator:** Twórz własne quizy bez pisania kodu.
- **Dynamiczne Opcje:** Dodawaj dowolną liczbę odpowiedzi do pytania.
- **System Punktacji:** Sam ustalasz, która odpowiedź jest ile warta (0-10 pkt).

### 💾 Zarządzanie Danymi
- **Auto-Save:** Wszystkie Twoje quizy i wyniki zapisują się lokalnie (localStorage).
- **Import / Eksport:** Pobierz quiz jako plik .json i wyślij znajomemu.
- **System Plików:** Wgrywaj gotowe quizy bezpośrednio z dysku.

---

## 🚀 Instalacja i Uruchomienie

Masz dwie opcje uruchomienia projektu: standardową (Node.js/Live Server) lub poprzez Docker.

### Opcja 1: Docker (Zalecana)

Upewnij się, że masz zainstalowany Docker Desktop.

1. Sklonuj repozytorium (lub pobierz pliki):
   git clone https://github.com/twoj-nick/quiz-funkcyjny.git
   cd quiz-funkcyjny

2. Zbuduj i uruchom kontenery:
   docker-compose up --build

3. Otwórz przeglądarkę pod adresem:
   http://localhost:8080 (lub inny port zdefiniowany w docker-compose)

---

### Opcja 2: Metoda Tradycyjna (VS Code)

Jeśli nie chcesz używać Dockera, potrzebujesz serwera lokalnego (przeglądarki blokują moduły JS import/export otwierane bezpośrednio z pliku).

1. Otwórz folder projektu w VS Code.
2. Zainstaluj rozszerzenie Live Server.
3. Kliknij prawym przyciskiem myszy na plik index.html.
4. Wybierz "Open with Live Server".

---

## 📂 Struktura Projektu (Clean Architecture)

Projekt podzielony jest na warstwy, aby oddzielić logikę biznesową od widoku.

src/
├── core/       # Czysta logika biznesowa (niezależna od DOM)
│   ├── scoring.js    # Obliczanie wyników, obsługa stanu
│   └── builder.js    # Logika tworzenia quizu (draft)
├── data/       # Dane statyczne
│   └── questions.js  # Domyślny zestaw pytań
├── ui/         # Warstwa prezentacji (Renderowanie HTML)
│   ├── render.js     # Główny silnik widoku gry
│   ├── screens.js    # Widoki Menu i Kreatora
│   └── charts.js     # Generowanie wykresów SVG
├── utils/      # Narzędzia pomocnicze
│   ├── storage.js    # Obsługa localStorage i plików JSON
│   └── fp.js         # Funkcje użytkowe (shuffle itp.)
└── main.js     # Punkt wejścia, Router i Zarządzanie Stanem

## 🎮 Jak korzystać?

1. **Wybierz Quiz:** Na ekranie startowym zobaczysz listę dostępnych testów. Kliknij, aby zacząć.
2. **Graj:** Odpowiadaj na pytania zanim skończy się czas. Jeśli się pomylisz, możesz użyć przycisku "Cofnij" (resetuje on jednak czas!).
3. **Stwórz Własny:**
   - Kliknij "+ Nowy Quiz".
   - Wpisz tytuł.
   - Dodaj pytanie, a następnie dodaj do niego opcje odpowiedzi z punktacją.
   - Kliknij "Zatwierdź Pytanie", a na końcu "Zapisz Quiz".
4. **Podziel się:** W menu głównym kliknij ikonę dyskietki przy quizie, aby pobrać plik .json. Twój znajomy może go wgrać przyciskiem "Wgraj z pliku".
