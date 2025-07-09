import google.generativeai as genai

genai.configure(api_key="AIzaSyBo1g7-ITAWSpj7UbrEBDiQf8O13ik7lSY")

model = genai.GenerativeModel('gemini-2.5-flash')

prompt = "Give personalized mental health advice for someone with moderate depression."

response = model.generate_content(prompt)

print("Gemini Response:\n", response.text)
