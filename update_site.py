import os
import glob

directory = r"c:\Users\vineeth kumar\OneDrive\Documents\antigravity projects\aditya home furniture"

# Find all html, js files
files = glob.glob(os.path.join(directory, "*.html"))
files.extend(glob.glob(os.path.join(directory, "assets", "*.js")))

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Brand Name
    content = content.replace("ARBORVITAE", "ADITYA HOME FURNITURE")
    content = content.replace("Arborvitae Furniture", "Aditya Home Furniture")
    content = content.replace("Arborvitae", "Aditya Home Furniture")
    content = content.replace("arborvitaefurniture", "adityahomefurniture")
    content = content.replace("hello@adityahomefurniture.com", "hello@adityahomefurniture.com") # handled above
    
    # 2. Update Cart Link
    content = content.replace(
        '<a href="cart.html" style="font-weight: 500;">Cart (1)</a>',
        '<a href="cart.html" style="font-weight: 500;" id="nav-cart-link">Cart (0)</a>'
    )
    content = content.replace(
        '<a href="cart.html" style="font-weight: 500; color: var(--oak-600);">Cart (1)</a>',
        '<a href="cart.html" style="font-weight: 500; color: var(--oak-600);" id="nav-cart-link">Cart (0)</a>'
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Site updated successfully.")
