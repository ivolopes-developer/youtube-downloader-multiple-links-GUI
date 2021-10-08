import youtube_dl
import time
import eel
import os
from launchGUI import launchGUI
from win10toast_click import ToastNotifier
from pathlib import Path
from pytube import YouTube

urls = []
fileExtensions = []


@eel.expose
def getUrlAndRadio(url, fileExtension):
    urls.append(url)
    fileExtensions.append(fileExtension)


def openDownloads():
    downloads_path = str(Path.home() / "Downloads")

    path = os.path.realpath(downloads_path)
    os.startfile(path)


@eel.expose
def convertURLs():
    convert_counter = 1
    toaster = ToastNotifier()
    downloads_path = str(Path.home() / "Downloads")

    valueOfEachBarUpdate = (100/len(urls))

    for url, fileExtension in zip(urls, fileExtensions):
        if fileExtension == "mp3":
            print(f"\nStarting converting the {convert_counter} URL...")
            video_info = youtube_dl.YoutubeDL().extract_info(
                url=url, download=False
            )
            filename = f"{downloads_path}\Youtube to {str(fileExtension).upper()} Downloader\{video_info['title']}.{fileExtension}"

            options = {
                'format': 'bestaudio/best',
                'keepvideo': False,
                'outtmpl': filename,
            }

            with youtube_dl.YoutubeDL(options) as ydl:
                ydl.download([video_info['webpage_url']])

            print(
                f"URL {convert_counter} -> download complete... | {filename}")

            # updating status bar
            eel.updateStatusBar(valueOfEachBarUpdate*convert_counter)

            convert_counter += 1
            time.sleep(2)

        elif fileExtension == "mp4":
            yt = YouTube(url)

            # Showing details
            print(f"\nStarting converting the {convert_counter} URL...")
            print("Title: ", yt.title)
            print("Number of views: ", yt.views)
            print("Length of video: ", yt.length)
            print("Rating of video: ", yt.rating)

            filepath = f"{downloads_path}\Youtube to {str(fileExtension).upper()} Downloader\\"

            # Getting the highest resolution possible
            ys = yt.streams.get_highest_resolution()

            # Starting download
            print("Downloading...")
            ys.download(filepath)
            print("Download completed!!")

            # updating status bar
            eel.updateStatusBar(valueOfEachBarUpdate*convert_counter)

            convert_counter += 1
            time.sleep(2)

    toaster.show_toast("All Done!", f"Click to see your downloaded files",
                       icon_path="web/images/icons/notification-icon.ico/", duration=10, threaded=True, callback_on_click=openDownloads)

    # reset the page without reload
    eel.restartForm()


def main():
    launchGUI()


if __name__ == "__main__":
    main()
