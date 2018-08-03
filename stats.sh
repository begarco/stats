#!/bin/bash

# Specify if you want to work on an 'org' or a 'user'
type="org"

# Specify the name of the user/org
owner="lequal"

# Retrieve all repositories of the given user/org
repositories=$(curl -sb -H "Accept: application/json" "https://api.github.com/${type}s/$owner/repos" | grep "\"full_name\":" | cut -d':' -f2)
repositories="${repositories//\"}"
repositories="${repositories//,}"

for repo in $repositories
do
    echo "Stats for $repo"

    # First we compute the number of downloads
    response=$(curl -sb -H "Accept: application/json" "https://api.github.com/repos/$repo/releases" | grep download_count | cut -d':' -f2 | cut -d',' -f1)
    count=0

    for x in $response
    do
        count=$((count+x))
    done

    echo "Downloads: $count"

    #------------------------------------

    # Then we compute stars
    response=$(curl -sb -H "Accept: application/json" "https://api.github.com/repos/$repo" | grep -m 1 stargazers_count | cut -d':' -f2 | cut -d',' -f1)
    echo "Stars: $response"

    # Then we compute watchers
    response=$(curl -sb -H "Accept: application/json" "https://api.github.com/repos/$repo" | grep -m 1 watchers_count | cut -d':' -f2 | cut -d',' -f1)
    echo "Watchers: $response"

    # Then we compute forks
    response=$(curl -sb -H "Accept: application/json" "https://api.github.com/repos/$repo" | grep -m 1 forks_count | cut -d':' -f2 | cut -d',' -f1)
    echo "Forks: $response"

    # Then we compute clones
    response=$(curl -sb -H "Accept: application/json" "https://api.github.com/repos/$repo/traffic/clones" | grep -m 1 count | cut -d':' -f2 | cut -d',' -f1)
    echo "Clones (over last week): $response"

    # Then we compute views
    response=$(curl -sb -H "Accept: application/json" "https://api.github.com/repos/$repo/traffic/views" | grep -m 1 count | cut -d':' -f2 | cut -d',' -f1)
    echo "Views (over last week): $response"

done
