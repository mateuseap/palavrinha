from string import ascii_lowercase

valid_letters = []

for letter in ascii_lowercase:
    valid_letters += letter

def is_word_valid(word):
    word = word.lower()
    count = 0
    for letter in word:
        if (letter in valid_letters):
            count += 1

    if(count == 5):
        return True
    else:
        return False

with open('br-utf8.txt', 'r', encoding="utf8") as file:
    word = file.readline()
    while word != '':
        if (len(word) == 6):
            if(is_word_valid(word)):
                f = open('all-words.txt', 'a')
                f.write(word.lower())
        word = file.readline()
    f.close()