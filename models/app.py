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

    #M2= '''Updates/Addition of New or Existing Features 
    #Motto: Exciting updates just for you!
    #Details: Announce the feature, its benefits, and how users can access it. Include visuals/icons for clarity and a call-to-action link.'''

    M3= '''Converting Free Users to Pro Users 
    Motto: Unlock the ultimate experience!
    Details: Highlight the benefits of upgrading, include a limited-time discount, and a clear call-to-action to upgrade now.'''

    #M4= '''Announcing a Sale or Event for All Users 
    #Motto: Don't miss out on this exclusive offer!
    #Details: Include the sale/event details, duration, and whats in it for the users. Use urgency cues like "Hurry, offer ends soon!"'''

    #M5= '''Personalized Email for Each User 
    #Motto: Here's something just for you!
    #Details: Craft a template with placeholders for user-specific details (e.g., name, favorite category, last product purchased). Include a personal touch and a CTA tailored to their activity history.'''  

    M6= '''Churn Recall
    Motto: We Miss You! Let's Reconnect.
    Details: Emphasize the value and benefits the user enjoyed previously, along with new features, offers, or updates they may have missed. 
            Include a personalized message acknowledging their past engagement, a compelling incentive to return (like a discount, free trial extension, or exclusive content), and a clear call-to-action to re-engage with the platform.'''

    if not moto:
        moto=[M1, M6, M3]
    
    prompt=f'''You are a creative Templates Creator. Your task is to design visually appealing, engaging, and professional HTML email templates that captivate the audience and align with the provided motto.
            Create an HTML template for the motto: {moto} for the company: {company_name}.
            Ensure the design is modern, vibrant, and responsive across devices.
            Use eye-catching headings, clear sections, and an engaging call-to-action (CTA).
            Add emoji's and icons to enhance the visual appeal and highlight key information.
            Add professional styling with attractive colors, fonts, and spacing to make the email visually appealing and easy to read.
            Use these other details if needed {description}, {logo} and {url}.
            Provide only the complete HTML code for the template. No other information, like explanation of the code and all is needed.
            Do not add any placeholders or variables in the code. The code should be ready to use as is.'''

    code = gemini_pro_response(prompt)

    return code