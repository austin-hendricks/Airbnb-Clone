import json

def remove_entries_with_null(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Remove objects with "xl_picture_url" equal to "null"
    filtered_data = [obj for obj in data if imageExists(obj['xl_picture_url']) and imageExists(obj['host_picture_url'])]


    with open(file_path, 'w') as file:
        json.dump(filtered_data, file, indent=2)



def imageExists(url):
    if url is None: return False

    import requests
    try:
        response = requests.get(url)
        if response.status_code != 200 or response.text == "Image not found":
            print(f"Image not found: {url}")
            return False
        else:
            print(f"Image found: {url}")
            return True
    except:
        return False
    

# Replace 'your_file.json' with the actual file path
remove_entries_with_null("C:/Users/hendr/Documents/Coding/GitHub/AppDev/airbnb/assets/data/airbnb-listings.json")
print("Done!")