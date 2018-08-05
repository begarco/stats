import requests
import json
import sys
import datetime


GITHUB_TOKEN = None
GITHUB_API = 'https://api.github.com/'
GITHUB_OWNER_TYPE = 'org'
GITHUB_OWNER_NAME = 'lequal'


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


def compute_download_count(projects):
    for project in projects:
        project_count = 0
        for release in project['releases']:
            release_count = 0
            for asset in release['assets']:
                release_count = release_count + asset['download_count']
            release['download_count'] = release_count
            project_count = project_count + release_count
        project['download_count'] = project_count


if len(sys.argv) > 1:
    GITHUB_TOKEN = sys.argv[1]

projects = get_json(GITHUB_API+GITHUB_OWNER_TYPE+'s/'+GITHUB_OWNER_NAME+'/repos', GITHUB_TOKEN)

for project in projects:
    request = GITHUB_API+'repos/'+project['full_name']+'/releases'
    project['releases'] = get_json(request, GITHUB_TOKEN)

    request = GITHUB_API+'repos/'+project['full_name']+'/traffic/clones'
    project['clones'] = get_json(request, GITHUB_TOKEN)

    request = GITHUB_API+'repos/'+project['full_name']+'/traffic/views'
    project['views'] = get_json(request, GITHUB_TOKEN)

compute_download_count(projects)

now = datetime.datetime.now()
date = now.strftime("%Y-%m-%d")
save_json('data/projects-'+date+'.json', projects)
