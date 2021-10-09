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


@eel.expose
def getUrlTitle(url):
    try:
        yt = YouTube(url)
        title = yt.title
        # returning title to JS to set on the field
        eel.setUrlTitle(title)
    except:
        print("URL does not match the REGEX conditions, nothing will happen")


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
            yt = YouTube(url)

            # Showing details
            print(
                f"\nStarting converting the {convert_counter} URL to {str(fileExtension).upper()}")
            print("Title: ", yt.title)
            print("Number of views: ", yt.views)
            print("Length of video: ", yt.length)
            print("Rating of video: ", yt.rating)

            filepath = f"{downloads_path}\Youtube to {str(fileExtension).upper()} Downloader\\"

            # Getting the highest resolution possible
            audio = yt.streams.filter(only_audio=True).first()

            # Starting download
            print("Downloading...")
            out_file = audio.download(output_path=filepath)
            # saving the file
            base, ext = os.path.splitext(out_file)
            new_file = base + f".{fileExtension}"
            os.rename(out_file, new_file)
            print(f"Audio from: {yt.title} was successfully downloaded!")

            eel.updateStatusBar(valueOfEachBarUpdate*convert_counter)

            convert_counter += 1
            time.sleep(2)

        elif fileExtension == "mp4":
            yt = YouTube(url)

            # Showing details
            print(
                f"\nStarting converting the {convert_counter} URL to {str(fileExtension).upper()}")
            print("Title: ", yt.title)
            print("Number of views: ", yt.views)
            print("Length of video: ", yt.length)
            print("Rating of video: ", yt.rating)

            filepath = f"{downloads_path}\Youtube to {str(fileExtension).upper()} Downloader\\"

            # Getting the highest resolution possible
            video = yt.streams.get_highest_resolution()

            # Starting download
            print("Downloading...")
            video.download(filepath)
            print(f"The video: {yt.title} was successfully downloaded!")

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
