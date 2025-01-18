# **Interview Notes**

A full-stack web application for extracting and managing interview questions from YouTube videos. This project leverages modern tools like React, Node.js, and APIs (SUPADATA and OpenAI GPT) to streamline the process of analyzing video subtitles and obtaining insightful questions and answers.

---

## **Features**
- Extracts subtitles from YouTube videos.
- Identifies and formats interview questions using GPT.
- Allows users to fetch AI-generated answers for extracted questions.
- Enables saving and managing question-answer pairs locally.
- Intuitive UI with a dark theme built using Bootstrap.

---

## **Technologies Used**

### **Frontend:**
- **React**: For building the user interface.
- **Bootstrap**: For responsive and visually appealing design.
- **JavaScript**: To handle application logic.

### **Backend:**
- **Node.js**: For the server-side runtime.
- **Express**: For creating RESTful APIs.
- **Axios**: For HTTP requests to external APIs.
- **dotenv**: For managing environment variables.

### **External APIs:**
- **SUPADATA API**: To fetch subtitles from YouTube videos.
- **OpenAI GPT API**: To process subtitles and generate questions and answers.

---

## **Setup Instructions**

### **Configure Environment Variables**
Create a `.env` file in the `server` directory and add the following keys:

```bash
SUPADATA_API_KEY=your_supadata_api_key
OPENAI_API_KEY=your_openai_api_key


