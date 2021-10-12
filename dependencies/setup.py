import sys
import subprocess


def installDependencie(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


def uninstallDependencie(package):
    subprocess.check_call(
        [sys.executable, "-m", "pip", "uninstall", "-y", package])


def uninstallDependencies():
    try:
        uninstallDependencie("pypiwin32")
    except:
        pass
    try:
        uninstallDependencie("setuptools")
    except:
        pass
    try:
        uninstallDependencie("win10toast")
    except:
        pass
    try:
        uninstallDependencie("eel")
    except:
        pass
    try:
        uninstallDependencie("win10toast-click")
    except:
        pass
    try:
        uninstallDependencie("pathlib")
    except:
        pass
    try:
        uninstallDependencie("pytube")
    except:
        pass


def installDependencies():
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
        installDependencie("eel")
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
        installDependencie("pytube")
    except:
        pass


def main():
    uninstallDependencies()
    installDependencies()


if __name__ == "__main__":
    main()
