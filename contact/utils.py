TEXT_TO_BLOCK = ["larnehell", "cryptaxbot"]


def validate(form):
    formFields = [form['subject'].lower(), form['senderEmail'].lower(),
                  form['senderName'].lower(), form['message'].lower()]
    print(form)

    if form["hidden-input"]:
        return False
    for text in formFields:
        if text in TEXT_TO_BLOCK:
            print(text)
            return False
    return True
