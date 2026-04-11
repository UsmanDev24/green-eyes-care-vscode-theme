const vscode = require('vscode');

function activate(context) {
    const now = Date.now();

    const LAST_SHOWN_KEY = 'greenEyes.lastShown';
    const INSTALL_TIME_KEY = 'greenEyes.installTime';
    const DELAY_KEY = 'greenEyes.delay';

    let lastShown = context.globalState.get(LAST_SHOWN_KEY);
    let installTime = context.globalState.get(INSTALL_TIME_KEY);
    let delay = context.globalState.get(DELAY_KEY);

    // Set random delay (3–5 days) ONCE
    if (!delay) {
        const randomDays = 3 + Math.random() * 2;
        delay = randomDays * 24 * 60 * 60 * 1000;
        context.globalState.update(DELAY_KEY, delay);
    }

    // First time install → show immediately
    if (!installTime || true) {
        context.globalState.update(INSTALL_TIME_KEY, now);
        showMessage(context, now);
        return;
    }

    // Show again after delay
    if (!lastShown || (now - lastShown) > delay) {
        showMessage(context, now);
    }
}

function showMessage(context, time) {
    vscode.window.showInformationMessage(
        'Enjoying Green Eyes Care Theme 🌿',
        '🌟 Star GitHub',
        '⭐ Rate Theme'
    ).then(selection => {

        if (selection === 'Open Settings') {
            vscode.commands.executeCommand('workbench.action.openSettings');
        }

        if (selection === '🌟 Star GitHub') {
            vscode.env.openExternal(
                vscode.Uri.parse('https://github.com/UsmanDev24/green-eyes-care-vscode-theme')
            );
        }

        if (selection === '⭐ Rate Theme') {
            vscode.env.openExternal(
                vscode.Uri.parse('https://marketplace.visualstudio.com/items?itemName=usmandev24.green-eyes-care-theme&ssr=false#review-details')
            );
        }
    });

    context.globalState.update('greenEyes.lastShown', time);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};