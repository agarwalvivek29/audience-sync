from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
from functions import gemini_pro_response

app = Flask(__name__)
CORS(app)
####################################################################################################################
load_dotenv()
api_key = os.getenv("api_key")
genai.configure(api_key=api_key)

@app.route('/template', methods=['GET','POST'])
def template():
    moto=request.get_json()
    company_name= request.get_json()
    description= request.get_json()
    logo= request.get_json()
    url= request.get_json()

    M1= '''Welcoming New Users 
    Motto: A warm welcome to your journey with us!
    Details: Include a friendly greeting, introduction to our platform, key features, and an action button to explore further.'''

    M2= '''Updates/Addition of New or Existing Features 
    Motto: Exciting updates just for you!
    Details: Announce the feature, its benefits, and how users can access it. Include visuals/icons for clarity and a call-to-action link.'''

    M3= '''Converting Free Users to Pro Users 
    Motto: Unlock the ultimate experience!
    Details: Highlight the benefits of upgrading, include a limited-time discount, and a clear call-to-action to upgrade now.'''

    M4= '''Announcing a Sale or Event for All Users 
    Motto: Dont miss out on this exclusive offer!
    Details: Include the sale/event details, duration, and whats in it for the users. Use urgency cues like Hurry, offer ends soon!'''

    M5= '''Personalized Email for Each User 
    Motto: Heres something just for you!
    Details: Craft a template with placeholders for user-specific details (e.g., name, favorite category, last product purchased). Include a personal touch and a CTA tailored to their activity history.'''  

    if not moto:
        moto=[M1, M2, M3, M4, M5]
    
    prompt=f'''You are a creative Templates Creator. Your task is to design visually appealing, engaging, and professional HTML email templates that captivate the audience and align with the provided motto.
            Create an HTML template for the motto: {moto} for the company: {company_name}.
            Ensure the design is modern, vibrant, and responsive across devices.
            Use eye-catching headings, clear sections, and an engaging call-to-action (CTA).
            Add professional styling with attractive colors, fonts, and spacing to make the email visually appealing and easy to read.
            Use these other details if needed {description}, {logo} and {url}.
            Provide only the complete HTML code for the template. No other information, like explanation of the code and all is needed.'''

    code = gemini_pro_response(prompt)

    return code