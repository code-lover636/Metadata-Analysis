from PIL import Image

def analyze_image_metadata(image_path):
    try:
        image = Image.open(image_path)
        metadata = image.info
        print(image)
        # Extract specific metadata fields
        # width, height = image.size
        # format_type = image.format
        # mode = image.mode

        # print("Image Metadata Analysis:")
        # print("------------------------")
        # print(f"Image Path: {image_path}")
        # print(f"Width: {width}px")
        # print(f"Height: {height}px")
        # print(f"Format: {format_type}")
        # print(f"Mode: {mode}")
        # print("Additional Metadata:")
        for key, value in metadata.items():
            print(f"{key}: {value}")

    except FileNotFoundError:
        print("Image file not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Usage example
image_file_path = r"C:\Users\aravi\OneDrive\Desktop\VisualStudioCodeProjects\WebDev\React\portfolio\assets\homephoto.jpg"
analyze_image_metadata(image_file_path)