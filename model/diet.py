import os
import json
import time
import streamlit as st # type: ignore
from PIL import Image
import google.generativeai as genai

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

# Main function to run the Streamlit app
def main():
    # Set Streamlit page configuration
    st.set_page_config(page_title="Know Your Diet", layout="centered")
    st.title("Know Your Diet")

    # File uploader for image upload
    st.divider()
    uploaded_image = st.file_uploader("Upload your Report...", type=["jpg", "jpeg", "png"])

    # Check if an image is uploaded and the upload button is clicked
    if uploaded_image is not None and st.button("Upload"):
        try:
            # Open the uploaded image using PIL
            image = Image.open(uploaded_image)
            col1 = st.columns(2)[0]

            with col1:
                # Display the uploaded image
                st.image(image)

            # Display a spinner while processing the image
            with st.spinner(text="Reading your reports, please wait..."):
                time.sleep(6)

            # Default prompt for reading the report
            default_prompt = "read the given report completely"
            # Get the information from the image using the gemini-pro-vision model
            info_read = gemini_pro_vision_response(default_prompt, image)

            # Check if the read content is a medical report
            if is_medical(info_read):
                st.caption("Information gathered!")
                # Extract the patient's name from the read information
                read_name = gemini_pro_response(f"read the patient's first name from - {info_read}")
                if len(read_name) > 20:
                    read_name=''
                st.subheader(f'Hello {read_name.strip()} !!')

                # Check if there are any abnormalities in the report
                if is_abnormal(info_read):
                    prompt = f"simply state the abnormal behaviour or any deficiencies in brief from the given report results and make it sound assuring: {info_read}"
                else:
                    st.subheader("Your test results look great. Keep up with your health :)")
                    prompt = f"give a brief paragraph casual feedback or general health checkpoints for a pregnant lady on the basis of given reports considering no concerning abnormal behavior in the blood reports and make it assuring and convincing: {info_read}"

                # Get the response based on the prompt
                box = st.container(border=True)
                report_result = gemini_pro_response(prompt)
                box.markdown(report_result, unsafe_allow_html=True)

                # Suggest a diet plan based on the report
                prompt = f"Suggest a diet plan based on the following reports taken into consideration the deficiencies found in the report but do not include any example diet plan: {info_read}"
                diet_plan = gemini_pro_response(prompt)
                st.subheader("Advised Diet Plan")
                box = st.container(border=True)
                box.markdown(diet_plan, unsafe_allow_html=True)

                # Prepare a diet schedule based on the diet plan
                prompt = f"Prepare a diet schedule for three meals for the day and snacks, taking into consideration the following diet plan recommendation: {diet_plan}"
                ex_diet = gemini_pro_response(prompt)
                box = st.container(border=True)
                box.markdown(ex_diet, unsafe_allow_html=True)
            else:
                # Handle case when a non-medical file is submitted
                st.error("A non-medical file report was submitted. Please submit a valid medical report.")
        except Exception as e:
            # Display an error message if any exception occurs
            st.error(f"An error occurred: {e}")

# Run the main function if the script is executed
if __name__ == "__main__":
    main()