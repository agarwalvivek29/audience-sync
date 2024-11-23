from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os
from functions import gemini_pro_response

app = Flask(__name__)
CORS(app)

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
    Details: Include a friendly greeting, introduction to our platform, and an action button to explore further.'''

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

@app.route('/SQLquery', methods=['GET','POST'])
def query():

    schema='''{
                tables: [
                {
                name: 'Users',
                fields: [
                { name: 'user_id', type: 'uuid' },
                { name: 'name', type: 'varchar' },
                { name: 'email', type: 'varchar' },
                { name: 'phone_number', type: 'varchar' },
                { name: 'location', type: 'json' },
                { name: 'preferences', type: 'json' },
                { name: 'created_at', type: 'timestamp' },
                { name: 'last_active', type: 'timestamp' },
                { name: 'tags', type: 'json' },
                { name: 'total_orders', type: 'integer' },
                ],
                },
                {
                name: 'Restaurants',
                fields: [
                { name: 'restaurant_id', type: 'uuid' },
                { name: 'name', type: 'varchar' },
                { name: 'cuisine', type: 'json' },
                { name: 'location', type: 'json' },
                { name: 'average_cost_for_two', type: 'float' },
                { name: 'rating', type: 'float' },
                { name: 'tags', type: 'json' },
                { name: 'menu_items_count', type: 'integer' },
                { name: 'created_at', type: 'timestamp' },
                { name: 'last_active', type: 'timestamp' },
                ],
                },
                {
                name: 'MenuItems',
                fields: [
                { name: 'menu_item_id', type: 'uuid' },
                { name: 'restaurant_id', type: 'uuid' },
                { name: 'name', type: 'varchar' },
                { name: 'price', type: 'float' },
                { name: 'category', type: 'varchar' },
                { name: 'tags', type: 'json' },
                { name: 'availability_status', type: 'boolean' },
                ],
                },
                {
                name: 'Orders',
                fields: [
                { name: 'order_id', type: 'uuid' },
                { name: 'user_id', type: 'uuid' },
                { name: 'restaurant_id', type: 'uuid' },
                { name: 'menu_items', type: 'json' },
                { name: 'total_amount', type: 'float' },
                { name: 'status', type: 'varchar' },
                { name: 'created_at', type: 'timestamp' },
                { name: 'updated_at', type: 'timestamp' },
                ],
                },
                {
                name: 'Events',
                fields: [
                { name: 'event_id', type: 'uuid' },
                { name: 'user_id', type: 'uuid' },
                { name: 'event_type', type: 'varchar' },
                { name: 'event_details', type: 'json' },
                { name: 'timestamp', type: 'timestamp' },
                ],
                },
                {
                name: 'SearchQueries',
                fields: [
                { name: 'search_id', type: 'uuid' },
                { name: 'user_id', type: 'uuid' },
                { name: 'query', type: 'varchar' },
                { name: 'result_count', type: 'integer' },
                { name: 'timestamp', type: 'timestamp' },
                ],
                },
                ],
                relationships: [
                { fromTable: 'MenuItems', toTable: 'Restaurants', fromField: 'restaurant_id', toField: 'restaurant_id' },
                { fromTable: 'Orders', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
                { fromTable: 'Orders', toTable: 'Restaurants', fromField: 'restaurant_id', toField: 'restaurant_id' },
                { fromTable: 'Events', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
                { fromTable: 'SearchQueries', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
                ],
                };'''

    events= request.get_json()
    if not events:
        events= "[cart addition, cart deletion, favorite hotel, favorite food, offer clicks, food clicks]"
    
    prompt=f'''You are an SQL Query Generator and Metadata Creator. Based on the given schema and requirements, generate SQL queries only and provide a JSON metadata object for each query. 
    Use the schema as {schema} and events as {events}. The JSON should include a heading, a brief one-line description, and the conditions used in the query.

    User Segmentations.....

    Users Based on Static Data
    a. Users Who Recently Joined
    b. High-Value Users

    Users Based on Event-Based Dynamic Data
    a. Users Who Frequently Add Items to Cart
    b. Users Who Favorite Hotels or Foods
    c. Users Clicking Offers Frequently

    Users Based on Purchase Behavior
    a. Active Buyers
    b. Inactive Users
    c. Users Spending the Most Money

    Users Based on Search Behavior
    a. Users With High Search Activity
    b. Users Searching for Specific Cuisine

    Combination Segments
    a. Users Engaged with Specific Restaurants
    b. Users Who Added Items to Cart but Didn’t Complete Orders
    c. Users Who Viewed Food But Didn’t Purchase

    Demographic and Behavioral Insights
    a. Young Active Users

    High-Value Event-Driven Users
    a. Users Triggering Multiple Event Types

    Output Format.....
    For each selected segment, generate the following:
    SQL Query: Write a query that extracts data for the user segment based on the conditions. Include table joins and relevant filters from the schema.
    JSON Metadata: 
    Provide a JSON object in the format below:
    {
    "heading": "<Segment Name>",
    "description": "<Brief one-line description of the segment>",
    "conditions": "<List of conditions applied in the query>"
    }

    Rules.....
    Do not add any commentary or headers; provide only the SQL query and the JSON metadata object.
    Ensure the SQL query is syntactically correct and optimized.
    Each SQL query should directly address the segment and conditions specified.

    Example.....
    Input: Users Who Recently Joined
    Output:
    SELECT user_id, name, email, created_at
    FROM Users
    WHERE created_at > NOW() - INTERVAL '30 days';
    {
    "heading": "Recently Joined Users",
    "description": "Users who have joined in the last 30 days.",
    "conditions": "created_at is within the last 30 days"
    }

    Repeat this format for all specified segments.'''

    queries = gemini_pro_response(prompt)

    return queries

@app.route('/visual', methods=['GET','POST'])
def visual():

    query= request.get_json()
    
    prompt=f'''You are a system designed to simplify SQL queries into a visualizable and user-friendly JSON format. Your goal is to extract essential parts of the SQL query and structure them for easy understanding. Break down the query into the following parts:

                Selected Tables: Identify all tables involved in the query (e.g., in SELECT, JOIN, etc.).

                Conditions: Specify the conditions applied to each table. Break them into:

                field: The column where the condition is applied.

                operator: The operator used (e.g., =, LIKE, <, >).

                value: The value being compared or searched.

                Joins: Identify relationships between tables:

                from: Source table.

                to: Destination table.

                fromField: Column in the source table used in the join.

                toField: Column in the destination table used in the join.

                If a condition applies across multiple tables (e.g., WHERE clauses), associate it with the relevant table. Ignore technical details like aliases, subqueries, or database-specific syntax unless explicitly relevant.

                Example:
                Input Query:
                sql
                SELECT * FROM Users
                JOIN Events ON Users.user_id = Events.user_id
                WHERE Events.event_details LIKE 'open'

                Expected Output:
                json
                {
                "selectedTables": ["Users", "Events"],
                "conditions": {
                "Events": [
                {
                "field": "event_details",
                "operator": "LIKE",
                "value": "open"
                }
                ]
                },
                "joins": [
                {
                "from": "Users",
                "to": "Events",
                "fromField": "user_id",
                "toField": "user_id"
                }
                ]
                }

                Ensure that the output JSON is clear, concise, and easy to visualize. Adapt to any SQL query and maintain this format consistently.

                SQL Query to be Converted : {query}'''

    vision = gemini_pro_response(prompt)

    return vision

if __name__ == '__main__':
    app.run(debug=True)