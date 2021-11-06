import os
import eel
from pytube import YouTube
from pathlib import Path
from win10toast_click import ToastNotifier
from launchGUI import launchGUI
from threading import Thread

urls = []
fileExtensions = []
urlNumbers = []


@eel.expose
def getUrlFieldInfo(url, fileExtension, url_number):
    urls.append(url)
    fileExtensions.append(fileExtension)
    urlNumbers.append(url_number)


def clearLists():
    urls.clear()
    fileExtensions.clear()
    urlNumbers.clear()


@eel.expose
def getUrlTitle(url, url_number):
    try:
        yt = YouTube(url)
        title = yt.title
        # returning title to JS to set on the field
        eel.setUrlTitle(title, url_number)
    except:
        print("URL does not match the REGEX conditions, nothing will happen")
        eel.hideUrlTitle(url_number)


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

    print("\n\tURL NUMBERS LIST -> " + str(urlNumbers))
    print("\tURLs LIST -> " + str(urls))
    print("\tFILE EXTENSIONs LIST -> " + str(fileExtensions))

    for url, fileExtension, url_number in zip(urls, fileExtensions, urlNumbers):
        print("\n\tURL NUMBER -> " + str(url_number))
        print("\tURL TO CONVERT -> " + str(url))
        print("\tFILE EXTENSION OF URL THAT'LL BE CONVERTED -> " + str(fileExtension))

        yt = YouTube(url)

        # Showing details
        print(
            f"\nStarting converting the {convert_counter} URL to {str(fileExtension).upper()}")
        print("Title: ", yt.title)
        print("Number of views: ", yt.views)
        print("Length of video: ", yt.length)

        filepath = f"{downloads_path}\Youtube to {str(fileExtension).upper()} Downloader\\"

        if fileExtension == "mp3":

            # Getting the highest resolution possible
            audio = yt.streams.filter(only_audio=True).first()

            # Starting download
            print("Downloading...")

            try:
                out_file = audio.download(output_path=filepath)
                # saving the file
                base, ext = os.path.splitext(out_file)
                new_file = base + f".{fileExtension}"
                os.rename(out_file, new_file)

                print(f"Audio from: {yt.title} was successfully downloaded!")

            except:
                print("\n\t[ERROR] Can't save an existing file [ERROR]\n")

            eel.updateStatusBar(valueOfEachBarUpdate*convert_counter)

            convert_counter += 1
            eel.sleep(2.0)

        elif fileExtension == "mp4":

            # Getting the highest resolution possible
            video = yt.streams.get_highest_resolution()

            # Starting download
            print("Downloading...")
            try:
                video.download(filepath)
                print(f"The video: {yt.title} was successfully downloaded!")

            except:
                print("\n\t[ERROR] Can't save an existing file [ERROR]\n")

            # updating status bar
            eel.updateStatusBar(valueOfEachBarUpdate*convert_counter)

            convert_counter += 1
            eel.sleep(2.0)

        eel.setConvertionCompleteIcon(url_number)

    toaster.show_toast("All Done!", f"Click to see your downloaded files",
                       icon_path="web/images/icons/notification-icon.ico/", duration=10, threaded=True,
                       callback_on_click=openDownloads)

    # clear urls and fileExtensions lists in order to do the next convertion
    clearLists()

    # reset the page without reload
    eel.sleep(3.0)
    eel.restartForm()


def main():
    launchGUI()


if __name__ == "__main__":
    main()
