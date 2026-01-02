define(function(require) {
    let installPromptEvent
    let installLink = document.querySelector('[data-webapp="install"]')
    installLink.style.display = 'none'

    let installBlock = installLink.closest('[data-webapp="section"]')
    if (installBlock) {
        installBlock.style.display = 'none'
    }

    // Install App functionality
    window.addEventListener('beforeinstallprompt', event => {
        // Suppress automatic prompting
        event.preventDefault()

        // Stash the event so it can be triggered later.
        installPromptEvent = event

        // Show the (hidden-by-default) install link
        installLink.style.display = 'inline-block'
        if (installBlock) {
            installBlock.style.display = 'block'
        }

        installLink.addEventListener('click', event => {
            event.preventDefault()

            // Show the modal add to home screen dialog
            installPromptEvent.prompt()

            // Wait for the user to respond to the prompt
            installPromptEvent.userChoice.then(choice => {
                if (choice.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt')
                } else {
                    console.log('User dismissed the A2HS prompt')
                }
                // Clear the saved prompt since it can't be used again
                installPromptEvent = null
            })
        })
    })

    window.addEventListener('appinstalled', (evt) => {
        console.log('应用已安装')
    })
})