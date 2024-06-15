from flask import Flask, render_template, Response
import cv2
import os
import math
import mediapipe as mp
import numpy as np
import warnings

# Suppress specific warnings
warnings.filterwarnings("ignore", category=UserWarning, module='google.protobuf.symbol_database')

app = Flask(__name__)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Initialize MediaPipe Drawing
mp_drawing = mp.solutions.drawing_utils

def draw_angle(image, point1, point2, point3, angle, position, color=(0, 0, 0)):
    cv2.putText(image, str(int(angle)),
                position,
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2, cv2.LINE_AA)


# Function to calculate angle given three points
def calculate_angle(a, b, c):
    radians = math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(a[1] - b[1], a[0] - b[0])
    angle = math.degrees(radians)
    if angle < 0:
        angle += 360
    return angle

def is_posture_correct(a, b, c, d, e, f, g, h, i, j, k, l, tolerance=15):
    return (
        abs(a - g) < tolerance and
        abs(b - h) < tolerance and
        abs(c - i) < tolerance and
        abs(d - j) < tolerance and
        abs(e - k) < tolerance and
        abs(f - l) < tolerance
    )


# Define the path to the dataset directory
dataset_path = "./Exercises"

# Initialize a list to hold images
image_dataset = []

# Function to preprocess images (e.g., resize)
def preprocess_image(image, size=(600, 600)):
    return cv2.resize(image, size)

# Iterate over each image file in the dataset directory
for image_name in os.listdir(dataset_path):
    image_path = os.path.join(dataset_path, image_name)
    # Read the image using OpenCV
    image = cv2.imread(image_path)
    if image is not None:
        # Preprocess the image
        preprocessed_image = preprocess_image(image)
        # Add the image to the dataset
        image_dataset.append(preprocessed_image)
    else:
        print(f"Error: Unable to read image at {image_path}")

# Convert the list to a NumPy array for ML model input
image_dataset = np.array(image_dataset)

# Define the generator function to process video frames
def gen_frames():
    cap = cv2.VideoCapture(0)
    image_index = 0

    while cap.isOpened():
        success, video_frame = cap.read()
        if not success:
            print("Ignoring empty camera frame.")
            continue

        # Convert the BGR image to RGB
        video_frame_rgb = cv2.cvtColor(video_frame, cv2.COLOR_BGR2RGB)
        # Process the image and find pose landmarks
        video_results = pose.process(video_frame_rgb)

        if video_results.pose_landmarks:
            # Extract landmarks
            landmarks = video_results.pose_landmarks.landmark

            # Define landmarks for calculating angles
            v_right_shoulder = (landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y)
            v_right_elbow = (landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y)
            v_right_wrist = (landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y)
            v_left_shoulder = (landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y)
            v_left_elbow = (landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y)
            v_left_wrist = (landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y)
            v_right_hip = (landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y)
            v_right_knee = (landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y)
            v_right_ankle = (landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y)
            v_left_hip = (landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y)
            v_left_knee = (landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y)
            v_left_ankle = (landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y)

            # Calculate angles
            v_right_arm_angle = calculate_angle(v_right_shoulder, v_right_elbow, v_right_wrist)
            v_left_arm_angle = calculate_angle(v_left_shoulder, v_left_elbow, v_left_wrist)
            v_right_leg_angle = calculate_angle(v_right_hip, v_right_knee, v_right_ankle)
            v_left_leg_angle = calculate_angle(v_left_hip, v_left_knee, v_left_ankle)
            v_shoulder_diff = abs(v_left_shoulder[1] - v_right_shoulder[1])
            v_hip_diff = abs(v_left_hip[1] - v_right_hip[1])

            # Read image from dataset
            image = image_dataset[image_index]
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = pose.process(image_rgb)

            if results.pose_landmarks:
                # Extract landmarks
                landmarks = results.pose_landmarks.landmark

                # Define landmarks for calculating angles
                right_shoulder = (landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y)
                right_elbow = (landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y)
                right_wrist = (landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y)
                left_shoulder = (landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y)
                left_elbow = (landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y)
                left_wrist = (landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y)
                right_hip = (landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y)
                right_knee = (landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y)
                right_ankle = (landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y)
                left_hip = (landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y)
                left_knee = (landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y)
                left_ankle = (landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y)

                # Calculate angles
                right_arm_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)
                left_arm_angle = calculate_angle(left_shoulder, left_elbow, left_wrist)
                right_leg_angle = calculate_angle(right_hip, right_knee, right_ankle)
                left_leg_angle = calculate_angle(left_hip, left_knee, left_ankle)
                shoulder_diff = abs(left_shoulder[1] - right_shoulder[1])
                hip_diff = abs(left_hip[1] - right_hip[1])

                # Compare poses with a tolerance 
                tolerance = 15
                correct_posture = is_posture_correct(right_arm_angle, left_arm_angle, right_leg_angle, left_leg_angle,
                                                     shoulder_diff, hip_diff, v_right_arm_angle, v_left_arm_angle,
                                                     v_right_leg_angle, v_left_leg_angle, v_shoulder_diff, v_hip_diff,
                                                     tolerance)

                # Determine color for correctness feedback
                if correct_posture:
                    color = (0, 255, 0)  # Green for correct posture
                    text = "Correct"
                else:
                    color = (0, 0, 255)  # Red for incorrect posture
                    text = "Incorrect"

                # Draw angles on the live video frame
                draw_angle(video_frame, v_right_shoulder, v_right_elbow, v_right_wrist, v_right_arm_angle,
                           (50, 50), color)
                draw_angle(video_frame, v_left_shoulder, v_left_elbow, v_left_wrist, v_left_arm_angle,
                           (50, 80), color)
                draw_angle(video_frame, v_right_hip, v_right_knee, v_right_ankle, v_right_leg_angle,
                           (50, 110), color)
                draw_angle(video_frame, v_left_hip, v_left_knee, v_left_ankle, v_left_leg_angle,
                           (50, 140), color)

                # Draw the pose annotation on the image
                mp_drawing.draw_landmarks(
                    video_frame, video_results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                    mp_drawing.DrawingSpec(color=color, thickness=2, circle_radius=2),
                    mp_drawing.DrawingSpec(color=color, thickness=2, circle_radius=2)
                )

                # Draw angles on the reference image
                draw_angle(image, right_shoulder, right_elbow, right_wrist, right_arm_angle,
                           (50, 50), (0, 0, 0))
                draw_angle(image, left_shoulder, left_elbow, left_wrist, left_arm_angle,
                           (50, 80), (0, 0, 0))
                draw_angle(image, right_hip, right_knee, right_ankle, right_leg_angle,
                           (50, 110), (0, 0, 0))
                draw_angle(image, left_hip, left_knee, left_ankle, left_leg_angle,
                           (50, 140), (0, 0, 0))

                # Combine both frames side by side
                combined_frame = np.hstack((cv2.resize(cv2.cvtColor(image, cv2.COLOR_RGB2BGR), (video_frame.shape[1] // 2, video_frame.shape[0])),
                                            cv2.resize(video_frame, (video_frame.shape[1] // 2, video_frame.shape[0]))))

                # Display correctness text on both frames
                cv2.putText(combined_frame, f"Live: {text}", (50, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 1)
                cv2.putText(combined_frame, f"Reference", (video_frame.shape[1] // 2 + 50, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

                ret, buffer = cv2.imencode('.jpg', combined_frame)
                frame = buffer.tobytes()

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

                # Display the combined frame
                cv2.imshow('Pose Detection', combined_frame)
                key = cv2.waitKey(1)
                if key == 27:  # 27 is the ASCII code for the ESC key
                    print('ESC key pressed. Exiting...')
                    break
                elif key == ord('d'):  # 'd' key to move to the next image
                    image_index = (image_index + 1) % len(image_dataset)
                elif key == ord('a'):  # 'a' key to move to the previous image
                    image_index = (image_index - 1) % len(image_dataset)

    cap.release()
    cv2.destroyAllWindows()

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True,port=5001)
