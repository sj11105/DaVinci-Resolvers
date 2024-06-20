from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from PIL import Image
import google.generativeai as genai  # Assuming generativeai is correctly imported

app = Flask(__name__)
CORS(app)

# Get the working directory
working_directory = os.path.dirname(os.path.abspath(__file__))
# pip install google-generativeai

# Path to the configuration file
config_file_path = os.path.join(working_directory, "config.json")

# Load the configuration data from the JSON file
with open(config_file_path) as config_file:
    config_data = json.load(config_file)

# Loading the API key from the configuration data
GOOGLE_API_KEY = config_data.get("GOOGLE_API_KEY")

# Configuring generativeai with the API key
genai.configure(api_key=GOOGLE_API_KEY)

# Function to get a response from the gemini-pro-vision model
def gemini_pro_vision_response(prompt, image):
    gemini_pro_vision_model = genai.GenerativeModel("gemini-pro-vision")
    response = gemini_pro_vision_model.generate_content([prompt, image])
    return removeSymbols(response.text)

# Function to get a response from the gemini-pro model
def gemini_pro_response(user_prompt):
    gemini_pro_model = genai.GenerativeModel("gemini-pro")
    response = gemini_pro_model.generate_content(user_prompt)
    return removeSymbols(response.text)

# Function to determine if the report has abnormalities
def is_abnormal(report):
    prompt = f'is there any abnormalities in the test reports, reply with only a True or False -- "{report}"'
    response = gemini_pro_response(prompt)
    return response.strip().lower() == 'true'

# Function to check if the content is a medical report
def is_medical(report):
    prompt = f'{report}. is it medical reports?? respond in True or False'
    response = gemini_pro_response(prompt)
    return response.strip().lower() == 'true'

# Function to get abnormal results
def abnormalResults(report):
    prompt = f"simply state the abnormal behaviour or any deficiencies in brief from the given report results and make it sound assuring: {report}"
    return gemini_pro_response(prompt)

# Function to get normal results
def normalResults(report):
    prompt = f"give a brief paragraph casual feedback or general health checkpoints for a pregnant lady on the basis of given reports considering no concerning abnormal behavior in the blood reports and make it assuring and convincing: {report}"
    return gemini_pro_response(prompt)

# Function to remove unwanted symbols from response
def removeSymbols(response):
    return response.strip().replace("*", '')


# Function to suggest a diet plan
def suggestivePlan(report_results):
    prompt = f"Suggest a diet plan based on the following reports taken into consideration the deficiencies found in the report but do not include any example diet plan: {report_results}"
    return gemini_pro_response(prompt)

# Function to create a diet plan
def createDietPlan(dietChart):
    prompt = f"Prepare a diet schedule for three meals for the day and snacks, taking into consideration the following diet plan recommendation: {dietChart}"
    return gemini_pro_response(prompt)

# Define endpoint for processing uploaded image and report analysis
@app.route('/api/process_report', methods=['POST'])
def process_report():
    try:
        uploaded_image = request.files['file']
        image = Image.open(uploaded_image)
        default_prompt = "read the given report completely"
        info_read = gemini_pro_vision_response(default_prompt, image)

        if is_medical(info_read):
            read_name = gemini_pro_response(f"read the patient's first name from - {info_read}")
            if len(read_name) > 20:
                read_name = ''

            abnormal = is_abnormal(info_read)
            if abnormal:
                repResult = abnormalResults(info_read)
            else:
                repResult = normalResults(info_read)

            dietPlan = suggestivePlan(info_read)
            dietSched = createDietPlan(dietPlan)

            response_data = {
                'name': read_name,
                'abnormal':abnormal,
                'result': repResult,
                'plan': dietPlan,
                'diet': dietSched
            }
            return jsonify(response_data), 200
        else:
            return jsonify({'error': 'Non-medical report submitted.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
