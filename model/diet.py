from flask import Flask, request, jsonify
import os
import json
import time
import streamlit as st
from PIL import Image
import google.generativeai as genai

app = Flask(__name__)

# Get the working directory
working_directory = os.path.dirname(os.path.abspath(__file__))

# Path to the configuration file
config_file_path = os.path.join(working_directory, "config.json")

# Load the configuration data from the JSON file
with open(config_file_path) as config_file:
    config_data = json.load(config_file)

# Loading the API key from the configuration data
GOOGLE_API_KEY = config_data.get("GOOGLE_API_KEY")

# Configuring google.generativeai with the API key
genai.configure(api_key=GOOGLE_API_KEY)

# Function to get a response from the gemini-pro-vision model
def gemini_pro_vision_response(prompt, image):
    gemini_pro_vision_model = genai.GenerativeModel("gemini-pro-vision")
    response = gemini_pro_vision_model.generate_content([prompt, image])
    return response.text

# Function to get a response from the gemini-pro model
def gemini_pro_response(user_prompt):
    gemini_pro_model = genai.GenerativeModel("gemini-pro")
    response = gemini_pro_model.generate_content(user_prompt)
    return response.text

# Function to determine if the report has abnormalities
def is_abnormal(report_results):
    prompt = f'is there any abnormalities in the test reports, reply with only a True or False -- "{report_results}"'
    response = gemini_pro_response(prompt)
    return response.strip().lower() == 'true'

# Function to check if the content is a medical report
def is_medical(content):
    prompt = f'{content}. is it medical reports?? respond in True or False'
    response = gemini_pro_response(prompt)
    return response.strip().lower() == 'true'

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
            
            response_data = {
                'name': read_name.strip(),
                'abnormal': is_abnormal(info_read),
                'info_read': info_read
            }
            return jsonify(response_data), 200
        else:
            return jsonify({'error': 'Non-medical report submitted.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
