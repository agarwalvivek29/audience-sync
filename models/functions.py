import google.generativeai as genai

def removeSymbols(response):
    return response.strip().replace("*", '')

def gemini_pro_response(user_prompt):
    gemini_pro_model = genai.GenerativeModel("gemini-pro")
    response = gemini_pro_model.generate_content(user_prompt)
    return removeSymbols(response.text)