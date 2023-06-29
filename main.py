from PIL import Image
from PIL.ExifTags import TAGS

def analyze_image_metadata(image_path):
    try:
 
        # open the image
        image = Image.open(image_path)
        exifdata = image.getexif()
        for tagid in exifdata:
            tagname = TAGS.get(tagid, tagid)
            value = exifdata.get(tagid)
            print(f"{tagname:25}: {value}")

    except FileNotFoundError:
        print("Image file not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Usage example
image_file_path = r"C:\Users\aravi\Personal Vault\PHOTOS\Aravind Ashokan.jpg"
analyze_image_metadata(image_file_path)