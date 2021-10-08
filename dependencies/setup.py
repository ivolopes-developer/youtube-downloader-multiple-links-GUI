import sys
import subprocess


def installDependencie(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


def verifyDependencies():
    try:
        installDependencie("pypiwin32")
    except:
        pass
    try:
        installDependencie("setuptools")
    except:
        pass
    try:
        installDependencie("win10toast")
    except:
        pass
    try:
        installDependencie("Eel")
    except:
        pass
    try:
        installDependencie("win10toast-click")
    except:
        pass
    try:
        installDependencie("pathlib")
    except:
        pass
    try:
        installDependencie("youtube_dl")
    except:
        pass
    try:
        installDependencie("youtube_dl")
    except:
        pass
    try:
        installDependencie("pytube")
    except:
        pass


def main():
    verifyDependencies()


if __name__ == "__main__":
    main()
