import sys
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration, pipeline

# Get image path from Node
image_path = sys.argv[1]

# Step 1: Get description
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

image = Image.open(image_path)
inputs = processor(image, return_tensors="pt")
out = model.generate(**inputs)
description = processor.decode(out[0], skip_special_tokens=True)

# Step 2: Generate quote
text_gen = pipeline("text-generation", model="gpt2")
quote_prompt = f"Create a short, inspirational quote based on this: {description}"
quote = text_gen(quote_prompt, max_length=30, do_sample=True)[0]["generated_text"]

print(quote)
