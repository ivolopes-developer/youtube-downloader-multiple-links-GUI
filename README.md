# youtube-downloader-multiple-links-GUI

For a while, all websites that convert youtube links into mp3/mp4 files stopped working for me, most likely because 
of the extensions I use to block popups and advertisements.

I decided to make my own youtube downloader, both for mp3 and mp4 in python, just run by the terminal. 
During a volunteer work, a girl was downloading songs from youtube and said that it was really nice for her to be able to download 
them all at the same time. That's when I thought about creating this tool to download the links I want at once, without ads xD

For this development I used web languages (HTML, CSS, JS) to create the interface and its behavior, and for the backend I used Python.

The user communicates with the interface by introducing the links, then the respective validations will be done in 
javascript with regex, that finally, if everything is ok, the information (urls) are sent to python scripts that are responsible 
for the download, indication of the progress of downloading and storing files.

The downloaded files are saved in the operating system's /Downloads folder, inside the respective MP3 or MP4 folders. 
A notification is sent to the user that the download is complete.
