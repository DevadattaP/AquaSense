from smtplib import SMTP
from email.message import EmailMessage

import json


SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_SENDER = "wsupply630@gmail.com"
EMAIL_PASSWORD = "sagw nxua qxal mgtz"

def send_email(receiver: str, subject:str, text: str):
    msg = EmailMessage()
    msg.set_content(text)
    msg['Subject'] = subject
    msg['From'] = EMAIL_SENDER
    msg['To'] = receiver

    try:
        server = SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return {'status': 'success', 'response': 'Mail sent successfully'}
    except Exception as e:
        return {'status': 'error', 'response': str(e)}
    

def format_email(category: str, format: dict):
    with open('UTILS/mail_templates.json', 'r') as f:
        email = json.load(f)[category]

    subject = email['SUBJECT']
    text = email['TEXT']

    for key in format:
        text = text.replace(key, str(format[key]))
    
    return subject, text


if __name__ == '__main__':
    category = "COMPLAINT_CONFIRMATION"
    data = {
        "[User]": "John Doe",
        "[ComplaintType]": "Service Issue",
        "[ComplaintID]": "123456",
        "[Location]": "123 Main St",
        "[ComplaintDate]": "2024-04-04"
    }

    subject, text = format_email(category, data)
    print("Subject:", subject)
    print("Text:", text)

