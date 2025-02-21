import textwrap
import re
import pyperclip

def format_text(text):
    # Remove everything before "**Project Title:**"
    text = re.sub(r'^.*?\*\*Project Title:\*\*', '**Project Title:**', text, flags=re.DOTALL)
    
    # Ensure proper spacing after periods if missing
    text = re.sub(r'(?<=[a-zA-Z])(?=[A-Z])', '. ', text)
    
    # Normalize spacing around punctuation
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Split into logical sections using headings if present
    sections = re.split(r'(\*\*.*?\*\*|###.*?)', text)
    
    formatted_text = ""
    
    for section in sections:
        if section.strip():
            if section.startswith("**") or section.startswith("###"):
                formatted_text += "\n\n" + section.strip() + "\n\n"
            else:
                formatted_text += textwrap.fill(section.strip(), width=80) + "\n\n"
    
    return formatted_text.strip()

# Read text from clipboard
unformatted_text = pyperclip.paste()
formatted_text = format_text(unformatted_text)

# Copy formatted text back to clipboard
pyperclip.copy(formatted_text)

print("Formatted text copied to clipboard.")