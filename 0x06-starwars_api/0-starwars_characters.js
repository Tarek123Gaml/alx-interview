#!/usr/bin/env python3
import requests
import sys

def get_character_name(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['name']
    else:
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: ./0-starwars_characters.js <Movie ID>")
        sys.exit(1)

    movie_id = sys.argv[1]
    film_url = f"https://swapi.dev/api/films/{movie_id}/"

    response = requests.get(film_url)
    if response.status_code != 200:
        print(f"Error: Unable to fetch movie with ID {movie_id}")
        sys.exit(1)

    film_data = response.json()
    characters = film_data['characters']

    for character_url in characters:
        character_name = get_character_name(character_url)
        if character_name:
            print(character_name)
        else:
            print(f"Error: Unable to fetch character from {character_url}")
