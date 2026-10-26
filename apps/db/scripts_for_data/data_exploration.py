###############################################################
### CAŁOŚĆ KODU WYGENEROWANA PRZEZ NARZĘDZIE OPENAI CHATGPT
###############################################################
import json
import os
from collections import defaultdict


# Funkcja sprawdzająca czy dana wartość jest pusta
def is_empty(value):
    return value is None or value == [] or value == "Coming Soon"


def data_exploration(data_dir, output_file):
    # Słownik globalny do liczenia pustych wartości dla atrybutów we wszystkich kategoriach
    global_attribute_count = defaultdict(lambda: {"empty": 0, "total": 0})

    # Słownik do przechowywania liczby roślin w każdej kategorii
    category_counts = {}

    # Otwórz plik wynikowy do zapisu
    with open(output_file, "w") as f_out:
        # Przejdź przez wszystkie pliki w katalogu
        for file_name in os.listdir(data_dir):
            if file_name.endswith(".json"):
                # Nazwa kategorii jest w nazwie pliku
                category_name = os.path.splitext(file_name)[0]
                file_path = os.path.join(data_dir, file_name)

                # Wczytaj dane z pliku JSON
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)

                # Liczba roślin w tej kategorii
                num_plants = len(data)

                # Pomijamy kategorię, jeśli liczba roślin jest mniejsza niż 20
                if num_plants < 20:
                    print(f"Kategoria '{category_name}' została pominięta (mniej niż 20 roślin).\n")
                    f_out.write(f"Kategoria '{category_name}' została pominięta (mniej niż 20 roślin).\n\n")
                    continue

                # Dodaj kategorię do słownika
                category_counts[category_name] = num_plants

                # Słownik do liczenia pustych wartości dla każdego atrybutu w bieżącej kategorii
                attribute_count = defaultdict(lambda: {"empty": 0, "total": 0})

                # Przetwarzaj każdy element (roślinę) w danych
                for plant in data:
                    for attribute, value in plant.items():
                        attribute_count[attribute]["total"] += 1
                        global_attribute_count[attribute]["total"] += 1
                        if is_empty(value):
                            attribute_count[attribute]["empty"] += 1
                            global_attribute_count[attribute]["empty"] += 1

                # Przygotuj nagłówki dla konsoli i pliku wynikowego
                category_header = f"Kategoria: {category_name}\n"
                total_plants_info = f"Liczba roślin: {num_plants}\n"
                attribute_header = f"{'Atrybut':<30} {'Puste':>8} {'% Pustych':>12} {'Całkowite':>12}\n"
                separator = "-" * 65 + "\n"

                # Zapisz nagłówki w pliku wynikowym
                f_out.write(category_header)
                f_out.write(total_plants_info)
                f_out.write(attribute_header)
                f_out.write(separator)

                # Wyświetl nagłówki w konsoli
                print(category_header, end="")
                print(total_plants_info, end="")
                print(attribute_header, end="")
                print(separator, end="")

                # Przetwarzanie i wypisanie danych atrybutów
                for attribute, counts in attribute_count.items():
                    total = counts["total"]
                    empty = counts["empty"]
                    empty_percent = (empty / total) * 100 if total > 0 else 0
                    result_line = f"{attribute:<30} {empty:>8} {empty_percent:>12.2f}% {total:>12}\n"

                    # Zapisz wynik do pliku
                    f_out.write(result_line)

                    # Wyświetl wynik w konsoli
                    print(result_line, end="")

                # Oddziel sekcje w pliku i konsoli
                f_out.write("\n\n")
                print("\n")

        # Podsumowanie: Atrybuty najczęściej brakujące
        summary_header = "\nPodsumowanie - Atrybuty najczęściej brakujące we wszystkich kategoriach:\n"
        summary_separator = "-" * 65 + "\n"
        f_out.write(summary_header)
        f_out.write(summary_separator)
        print(summary_header, end="")
        print(summary_separator, end="")

        # Sortuj atrybuty według liczby braków malejąco
        sorted_attributes = sorted(global_attribute_count.items(), key=lambda x: x[1]["empty"], reverse=True)

        # Wyświetl i zapisz w pliku 10 najczęściej brakujących atrybutów
        for attribute, counts in sorted_attributes[:10]:  # Pierwsze 10 atrybutów
            total = counts["total"]
            empty = counts["empty"]
            empty_percent = (empty / total) * 100 if total > 0 else 0
            summary_line = f"{attribute:<30} {empty:>8} {empty_percent:>12.2f}% {total:>12}\n"

            # Zapisz do pliku
            f_out.write(summary_line)

            # Wyświetl w konsoli
            print(summary_line, end="")

        # Podsumowanie: Liczba roślin w każdej kategorii
        category_summary_header = "\nPodsumowanie - Liczba roślin w każdej kategorii:\n"
        category_summary_separator = "-" * 65 + "\n"
        f_out.write(category_summary_header)
        f_out.write(category_summary_separator)
        print(category_summary_header, end="")
        print(category_summary_separator, end="")

        for category, count in category_counts.items():
            category_line = f"{category:<30} {count:>8}\n"
            f_out.write(category_line)
            print(category_line, end="")

    print(f"Zakończono analizę danych. Wyniki zapisano w pliku {output_file}.")


# Ścieżka do katalogu z plikami JSON
data_dir = "C:/Users/marta/OneDrive/Pulpit/GardenGenius/db"

# Nazwa pliku wynikowego
output_file = data_dir + "/data_exploration.txt"

data_exploration(data_dir, output_file)
