import google.generativeai as genai
from flask import Flask,request
from dotenv import load_dotenv
from flask_cors import CORS
import os
import collections
collections.Iterable = collections.abc.Iterable
load_dotenv()
app = Flask(__name__)
CORS(app)

app=Flask(__name__)
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
model=genai.GenerativeModel('gemini-pro')

@app.route('/cover-letter',methods=['POST'])
def myFormPost(): 
    data=request.get_json()
    name=data['name']
    githubProfile=data['githubProfile']
    linkedinProfile=data['linkedinProfile']
    techStack=data['techStack']
    text = (f"Please generate a cover letter for me. "
                f"Name: {name}, GitHub Profile: {githubProfile}, "
                f"LinkedIn Profile: {linkedinProfile}, Tech Stack: {techStack}")
    response = model.generate_content(text)

    cover_letter = str(response.text)          
    print("Data from frontend:", data)
    return cover_letter

if __name__=='__main__':
    app.run(debug=True)