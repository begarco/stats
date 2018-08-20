import requests
import json
import glob
import datetime


def get_json(url, token):
    headers = {}
    if token is not None:
        headers = {'Authorization': 'token ' + token}
    response = requests.get(url, headers=headers)
    return response.json()


def save_json(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file)


def load_json(file_path):
    with open(file_path) as data:
        return json.load(data)


def compute_count(projects, field):
    download_count = 0
    for project in projects:
        download_count += project[field]
    return download_count


def compute_var(array):
    result = []
    for i in range(len(array)-1):
        result.append(array[i+1]-array[i])
    return result


now = datetime.datetime.now()
latestFile = open('data/latest', 'r')
latestContent = latestFile.read().strip()
latestDate = datetime.datetime.strptime(latestContent, 'projects-%Y-%m-%d.json')
latestFile.close()
history = {'labels': [], 'downloads': [], 'stars': [], 'forks': [],
           'downloads_var': [], 'stars_var': [], 'forks_var': []}

DATA_SIZE = len(glob.glob1('data', "projects*"))

for day in range(DATA_SIZE):
    currentDate = (latestDate - datetime.timedelta(day)).strftime('%Y-%m-%d')

    projects = load_json('data/projects-'+currentDate+'.json')
    downloads = compute_count(projects, 'download_count')
    stars = compute_count(projects, 'stargazers_count')
    forks = compute_count(projects, 'forks_count')

    history['labels'].append(currentDate)
    history['downloads'].append(downloads)
    history['stars'].append(stars)
    history['forks'].append(forks)

history['labels'].reverse()
history['downloads'].reverse()
history['stars'].reverse()
history['forks'].reverse()
history['downloads_var'] = compute_var(history['downloads'])
history['stars_var'] = compute_var(history['stars'])
history['forks_var'] = compute_var(history['forks'])

save_json('data/history.json', history)
