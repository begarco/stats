import requests
import json
import sys
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


GITHUB_TOKEN = None
GITHUB_API = 'https://api.github.com/'
GITHUB_OWNER_TYPE = 'org'
GITHUB_OWNER_NAME = 'lequal'

if len(sys.argv) > 1:
    GITHUB_TOKEN = sys.argv[1]

projects = get_json(GITHUB_API+GITHUB_OWNER_TYPE+'s/'+GITHUB_OWNER_NAME+'/repos', GITHUB_TOKEN)

for project in projects:
    request = GITHUB_API+'repos/'+project['full_name']+'/releases'
    project['releases'] = get_json(request, GITHUB_TOKEN)

    request = GITHUB_API+'repos/'+project['full_name']+'/traffic/clones'
    project['traffic'] = get_json(request, GITHUB_TOKEN)

    request = GITHUB_API+'repos/'+project['full_name']+'/traffic/views'
    project['views'] = get_json(request, GITHUB_TOKEN)

now = datetime.datetime.now()
date = now.strftime("%Y-%m-%d")
save_json('data/projects-'+date+'.json', projects)
