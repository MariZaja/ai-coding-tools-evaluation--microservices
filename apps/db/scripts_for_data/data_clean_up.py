###############################################################
### CAŁOŚĆ KODU WYGENEROWANA PRZEZ NARZĘDZIE OPENAI CHATGPT
###############################################################
import os
import json


def remove_duplicates_from_json(directory_path):
    # Przejdź przez wszystkie pliki w katalogu
    for filename in os.listdir(directory_path):
        if filename.endswith(".json") and not filename.startswith("cleaned"):
            file_path = os.path.join(directory_path, filename)
            with open(file_path, "r", encoding="utf-8") as file:
                try:
                    data = json.load(file)  # Załaduj dane z pliku JSON
                except json.JSONDecodeError:
                    print(f"Nie można odczytać pliku: {filename}")
                    continue

            if not isinstance(data, list):
                print(f"Plik {filename} nie zawiera listy JSON. Pomijam...")
                continue

            # Usuń duplikaty
            seen_common_names = {}
            unique_data = []
            duplicates_found = False

            for plant in data:
                common_name = plant.get("common_name", "").strip().lower()
                if common_name:
                    if common_name in seen_common_names:
                        duplicates_found = True
                        print(
                            f"Duplikat znaleziony w pliku {filename}: "
                            f"ID: {plant.get('id')}, Nazwa: {plant.get('common_name')}"
                        )
                    else:
                        unique_data.append(plant)
                        seen_common_names[common_name] = plant.get("id")

            if duplicates_found:
                print(f"Duplikaty zostały usunięte z pliku: {filename}")

            # Zapisz zaktualizowane dane do nowego pliku
            new_file_path = os.path.join(directory_path, f"cleaned_{filename}")
            with open(new_file_path, "w", encoding="utf-8") as file:
                json.dump(unique_data, file, ensure_ascii=False, indent=4)

            print(f"Zaktualizowano dane i zapisano do nowego pliku: {new_file_path}")


def extract_ids_and_urls(input_dir, output_file):
    data_pairs = []  # Lista do przechowywania par (id, original_url)

    # Iterujemy po wszystkich plikach w katalogu
    for filename in os.listdir(input_dir):
        if filename.endswith(".json"):
            filepath = os.path.join(input_dir, filename)

            # Otwieramy i wczytujemy zawartość pliku JSON
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    data = json.load(file)
                    # Jeśli plik JSON zawiera listę obiektów
                    if isinstance(data, list):
                        for item in data:
                            id_ = item.get("id")
                            default_image = item.get("default_image")
                            if default_image and isinstance(default_image, dict):
                                original_url = default_image.get("original_url")
                                if id_ is not None and original_url:
                                    data_pairs.append((id_, original_url))
            except (json.JSONDecodeError, KeyError, AttributeError) as e:
                print(f"Błąd przetwarzania pliku {filename}: {e}")

    # Zapisujemy zebrane dane do pliku tekstowego
    try:
        with open(output_file, 'w', encoding='utf-8') as outfile:
            for id_, url in data_pairs:
                outfile.write(f"{id_}\t{url}\n")
        print(f"Dane zapisane do pliku {output_file}.")
    except IOError as e:
        print(f"Błąd zapisu do pliku {output_file}: {e}")


# Podaj ścieżkę do katalogu z plikami JSON
directory = "C:/Users/marta/OneDrive/Pulpit/GardenGenius/actual_db"
# remove_duplicates_from_json(directory)

# Ścieżki do katalogu wejściowego i pliku wyjściowego
output_filename = directory + "/id_url.txt"

# Uruchomienie funkcji
extract_ids_and_urls(directory, output_filename)
