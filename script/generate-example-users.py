import json
import requests
from bs4 import BeautifulSoup

# Create an empty array to store the users
users = []

usernames = [
    'a',
    'ali',
    'ab',
    'alfreddagenais',
    'birkan',
    'codingwithdidem',
    'fatih',
    'sezerweb',
    'sila',
    'z'
]
for username in usernames:
    # Make a GET request to the URL
    response = requests.get(f'https://links.dev/{username}')

    # Parse the HTML of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the name element
    name_element = soup.select_one('.ld-custom-name')

    try:
        name = name_element.text.strip()
    except:
        name = 'Name not found'

    # Find the description element
    description_element = soup.select_one('.ld-custom-description-h2')

    try:  # Get the text of the element and remove any leading/trailing whitespace
        description = description_element.text.strip()
    except:
        description = 'Description not found'

    # Create the user object
    user = {
        "name": name,
        "username": username,
        "description": description,
        "image": f'https://raw.githubusercontent.com/fatih-yavuz/links.dev/main/example-pages/img/{username}.jpeg'
    }

    # Append the user to the array of users
    users.append(user)

# Convert the array of users to a JSON object
json_data = json.dumps(users)

# Write the JSON data to a file
with open('../example-pages/users.json', 'w') as f:
    f.write(json_data)
