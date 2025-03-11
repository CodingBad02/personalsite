import os
import json
import random
import requests
from base64 import b64encode
from dotenv import load_dotenv, find_dotenv
from flask import Flask, Response, render_template

load_dotenv(find_dotenv())

# Spotify credentials from environment variables
SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
SPOTIFY_REFRESH_TOKEN = os.getenv("SPOTIFY_REFRESH_TOKEN")

PLACEHOLDER_IMAGE = ""
FALLBACK_THEME = "spotify_dark.html.j2"

REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token"
NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing"
RECENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=10"

app = Flask(__name__)

########################
#  Load the offline image
########################
def load_offline_image_b64():
    """
    Loads a local offline.png image and returns base64-encoded data.
    """
    try:
        with open("offline.png", "rb") as f:
            return b64encode(f.read()).decode("ascii")
    except FileNotFoundError:
        # If the file isn't found, just return an empty string or a placeholder
        return ""

OFFLINE_IMAGE_B64 = load_offline_image_b64()

def getAuth():
    return b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode("ascii")

def refreshToken():
    data = {
        "grant_type": "refresh_token",
        "refresh_token": SPOTIFY_REFRESH_TOKEN,
    }
    headers = {"Authorization": f"Basic {getAuth()}"}
    try:
        response = requests.post(REFRESH_TOKEN_URL, data=data, headers=headers)
        response.raise_for_status()
        return response.json()["access_token"]
    except (KeyError, requests.exceptions.RequestException, json.JSONDecodeError):
        # Means we can't get a valid token -> treat as offline
        return None

def recentlyPlayed(token):
    if not token:
        return {}
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(RECENTLY_PLAYING_URL, headers=headers)
        if response.status_code == 204:
            return {}
        return response.json()
    except requests.exceptions.RequestException:
        return {}

def nowPlaying():
    token = refreshToken()
    if not token:
        # If we can't get a token, consider it offline
        return {"offline": True}
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(NOW_PLAYING_URL, headers=headers)
        # 204 = No track playing
        if response.status_code == 204:
            return {}
        return response.json()
    except requests.exceptions.RequestException:
        # If there's a network error, treat as offline
        return {"offline": True}

def barGen(barCount):
    barCSS = ""
    left = 1
    for i in range(1, barCount + 1):
        anim = random.randint(1000, 1350)
        barCSS += f".bar:nth-child({i})  {{ left: {left}px; animation-duration: {anim}ms; }}"
        left += 4
    return barCSS

def getTemplate():
    try:
        with open("templates.json", "r") as file:
            templates = json.load(file)
        return templates["templates"][templates["current-theme"]]
    except Exception as e:
        print(f"Failed to load templates: {e}")
        return FALLBACK_THEME

def loadImageB64(url):
    response = requests.get(url)
    response.raise_for_status()
    return b64encode(response.content).decode("ascii")

def makeSVG(data, background_color, border_color):
    barCount = 84
    contentBar = "".join(["<div class='bar'></div>" for _ in range(barCount)])
    barCSS = barGen(barCount)

    ###############################
    #  Check if user is offline
    ###############################
    if "offline" in data:
        currentStatus = "I'm Offline"
        image = OFFLINE_IMAGE_B64
        artistName = "No Connection"
        songName = "No Song Playing"
        songURI = "#"
        artistURI = "#"
    elif not data or data.get("item") in [None, "None"]:
        # Means user is online but no current track
        currentStatus = "Was playing:"
        recent = recentlyPlayed(refreshToken())
        recentItems = recent.get("items", [])
        if recentItems:
            itemIndex = random.randint(0, len(recentItems) - 1)
            item = recentItems[itemIndex]["track"]
        else:
            item = {}

        if item.get("album", {}).get("images", []) == []:
            image = PLACEHOLDER_IMAGE
        else:
            try:
                image = loadImageB64(item["album"]["images"][1]["url"])
            except:
                image = ""

        artistName = item["artists"][0]["name"].replace("&", "&amp;") if item.get("artists") else "Unknown Artist"
        songName = item.get("name", "Unknown Song").replace("&", "&amp;")
        songURI = item.get("external_urls", {}).get("spotify", "#")
        artistURI = item["artists"][0].get("external_urls", {}).get("spotify", "#") if item.get("artists") else "#"
    else:
        # user is actively playing a track
        currentStatus = "Vibing to:"
        item = data["item"]
        if item.get("album", {}).get("images", []) == []:
            image = PLACEHOLDER_IMAGE
        else:
            try:
                image = loadImageB64(item["album"]["images"][1]["url"])
            except:
                image = ""

        artistName = item["artists"][0]["name"].replace("&", "&amp;") if item.get("artists") else "Unknown Artist"
        songName = item.get("name", "Unknown Song").replace("&", "&amp;")
        songURI = item.get("external_urls", {}).get("spotify", "#")
        artistURI = item["artists"][0].get("external_urls", {}).get("spotify", "#") if item.get("artists") else "#"

    # Adjust image size in the SVG if necessary
    if image:
        image = image.replace("width='300'", "width='200'")

    dataDict = {
        "contentBar": contentBar,
        "barCSS": barCSS,
        "artistName": artistName,
        "songName": songName,
        "songURI": songURI,
        "artistURI": artistURI,
        "image": image,
        "status": currentStatus,
        "background_color": background_color,
        "border_color": border_color
    }

    with app.app_context():
        return render_template(getTemplate(), **dataDict)

@app.route("/now-playing")
def now_playing_endpoint():
    background_color = "181414"
    border_color = "181414"
    data = nowPlaying()
    svg = makeSVG(data, background_color, border_color)
    return Response(svg, mimetype="image/svg+xml")

if __name__ == "__main__":
    app.run(debug=True)