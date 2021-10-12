import eel


def launchGUI():
    eel.init('web')
    eel.start("index.html", mode='chrome', port=8080, host='localhost',
              disable_cache=True, cmdline_args=['--start-fullscreen'])
